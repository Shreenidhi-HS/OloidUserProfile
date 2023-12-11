import React from "react";

interface DeleteButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ isActive, onClick }) => {
  return (
    <div
      className={`flex items-center p-[0.563rem] border rounded-[0.5rem] w-[2.375rem] h-[2.375rem] cursor-pointer ${
        isActive ? "border-[#D0390B] bg-white" : "border-[#D0D5DD] bg-[#ECEAEA]"
      }`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        className={`${isActive ? "fill-[#D0390B]" : ""}`}
      >
        <g data-name="Group 36766">
          <g data-name="Delete Icon">
            <path
              d="M6.763 19.541a3.775 3.775 0 0 1-3.8-3.745V5.567h-.956a.808.808 0 1 1 0-1.616h3.6v-.787A2.728 2.728 0 0 1 8.358.459h3.287a2.74 2.74 0 0 1 2.763 2.705v.787h3.593a.808.808 0 1 1 0 1.616h-.955v10.229a3.781 3.781 0 0 1-3.811 3.745Zm-2.158-3.745a2.14 2.14 0 0 0 2.158 2.13h6.472a2.149 2.149 0 0 0 2.167-2.13V5.567H4.605ZM7.248 3.164v.787h5.517v-.787a1.112 1.112 0 0 0-1.12-1.091H8.358a1.1 1.1 0 0 0-1.11 1.091Zm3.709 10.785v-4.4a.822.822 0 0 1 1.644 0v4.4a.822.822 0 0 1-1.644 0Zm-3.559 0v-4.4a.824.824 0 0 1 1.648 0v4.4a.824.824 0 0 1-1.648 0Z"
              data-name="Union 41"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default DeleteButton;
