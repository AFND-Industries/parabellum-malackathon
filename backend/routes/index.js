var express = require('express');
var router = express.Router();

const embsalseController = require('../controllers/embalseController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/embalse', embsalseController.getByCoords);

module.exports = router;
