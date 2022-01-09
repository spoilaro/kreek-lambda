const axios = require("axios");

exports.handler = async (event, context, callback) => {
  let res = await axios.get(
    "https://sampo.thl.fi/pivot/prod/en/vaccreg/cov19cov/fact_cov19cov.json"
  );

  let data = await res.data.dataset;

  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  return response;
};
