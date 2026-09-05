const express = require("express");

const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authMiddleware =
  require("../middleware/authmiddleware");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
} = require("../controller/ProfileController");


// ========================================
// CREATE UPLOAD FOLDER
// ========================================


// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(
//     uploadDirectory,
//     {
//       recursive: true,
//     }
//   );
// }


// ========================================
// MULTER STORAGE
// ========================================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        uploadDirectory
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {

      const extension =
        path.extname(
          file.originalname
        );

      const filename =
        `${req.userId}-${Date.now()}${extension}`;

      cb(
        null,
        filename
      );
    },
  });


// ========================================
// FILE FILTER
// ========================================

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      ),
      false
    );
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});


// ========================================
// PROFILE ROUTES
// ========================================

router.get(
  "/me",
  authMiddleware,
  getProfile
);


router.put(
  "/update",
  authMiddleware,
  updateProfile
);


router.post(
  "/upload-dp",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);


router.delete(
  "/delete-dp",
  authMiddleware,
  deleteProfileImage
);


module.exports = router;