var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {

    res.format({
      html: () => {
        res.render('welcome.ejs');
      },
    
    });
  });

  module.exports = router;