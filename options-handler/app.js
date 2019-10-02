exports.lambdaHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      "X-Requested-With": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE"
    },
    body: JSON.stringify({
      success: true
    })
  };
};
