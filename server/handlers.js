"use strict";
require("dotenv").config({ path: ".env"});

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = client.db("bookshelf");

// Endpoints for accessing Users Collection
const userCollection = db.collection("users");

// get an array of all users
const getUsers = async (req, res) => {
    try {
        await client.connect();
        console.log("Connected.");
        const allUsers = await userCollection.find().toArray();
        res.status(200).json({ status: 200, users: allUsers });
    } catch (err) {
        console.log(err.message);
    } finally {
        client.close();
        console.log("Disconnected.");
    }
};

// get a user with its ID
const getUser = async({ query: { userId } }, res) => {
    try {
        await client.connect();
        const singleUser = await userCollection.findOne({ _id: userId });
        res.status(200).json({ status: 200, user: singleUser });

    } catch (err) {
        console.log(err.message);
    } finally {
        client.close();
    }
};

// add a user
const addUser = async (req, res) => {
    // check if user exists in the users collection
    const { firstName, lastName, email, city, province, country, language } = req.body;

    console.log(req.body);
    if (!firstName, !lastName, !email, !city, !language) {
        return res.status(400).json({ status: 400, message: "Incomplete request" });
    }

    try {
      const newId = uuidv4();
      const exchangeId = uuidv4();
      const isbn = uuidv4(); // for now
      await client.connect();
      const existingUser = await userCollection.findOne({ email });
      console.log(existingUser);
    //   let newUser = {_id: newId, info: req.body, exchange: [ { bookId: isbn }], tags: [], homeLibrary: [], contacts: [] };
    //   const user = await userCollection.insertOne(newUser);
    //   console.log(user);
      res.status(201).json({ status: 201, data: user, message: "User created successfully." });
    } catch (err) {
      console.log(err.message);
    } finally {
      client.close();
      console.log("Disconnected");
    }
};

// modify user info
const modifyUser = async ( {query: { userId }, body }, res) => {

    console.log(body);
    try {
        await client.connect();
        console.log("Connected");
        const updateResult = await userCollection.updateOne( 
            { _id: userId }, 
            { $set: { info: body } }
        );
        console.log(updateResult);

    } catch (err) {

    } finally {
        client.close();
        console.log("Disconnected");
    }
};

// delete a user
const deleteUser = async (req, res) => {
    // const userId = req.params._id;

    try {
        await client.connect();
        console.log("connected");

    } catch (err) {
        console.log(err.message);
    } finally {
        client.close();
        console.log("disconnected");
    }
}


/* user format:
    {
        firstName: "First name",
        lastName: "Last name",
        email: "email",
        password: "password", // or Auth0
        city: "City name",
        province: "Province name",
        country: "Country name",
        language: "User language",
        exchange: [
                {bookId: "book ID"},
        ], 
        tags: [{
            tagId: tag ID,  // can create own ID 1001 1= category 2= subcategory 3&4= tag#
            tagName: "tag name"
        }, {tagID, tagName}],
        homeLibrary: [
            {bookshelfId: "bookshelf ID"},
            {wishlist: []} // to see
        ],
        contacts: [
            {contactId: "user ID"},           
        ],
    }
*/

// Endpoint for accessing bookshelves collection





// End of endpoints
module.exports = { getUsers, getUser, addUser, modifyUser, deleteUser };