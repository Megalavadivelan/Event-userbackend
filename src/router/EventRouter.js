const express = require("express");

const router = express.Router();

const {
  getAllEvents,
  getEventById
} = require("../controller/EventController.js");


// GET ALL EVENTS
router.get("/", getAllEvents);


// GET SINGLE EVENT
router.get("/:id", getEventById);


module.exports = router;