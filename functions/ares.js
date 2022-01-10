exports.handler = async (event, context, callback) => {
  let place_data = require("../fact_cov19cov.dimensions.json");
  place_data = place_data[0].children[0].children;

  place_data.map((elem) => {
    elem = elem.label;
  });

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  let response = {
    statusCode: 200,
    headers,
    body: place_data,
  };

  return response;
};
