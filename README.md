MongoDB Autocomplete Search

A simple web app demonstrating autocomplete search using MongoDB Atlas Search. Users can search for movie titles and see results in real time.


Features

Search-as-you-type (autocomplete) for movies.

Display movie details including cast and poster.

Built with Node.js, Express, and MongoDB Atlas.

Real-time suggestions powered by MongoDB Atlas Search.

Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB Atlas

Search: Atlas Search with autocomplete operator

Installation (Local Setup)

Clone the repository:

git clone <your-repo-url>


Install dependencies:

cd project-folder
npm install


Create a .env file with your MongoDB Atlas connection string:

DB_STRING=your-mongodb-connection-string
PORT=8000


Run the server:

node server.js


Open your browser at http://localhost:8000

Usage

Start typing a movie title in the search box.

Select a suggestion to view movie details.

Works best with a stable internet connection and a properly configured Atlas Search index.

Tips

Free hosting may cause cold starts—first requests after inactivity may be slow.

Make sure your MongoDB Atlas search index includes the fields you want to autocomplete.

Consider adding debouncing on the frontend to reduce excessive requests.
