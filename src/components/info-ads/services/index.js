export default class API {
    static async getAllRegions() {
        try {
            const response = await fetch('server/regions.json');
            const data = await response.json();
            return data;
        } catch(err) {
            console.error(err);
        }
    }

    static async getAllCities() {
        try {
            const response = await fetch('server/cities.json');
            const data = await response.json();
            return data;
        } catch(err) {
            console.error(err);
        }
    }
}