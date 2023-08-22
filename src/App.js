import { useState } from 'react';
import './App.css';
import Card from './Card';

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] =useState([
    {
      title:"Test",
      artist: "Test",
      id:1
    },
    {
      title:"Test",
      artist: "Test",
      id:2
    }
  ]);

  const [playList, setPlayList] = useState([
    {
      title:"Test",
      artist: "Test",
      id:1
    }
  ]);

  const [playListName, setPlayListName] = useState("");

  function handleAdd(item) {
    if (playList.filter(x => x.id === item.id).length) {
      return;
    }

    setPlayList([...playList, item]);
  }

  function handleRemove(item) {
    setPlayList(playList.filter(x => x.id !== item.id));
  }

  return (
    <>
      <input 
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className="btn btn-primary">Search</button>
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
          <button>Save</button>
        </div>
      </div>
    </>
  );
}

export default App;
