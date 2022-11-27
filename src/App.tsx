import { useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import classes from './app.module.scss';
import { TaskRow } from './components/TaskRow';
import { Filter } from './components/Filter';
import { filterOptions } from './constants/filterOptions';
import { EditModal } from './components/EditModal';
import { DeleteModal } from './components/DeleteModal';

interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

function App() {

	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoName, setNewTodoName] = useState<string>('');
	const [filter, setFilter] = useState('all');

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	
	const [selectedTask, setSelectedTask] = useState<Todo>({} as Todo);

	function getTodos() {
		if (filter === 'completed') {
			return todos.filter((todo) => todo.isCompleted);
		}

		if (filter === 'uncompleted') {
			return todos.filter((todo) => !todo.isCompleted);
		}

		return todos;
	}

	function handleAddTodo(){
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

	function handleToggleCheck(taskId: number){
		const updatedTodos = todos.map(todo => {
			if (todo.id === taskId) {
				return {...todo, isCompleted: !todo.isCompleted};
			}
			return todo;
		});
		setTodos(updatedTodos);
	}

	function handleOpenEdit(taskId: number){
		const selectedTask = todos.find(todo => todo.id === taskId);
		setSelectedTask(selectedTask as Todo);
		setIsEditModalOpen(true);
	}

	function handleOpenDelete(taskId: number){
		const selectedTask = todos.find(todo => todo.id === taskId);
		setSelectedTask(selectedTask as Todo);
		setIsDeleteModalOpen(true);
	}

	function handleSaveEditTask(taskId: number, taskName: string, isCompleted: boolean){
		const updatedTodos = todos.map(todo => {
			if (todo.id === taskId) {
				return {...todo, name: taskName, isCompleted: isCompleted};
			}
			return todo;
		});
		setTodos(updatedTodos);
		setIsEditModalOpen(false);
	}

	function handleDeleteTask(taskId: number){
		const updatedTodos = todos.filter(todo => todo.id !== taskId);
		setTodos(updatedTodos);
		setIsDeleteModalOpen(false);
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
				{getTodos().length
					? getTodos().map((todo) => (
						<TaskRow
							key={todo.id}
							task={todo}
							onEdit={handleOpenEdit}
							onDelete={handleOpenDelete}
							toggleCheck={handleToggleCheck}
						/>
					))
					: <p className={classes.empty}>Sem tarefas</p>
				}
			</section>

			<EditModal
				isOpen={isEditModalOpen}
				task={selectedTask}
				onClose={() => setIsEditModalOpen(false)}
				onSave={handleSaveEditTask}
			/>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				task={selectedTask}
				onClose={() => setIsDeleteModalOpen(false)}
				onDelete={handleDeleteTask}
			/>
		</div>
	);
}

export default App;
