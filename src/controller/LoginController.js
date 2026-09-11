
const {
  loginUserdata,
  getUsersData,getIndividualUserData,
} = require("../service/LoginServices");

// =====================================================
// POST LOGIN
// =====================================================

const loginuser = async (req, res) => {
  try {
    const result = await loginUserdata(req.body);

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

// =====================================================
// GET ALL USERS
// =====================================================

const getUsers = async (req, res) => {
  try {
    const result = await getUsersData();

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

const getIndividualUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getIndividualUserData(id);

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

module.exports = {
  loginuser,
  getUsers,
  getIndividualUser,
};

