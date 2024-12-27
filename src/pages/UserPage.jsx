import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api_getProfile } from '../scripts/api'
import Socials from '../components/user/Socials'
import Biography from '../components/user/Biography'
import FriendsList from '../components/user/FriendsList'
import Chronology from '../components/user/Chronology'
import Team from '../components/user/Team'
import UserHead from '../components/user/UserHead'
import UserPins from '../components/user/UserPins'
import UserProfileSettings from '../components/user/UserProfileSettings'
import { useUser } from '../context/UserContext';
import Achievements from '../components/user/Achievements'

export default function UserPage() {
    const { id } = useParams();
    const { user } = useUser();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api_getProfile(id);
                if (response.data) {
                    setProfile(response.data);
                } else {
                    throw new Error('No data in response');
                }
            } catch (err) {
                console.error('Error fetching user profile:', err.message);
            }
        }
        fetchUserProfile();
    }, [id])

    const eventData = [
        {
            type: 'match',
            team: 'Team Alpha',
            teamImage: '/images/TeamAlpha.png',
            teamURL: '/404',
            opponentTeam: 'Team Beta',
            opponentTeamImage: '/images/TeamBeta.png',
            opponentTeamURL: '/404',
            tournamentName: 'Test Cup',
            tournamentImage: '/images/SCES.png',
            result: '13-11',
            status: 'win',
            timestamp: 1734861600000,
        },
        {
            type: 'match',
            team: 'Team Alpha',
            teamImage: '/images/TeamAlpha.png',
            teamURL: '/404',
            opponentTeam: 'Team Beta',
            opponentTeamImage: '/images/TeamBeta.png',
            opponentTeamURL: '/404',
            tournamentName: 'Test Cup',
            tournamentImage: '/images/SCES.png',
            result: '13-11',
            status: 'lose',
            timestamp: 1734862600000,
        },
        {
            type: 'match',
            team: 'Team Alpha',
            teamImage: '/images/TeamAlpha.png',
            teamURL: '/404',
            opponentTeam: 'Team Beta',
            opponentTeamImage: '/images/TeamBeta.png',
            opponentTeamURL: '/404',
            tournamentName: 'Test Cup',
            tournamentImage: '/images/SCES.png',
            result: '13-11',
            status: 'pending',
            timestamp: 1734863600000,
        },
        {
            type: 'tournament',
            team: 'Team Alpha',
            teamImage: '/images/TeamAlpha.png',
            teamURL: '/404',
            opponentTeamURL: '/404',
            tournamentName: 'Test Cup',
            tournamentImage: '/images/SCES.png',
            result: null,
            status: 'signedup',
            timestamp: 1734850600000,
        },
        {
            type: 'tournament',
            team: 'Team Alpha',
            teamImage: '/images/TeamAlpha.png',
            teamURL: '/404',
            opponentTeamURL: '/404',
            tournamentName: 'Test Cup',
            tournamentImage: '/images/SCES.png',
            result: '1',
            status: 'finished',
            timestamp: 1734870600000,
        }
    ] 

    return profile ?         
        <div className='p-8 overflow-y-auto max-h-[calc(100vh-3.5rem)] flex justify-center'>

            {/* Основний блок контенту */}
            <div className='w-full lg:w-[96rem] flex flex-col gap-8 md:gap-4'>

                {/* Верхній блок з фотками */}
                <div className='relative w-full h-full md:h-[16rem] bg-base-100 rounded-[2rem] md:rounded-[0.75rem] overflow-clip'>

                    {/* Обложка */}
                    <img src={profile.profileCover || "/images/nocover.png"} alt="profile" className='w-full h-[40rem] md:h-full object-cover object-center'/>
                    
                    {/* Все що на обложці */}
                    <div className='absolute top-0 left-0 w-full h-full flex items-center md:justify-between text-white p-8 md:p-4 rounded-[2rem] md:rounded-[0.75rem]'>

                        {/* Ліва частина */}
                        <div className='hidden md:flex h-full'>{(user.id === profile._id && user.username === profile.username) ? <UserProfileSettings/> : null}</div>

                        {/* Права частина */}
                        <div className='flex flex-col md:flex-row-reverse w-full md:w-auto md:h-full gap-8 md:gap-2'>
                            {/* Підкладка під аватарку */}
                            <UserHead profilePic={profile.profilePic} nickname={profile.nickname} publicName={profile.publicName}/>
                            
                            <div className='flex justify-between'>
                                {/* Значки */}
                                <UserPins flags={profile.flags}/>
                                <div className='block md:hidden'>{(user.id === profile._id && user.username === profile.username) ? <UserProfileSettings/> : null}</div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Нижній блок з інформацією */}
                <div className='flex flex-col md:flex-row-reverse gap-8 md:gap-4 pb-8'>
                    
                    <div className='flex flex-col gap-8 md:gap-4 md:basis-1/4'>
                        {/* Біографія */}
                        <Biography firstName={profile.firstName} lastName={profile.lastName} dateOfBirth={profile.dateOfBirth} age={profile.age} address={profile.address} about={profile.about} flags={profile.flags}/>

                        {/* Соціальні мережі */}
                        <Socials socials={profile.socials} linkedAccounts={profile.linkedAccounts}/>
                    </div>

                    <div className='flex flex-col gap-8 md:gap-4 md:basis-3/4'>
                        {/* Список досягнень */}
                        <Achievements achievements={profile.achievements}/>

                        {/* Список друзів */}
                        <FriendsList friends={profile.friends}/>

                        {/* Команди */}
                        <Team team={profile.team}/>

                        {/* Хронологія */}
                        <Chronology nickname={profile.nickname} eventsList={eventData}/>
                    </div>

                </div>
                
            </div>

        </div>
        :
        <div>Loading...</div>
}