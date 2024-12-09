
export const do_api_request = async (api_path, body_args, method) => {
  const fet = await fetch(api_path, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body_args)
  });

  const resp = await fet.json();
  console.log("API Response:", resp);
  return resp;
}
