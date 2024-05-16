const multer = require("multer");
const path = require("path");

// create storage and make folder to upload image there
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images/products"),

  filename: (req, file, cb) => {
    console.log(file);
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

let upload = multer({ storage: storage }).single("image");

module.exports = upload;
