import React, { useCallback, useState } from 'react';

// eslint-disable-next-line react/display-name, react/prop-types
const DataFetcherMemo = React.memo(({ fetchData }) => {
    return <button onClick={fetchData}>Fetch Data</button>;
});

// eslint-disable-next-line react/display-name, react/prop-types
const DataFetcherRegular = ({ fetchData }) => {
    return <button onClick={fetchData}>Fetch Data</button>;
};

// eslint-disable-next-line react/display-name, react/prop-types
const ResultData = function({ data }) {
    if (!data) return <p>No data</p>;
    return <p>Data: {JSON.stringify(data)}</p>
}


const getAllRegions = async () => {
    return await fetch('server/regions.json')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching data:', error));
}

const getAllCities = async () => {
    return await fetch('server/cities.json')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching data:', error));
}

const API = {
    getAllRegions,
    getAllCities
}

export default function MemoizedBlock() {
    const [memoized, setMemoized] = useState(true);
    const [data, setData] = useState(null);

    const fetchDataMemoized = useCallback(() => {
        API.getAllRegions()
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.error('Err Regions:', err);
            });
  
    }, []);

    const fetchDataRegular = () => {
        API.getAllCities()
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return (
        <div>   
            <button onClick={() => setMemoized(p => !p)}>Memoized {memoized ? 'Yes' : 'No'}</button>

            {memoized ? <DataFetcherMemo fetchData={fetchDataMemoized} /> : <DataFetcherRegular fetchData={fetchDataRegular} />}

            <ResultData data={data} />
        </div>
    );
}
