import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const GettingStarted = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to Contact App</h1>
      <p>Manage your contacts efficiently and securely.</p>
      <div>
        <Button type="primary" onClick={() => navigate('/sign-in')}>Sign In</Button>
        <Button type="default" onClick={() => navigate('/sign-up')} style={{ marginLeft: '10px' }}>Sign Up</Button>
      </div>
    </div>
  );
};

export default GettingStarted;