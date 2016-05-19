var express = require('express');
var router = express.Router();
var processorDal = require('../model/processor_dal');

router.get('/all', function(req, res) {
    processorDal.GetAll(function (err, result) {
            if (err) {
                res.send("Error" + err.message);
            }
            else {
                res.render('displayAllProcessors.ejs', {rs: result});
            }
        }
    );
});
router.get('/', function (req, res) {
    console.log(req.query.model_name);
    if(req.query.model_name == null){
        res.redirect('/movie/all')
    }
    else{
        processorDal.GetByModel(req.query.model_name, function (err, result) {
                if (err) throw err;
                res.render('displayAllProcessors.ejs', {rs: result, model_name: req.query.model_name});
            }
        );
    }

});
module.exports = router;