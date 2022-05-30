import { useState, useEffect } from 'react';
import SongList from './components/SongList';
import Intro from './components/Intro';

function App() {
	const [songs, setTracks] = useState([{ title: '', artist: '', album: '', albumart: '', track: '' }]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("https://hacksawrazor.pythonanywhere.com/tracks/")
			.then(res => res.json())
			.then(
				(result) => {
					setTracks(result);
					setIsLoading(false);
				},
				(error) => {
					setTracks("Error");
				}
			)
	}, []);

	return (
		<div className="app">
			<div className="cmp-navbar">
				<a className="cmp-navbar-title" href="https://entespotify.github.io/reactive">entespotify</a>
			</div>
			{isLoading ?
				<Intro />
				:
				<SongList songs={songs} />
			}
		</div>
	);
}

export default App;
