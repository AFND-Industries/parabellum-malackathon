var express = require('express');
var router = express.Router();

const embsalseController = require('../controllers/embalseController');
const captchaController = require("../controllers/captchaController");
const rateLimiter = require("../utils/rateLimiter")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/embalses', embsalseController.getByCoords);
router.post('/submit', rateLimiter, captchaController.submitForm);

module.exports = router;
