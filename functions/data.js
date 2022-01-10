const axios = require("axios");

exports.handler = async (event, context, callback) => {
  let res = await axios.get(
    "https://sampo.thl.fi/pivot/prod/fi/vaccreg/cov19cov/fact_cov19cov.json?row=cov_vac_dose-533170.&column=dateweek20201226-525425#"
  );

  let data = await res.data.dataset;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  let response = {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };

  return response;
};
