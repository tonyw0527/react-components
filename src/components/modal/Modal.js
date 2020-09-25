import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = () => {
    
    const buttonRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    const handleClickOutside = (e) => {
        if(!buttonRef.current.contains(e.target)) {
            modalRef.current.style.display = "none";
        }
    };

    const handleClickInside = () => {
        modalRef.current.style.display = "block";
    }

    return (
        <div className="modal-box">
            <button className="modal-button" ref={buttonRef} type="button" onClick={handleClickInside}>POP</button>

            <div className="modal" ref={modalRef}>
                <li>Subscribe</li>
                <li>Like</li>
                <li>Share</li>
            </div>
        </div>
    );
}

export default Modal;