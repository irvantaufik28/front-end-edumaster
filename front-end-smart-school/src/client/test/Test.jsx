import { useDispatch } from 'react-redux';
import { setCode } from '../../features/classroomSlice';
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import { useState } from 'react';
import CompTest from './CompTest';

const Test = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: "",
      });
  const handleSearch = () => {
    dispatch(setCode(formData.code));
  };

  return (
    <>
    <div className="search-box-global">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="nama-classroom" className="form-label">
            code
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            onChange={(e) =>
                setFormData({
                  ...formData,
                  ...{ code: e.target.value },
                })
              }
          />
        </div>
      </div>

      <div className="col-md-6 button-search-classroom">
        <ButtonSuccess title="search" onClick={handleSearch} />
      </div>
    </div>
    <div>

        <CompTest />
    </div>
    </>
  );
};

export default Test;