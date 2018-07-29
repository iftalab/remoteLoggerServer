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

//get one
router.get('/:logId', function (req, res, next) {
    const id = req.params.logId;
    Log.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ 'result': 'No valid object found for given ID' });
            }

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
//delete
router.delete('/:logId', function (req, res, next) {
    const id = req.params.logId;
    Log.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Object seems already deleted" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


module.exports = router;
