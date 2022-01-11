const axios = require("axios");
const fs = require("fs");

exports.handler = async (event, context, callback) => {
  let place = event.queryStringParameters.place;
  let place_data = require("../fact_cov19cov.dimensions.json");
  place_data = place_data[0].children[0].children;

  let place_sid = "";
  let area_id = "";
  //let place_sid = "518362";
  //let area_id = "area1";

  place_data.forEach((elem) => {
    console.log(elem.label);
    if (elem.label == place) {
      place_sid = elem.sid;
      area_id = elem.id;
    }
  });

  let res = await axios.get(
    `https://sampo.thl.fi/pivot/prod/fi/vaccreg/cov19cov/fact_cov19cov.json?row=cov_vac_dose-533170.&column=dateweek20201226-525425&filter=${area_id}-${place_sid}#`
    //`https://sampo.thl.fi/pivot/prod/fi/vaccreg/cov19cov/fact_cov19cov.json?row=cov_vac_dose-533170.&column=dateweek20201226-525425&filter=area1-518362#`
  );

  let pop_res = await axios.get(
    //`https://sampo.thl.fi/pivot/prod/en/vaccreg/cov19cov/fact_cov19cov;jsessionid=323860F3FC251F01590A16D47F235A97.apps5?row=cov_vac_dose-533170.&column=cov_vac_age-518413&filter=measure-433796&filter=${area_id}-${place_sid}`
    //`https://sampo.thl.fi/pivot/prod/en/vaccreg/cov19cov/fact_cov19cov;jsessionid=323860F3FC251F01590A16D47F235A97.apps5?row=cov_vac_dose-533170.&column=cov_vac_age-518413&filter=measure-433796&filter=area1-518362`
    "https://sampo.thl.fi/pivot/prod/fi/vaccreg/cov19cov/fact_cov19cov.json;jsessionid=323860F3FC251F01590A16D47F235A97.apps5?row=area-518362&column=cov_vac_age-518413.&filter=measure-433796&filter=area-518362"
  );

  //let pop_data = await pop_res.data;
  let pop_data = require("../pop_data.json");

  console.log(pop_data);

  let data = await res.data.dataset;

  const final_result = {
    vaccine_data: data,
    pop_data: pop_data,
  };

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  let response = {
    statusCode: 200,
    headers,
    //body: JSON.stringify(data),
    body: JSON.stringify(final_result),
  };

  return response;
};
