const { responseHandler } = require("./ResponseHandler.js");

const connectionTester = require("connection-tester");
const util = require("util");
const mongodb = require("mongodb");

let db;

const getDB = async () => {
  if (!db) {
    console.log("initializing db");

    db = await mongodb.MongoClient.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(client => {
        return client.db("axelra");
      })
      .catch(error => {
        console.error("Could not connect to db:", error);
        return null;
      });
  }
  return db;
};

exports.lambdaHandler = async event => {
  try {
    db = await getDB();
    if (!db) return responseHandler(false, "Could not connect to db.", 500);

    let dbQueryResult = await db
      .collection("exampletable")
      .find({})
      .toArray();

    return await util
      .promisify(connectionTester.test)(
        process.env.API_HOST,
        process.env.API_PORT,
        8000
      )
      .then(result => {
        if (result.success)
          return responseHandler(
            true,
            {
              message: "Hello World. The connection was successful.",
              dbQueryResult
            },
            200
          );
        else {
          console.log("Response:", result);
          return responseHandler(false, result.error, 400);
        }
      })
      .catch(error => {
        console.log("Error:", error);
        return responseHandler(false, error, error.statusCode);
      });
  } catch (err) {
    console.log("Error:", err);

    return responseHandler(false, err, err.statusCode);
  }
};
