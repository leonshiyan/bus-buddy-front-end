const baseURL = "https://api.translink.ca/rttiapi/v1/stops/"
const apiKey = import.meta.env.VITE_TRANSLINK_API_KEY

async function getStop(stopNo: string) {
  const url = `${baseURL}${stopNo}/estimates?apikey=${apiKey}`
  try {
    const res = await fetch(url, {
      headers: {
        "accept": "application/JSON"
      }
    })
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

export {getStop}