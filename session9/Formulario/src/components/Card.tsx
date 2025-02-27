import { useState } from "react";
import ModalFinal from "./Modal";
import { FormattedMessage } from "react-intl";

const Card: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>    
      <div>
        <button onClick={() => setIsModalOpen(true)} className="border rounded-2xl bg-red-700 text-white shadow-sm p-1 px-2 m-2">
        <FormattedMessage id="app.button.buttonText" />
        </button>
      </div>
      <ModalFinal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Card;