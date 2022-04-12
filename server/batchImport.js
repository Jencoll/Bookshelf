const { users } = require("./data");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  UseUnifiedTopology: true,
};

let usersData = [];
users.forEach(user => {
    user = {
        _id: user._id,
        info: {
            avatarUrl: user.info.avatarUrl,
            firstName: user.info.firstName,
            lastName: user.info.lastName,
            email: user.info.email,
            city: user.info.city,
            province: user.info.province,
            country: user.info.country,
        },
        exchange: [],
        tags: [],
        homeLibrary: [],
        contacts: [],
    };
    usersData.push(user);
})

const usersImport = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        console.log("connected");
        const db = client.db("bookshelf");
        const usersBatch = await db.collection("users").insertMany(usersData);
        console.log("users added");
        console.log(usersBatch);
    } catch (err) {
        console.log("batch not added " + err);
    } finally {
        client.close();
        console.log("Disconnected!");
    };
};

usersImport();