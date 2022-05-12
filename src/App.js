import {useState, useEffect} from 'react';
import Player from './components/Player';

function App() {
  const [songs, setTracks] = useState([{title:'', artist:'', album:'', albumart:'', track:''}]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  useEffect(() => {
      fetch("https://hacksawrazor.pythonanywhere.com/tracks/")
        .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
                setTracks(result);
            },
            (error) => {
              setTracks("Error");
            }
          )
  }, []);

  return (
    <div className="app">
      <Player 
        currentSongIndex={currentSongIndex} 
        setCurrentSongIndex={setCurrentSongIndex} 
        nextSongIndex={nextSongIndex} 
        songs={songs}
      />
    </div>
  );
}

export default App;
