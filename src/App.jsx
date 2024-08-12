import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Container } from 'reactstrap';

import FormBlock from './components/form-block';
import NotesBlock from './components/notes-block';
import ResultsBlock from './components/results-block';
import API from './services';
import { uuidv4 } from './utils';
import MemoizedBlock from './components/memoized-block';
import DeepCopyBlock from './components/deep-copy';
import ShallowCopyBlock from './components/shallow-copy';
import Calculator from './components/temperature/Calculator';
import Ads from './components/ads/Ads';
import AdsApp from './components/info-ads/AdsApp';
import EnhancedMyComponent from './components/hoc';


export default function App() {
  const initialState = useMemo(() => {
    return {
      id: uuidv4(),
      title: '',
      description: '',
      region: 'none',
      city: 'none',
      from: '',
      to: '',
    };
  }, []);

  const [form, setForm] = useState(() => {
    if (typeof window !== 'undefined') {
      const form = JSON.parse(window.localStorage.getItem('ads-form'));

      if (form) {
        return form || initialState;
      }
    }

    return initialState;
  });

  useEffect(() => {
    window.localStorage.setItem('ads-form', JSON.stringify(form));
  }, [form]);

  const [results, setResults] = useState(() => {
    if (typeof window !== 'undefined') {
      const ads = JSON.parse(window.localStorage.getItem('ads'));

      if (ads !== null) {
        return ads || [];
      }
    }

    return [];
  });
  
  useEffect(() => {
    window.localStorage.setItem('ads', JSON.stringify(results));
  }, [results]);

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [buttonLabel, setButtonLabel] = useState('Create');

  useEffect(() => {
    API.getRegions()
      .then((data) => {
        if (data) {
          setRegions(data);
        }
      })
      .catch((err) => {
        console.error('Err Regions:', err);
      });

    API.getCities()
      .then((data) => {
        if (data) { 
          setCities(data);
        }
      })
      .catch((err) => {
        console.error('Err Cities', err);
      });
  }, []);

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setForm((prev) => {
        if (
          name === 'region' &&
          form.region.toString() === prev.region.toString()
        ) {
          return {
            ...prev,
            city: 'none',
            [name]: value.toString(),
          };
        }

        return { ...prev, [name]: value.toString() };
      });
    },
    [form.region]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (
        form.title === '' ||
        form.description === '' ||
        form.region === 'none' ||
        form.city === 'none'
      ) {
        alert('Molim vas unesite sve potrebne podatke');
        return;
      }

      setResults((prev) => {
        if (prev.some((p) => p.id === form.id)) {
          return prev.map((p) => {
            if (p.id === form.id) {
              return form;
            }

            return p;
          });
        }

        return [...prev, form];
      });

      setForm(initialState);

      setButtonLabel('Create');
    },
    [form, initialState]
  );

  const filteredCities = useMemo(() => {
    if (!Array.isArray(cities)) {
      return []
    }

    return cities.filter(
      (city) => city.region.toString() === form.region.toString()
    );
  }, [cities, form.region]);

  const removeAds = useCallback((id) => {
    setResults((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateAds = useCallback(
    (id) => {
      const ad = results.find((result) => result.id === id);

      if (ad) {
        setForm(ad);
        setButtonLabel('Update');
      }
    },
    [results]
  );

  const [auth, setAuth] = useState(true);

  return (
    <main>
      <section className='py-4'>
        <Container>
          <EnhancedMyComponent isLoggedIn={auth} />

          {!auth ? (
            <Button onClick={() => setAuth(true)}>Login</Button>
          ) : (
            <Button onClick={() => setAuth(false)}>Logout</Button>
          )}
        </Container>
      </section>

      <section className='py-4'>
        <Container>
          <AdsApp />
        </Container>
      </section>

      <section className='d-none py-4'>
        <Container>
          <Ads />
        </Container>
      </section>

      <section className='d-none py-4'>
        <Container>
          <Calculator />
        </Container>
      </section>

      <section className='d-none py-4'>
        <Container>
          <ShallowCopyBlock />
        </Container>
      </section>

      <section className='d-none py-4'>
        <Container>
          <DeepCopyBlock />
        </Container>
      </section>

      <section className='d-none py-4'>
        <Container>
          <MemoizedBlock />
        </Container>
      </section>

      <section className="d-none py-4">
        <Container>
          <NotesBlock />
        </Container>
      </section>

      <section className="d-none py-4">
        <Container className="max-w-md">
          <FormBlock
            form={form}
            regions={regions}
            cities={filteredCities}
            buttonLabel={buttonLabel}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </Container>
      </section>

      <section className="d-none pb-4">
        <Container className="max-w-md">
          <ResultsBlock
            results={results}
            regions={regions}
            cities={cities}
            removeAds={removeAds}
            updateAds={updateAds}
          />
        </Container>
      </section>
    </main>
  );
}
