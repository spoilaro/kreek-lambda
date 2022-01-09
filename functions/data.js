const axios = require("axios");

exports.handler = async (event, context, callback) => {
  axios
    .get(
      "https://sampo.thl.fi/pivot/prod/en/vaccreg/cov19cov/fact_cov19cov.json"
    )
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: res.data,
      });
    })
    .catch((err) => {
      callback({
        statusCode: 400,
        body: err,
      });
    });
};
