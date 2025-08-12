const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection;


// Conected to database
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('Connected to database');
        db = client.db(dbName);
        collection = db.collection('movies');
    })
    .catch(err => console.error(err));


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.get('/search', async (request,response) => {
    try{

        let result = await collection.aggregate([
            {
                "$Search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path" : "title",
                        "Fuzzy":{
                            "maxEdit" : 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
      response.send(result)
    } catch (error){
         response.status(500).send({message: error.message})
    }
})

app.get('/get/:id', async (request,response) => {
 try{
 let result = await collection.findOne({
    "_id" : ObjectId(request.params.id)
 })
 response.send(result)
 }catch(error){
  response.status(500).send({message: error.message})
 }
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
