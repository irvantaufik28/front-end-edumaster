import Swal from "sweetalert2";
import axios from "axios";

const ConfirmationDelete = async (url) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(url);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default ConfirmationDelete;
