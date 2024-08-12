import { useEffect, useMemo, useState } from "react";
import CreateAd from "./CreateAd";
import ResultAds from "./ResultAds";
import { uuidv4 } from "../../utils";

export default function Ads() {
    const initialState = {
        id: uuidv4(),
        title: '',
        description: '',
        region: 'none',
        city: 'none',
        from: '',
        to: '',
    }

    const [form, setForm] = useState(initialState);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getRegions = async () => {
            try {
                const response = await fetch('server/regions.json');
                const data = await response.json();
                setRegions(data);
            } catch(err) {
                console.error(err);
            }
        }

        getRegions();

        const getCities = async () => {
            try {
                const response = await fetch('server/cities.json');
                const data = await response.json();
                setCities(data);
            } catch(err) {
                console.error(err);
            }
        }

        getCities();
    }, []);

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setResults((prev) => ([...prev, form]));
        setForm(initialState);
    }

    const handleDelete = (itemId) => {
        setResults((prev) => (prev.filter(({ id }) => id !== itemId)));
    }

    const filteredCities = useMemo(() => {
        return cities.filter(({ region }) => region.toString() === form.region.toString());
    }, [cities, form.region])

    return (
        <div className="py-4">
            <CreateAd form={form} regions={regions} cities={filteredCities} onChange={onChange} onSubmit={onSubmit} />
            <ResultAds cities={cities} regions={regions} results={results} handleDelete={handleDelete} />
        </div>
    )
}
