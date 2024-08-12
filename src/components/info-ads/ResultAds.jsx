import { useCallback } from "react"
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from "reactstrap";
import { getCityById, getRegionById } from "./helpers";

export default function ResultAds({ results, regions, cities }) {
  const format = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('sr-RS', options).format(new Date(date));
  }

  const renderResults = useCallback(() => {
    if (results && results.length < 1) {
      return (
        <Card className="mt-4 p-4">
          <CardText>No Data</CardText>
        </Card>
      )
    }

    return results.map((result, idx) => {
      const { title, description, region, city, from, to } = result;

      return (
        <Card className="mt-4 p-4" key={idx}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>

          <CardBody>
            <CardText>{description}</CardText>
            <CardText>{getRegionById(regions, region)}</CardText>
            <CardText>{getCityById(cities, city)}</CardText>
            <CardText>{format(from)}</CardText>
            <CardText>{format(to)}</CardText>
          </CardBody>

          <CardFooter>
            <Button color="danger">Delete</Button>
          </CardFooter>
        </Card>
      )
    });
  }, [results, regions, cities]);

  return renderResults();
}
