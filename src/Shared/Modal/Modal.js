import React, { useState } from 'react';
import './Modal.scss'

const Modal = () => {
    const [showModal, setShowModal] = useState(true);

    const closeModalAndNavigate = () => {
        setShowModal(false);
    }
    const onDelete = () => {
        setShowModal(false);
    }
    return (
        <>
            {showModal && (
                <div className="modal fade show" role="dialog" style={{ display: 'flex' }}>
                    <div className="modal-dialog w-100 d-flex align-items-center">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete</h5>
                                <button type="button" className="close btn-group" data-dismiss="modal" aria-label="Close" onClick={closeModalAndNavigate}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal" onClick={closeModalAndNavigate}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal