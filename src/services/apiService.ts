const baseURL = "https://api.translink.ca/rttiapi/v1/stops/"
const apiKey = import.meta.env.VITE_TRANSLINK_API_KEY

async function getStop(stopNo: string) {
  const url = `${baseURL}${stopNo}/estimates?apikey=${apiKey}&count=1&timeframe=60`

  const res = await fetch(url, {
    headers: {
      "accept": "application/JSON"
    }
  })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}


export {getStop}