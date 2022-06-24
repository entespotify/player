import { useState, useEffect } from 'react';
import SongList from './components/SongList';
import Intro from './components/Intro';
import TopNavigation from './components/TopNavigation';

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
			<TopNavigation/>
			{isLoading ?
				<Intro />
				:
				<SongList songs={songs} />
			}
		</div>
	);
}

export default App;
