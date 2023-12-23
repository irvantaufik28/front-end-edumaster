import { useState } from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';

const ClassMajorPage = () => {
    const arrayObjek = [
        { id: 1, name: 'Objek 1' },
        { id: 2, name: 'Objek 2' },
        { id: 3, name: 'Objek 3' }
      ];
    
      const [selectedObject, setSelectedObject] = useState({
        id: "",
      });
      const [suggestedOptions, setSuggestedOptions] = useState([]);
    
      const handleInputChange = (e) => {
        const value = e.target.value;
        setSelectedObject({
          id: "",
        });
    
        // Filter options based on input
        const filteredOptions = arrayObjek.filter(option =>
          option.name.toLowerCase().includes(value.toLowerCase())
        );
    
        setSuggestedOptions(filteredOptions);
      };
    
      const handleOptionClick = (id) => {
        setSelectedObject({
          id: id,
         
        });
        setSuggestedOptions([]);
      };
      console.log(selectedObject)
    
      return (
        <Form>
          <FormControl
            type="text"
            value={selectedObject.name}
            onChange={handleInputChange}
            placeholder="Type to search..."
          />
          <ListGroup>
            {suggestedOptions.map(option => (
              <ListGroup.Item
                key={option.id}
                active={option.id === selectedObject.id}
                onClick={() => handleOptionClick(option.id, option.name)}
              >
                {option.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p>Selected ID: {selectedObject.id}</p>
        </Form>
      );
    };
    

export default ClassMajorPage;