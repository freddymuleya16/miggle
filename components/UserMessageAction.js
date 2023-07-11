import React, { useState } from "react";
import ConfirmationModal from "./Confirmation";

const UserMessageAction = ({ onConfirm, children }) => {
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = () => {
        setShowModal(false);
        // Call the onConfirm function passed as a prop
        if (typeof onConfirm === "function") {
            onConfirm();
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <div
                onClick={openModal}
                className="cursor-pointer justify-items-center flex-col items-center bg-gray-200 border-l-2 border-b-2 border-gray-400 w-full h-max py-3 px-2"
            >
                {children}
            </div>
            <ConfirmationModal
                isOpen={showModal}
                title="Confirmation"
                message="Are you sure?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default UserMessageAction;
