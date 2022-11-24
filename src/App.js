import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const CLIENT_ID = '61f9ced8db7f496d9a3c7bd711849dba';
const CLIENT_SECRET = 'e48477dcf77942fdab00d08f044bab25';


function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search For Artist'
            type='input'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                console.log('Pressed Enter')
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={() => console.log("Cliked button")}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          <Card>
            <Card.Img src='#' />
            <Card.Body>
              <Card.Title>
                Album Name Here
              </Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
