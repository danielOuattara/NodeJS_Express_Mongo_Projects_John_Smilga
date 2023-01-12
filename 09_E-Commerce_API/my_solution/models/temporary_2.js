import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId("63bf1a41ff9cf504e7b660e6"),
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

const client = await MongoClient.connect(
  "mongodb+srv://ricatti-ricci:**MongoDB77!**@cluster-testing-ricatti.xryll.mongodb.net/Academind_Node_Express_Udemy_MongoDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
);
const coll = client.db("John_Smilga_E-Commerce_API").collection("reviews");
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
