import { Props } from "../lib/interfaces";

const DeleteConfirmModal = ({ onClose, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] 
                  p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all 
                    animate-slideUp">
        
        {/* Icon & Title */}
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full 
                        bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Delete Patient
          </h3>
          
          <p className="text-gray-600 text-sm">
            Are you sure you want to delete this patient? This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3">
          <button
            className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border 
                     border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
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