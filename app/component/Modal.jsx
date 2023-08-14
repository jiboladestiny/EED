import React from "react";

const Modal = ({ isOpen, toggleModal, children }) => {
  const handleCloseModal = () => {
    if (isOpen) {
      toggleModal();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center bg-black bg-opacity-50 transition-opacity`}
      onClick={handleCloseModal} // Close the modal when clicking on the backdrop
    >
      <div
        className="bg-white rounded-lg p-4 md:w-1/4 w-full transition-transform transform"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className="mt-4 flex justify-end">
          {/* You can add close button here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
