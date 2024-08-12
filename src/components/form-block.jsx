import { useCallback } from 'react';

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

// eslint-disable-next-line react/prop-types
export default function FormBlock({ buttonLabel, onSubmit, onChange, form: { title, description, region, city, from, to }, regions = [], cities = [] }) {
  const renderRegions = useCallback(() => {
    if (regions.length < 1) {
      return null;
    }

    return regions.map(({ region, id, value }) => {
      return (
        <option value={region} key={id}>
          {value}
        </option>
      );
    });
  }, [regions]);

  const renderCities = useCallback(() => {
    if (cities.length < 1) {
      return null;
    }

    return cities.map(({ id, value }) => {
      return (
        <option value={id} key={id}>
          {value}
        </option>
      );
    });
  }, [cities]);

  return (
    <Card>
      <CardBody>
        <Form className="form" onSubmit={onSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              name="title"
              onChange={onChange}
              value={title}
              type="text"
              placeholder="Title"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              name="description"
              onChange={onChange}
              value={description}
              type="textarea"
              placeholder="Title"
            />
          </FormGroup>

          <FormGroup>
            <Label>Regions</Label>
            <Input
              name="region"
              onChange={onChange}
              value={region}
              type="select"
              placeholder="Regions"
            >
              <option value="none">Select Region</option>

              {renderRegions()}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Cities</Label>
            <Input
              name="city"
              onChange={onChange}
              value={city}
              type="select"
              placeholder="Regions"
            >
              <option value="none">Select City</option>

              {renderCities()}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>From</Label>
            <Input
              name="from"
              onChange={onChange}
              value={from}
              type="date"
              placeholder="From"
            />
          </FormGroup>

          <FormGroup>
            <Label>To</Label>
            <Input
              name="to"
              onChange={onChange}
              value={to}
              min={from}
              type="date"
              placeholder="To"
            />
          </FormGroup>

          <Button className="d-block w-100" color="primary">
            {buttonLabel}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
