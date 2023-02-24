const baseURL = "https://api.translink.ca/rttiapi/v1/stops/"
const apiKey = import.meta.env.VITE_TRANSLINK_API_KEY

async function getStop(stopNo: string) {
  const url = `https://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=Xj0MlUc8d6LLR7Vt0dYW&count=3&timeframe=60`

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