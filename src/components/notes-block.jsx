import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { uuidv4 } from '../utils';

export default function NotesBlock() {
  const initialState = useMemo(() => ({
    _id: uuidv4(),
    title: '',
    note: '',
  }), []);

  const [form, setForm] = useState(() => {
    if (typeof window !== 'undefined') {
      const form = JSON.parse(window.localStorage.getItem('note-form'));

      if (form) {
        return form || initialState;
      }
    }

    return initialState;
  });

  const [results, setResults] = useState(() => {
    if (typeof window !== 'undefined') {
      const notes = JSON.parse(window.localStorage.getItem('notes'));

      if (notes) {
        return notes || [];
      }
    }

    return [];
  });

  const onSubmit = (event, form) => {
    event.preventDefault();

    const payload = {
      _id: form._id,
      title: form.title.trim(),
      note: form.note.trim(),
    };

    if (payload.title === '' || payload.note === '') {
      alert('Please fill the note text');
      return;
    }

    setResults((prev) => {
      if (prev.some((p) => p._id === form._id)) {
        return [...prev].map((i) => {
          if (i._id === form._id) {
            return payload;
          }

          return i;
        });
      }

      return [...prev, payload];
    });

    setForm(initialState);
  };

  const cancelNote = () => {
    setForm(initialState);
  };

  const deleteNote = (id) => {
    setResults((prev) => {
      return prev.filter((p) => p._id !== id);
    });
  };

  const updateNote = (id) => {
    const note = results.find((result) => result._id === id);

    if (note) {
      setForm(note);
    }
  };

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    window.localStorage.setItem('note-form', JSON.stringify(form));
  }, [form]);

  const reversedResults = useMemo(() => {
    if (results && results.length < 1) {
      return null;
    }

    return results.toReversed();
  }, [results]);

  return (
    <div>
      <NoteForm
        onSubmit={onSubmit}
        onCancel={cancelNote}
        form={form}
        setForm={setForm}
      />

      <Row className='mt-4'>
        {reversedResults && reversedResults.length ? (
          reversedResults.map((result, idx) => {
            return (
              <Col key={result._id}>
                <NoteResult
                  updateNote={updateNote}
                  deleteNote={deleteNote}
                  result={result}
                  results={results}
                  idx={idx + 1}
                  />
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
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function NoteForm({ onSubmit, form, setForm, onCancel }) {
  // eslint-disable-next-line react/prop-types
  const { note, title } = form;

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={(event) => onSubmit(event, form)}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={onChange}
              name="title"
              type="text"
              placeholder="Title..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Notes</Label>
            <Input
              value={note}
              onChange={onChange}
              name="note"
              type="textarea"
              placeholder="Text..."
            />
          </FormGroup>

          <Row className="d-flex">
            <Col className="d-flex gap-2">
              <Button onClick={onCancel} type="button" color="default">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}

// eslint-disable-next-line react/prop-types
function NoteResult({ idx, result, updateNote, deleteNote }) {
  // eslint-disable-next-line react/prop-types
  const { _id, note, title } = result;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-0">#{idx} - {title}</CardTitle>
      </CardHeader>

      <CardBody>
        <CardText className="mb-0">{note}</CardText>
      </CardBody>

      <CardFooter>
        <Row className="d-flex">
          <Col className="d-flex gap-2">
            <Button color="warning" onClick={() => updateNote(_id)}>
              Update
            </Button>
            <Button color="danger" onClick={() => deleteNote(_id)}>
              Delete
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}
