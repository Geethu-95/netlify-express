const express = require('express')
const { getItemById, insertItem, getItemByIdAdmin } = require('./db')
const { ObjectId } = require('mongodb')

const router = express.Router()
// const app = express()
const cors = require('cors')

const app = express()
app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

router.get('/login/:admin', cors(corsOptions), (req, res) => {
    const id = req.params.admin;
    getItemById(id)
        .then((items) => {
            res.json(items)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})

router.post('/storeData', cors(corsOptions), (req, res) => {
    const item = req.body
    // console.log("Hello")
    // console.log(req.body)
    if (item.error) {
        console.log(item.error)
        res.status(400).end()
        return
    }
    insertItem(item)
        .then(() => {
            res.send(item._id)
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})
var quantity1 = 0;
var weight1 = 0;
var boxC1 = 0;

var quantity2 = 0;
var weight2 = 0;
var boxC2 = 0;

router.get('/admin', cors(corsOptions), (req, res) => {
    const id = req.params.admin;
    getItemByIdAdmin(id)
        .then((items) => {

            items.map((item) =>
                item.owner === "customer1" ? (quantity1 += parseInt(item.quantity),
                    weight1 += parseInt(item.weight1),
                    boxC1 += parseInt(item.boxCount)) : 0

            )

            items.map((item) =>
                item.owner === "customer2" ? (quantity2 += parseInt(item.quantity),
                    weight2 += parseInt(item.weight1),
                    boxC2 += parseInt(item.boxCount)) : 0

            )
            // console.log({quantity1,weight1,boxC1,quantity2,weight2,boxC2})
            res.json({ quantity1, weight1, boxC1, quantity2, weight2, boxC2 })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})
module.exports = router