import AuthModal from './AuthModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ username: '', email: '', createdAt: '' });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);

  // Fetch user profile data
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:8080/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'Token is not valid') {
          navigate('/');
        } else {
          throw new Error(data.message || 'Failed to fetch profile');
        }
      }

      setProfileData({
        username: data.username,
        email: data.email,
        createdAt: data.created_at,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsLoggedIn(false);
    }
  };

  // User profile button click handler
  const handleProfileClick = () => {
    if (!isLoggedIn) setIsAuthModalOpen(true);
  };

  // User logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfileData({ username: '', email: '', createdAt: '' });
  };

  return (
    <>
      {isLoggedIn ? (
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-7 h-7 text-gray-600"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
                ></path>
                <path
                  fill="currentColor"
                  d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
                ></path>
              </svg>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Profile</DialogTitle>
              <DialogDescription>
                View and manage your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Created At</label>
                <input
                  type="text"
                  value={profileData.createdAt}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              {/* Logout button */}
              <Button className="bg-red-500 text-white" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <button onClick={handleProfileClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="w-7 h-7 text-gray-600"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
              ></path>
              <path
                fill="currentColor"
                d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
              ></path>
            </svg>
          </button>

          {/* Register/login modal if user is not logged in */}
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
      )}
    </>
  );
};

export default Profile;
