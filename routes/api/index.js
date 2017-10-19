const express = require("express");
const router = express.Router();

router.route("/")
  .get((req, res, next) {
    res.send({'api': 'response'});
  });

module.exports = router;
