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
        books: [   
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
    userId = req.params._id;

    try {
        await client.connect();
        console.log("connected");
        const userLibrary = await userLibrary.findOne({ _id: userId });
        if (!userLibrary) {
          res.status(404).json({ status: 404, message: "Library not found." });
        } else {
          console.log(userLibrary);
          res.status(200).json({ status: 200, library: userLibrary });
        };
    } catch (err) {
        console.log("Something went wrong: ", err.message);
    } finally {
        client.close();
        console.log("disconnected");
    }
};

const createUserLibrary = async (req, res) => {
    const libraryId = uuidv4();
    // the req.body is a book entry (or many book entries)

    // if user doesn't have an account, he/she cannot create library
    try {
        await client.connect();
        console.log("connected");
        const existingLibrary = await userLibrary.findOne({ _id: libraryId });
        if(existingLibrary) {
            res.status(200).json({ status: 200, message: "This library already exists.", data: existingLibrary });
        } else {
            let newLibrary = {
                _id: libraryId,
                books: [],
            };
            const library = await userLibrary.insertOne(newLibrary);
            res.status(201).json({ status: 201, data: library, message: "Library created successfully." });
            // find the user
            // const existingUser = await db.collection("users").findOne({ _id: userId });
            // update the userLibrary with the newly created library
        };
    } catch (err) {
        console.log("Something went wrong: ", err.message);
    } finally {
        client.close();
        console.log("disconnected");
    }
}


module.exports = { getUserLibrary, createUserLibrary };