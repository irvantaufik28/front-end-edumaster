import Swal from "sweetalert2";
import axios from "axios";

const confirmationEdit = async (url, data) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(url, data);

        Swal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
        });

        return true; // Indicate success
      } catch (error) {
        console.error(error);
        let errorMessage = "Failed to update. Please try again.";

        // Check if the error has a response with data
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }

        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });

        return false; // Indicate failure
      }
    }

    return false; // User canceled the update
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
  }
};

export default confirmationEdit;
