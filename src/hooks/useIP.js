import { useEffect, useState } from 'react';

function useUserIP() {
  const [ip, setIP] = useState('');

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIP(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIP();
  }, []);

  return ip;
}

export default useUserIP;
