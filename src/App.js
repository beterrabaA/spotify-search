import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const CLIENT_ID = '61f9ced8db7f496d9a3c7bd711849dba';
const CLIENT_SECRET = 'e48477dcf77942fdab00d08f044bab25';


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("")

  useEffect(() => {

    // API Access Token
    
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))

  }, [])

  // Search
  const search = async () => {

    console.log(`Search for ${searchInput}`)

    // Get request using search to get the Artist ID

    const artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }

    const artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, artistParameters)
      .then(reponse => reponse.json())
      .then(data => data.artists.items[0].id)

    // Get request with Artist ID grab all the albums from that artist

    // Display those albums to the bar

  };

  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search For Artist'
            type='input'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                search()
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={() => search()}>
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
