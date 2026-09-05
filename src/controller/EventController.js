const Event = require("../model/EventModel");

// GET ALL EVENTS
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events: events
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message
    });
  }
};


// GET SINGLE EVENT
const getEventById = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        success: false,
        message: "Event not found"
      });

    }

    res.status(200).json({
      success: true,
      event: event
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message
    });

  }
};


module.exports = {
  getAllEvents,
  getEventById
};