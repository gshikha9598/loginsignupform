const mongoose = require("mongoose");
const validator = require("validator");

//create users schema

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("not valid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "In-Active"],
    default: "Active",
  },
  datecreated: Date,
  dateUpdated: Date,
});

//model define
const userdb = new mongoose.model("userdb", usersSchema);
module.exports = userdb;