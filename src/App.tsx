import { useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import classes from './app.module.scss';
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
					<div key={todo.id} className={classes.task}>
						<div className={classes.taskName}>{todo.name}</div>
						<div className={classes.taskActions}>
							<div className={classes.taskAction}>Edit</div>
							<div className={classes.taskAction}>Delete</div>
						</div>
					</div>
				))}
			</section>
		</div>
	);
}

export default App;
