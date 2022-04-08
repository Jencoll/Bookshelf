"use strict";
require("dotenv").config({ path: ".env" });

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("bookshelf");

// Endpoints for accessing userLibraries Collection
/* userLibrary format: 
    {_id: userLibrary, 
        [   
            book1: {
                _id: bookId, borrowed: "boolean", lent: "boolean", bookshelf: bookshelfId, category: "category", tags: ["tag1", "tag2"],
            }
        ] 
    }

*/

const userLibrary = db.collection("userLibraries");

// const getUserLibraries = async (req, res) => {

// }

// get a user's personal library
const getUserLibrary = async (req, res) => {

}

// const createUserLibrary = async (req, res) => {
//     // create a user personal library when he/she creates his/her account
// }


module.exports = { getUserLibrary };