import React, { useEffect } from 'react';

const Checkout = (onClose) => {
  useEffect(() => {
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', payWithPaystack, false);

    return () => {
      // Cleanup event listener when the component is unmounted
      paymentForm.removeEventListener('submit', payWithPaystack, false);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const payWithPaystack = () => {
    var handler = window.PaystackPop.setup({
      key: 'YOUR_PUBLIC_KEY', // Replace with your public key
      email: document.getElementById('email-address').value,
      amount: document.getElementById('amount').value * 100,
      currency: 'NGN',
      ref: 'YOUR_REFERENCE',
      callback: function(response) {
        var reference = response.reference;
        alert('Payment complete! Reference: ' + reference);
        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <form id="paymentForm">
            {/* Add your form fields here, e.g., email, amount, etc. */}
            <div className="mb-4">
                <label>Email Address:</label>
                <input type="email" id="email-address" 
                className="p-2 border border-gray-300 rounded-lg w-full" />
            </div>

            <div className="mb-4">
                <label>Amount:</label>
                <input type="text" id="amount" 
                className="p-2 border border-gray-300 rounded-lg w-full"/>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full"
            >Pay with Paystack</button>
            <button
            onClick={onClose} // Call the onClose function to close the modal
            className="mt-2 bg-red-500 text-white p-2 rounded-lg w-full"
            >
                Cancel
            </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
