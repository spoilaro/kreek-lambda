const axios = require("axios");
const fs = require("fs");

exports.handler = async (event, context, callback) => {
  let place = event.queryStringParameters.place;
  let place_data = require("../fact_cov19cov.dimensions.json");
  place_data = place_data[0].children[0].children;

  let place_sid = "";
  let area_id = "";

  place_data.forEach((elem) => {
    console.log(elem.label);
    if (elem.label == place) {
      place_sid = elem.sid;
      area_id = elem.id;
    }
  });

  console.log(place_sid);

  let res = await axios.get(
    `https://sampo.thl.fi/pivot/prod/fi/vaccreg/cov19cov/fact_cov19cov.json?row=cov_vac_dose-533170.&column=dateweek20201226-525425&filter=${area_id}-${place_sid}#`
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
    //body: JSON.stringify(area_id),
  };

  return response;
};
