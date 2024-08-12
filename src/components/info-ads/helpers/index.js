export function getRegionById(regions, regionId) {
    const findElement = regions.find(({ id }) => +id === +regionId);

    if (findElement) {
      return findElement.value;
    }
}

export function getCityById(cities, regionId) {
    const findElement = cities.find(({ id }) => +id === +regionId);

    if (findElement) {
      return findElement.value;
    }
}