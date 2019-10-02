const { responseHandler } = require("./ResponseHandler.js");

const connectionTester = require("connection-tester");
const util = require("util");

exports.lambdaHandler = async event => {
  try {
    return await util
      .promisify(connectionTester.test)(
        process.env.API_HOST,
        process.env.API_PORT,
        8000
      )
      .then(result => {
        if (result.success)
          return responseHandler(true, "Hello World. The connection was successful.", 200);
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
