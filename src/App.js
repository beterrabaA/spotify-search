/* eslint-disable no-unused-vars */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const CLIENT_ID = '61f9ced8db7f496d9a3c7bd711849dba';
const CLIENT_SECRET = 'e48477dcf77942fdab00d08f044bab25';


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("")
  const [artistAlbums, setArtistAlbums] = useState([])
  const [filtedAlbums, setFiltedAlbums] = useState([])
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

  useEffect(() => {
    const filterRest = async () => {
      let lest = []
      if (artistAlbums.length > 1) {
        const pala = artistAlbums.map((e, i, a) => {
          if (a.filter((j) => (j.name === e.name)).length > 1) {
            lest.push(a.find((t) => t.name === e.name))
          } else {
            return e
          }
        })

        lest = lest.filter(function (a) {
          return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))

        const filtrado = pala.filter((e) => e !== undefined)

        setFiltedAlbums([...lest, ...filtrado])
      }
    }
    filterRest()
  }, [artistAlbums])

  // Search
  const search = async () => {

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

    const artistAlbumsa = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&limit=40`, artistParameters)
      .then(response => response.json())
      .then(data => setArtistAlbums(data.items))

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
          {filtedAlbums.map((e, i) => (
            <Card key={i}>
              <Card.Img src={e.images[0].url} />
              <Card.Body>
                <Card.Title>
                  <a href={e.external_urls.spotify}>
                  {e.name}
                  </a>
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
