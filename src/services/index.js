const getRegions = async () => {
  try {
    const res = await fetch('server/regions.json');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCities = async () => {
  try {
    const res = await fetch('server/cities.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const API = {
  getRegions,
  getCities,
};

export default API;