import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getProfile, getUser } from "../../utilities/users-service";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import VisitPage from "../VisitPage/VisitPage";
import PostsPage from "../PostsPage/PostsPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SettingsPage from "../SettingsPage/SettingsPage";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

export default function App() {
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user and profile data concurrently
        const [userData, profileData] = await Promise.all([
          getUser(),
          getProfile(),
        ]);

        setUser(userData);
        if (profileData) setProfile(profileData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function
  }, []);

  return (
    <main className="App">
      <NavBar
        updatingProfile={updatingProfile}
        user={user}
        setUser={setUser}
        profile={profile}
      />
      {user ? (
        <>
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  updatingProfile={updatingProfile}
                  setUpdatingProfile={setUpdatingProfile}
                  profile={profile}
                  setProfile={setProfile}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  updatingProfile={updatingProfile}
                  setUpdatingProfile={setUpdatingProfile}
                  profile={profile}
                  setProfile={setProfile}
                />
              }
            />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/visits" element={<VisitPage />} />
          </Routes>
          {profile ? <ChatWindow profile={profile} /> : ""}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </>
      )}
    </main>
  );
}
