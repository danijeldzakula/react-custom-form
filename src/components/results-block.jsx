import { useCallback } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

// eslint-disable-next-line react/prop-types
export default function ResultsBlock({ results = [], regions = [], cities = [], removeAds, updateAds }) {
  const getRegionById = useCallback(
    (regionId) => {
      const findElement = regions && regions.length && regions.find(
        ({ id }) => id.toString() === regionId.toString()
      );

      if (findElement) {
        return findElement.value;
      }
    },
    [regions]
  );

  const getCityById = useCallback(
    (regionId) => {
      const findElement = cities && cities.length && cities.find(
        ({ id }) => id.toString() === regionId.toString()
      );

      if (findElement) {
        return findElement.value;
      }
    },
    [cities]
  );

  return (
    <Row>
      {results.length ? (
        results.map(({ id, title, description, region, city, from, to }) => {
          return (
            <Col key={id}>
              <Card>
                <CardHeader>
                  <CardTitle className="mb-0">
                    <h3>{title}</h3>
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  <p>{description}</p>
                  <p>{getRegionById(region)}</p>
                  <p>{getCityById(city)}</p>
                  <p>{from}</p>
                  <p>{to}</p>
                </CardBody>

                <CardFooter>
                  <Row className="d-flex">
                    <Col className="d-flex gap-2">
                      <Button color="warning" onClick={() => updateAds(id)}>
                        Update
                      </Button>
                      <Button color="danger" onClick={() => removeAds(id)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          );
        })
      ) : (
        <Col>
          <Card>
            <CardBody>
              <CardText className="text-center">No data</CardText>
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  );
}
