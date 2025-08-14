const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()

const PORT = 8000

if (!process.env.DB_STRING) {
    console.error("ERROR: DB_STRING is missing! Set it in Render's Environment Variables.");
    process.exit(1);
}

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())
app.use(express.static('public'));




app.get("/search", async (request,response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path": "title",
                        "fuzzy": {
                            "maxEdits":2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        //console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
        //console.log(error)
    }
})

const { isValidObjectId } = require('mongodb');


app.get("/get/:id", async (request, response) => {
    try {
        if (!ObjectId.isValid(request.params.id)) {
            return response.status(400).send({ message: "Invalid ID format" });
        }

        let result = await collection.findOne({ _id: new ObjectId(request.params.id) });

        if (!result) {
            return response.status(404).send({ message: "Movie not found" });
        }

        response.send(result);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.`)
})