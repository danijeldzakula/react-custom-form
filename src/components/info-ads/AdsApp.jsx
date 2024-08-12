import { useEffect, useMemo, useState } from "react";
import CreateAd from "./CreateAd";
import ResultAds from "./ResultAds";
import API from "./services";

export default function AdsApp() {
  const initialState = {
    title: '',
    description: '',
    region: 'none',
    city: 'none',
    from: '',
    to: ''
  };

  const [form, setForm] = useState(initialState);
  const [results, setResults] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    API.getAllRegions()
      .then((data) => setRegions(data))
      .catch((err) => console.error(err));

    API.getAllCities()
      .then((data) => setCities(data))
      .catch((err) => console.error(err));
  }, []);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setResults((prev) => ([ ...prev, form ]));
    setForm(initialState);
  }

  const filteredCities = useMemo(() => {
    return cities.filter(({ region }) => +region === +form.region);
  }, [cities, form.region]);

  return (
    <div>
      <CreateAd form={form} onChange={onChange} onSubmit={onSubmit} regions={regions} cities={filteredCities} />
      <ResultAds results={results} regions={regions} cities={cities} />
    </div>
  )
}
