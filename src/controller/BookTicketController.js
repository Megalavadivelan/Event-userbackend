const {
  createBookingData,
  getBookingsData,
  getIndividualBookingData,
  getUserBookingsData,
} = require("../service/BookTicketService");


// CREATE BOOKING

const createBooking = async (req, res) => {
  try {
    const result =
      await createBookingData(req.body);

    if (result.success) {
      return res.status(201).json(result);
    }

    return res.status(400).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL BOOKINGS

const getBookings = async (req, res) => {
  try {
    const result =
      await getBookingsData();

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET INDIVIDUAL BOOKING

const getIndividualBooking = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result =
      await getIndividualBookingData(id);

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(404).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET USER BOOKINGS

const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const result =
      await getUserBookingsData(userId);

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getBookings,
  getIndividualBooking,
  getUserBookings,
};