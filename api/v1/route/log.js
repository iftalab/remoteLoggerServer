const express = require('express');
const router = express.Router();
const Log = require('../model/log');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//get all
router.get('/', function (req, res, next) {
    Log.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//save
router.post('/', function (req, res, next) {
    const log = new Log({
        _id: mongoose.Types.ObjectId(),
		appId : req.body.appId,
		userId : req.body.userId,
		tag : req.body.tag,
		data : req.body.data,
    });
    log.save()
        .then(result => {
            res.status(201).json({message:"Log created"})
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});


module.exports = router;
