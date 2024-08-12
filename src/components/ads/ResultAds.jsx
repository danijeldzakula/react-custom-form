import { useCallback } from "react"
import { Button, Card } from "reactstrap";

// eslint-disable-next-line react/prop-types
export default function ResultAds({ regions, cities, results, handleDelete }) {
  const getRegionById = useCallback((id) => {
    // eslint-disable-next-line react/prop-types
    const findRegion = regions.find(({ region }) => region.toString() === id.toString());

    if (findRegion) {
      return findRegion.value;
    }
  }, [regions]);

  const getCityById = useCallback((region) => {
    // eslint-disable-next-line react/prop-types
    const findCity = cities.find(({ id }) => id.toString() === region.toString());

    if (findCity) {
      return findCity.value;
    }
  }, [cities]);

  const renderResults = useCallback(() => {
    // eslint-disable-next-line react/prop-types
    if (!results && results.length < 1) {
      return <div>No Data</div>
    }

    // eslint-disable-next-line react/prop-types
    return results.map((result, idx) => {
      return (
        <Card key={idx} className="mt-4 p-4">
          <p>{result.title}</p>
          <p>{result.description}</p>
          <p>{getRegionById(result.region)}</p>
          <p>{getCityById(result.city)}</p>
          {result.from && <p>{result.from}</p>}
          {result.to && <p>{result.to}</p>}
          <hr />
          <Button color='danger' onClick={() => handleDelete(result.id)}>Remove</Button>
        </Card>
      )
    })
  }, [getCityById, getRegionById, handleDelete, results]);

  return renderResults();
}
