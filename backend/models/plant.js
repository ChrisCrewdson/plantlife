const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let plantSchema = new Schema(
  {
    name: {
      type: String
    },
    species: {
      type: String
    }
  },
  {
    collection: "plants"
  }
);

module.exports = mongoose.model("plant", plantSchema);
