import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

interface EditModalProps{
  isOpen: boolean;
  task: {
    id: number;
    name: string;
    isCompleted: boolean;
  };
  onClose: () => void;
  onSave: () => void;
}

export const EditModal = (props: EditModalProps) => {

	const [taskName, setTaskName] = useState(props.task.name);
	const [isCompleted, setIsCompleted] = useState(props.task.isCompleted);

	return (
		<Modal
			isOpen={props.isOpen}
			onRequestClose={props.onClose}
			contentLabel="Example Modal"
			className="modal"
			overlayClassName="overlay"
		>
			<div className="modal-header">
				<h2>Editar Tarefa!</h2>
			</div>
			<div className="modal-body">
				<input
					type="text"
					value={props.task.name}
					onChange={(e) => setTaskName(e.target.value)}
				/>

				<div className="checkbox">
					<input
						type="checkbox"
						checked={props.task.isCompleted}
						onChange={(e) => setIsCompleted(e.target.checked)}
					/>
				</div>
			</div>
			<div className="modal-footer">
				<button onClick={props.onClose}>Cancelar</button>
				<button onClick={props.onSave}>Salvar</button>
			</div>
		</Modal>
	);
};