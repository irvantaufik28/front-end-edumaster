/* eslint-disable react/prop-types */
import { Button, Col } from "react-bootstrap";
import default_person from "../../../../assets/default/default_person.jpg";
const ImageUploadForm = ({
  previewSource,
  clearImage,
  handleFileInputChange,
  index,
}) => {
  return (
    <Col md={3}>
      <div className="dropzone-product">
        {previewSource ? (
          <>
            <img
              src={previewSource}
              alt="Preview"
              style={{
                width: "150px",
                height: "150px",
                border: "1px solid #ccc",
              }}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => clearImage(index)}
              className="mt-2"
            >
              Clear
            </Button>
          </>
        ) : (
          <img
            src={default_person}
            alt="Preview"
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid #ccc",
            }}
          />
        )}
      </div>
      <div className="input-file-upload">
        <input type="file" onChange={(e) => handleFileInputChange(e, index)} />
      </div>
    </Col>
  );
};

export default ImageUploadForm;
