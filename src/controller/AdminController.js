const AdminService = require("../service/AdminServices");


// =========================
// ADMIN LOGIN CONTROLLER
// =========================

const adminLogin = async (req, res) => {

  try {

    const result =
      await AdminService.adminLogin(req.body);


    // Login successful
    if (result.success) {

      return res.status(200).json(result);

    }


    // Login failed
    return res.status(401).json(result);


  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


module.exports = {
  adminLogin,
};