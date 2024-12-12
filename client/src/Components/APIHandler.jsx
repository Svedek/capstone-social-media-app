
export const do_api_request = async (api_path, body_args, method) => {
  // console.log("API In:", api_path, body_args, method);
  const fet = await fetch(api_path, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body_args)
  });

  const resp = await fet.json();
  // console.log("API Response:", resp);
  return resp;
}

// Used to convert Date objects to SQL Datetime format
export const dateToDatetime = (date)  => {
  let ret = new Date(date);
  ret.setMinutes(ret.getMinutes() - ret.getTimezoneOffset());
  return ret.toISOString().slice(0, 19).replace('T', ' ');
}
