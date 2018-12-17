const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DogSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  primarycolor: {
    type: String,
    required: true
  },
  secondarycolor: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  vaccination: [
    {
      name: {
        type: String
      },
      age: {
        type: String
      },
      date: {
        type: Date
      },
      next: {
        type: Date
      }
    }
  ]
});

module.exports = Dog = mongoose.model("dogs", DogSchema);
