import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) return 'Email is required';
    if (!password) return 'Password is required';
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    
    return null;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await login(email.toLowerCase().trim(), password, rememberMe);
      
      if (result.success) {
        // Redirect to dashboard or main app
        console.log('Login successful!');
        navigate('/healthtool'); // Or wherever you want to redirect after login
      } else {
        setErrorMessage(result.error || 'Invalid email or password');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const result = await googleLogin();
      
      if (result.success) {
        console.log('Google login successful!');
        navigate('/healthtool');
      } else {
        setErrorMessage(result.error || 'Google login failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const navigateToForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    opacity: isLoading ? 0.6 : 1
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Main Content */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        padding: '16px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
          padding: '32px', 
          width: '100%', 
          maxWidth: '400px' 
        }}>
          {/* Logo placeholder */}
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#33444E',
            borderRadius: '8px',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            M
          </div>

          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1f2937', 
            marginBottom: '32px',
            marginTop: 0
          }}>
            Welcome Back
          </h2>

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={isLoading}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={isLoading}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" style={{ fontSize: '14px', color: '#6b7280', cursor: 'pointer' }}>
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={navigateToForgotPassword}
                disabled={isLoading}
                style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  textDecoration: 'none',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit'
                }}
                onMouseEnter={(e) => e.target.style.color = '#1f2937'}
                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                color: 'white',
                backgroundColor: isLoading ? '#9ca3af' : '#33444E',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.target.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.target.style.opacity = '1';
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ position: 'relative', margin: '24px 0' }}>
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }}></div>
            </div>
            <div style={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center', 
              fontSize: '14px' 
            }}>
              <span style={{ 
                padding: '0 8px', 
                backgroundColor: 'white', 
                color: '#6b7280' 
              }}>
                or
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontWeight: '500',
              color: '#374151',
              backgroundColor: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              opacity: isLoading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.target.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.target.style.backgroundColor = 'white';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <span style={{ color: '#6b7280' }}>Don't have an account? </span>
            <button
              onClick={navigateToSignup}
              disabled={isLoading}
              style={{ 
                fontWeight: '500', 
                color: '#33444E',
                textDecoration: 'none',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}