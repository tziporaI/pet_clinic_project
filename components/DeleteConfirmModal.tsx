import { useEffect, useRef } from "react";
import { Props } from "../lib/interfaces";

const DeleteConfirmModal = ({ onClose, onConfirm }: Props) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    } else if (dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] 
                  p-4 animate-fadeIn"
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all 
                    animate-slideUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
      >

        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full 
                        bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2....77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2
            id="delete-confirm-title"
            className="text-xl font-semibold text-gray-900 mb-2"
          >
            Delete Patient
          </h2>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete this patient? This action cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border 
                     border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            className="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 
                     hover:bg-red-700 transition-colors duration-200 shadow-md 
                     hover:shadow-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
