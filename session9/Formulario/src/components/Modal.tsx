import { JSX } from "react";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { FormattedMessage } from "react-intl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalFinal(props: ModalProps): JSX.Element {
  return (
    <Dialog open={props.isOpen} onClose={props.onClose} className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <DialogPanel className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
        <DialogTitle className="text-lg font-semibold text-gray-900">
          <FormattedMessage id="app.modal.title" defaultMessage="Pregunta importante para acabar" />
        </DialogTitle>
        <Description className="mt-2 text-gray-600">
          <FormattedMessage id="app.modal.description" defaultMessage="¿Realmente deseas hacer finalizar las tareas de DIRI?" />
        </Description>
        <p className="mt-4 text-sm text-gray-700">
          <FormattedMessage id="app.modal.details" defaultMessage="Esta és la última materia de DIRI, después de esto debes hacer el pequeño proyecto para la asignatura. Verás que sólo puedes contestar que sí." />
        </p>
        <div className="mt-6 flex justify-end">
          <button onClick={props.onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
            <FormattedMessage id="app.modal.confirm" defaultMessage="Sí, claro" />
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default ModalFinal;