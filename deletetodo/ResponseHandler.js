const headers = {
  "X-Requested-With": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE"
};
const responseHandler = (success, data, code) => {
  let body;
  if (success) body = { success: success, data: data };
  else {
    // make sure error object has a message field
    if (data && data.message) body = { success: success, error: data };
    else body = { success: success, error: { message: data } };
  }
  return {
    statusCode: code || (success ? 200 : 401),
    headers,
    body: JSON.stringify(body)
  };
};
module.exports = {
  responseHandler
};
