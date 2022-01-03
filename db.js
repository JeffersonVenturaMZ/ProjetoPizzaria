const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost")
            .then(conn => global.conn = conn.db("pizzaria"))
            .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("pedidos").find().toArray();
} 
function insert(customer) {
    return global.conn.collection("pedidos").insertOne(customer);
}

const ObjectId = require("mongodb").ObjectId;
function findOne(id) {
    return global.conn.collection("pedidos").findOne(new ObjectId(id));
}

function update(id, customer) {
    return global.conn.collection("pedidos").updateOne({ _id: new ObjectId(id) }, { $set: customer });
}

function deleteOne(id) {
    return global.conn.collection("pedidos").deleteOne({ _id: new ObjectId(id) });
}

module.exports = { findAll, insert, findOne, update, deleteOne }
