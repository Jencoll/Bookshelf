"use strict";
require("dotenv").config({ path: ".env" });

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { default: axios } = require("axios");
const { MONGO_URI, key } = process.env;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Endpoints for accessing Users Collection

/* user format:
    {
      _id: username,
      password, 
      info: {
        avatarUrl: "img",
        firstName: "First name",
        lastName: "Last name",
        email: "email",
        city: "City name",
        province: "Province name",
        country: "Country name",
        language: "User language",
      }
        userLibrary: [
          {_id: bookId, borrowed: "boolean", lent: "boolean", bookshelf: "bookshelfId", category: "category", tags: ["tag1", "tag2"]},
        ],
        bookshelves: [{_id: "bookshelfId", name: "bookshelf name"}],
        tags: [{
            tagId: tag ID,  // can create own ID 1001 1= category 2= subcategory 3&4= tag#
            tagName: "tag name"
        }, {tagID, tagName}],
        categories: [],
        wishlist: [{_id: bookId}],
        contacts: [
            {contactId: "user ID"},           
        ],
    }
*/

// get an array of all users
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
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

// get the current user profile
const getCurrentUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
  try {
    await client.connect();
    console.log("connected");
    const foundCurrentUser = await userCollection.findOne({ _id: req.params._id });
    if (!foundCurrentUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    res.status(200).json({ status: 200, currentUser: foundCurrentUser });
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

// create a user
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
   const {
     _id,
     password,
     info: {
       avatarUrl,
       firstName,
       lastName,
       email,
       city,
       province,
       country,
       language,
     },
     isOnline,
     userLibrary,
     bookshelves,
     tags,
     categories,
     wishlist,
     contacts,
   } = req.body;

  if (!_id || !password || !firstName || !lastName || !email) {
    return res.status(400).json({ status: 400, message: "Incomplete request" });
  };

  try {
    await client.connect();
    const existingUser = await userCollection.findOne({ "info.email": email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword)
      let newUser = {
        _id,
        password: hashedPassword,
        info: {
          avatarUrl,
          firstName,
          lastName,
          email,
          city,
          province,
          country,
          language,
        },
        isOnline,
        userLibrary: [],
        bookshelves: [],
        tags: [],
        categories: [],
        wishlist: [],
        contacts: [],
      };
      const user = await userCollection.insertOne(newUser);
      res
        .status(201)
        .json({
          status: 201,
          data: newUser,
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
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
  const {
    info: {
      avatarUrl,
      firstName,
      lastName,
      email,
      city,
      province,
      country,
      language,
    },
    isOnline, 
    userLibrary,
    bookshelves,
    tags,
    categories,
    wishlist,
    contacts,
  } = req.body;

  try {
    await client.connect();
    console.log("Connected");
    const existingUser = await userCollection.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found." });
    } else {
      let newValues = {
        $set: {
          _id: userId,
          "info.avatarUrl": avatarUrl,
          "info.firstName": firstName,
          "info.lastName": lastName,
          "info.email": email,
          "info.city": city,
          "info.province": province,
          "info.country": country,
          "info.language": language,
          isOnline,
          userLibrary: [],
          bookshelves: [],
          tags: [],
          categories: [],
          wishlist: [],
          contacts: [],
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
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
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

// add or modify a book in the user's library
const addOrModifyUserBook = async (req, res) => {
  const userId = req.params._id;
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");

  try {
    await client.connect();
    console.log("connected");
    
    // find user with ID
    const existingUser = await userCollection.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found." });
    }
    let userLibrary = existingUser.userLibrary;
    // add a book to user library
    let userBookIndex = userLibrary.findIndex(book => book.isbn === req.body.isbn);
    if (userBookIndex === -1) {
      existingUser.userLibrary.push(req.body);
    } else {
      existingUser.userLibrary[userBookIndex] = req.body;
    };
    await userCollection.updateOne({_id: userId}, {$set: existingUser});
    res.status(200).json({ status: 200, message: "user library added", user: existingUser });
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

// remove book reference from user library (will no longer display the book in the user's library, but the book is still in the books database (for other users))
const removeBookFromUserLibrary = async (req, res) => {
  const userId = req.params._id;
  const { isbn } = req.body;
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
  try {
    await client.connect();
    console.log("connected");
    // find user with ID
    const existingUser = await userCollection.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found." });
    }
    let userLibrary = existingUser.userLibrary;
    let bookFound = userLibrary.find(book => book.isbn === isbn);
    if (!bookFound) {
      return res.status(404).json({ status: 404, message: "Book not found" });
    }
    let bookFoundIndex = userLibrary.indexOf(bookFound);
    // remove book from user library
    userLibrary.splice(bookFoundIndex, 1);
    // udpate user info
    await userCollection.updateOne({ _id: userId }, { $set: existingUser });
    res.status(200).json({ status: 200, message: "Book removed from library", user: existingUser });
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  } finally {
    client.close("disconnected");
  };
};

const loginUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bookshelf");
  const userCollection = db.collection("users");
  try {
    await client.connect();
    console.log("connected");
    const existingUser = await userCollection.findOne({ _id: req.body._id });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "Invalid username." });
    };
    if ((!await bcrypt.compare(req.body.password, existingUser.password)) 
    && existingUser.password !== req.body.password) {
      return res.status(404).json({ status: 404, message: "Invalid password." });
    } else {
      existingUser.password = "";
      res.status(200).json({ status: 200, user: existingUser });
    }
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

// End of endpoints
module.exports = {
  getUsers,
  addUser,
  modifyUser,
  deleteUser,
  addOrModifyUserBook,
  removeBookFromUserLibrary,
  loginUser,
  getCurrentUser,
};
