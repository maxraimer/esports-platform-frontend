import { BrowserRouter as _, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav/Nav";
import AuthModal from "./components/modals/AuthModal";
import RegModal from "./components/modals/RegModal";
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import TournamentsPage from './pages/TournamentsPage';
import MatchesPage from './pages/MatchesPage';
import RankingsPage from './pages/RankingsPage';
import StreamsPage from './pages/StreamsPage';
import MarketPage from './pages/MarketPage';
import { AlertProvider } from './context/AlertContext';

export default function App() {

	return (
		<AlertProvider>
			<div className="App">
				{/* Navigation bar */}
				<Nav/>

				<Routes>
					<Route path='/' element={<HomePage/>}/>
					<Route path='/tournaments' element={<TournamentsPage/>}/>
					<Route path='/matches' element={<MatchesPage/>}/>
					<Route path='/rankings' element={<RankingsPage/>}/>
					<Route path='/streams' element={<StreamsPage/>}/>
					<Route path='/market' element={<MarketPage/>}/>
					<Route path='*' element={<NotFoundPage/>}/>
				</Routes>

				{/* Modals */}
				<AuthModal/>
				<RegModal/>

			</div>
		</AlertProvider>
	);
}