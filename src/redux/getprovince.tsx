import { useEffect, useState } from 'react';
import axios from 'axios';

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://rwanda.p.rapidapi.com/',
        headers: {
          'X-RapidAPI-Key': '34f0351bfamsh1056f9d3f5ec791p1024f1jsn1ffb48bb352c',
          'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return data;
};