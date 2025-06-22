const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyCKkTPkLB4Ys3D4uqm9quzhPnf9yeYHAEU";
export const fetchFromAPI = async (endpoint) => {
  try {
    const url = endpoint.includes("?")
      ? `${BASE_URL}/${endpoint}&key=${API_KEY}`
      : `${BASE_URL}/${endpoint}?key=${API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`RESPONSE ERROR:${res.status}-${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("FETCHING ERROR", err);
    return null;
  }
};
