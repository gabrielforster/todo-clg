import { XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import classes from './styles.module.scss';

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

	const [taskName, setTaskName] = useState<string>();
	const [isCompleted, setIsCompleted] = useState<boolean>();

	useEffect(() => {
		setTaskName(props.task.name);
		setIsCompleted(props.task.isCompleted);
	}, []);

	function handleSave(){
		props.onSave(props.task.id, taskName as string, isCompleted as boolean);
	}

	return (
		<Modal
			isOpen={props.isOpen}
			onRequestClose={props.onClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<div className={classes.modalHeader}>
				<h2>Editar Tarefa!</h2>

				<button
					type="button"
					onClick={props.onClose}
					className="react-modal-close"
				>
					<XCircle />
				</button>
			</div>
			<div className={classes.modalBody}>

				<div className={classes.inputGroup}>
					<label htmlFor="taskName">Nome da Tarefa</label>
					<input
						type="text"
						name="taskName"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
					/>
				</div>

				<div className={classes.checkbox}>
					<label htmlFor="isCompleted">Tarefa concluída?</label>
					<div
						onClick={() => setIsCompleted(!isCompleted)}
						className={classes.switch}
					>
						<input
							name="isCompleted"
							type="checkbox"
							checked={isCompleted}
						/>
						<span className={[classes.slider, classes.round].join(' ')}></span>
					</div>
				</div>
			</div>
			<div className={classes.modalFooter}>
				<button
					className={classes.cancel}
					onClick={props.onClose}
				>
					Cancelar
				</button>

				<button
					className={classes.save}
					onClick={handleSave}
				>
					Salvar
				</button>
			</div>
		</Modal>
	);
};