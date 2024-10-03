import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Modal for user authentication (register/login)
const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      const endpoint = isRegister ? '/user/register' : '/user/login';
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'An error occurred');
        return;
      }

      if (isRegister) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          setIsRegister(false);
        }, 1000);
      } else {
        localStorage.setItem('token', data.token);
        setSuccessMessage('Login successful! Reloading...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setErrorMessage('An error occurred while processing your request');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Modal/Dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isRegister ? 'Register' : 'Login'}</DialogTitle>
        </DialogHeader>

        {/* Feedback success or failed */}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Register & login form */}
        {isRegister && (
          <div>
            <label>Username</label>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </div>
        )}
        <div>
          <label>Email</label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <Input name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>

        {/* Register & login buttons */}
        <Button onClick={handleSubmit}>
          {isRegister ? 'Register' : 'Login'}
        </Button>

        {/* Toggle between register & login */}
        <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
