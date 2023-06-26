const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config();

const connectionUrl = `mongodb+srv://geethu:xeaco22lyHTgVaDy@cluster0.hnge6et.mongodb.net/?retryWrites=true&w=majority`
const dbName = 'juhosi-db'

let db

const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
        db = client.db(dbName)
    })


const getItemById = (id) => {
    const collection = db.collection('customers')
    return collection.find({ customerId: id }).toArray()
}

const insertItem = (item) => {
    // console.log("item ",item)
    const collection = db.collection('orders')
    return collection.insertOne(item)
}

const getItemByIdAdmin = (id) => {
    const collection = db.collection('orders')
    return collection.find().toArray()
}

module.exports = { init, getItemById, insertItem, getItemByIdAdmin }
