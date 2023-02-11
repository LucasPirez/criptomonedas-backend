const Alert = require("../models/alertsModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userExtractor = require("../middleware/userExtractor");
router.get("/alerts");

router.get("/", (req, res) => {
  Alert.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/create", userExtractor, (req, res) => {
  const { crypto, min, max, time } = req.body;

  const { userId } = req;
  console.log(userId);
});

module.exports = router;
