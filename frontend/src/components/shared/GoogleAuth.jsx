import React, { useState } from 'react';
import { Button } from '../ui/button';
import { app } from '@/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '@/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // To handle loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleClick = async () => {
    setLoading(true);
    setError(''); // Reset error before trying

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters('prompt', 'select_account');

    try {
      const firebaseResponse = await signInWithPopup(auth, provider);

      // Destructuring response for better readability
      const { displayName, email, photoURL } = firebaseResponse.user;

      const res = await fetch('api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: displayName,
          email: email,
          profilePhotoUrl: photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/'); // Redirect to home page after successful sign-in
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className={'bg-green-500 w-full'}
        onClick={handleGoogleClick}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Signing In...' : 'Continue with Google'}
      </Button>

      {/* Show error message if login fails */}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default GoogleAuth;
