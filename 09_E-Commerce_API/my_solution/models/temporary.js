/* 
Below is code extracted from Compas. 
It's about how to extract aggregation usibg the GUI 
Read MongoDB docs for more information
*/

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { ObjectId } = require("mongodb");

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId("62bc483e0862b08bd8508a38"),
    },
  },
  {
    $group: {
      _id: "$product",
      averageRating: {
        $avg: "$rating",
      },
      numberOfReviews: {
        $sum: 1,
      },
    },
  },
];

MongoClient.connect(
  "",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("E-Commerce_API_John_Smilga").collection("reviews");
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  },
);
