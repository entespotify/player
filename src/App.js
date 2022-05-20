import {useState, useEffect} from 'react';
import SongList from './components/SongList';

function App() {
  const [songs, setTracks] = useState([{title:'', artist:'', album:'', albumart:'', track:''}]);

  useEffect(() => {
      fetch("https://hacksawrazor.pythonanywhere.com/tracks/")
        .then(res => res.json())
          .then(
            (result) => {
              setTracks(result);
            },
            (error) => {
              setTracks("Error");
            }
          )
  }, []);

  return (
    <div className="app">
      <SongList
        songs={songs}  
      />
    </div>
  );
}

export default App;
