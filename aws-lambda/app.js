const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*", // Allow from anywhere 
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE" // Allow only GET request 
  };

  try {
    switch (event.routeKey) {
      case "OPTIONS /videos":
        body = "";
        break;
      case "OPTIONS /videos/{id}":
        body = "";
        break;
      case "DELETE /videos/{id}":
        await dynamo
          .delete({
            TableName: "videos",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /videos":
        body = await dynamo
          .scan({ TableName: "videos" })
          .promise();
        break;
      case "POST /videos":
        const { id, title, image, url, description } = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "videos",
            Item: {
              id,
              title,
              image,
              url,
              description,
            }
          })
          .promise();
        body = `Put item ${id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
