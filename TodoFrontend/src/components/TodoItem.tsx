import { motion } from 'motion/react';
import { 
	FaCheck, 
	FaEdit, 
	FaTrash, 
	FaCheckCircle, 
	FaTimes 
} from 'react-icons/fa';
import type { Todo } from '../context/TodoContext';

interface TodoItemProps {
	todo: Todo;
	index: number;
	editingId: string | null;
	editTitle: string;
	setEditTitle: (title: string) => void;
	handleToggleTodo: (id: string, completed: boolean) => void;
	handleEditTodo: (todo: Todo) => void;
	handleSaveEdit: (id: string) => void;
	handleCancelEdit: () => void;
	handleDeleteTodo: (id: string) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({ todo, index, handleToggleTodo, handleEditTodo, handleSaveEdit, handleCancelEdit, handleDeleteTodo, editingId, editTitle, setEditTitle }) => {
	return (
		<motion.div
			key={todo.id}
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: index * 0.1 }}
			className="bg-white/10 rounded-lg p-3 text-left hover:bg-white/15 transition-colors duration-200 group"
		>
			<div className="flex items-center space-x-3">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => handleToggleTodo(todo.id, !todo.completed)}
					className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${todo.completed
							? 'bg-[#8298b7] border-[#8298b7]'
							: 'border-[#8298b7]/50 hover:border-[#8298b7]'
						}`}
					style={{
						boxShadow: todo.completed ? '0 0 10px rgba(130, 152, 183, 0.3)' : 'none'
					}}
				>
					{todo.completed && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="w-full h-full flex items-center justify-center"
						>
							<FaCheck className="w-2 h-2 text-black" />
						</motion.div>
					)}
				</motion.button>

				{editingId === todo.id ? (
					<div className="flex-1 flex items-center space-x-2">
						<input
							type="text"
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleSaveEdit(todo.id);
								if (e.key === 'Escape') handleCancelEdit();
							}}
							className="flex-1 px-2 py-1 bg-black/50 border border-[#8298b7]/30 rounded 
							text-[#c0cdde] placeholder-[#8298b7]/50 focus:outline-none focus:border-[#8298b7] 
							focus:bg-black/70 transition-all duration-300 font-mono text-sm"
							style={{
								boxShadow: 'inset 0 0 5px rgba(130, 152, 183, 0.1)'
							}}
							autoFocus
						/>
					</div>
				) : (
					<span className={`text-white flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
						{todo.title}
					</span>
				)}

				<div className="flex items-center space-x-2">
					{!todo.completed && editingId !== todo.id && (
						<div className="text-xs text-[#8298b7]/70 font-mono">
							PENDING
						</div>
					)}

					{editingId === todo.id ? (
						<div className="flex items-center space-x-1">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => handleSaveEdit(todo.id)}
								disabled={!editTitle.trim()}
								className="p-1 rounded hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
								title="Save changes"
							>
								<FaCheckCircle className="w-4 h-4 text-green-400" />
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleCancelEdit}
								className="p-1 rounded hover:bg-gray-500/20"
								title="Cancel edit"
							>
								<FaTimes className="w-4 h-4 text-gray-400" />
							</motion.button>
						</div>
					) : (
						<div className="flex items-center space-x-1">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => handleEditTodo(todo)}
								className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
								p-1 rounded hover:bg-[#8298b7]/20"
								title="Edit todo"
							>
								<FaEdit className="w-4 h-4 text-[#8298b7]" />
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => handleDeleteTodo(todo.id)}
								className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
								p-1 rounded hover:bg-red-500/20"
								title="Delete todo"
							>
								<FaTrash className="w-4 h-4 text-red-400" />
							</motion.button>
						</div>
					)}
				</div>
			</div>
		</motion.div>

	)
}

export default TodoItem