let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Plant Model
const plantSchema = require("../models/plant");

// CREATE Plant
router.route("/create-plant").post((req, res, next) => {
  plantSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("Plant created successfully!");
      res.json(data);
    }
  });
});

// READ Plants
router.route("/").get((req, res, next) => {
  plantSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(`${data.length} plants read successfully!`);
      res.json(data);
    }
  });
});

// Get Single Plant
router.route("/view-plant/:id").get((req, res, next) => {
  plantSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("Plant read successfully!");
      res.json(data);
    }
  });
});

// Update Plant
router.route("/update-plant/:id").put((req, res, next) => {
  plantSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log("Plant updated successfully!");
        res.json(data);
      }
    }
  );
});

// Delete Plant
router.route("/delete-plant/:id").delete((req, res, next) => {
  plantSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("Plant deleted successfully!");
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = router;
