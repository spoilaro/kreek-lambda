const axios = require("axios");

exports.handler = async (event) => {
  //const res = await axios.get(
  //"https://sampo.thl.fi/pivot/prod/en/vaccreg/cov19cov/fact_cov19cov.json"
  //);

  //const data = res.data;

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello World"),
  };

  return response;
};
