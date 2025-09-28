import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { fetchTodos, toggleTodo, deleteTodo, updateTodo, type Todo } from '../context/TodoContext';
import AddTodoModal from './AddTodoModal';
import TodoItem from './TodoItem';

const TodoContent = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState('');

	const loadTodos = async () => {
		try {
			setLoading(true);
			setError(null);
			const fetchedTodos = await fetchTodos();
			setTodos(fetchedTodos);
			console.log('Todos loaded:', fetchedTodos);
		} catch (err) {
			console.error('Error loading todos:', err);
			setError(err instanceof Error ? err.message : 'Failed to load todos');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTodos();
	}, []);

	const handleTodoAdded = (newTodo: Todo) => {
		setTodos(prevTodos => [newTodo, ...prevTodos]);
	};

	const handleToggleTodo = async (id: string, completed: boolean) => {
		try {
			const updatedTodo = await toggleTodo(id, completed);
			setTodos(prevTodos => 
				prevTodos.map(todo => 
					todo.id === id ? updatedTodo : todo
				)
			);
		} catch (err) {
			console.error('Error toggling todo:', err);
		}
	};

	const handleDeleteTodo = async (id: string) => {
		try {
			await deleteTodo(id);
			setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
		} catch (err) {
			console.error('Error deleting todo:', err);
		}
	};

	const handleEditTodo = (todo: Todo) => {
		setEditingId(todo.id);
		setEditTitle(todo.title);
	};

	const handleSaveEdit = async (id: string) => {
		if (!editTitle.trim()) return;
		
		try {
			const updatedTodo = await updateTodo(id, editTitle.trim());
			setTodos(prevTodos => 
				prevTodos.map(todo => 
					todo.id === id ? updatedTodo : todo
				)
			);
			setEditingId(null);
			setEditTitle('');
		} catch (err) {
			console.error('Error updating todo:', err);
		}
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditTitle('');
	};

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, scale: 0.8, y: 50 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{
					duration: 0.8,
					ease: "easeOut",
					type: "spring",
					stiffness: 100
				}}
				className="relative"
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="absolute inset-0 border-2 border-[#8298b7] rounded-2xl"
				>
					<motion.div
						className="absolute inset-0 border-2 border-[#a0b8d0] rounded-2xl opacity-0"
						animate={{
							opacity: [0, 0.5, 0],
							scale: [1, 1.02, 1]
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.6 }}
					className="relative bg-black/20 backdrop-blur-sm border border-[#8298b7]/30 rounded-2xl
					 p-12 min-w-[600px] min-h-[400px] flex flex-col items-center justify-center"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 200 }}
						className="text-white text-4xl md:text-6xl font-light mb-8"
					>
						Todo System
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.9, duration: 0.6 }}
						className="text-center space-y-4 w-full"
					>
						{loading ? (
							<div className="text-gray-300 text-lg">
								Loading todos...
							</div>
						) : error ? (
							<div className="text-red-400 text-lg">
								Error: {error}
							</div>
						) : todos.length === 0 ? (
							<div className="w-full">
								<p className="text-gray-300 text-lg mb-4">
									Your organized workspace is ready
								</p>
								
								<div className="text-gray-400 text-sm mb-6">
									No tasks yet. Start by adding your first task!
								</div>

								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="border-2 border-[#8298b7] text-white font-light py-2 px-6 rounded-full transition-all 
									duration-300 hover:border-[#a0b8d0] hover:bg-[#8298b7]/10"
									onClick={() => setIsModalOpen(true)}
								>
									Add Your First Task
								</motion.button>
							</div>
						) : (
							<div className="w-full h-full flex flex-col">
								<div className="text-gray-300 text-lg mb-2">
									Your Tasks
								</div>
								
								<div className="text-gray-400 text-sm mb-4">
									{todos.length} {todos.length === 1 ? 'task' : 'tasks'} found
								</div>

								<div 
									className="flex-1 max-h-60 overflow-y-auto space-y-2 mb-4 pr-2 scrollbar-thin scrollbar-track-transparent 
									scrollbar-thumb-[#8298b7]/50 hover:scrollbar-thumb-[#8298b7] scrollbar-thumb-rounded-full"
									style={{
										scrollbarWidth: 'thin',
										scrollbarColor: 'rgba(130, 152, 183, 0.5) transparent'
									}}
								>
									{todos.map((todo, index) => (
										<TodoItem 
										key={todo.id} 
										todo={todo} 
										index={index} 
										handleToggleTodo={handleToggleTodo} 
										handleEditTodo={handleEditTodo} 
										handleSaveEdit={handleSaveEdit} 
										handleCancelEdit={handleCancelEdit} 
										handleDeleteTodo={handleDeleteTodo} 
										editingId={editingId} 
										editTitle={editTitle} 
										setEditTitle={setEditTitle} />
									))}
								</div>

								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="
									border-2 border-[#8298b7] text-white font-light py-2 px-6 rounded-full 
									transition-all duration-300 hover:border-[#a0b8d0] hover:bg-[#8298b7]/10
									"
									onClick={() => setIsModalOpen(true)}
								>
									Add More Tasks
								</motion.button>
							</div>
						)}
					</motion.div>
				</motion.div>
			</motion.div>
			
			<AddTodoModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onTodoAdded={handleTodoAdded}
			/>
		</div>
	)
}

export default TodoContent