import React from "react";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-opacity-75 ${isOpen ? "visible" : "hidden"
                }`}
        >
            <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 mr-2 bg-gray-300 rounded-lg"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
