import Modal from 'react-modal';
import { XCircle} from 'phosphor-react';
import { useState } from 'react';

Modal.setAppElement('#root');

interface DeleteModalProps{
  isOpen: boolean;
  task: {
    id: number;
    name: string;
    isCompleted: boolean;
  };
  onClose: () => void;
  onDelete: (id: number) => void;
}

export const DeleteModal = (props: DeleteModalProps) => {

	return (
		<>
			<Modal
				isOpen={props.isOpen}
				onRequestClose={props.onClose}
				className="react-modal-content"
				overlayClassName="react-modal-overlay"
			>
				<div className="modal-header">
					<h2>Deletar Tarefa!</h2>

					<button
						type="button"
						onClick={props.onClose}
						className="react-modal-close"
					>
						<XCircle />
					</button>
				</div>
				<div className="modal-body">
					<p>Tem certeza que deseja deletar a tarefa <strong>{props.task.name}</strong>?</p>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						onClick={props.onClose}
					>
            Não, cancelar
					</button>
					<button
						type="button"
						onClick={() => props.onDelete(props.task.id)}
					>
            Sim, deletar
					</button>
				</div>
			</Modal>
		</>
	);
};