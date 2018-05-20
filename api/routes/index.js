const express = require('express');
const router = express.Router();
const ITEM = require('../models/itemModel');

/*
Method: GET
Define: GET ALL ITEMS
Desc: Add New Item to the Shop List
 */
router.get('/all', function (req, res, next) {
    ITEM.find({}, (err, items) => {
        if (err) throw err;
        res.send({
            code: "200",
            items
        })
    })
});

/*
Method: POST
Define: POST NEW ITEM
Desc: Add New Item to the Shop List
*/
router.post('/', (req, res, next) => {
    let data = req.body;
    let content = data.content;
    let status = data.status;

    let item = new ITEM({
        content: content,
        status: status
    });

    if (data) {
        item.save((err, data) => {
            if (err) {
                res.send({
                    "code": "E11000",
                    "err": "Duplicate content!"
                })
            }
            res.send(data);
            next();
        })
    }
});

/*
Method: DELETE
Define: DELETE SELECTED ITEM
Desc: Delete selected item from database
*/
router.delete('/', (req, res, next) => {
    ITEM.remove({
        _id: req.body.content_id
    }, (err, msg) => {
        if (err) res.send(err);
        res.json({
            "message": "Successfully deleted!"
        })
    })
});

/*
Method: UPDATE
Define: UPDATE SELECTED ITEM
Desc: Update selected item from database
*/
router.put('/', (req, res, next) => {
    // TODO: there is a bug. if you change the item name with the existed one, it'll throw an err!
    ITEM.findById({
        _id: req.body.content_id
    }, (err, item) => {
        if (err) res.json({err});

        item.content = req.body.content;
        item.status = req.body.status;

        item.save((err) => {
            if (err) res.json(err);

            res.json({"message": "item updated!"})
        })
    })
});


module.exports = router;
