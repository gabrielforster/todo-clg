import { PencilSimple, TrashSimple } from 'phosphor-react';

import classes from './styles.module.scss';

interface TaskRowProps {
  task: {
    id: number;
    name: string;
    isCompleted: boolean;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskRow = (props: TaskRowProps) => {
	return (
		<>
			<div className={classes.taskContainer}>
				<div className={classes.taskName}>{props.task.name}</div>
				<div className={classes.taskActions}>
					<div className={classes.taskAction}>
						<PencilSimple size={32} onClick={() => props.onEdit(props.task.id)} />
					</div>
					<div className={classes.taskAction}>
						<TrashSimple size={32} onClick={() => props.onDelete(props.task.id)} />
					</div>
				</div>
			</div>
		</>
	);
};
