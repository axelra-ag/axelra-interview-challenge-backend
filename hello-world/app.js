const { responseHandler } = require("./ResponseHandler.js");
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

    return await db
      .collection("exampletable")
      .find({})
      .toArray()
      .then(result => {
        return responseHandler(
          true,
          {
            message: "Hello World!",
            queryResult: result
          },
          200
        );
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
