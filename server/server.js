"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const PORT = 8000;

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

// Endpoints

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))