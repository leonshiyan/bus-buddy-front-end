const baseURL = "https://api.translink.ca/rttiapi/v1/stops/"
const apiKey = import.meta.env.VITE_TRANSLINK_API_KEY

async function getStop(stopNo: string): Promise<JSON> {
  const url = `${baseURL}${stopNo}/estimates?apikey=${apiKey}`;
  const response = await fetch(url, {
    headers: {
      "accept": "application/JSON"
    }
  });
  const data = await response.json();
  return data;
}


export {getStop}