import Header from '../components/Header'
import HamsterImage from '../assets/Hamster.png'
import { useState } from "react";

function Profile() {
    const [selectedTab, setSelectedTab] = useState("home");
    const [selectedFilter, setSelectedFilter] = useState("home");


    function addAsFriend(){
        
    }
    const currentUser = JSON.parse(localStorage.getItem("user"));


    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-3xl">Please log in to view your profile.</h1>
            </div>
        );
    }


    const userName = currentUser.username;


    return (
        <div className="profile-container text-white min-h-screen bg-gray-900">
            <div className="container flex">
                <div className="sidebar flex flex-col gap-20 p-4 mb-20 mt-5 border-r border-blue-300 h-screen bg-gray-900 w-60 text-white text-center ">
                    <button 
                        onClick={() => setSelectedTab("home")} 
                        className="hover:text-blue-400"
                    >
                        Home
                    </button>

                    <button 
                        onClick={() => setSelectedTab("games")} 
                        className="hover:text-blue-400"
                    >
                        Games
                    </button>

                    <button 
                        onClick={() => setSelectedTab("friends")} 
                        className="hover:text-blue-400"
                    >
                        Friends
                    </button>
                </div>

                <div className="content-container flex-1 p-10 text-white">

                    {selectedTab === "home" && (
                        <section className='profile-container'>
                            <div className="mini-nav flex justify-between items-center"> 
                                <h1 className="text-3xl font-bold">{userName} </h1>
                            </div>

                            <div className='profile flex flex-col items-center text-center mt-20'>
                                <img src={HamsterImage} className="h-70 w-100 rounded-md"/>
                                <div className='profile-description'> 
                                    <p>Hello, I play basketball.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {selectedTab === "games" && (
                        <div>
                            <h1 className="text-3xl font-bold">Games</h1>
                            <button 
                                onClick={() => setSelectedFilter("Past")} 
                                className="hover:text-blue-400"
                            >
                                Past Games
                            </button>
                        </div>
                    )}

                    {selectedTab === "friends" && (
                        <div>
                            <h1 className="text-3xl font-bold">Friends</h1>
                            <p>Your friends, connections, stats, etc.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Profile;
