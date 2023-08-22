import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import Search from './Search';

function App() {
  const [results, setResults] =useState([]);

  const [playList, setPlayList] = useState([]);

  const [playListName, setPlayListName] = useState("");

  const [userToken, setUserToken] = useState("");

  const clientId = "";
  const clientSecret = "";

  useEffect(() => {
    const getToken = async function() {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
          'Content-Type': "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
      });
  
      const responseJson = await response.json();
  
      setUserToken(responseJson.access_token);
    }

    getToken();
  }, [clientId, clientSecret]);

  function handleAdd(item) {
    if (playList.filter(x => x.id === item.id).length) {
      return;
    }

    setPlayList([...playList, item]);
    setResults(results.filter(x => x.id !== item.id))
  }

  function handleRemove(item) {
    setPlayList(playList.filter(x => x.id !== item.id));
  }

  async function handleSearch(search) {
    const response = await fetch("https://api.spotify.com/v1/search?q=track%3A" + search + "&type=track", {
        headers: {
          'Authorization': 'Bearer ' + userToken,
        }
      });

    const responseJson = await response.json();

    let filteredResults = responseJson.tracks.items.filter(i => {
      return playList.findIndex(x => x.id === i.id) === -1;
    })
    setResults(filteredResults);
  }

  async function createPlaylist() {  
  }

  return (
    <>
      <Search onClick={handleSearch} />

      <div className="grid">
        <div className="result">
          <ul>
            {results.map(result => {
              return (
                <Card key={result.id} item={result} icon="+" onClick={handleAdd} />
              );
            })}
          </ul>
        </div>
        <div className="playList">
          <input 
            value={playListName}
            onChange={e => setPlayListName(e.target.value)}
          />
          <ul>
            {playList.map(result => {
              return (
                <Card key={result.id} item={result} icon="-" onClick={handleRemove} />
              );
            })}
          </ul>
          <button onClick={createPlaylist} className='btn btn-light'>Save</button>
        </div>
      </div>
    </>
  );
}

export default App;
