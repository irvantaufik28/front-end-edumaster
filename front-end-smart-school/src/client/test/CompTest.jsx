
import { useEffect } from 'react';
import { useClassroomCode } from './hook';
import axios from 'axios';

const CompTest = () => {
    const code = useClassroomCode();

    useEffect(() => {
      // Make sure to replace '' with the correct URL
      const apiUrl = `http://localhost:4000/api/classroom?code=${code}`;
  
      axios.get(apiUrl)
        .then(response => {
          // Handle the response data here
          console.log(response.data);
        })
        .catch(error => {
          // Handle errors here
          console.error('Error fetching data:', error);
        });
    }, [code]);
  return (
    <div>

        <h1>test</h1>
    </div>
  )
}

export default CompTest