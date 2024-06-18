import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import logo from '../assets/logo.png';

const Splashscreen = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/getting-started');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', paddingTop:'200px' }}>
        <img src={logo} alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
      </div>
      <div style={{ textAlign: 'center', paddingTop:'200px' }}>
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Splashscreen;