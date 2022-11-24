import { useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import classes from './app.module.scss';
import { TaskRow } from './components/TaskRow';
import { Filter } from './components/Filter';
import { filterOptions } from './constants/filterOptions';

interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

function App() {

	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoName, setNewTodoName] = useState<string>('');
	const [filter, setFilter] = useState('all');

	function handleAddTodo(){
		console.log('sdnasnjkd');
		if (newTodoName) {
			setTodos([
				...todos,
				{
					id: todos.length + 1,
					name: newTodoName,
					isCompleted: false,
				},
			]);
			setNewTodoName('');
		}
	}

	function handleOpenEdit(taskId){
		console.log(taskId);
	}

	function handleOpenDelete(taskId){
		console.log(taskId);
	}

	return (
		<div className={classes.container}>
			<section className={classes.header}>
				<div className={classes.inputArea}>
					<input
						type="text"
						value={newTodoName}
						onChange={(e) => setNewTodoName(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleAddTodo();
							}
						}}
					/>
					<div onClick={handleAddTodo} className={classes.plus}>
						<PlusCircle size={32} color="#FFF" />
					</div>
				</div>
				<Filter value={filter} onChange={setFilter} options={filterOptions} />
			</section>

			<section className={classes.tasks}>
				{todos.map((todo) => (
					<TaskRow
						key={todo.id}
						task={todo}
						onEdit={handleOpenEdit}
						onDelete={handleOpenDelete}
					/>
				))}
			</section>
		</div>
	);
}

export default App;
