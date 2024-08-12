import { useCallback } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// eslint-disable-next-line react/prop-types
export default function CreateAd({ form, onChange, onSubmit, regions, cities }) {
  // eslint-disable-next-line react/prop-types
  const { title, description, region, city, from, to } = form;

  const renderRegions = useCallback(() => {
    // eslint-disable-next-line react/prop-types
    if (!regions && regions.length < 1) {
      return null;
    }

    // eslint-disable-next-line react/prop-types
    return regions.map(({ id, value }) => {
      return <option value={id} key={id}>{value}</option>
    })
  }, [regions]);

  const renderCities = useCallback(() => {
    // eslint-disable-next-line react/prop-types
    if (!cities && cities.length < 1) {
      return null;
    }

    // eslint-disable-next-line react/prop-types
    return cities.map(({ id, value, region }) => {
      return <option value={region} key={id}>{value}</option>
    })
  }, [cities]);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Title:</Label>
        <Input name="title" type="text" value={title} onChange={onChange} />
      </FormGroup>

      <FormGroup>
        <Label>Description:</Label>
        <Input name="description" type="textarea" value={description} onChange={onChange} />
      </FormGroup>

      <FormGroup>
        <Label>Regions:</Label>
        <Input name='region' type="select" value={region} onChange={onChange}>
          <option value='none'>Select Region</option>
          {renderRegions()}
        </Input>

      </FormGroup>

      <FormGroup>
        <Label>Cities:</Label>
        <Input name="city" type="select" value={city} onChange={onChange}>
          <option value='none'>Select City</option>

          {renderCities()}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label>From:</Label>
        <Input name='from' type="date" value={from} onChange={onChange} />
      </FormGroup>

      <FormGroup>
        <Label>To:</Label>
        <Input name="to" type="date" value={to} onChange={onChange} />
      </FormGroup>

      <FormGroup className="d-flex gap-2">
        <Button type="sumbit" color="primary">Submit</Button>
      </FormGroup>
    </Form>
  )
}
