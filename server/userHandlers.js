"use strict";
require("dotenv").config({ path: ".env" });

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { default: axios } = require("axios");
const { MONGO_URI, key } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("bookshelf");

// Endpoints for accessing Users Collection
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
        userLibrary: [
            {_id: bookId, borrowed: "boolean", lent: "boolean", bookshelf: "bookshelfId", category: "category", tags: ["tag1", "tag2"]},
        ],
        bookshelves: [{_id: "bookshelfId", name: "bookshelf name"}],
        wishlist: [{_id: bookId}],
        contacts: [
            {contactId: "user ID"},           
        ],
    }
*/
const userCollection = db.collection("users");

// get an array of all users
const getUsers = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected.");
    const allUsers = await userCollection.find().toArray();
    let length = allUsers.length; // to specify the number of users in the response
    res.status(200).json({ status: 200, "number of users": length, users: allUsers });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
    console.log("Disconnected.");
  }
};

// get a user with its ID
const getUser = async ({ query: { userId } }, res) => {
  try {
    await client.connect();
    const singleUser = await userCollection.findOne({ _id: userId });
    if (!singleUser) {
      res.status(404).json({ status: 404, message: "User not found." });
    } else {
      res.status(200).json({ status: 200, user: singleUser });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

// add a user
const addUser = async (req, res) => {
  const { firstName, lastName, email, city, province, country, language } =
    req.body;

  if ((!firstName, !lastName, !email, !city, !language)) {
    return res.status(400).json({ status: 400, message: "Incomplete request" });
  }

  try {
    const newId = uuidv4();
    await client.connect();
    const existingUser = await userCollection.findOne({ "info.email": email });
    if (!existingUser) {
      let newUser = {
        _id: newId,
        info: req.body,
        // exchange: [{ bookId: _id }],
        userLibrary: [],
        bookshelves: [],
        wishlist: [],
        contacts: [],
      };
      const user = await userCollection.insertOne(newUser);
      res
        .status(201)
        .json({
          status: 201,
          data: user,
          message: "User created successfully.",
        });
    } else {
      res
        .status(200)
        .json({
          status: 200,
          data: existingUser,
          message: "User already exists.",
        });
    }
  } catch (err) {
    console.log("Cannot add user: ", err.message);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

// modify user info
const modifyUser = async (req, res) => {
  const userId = req.params._id;
  const { info: {firstName, lastName, email, city, province, country, language}, tags, bookshelves, wishlist, contacts  } =
    req.body;

  try {
    await client.connect();
    console.log("Connected");
    const existingUser = await userCollection.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found." });
    } else {
      const newValues = {
        $set: {
          _id: userId,
          "info.firstName": firstName,
          "info.lastName": lastName,
          "info.email": email,
          "info.city": city,
          "info.province": province,
          "info.country": country,
          "info.language": language,
          tags,
          bookshelves,
          wishlist,
          contacts
        },
      };

      const query = { _id: userId };
      await userCollection.updateOne(query, newValues);
      res.status(200).json({ status: 200, message: "User info updated." });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const userId = req.params._id;
  try {
    await client.connect();
    console.log("connected");
    const existingUser = await userCollection.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found." });
    } else {
      await userCollection.deleteOne({ _id: userId });
      res.status(200).json({ status: 200, message: "User account deleted." });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

// add a book in the user's library
const addBookToUserLibrary = async (req, res) => {
  const userId = req.params._id;
 
  try {
    await client.connect();

    // find user with ID

    // add a book to user library
    // userLibrary: [
    //         {_id: bookId, borrowed: "boolean", lent: "boolean", bookshelf: "bookshelfId", category: "category", tags: ["tag1", "tag2"]},
    //     ],

  } catch (err) {

  } finally {

  }
};

// const addUserBookshelf = async (req, res) => {
//   const userId = req.params._id;

//   // find user with ID

//   // create a bookshelf and add it to the list
// };

// End of endpoints
module.exports = {
  getUsers,
  getUser,
  addUser,
  modifyUser,
  deleteUser,
  addBookToUserLibrary,
  // addUserBookshelf,
};
