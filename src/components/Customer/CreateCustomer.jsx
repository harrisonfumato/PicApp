import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Add useSelector to import
import { createCustomer } from '../../redux/customerSlice';
import { selectUser } from '../../redux/userSlice'; // Correctly importing selectUser

function CreateCustomer() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Now this will work to get the user from the Redux store
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    UserId: ''
  });

  useEffect(() => {
    if (user && user.id) {
      // Set the UserId in the form data from the logged-in user
      setFormData((prevFormData) => ({
        ...prevFormData,
        UserId: user.id
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.UserId) {
      dispatch(createCustomer(formData))
        .unwrap()
        .then(() => {
          console.log('Customer created successfully');
          setFormData({
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            UserId: user.id // Maintain the UserId in the form data
          });
        })
        .catch((error) => {
          console.error('Error creating customer:', error);
        });
    } else {
      console.error('UserId is missing');
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">
          Add Customer 
        </h2>
        <form onSubmit={handleSubmit} className="p-4">
          {/* Form fields remain the same */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FirstName">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstName"
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LastName">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastName"
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="text"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone">
              Phone No.
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Phone"
              type="text"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomer;
