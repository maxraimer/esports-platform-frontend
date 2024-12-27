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
import UserPage from './pages/UserPage';
import UserActivitiesPage from './pages/UserActivitiesPage';
import UserTeamsPage from './pages/UserTeamsPage';
import UserFriendsPage from './pages/UserFriendsPage';
import UserTournamentsPage from './pages/UserTournamentsPage';
import UserSettingsPage from './pages/UserSettingsPage';
import { AlertProvider } from './context/AlertContext';
import { UserProvider } from './context/UserContext';

export default function App() {

	return (
		<UserProvider>
		<AlertProvider>
			<div className="App">
				{/* Navigation bar */}
				<Nav/>
				
				<div className='pt-[3.5rem]'>
					{/* Routes - Content */}
					<Routes>
						<Route path='/' element={<HomePage/>}/>

						<Route path='/tournaments' element={<TournamentsPage/>}/>
						<Route path='/matches' element={<MatchesPage/>}/>
						<Route path='/rankings' element={<RankingsPage/>}/>
						<Route path='/streams' element={<StreamsPage/>}/>
						<Route path='/market' element={<MarketPage/>}/>

						<Route path='/user/:id' element={<UserPage/>}/>
						<Route path='/user/:id/activity' element={<UserActivitiesPage/>}/>
						<Route path='/user/:id/teams' element={<UserTeamsPage/>}/>
						<Route path='/user/:id/tournaments' element={<UserTournamentsPage/>}/>
						<Route path='/user/:id/friends' element={<UserFriendsPage/>}/>
						<Route path='/user/:id/settings' element={<UserSettingsPage/>}/>

						<Route path='*' element={<NotFoundPage/>}/>
					</Routes>
				</div>

				{/* Modals */}
				<AuthModal/>
				<RegModal/>

			</div>
		</AlertProvider>
		</UserProvider>
	);
}