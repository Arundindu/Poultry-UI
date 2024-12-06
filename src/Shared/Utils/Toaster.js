// Import react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize Toast Container in your main App component
// Example: import { ToastContainer } from 'react-toastify';
//          <ToastContainer />

const Toaster = {
    success: (message, options = {}) => {
        toast.success(message, {
            //   position: toast.POSITION.TOP_RIGHT,
            position: "top-right",
            autoClose: 3000,
            ...options,
        });
    },
    error: (message, options = {}) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            ...options,
        });
    },
    info: (message, options = {}) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 3000,
            ...options,
        });
    },
    warning: (message, options = {}) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: 3000,
            ...options,
        });
    },
    custom: (message, options = {}) => {
        toast(message, {
            position: "top-right",
            autoClose: 3000,
            ...options,
        });
    },
};

export default Toaster;
