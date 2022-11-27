import { XCircle } from 'phosphor-react';
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface EditModalProps{
  isOpen: boolean;
  task: {
    id: number;
    name: string;
    isCompleted: boolean;
  };
  onClose: () => void;
  onSave: (id: number, taskName: string, isCompleted: boolean) => void;
}

export const EditModal = (props: EditModalProps) => {

	const [taskName, setTaskName] = useState(props.task.name);
	const [isCompleted, setIsCompleted] = useState(props.task.isCompleted);

	function handleSave(){
		props.onSave(props.task.id, taskName, isCompleted);
	}

	return (
		<Modal
			isOpen={props.isOpen}
			onRequestClose={props.onClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<div className="modal-header">
				<h2>Editar Tarefa!</h2>

				<button
					type="button"
					onClick={props.onClose}
					className="react-modal-close"
				>
					<XCircle />
				</button>
			</div>
			<div className="modal-body">
				<input
					type="text"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>

				<div className="checkbox">
					<input
						type="checkbox"
						checked={isCompleted}
						onChange={(e) => setIsCompleted(e.target.checked)}
					/>
				</div>
			</div>
			<div className="modal-footer">
				<button onClick={props.onClose}>Cancelar</button>
				<button onClick={handleSave}>Salvar</button>
			</div>
		</Modal>
	);
};