import {Props} from"../lib/interfaces";
  

const DeleteConfirmModal = ({ onClose, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-[300px]">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this patient?
        </h2>

        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>

          <button
            className="bg-gray-300 px-4 py-1 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
