import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    // marginTop: "70px",
  },
};

Modal.setAppElement("#root");

function PreviewModal({ view, closeView, code }) {
  const [modalIsOpen, setIsOpen] = useState(view);

  const html = code ? `${code}` : "<p>Enter any code </p>";
  const handleCloseModal = () => {
    setIsOpen(false); // Set modalIsOpen state to false to close the modal
    closeView(false); // Call the closeView function passed from the parent component
  };
  
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-container-preview">
          <h2 style={{ padding: "20px" }}>Preview</h2>
          <div className="preview-container">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <button
            className="preview_md_btn"
            type="button"
            onClick={() => closeView(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PreviewModal;
