const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/').get((req, res, next) => {
  res.sendFile(path.join(__dirname, '../../song-q/public/index.html'));
});

module.exports = router;
