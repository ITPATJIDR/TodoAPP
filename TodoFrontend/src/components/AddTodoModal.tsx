import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaSpinner } from 'react-icons/fa';
import { addTodo, type Todo } from '../context/TodoContext';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTodoAdded: (todo: Todo) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose, onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const newTodo = await addTodo(title.trim());
      onTodoAdded(newTodo);
      setTitle('');
      onClose();
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-[#08090e] backdrop-blur-md border-[#8298b7] border-2  rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
            style={{
              boxShadow: '0 0 30px rgba(130, 152, 183, 0.3), inset 0 0 30px rgba(130, 152, 183, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(130, 152, 183, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(130, 152, 183, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative z-10 text-center mb-6">
              <h2 className="text-2xl font-mono text-white mb-2 tracking-wider">
                ADD NEW TASK
              </h2>
              <p className="text-white text-sm font-mono">
                What would you like to accomplish?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your task..."
                  className="w-full px-4 py-3 bg-black/50 border-2 border-[#8298b7]/30 rounded-none text-[#c0cdde] 
                  placeholder-[#8298b7]/50 focus:outline-none focus:border-[#8298b7] focus:bg-black/70 transition-all duration-300 font-mono"
                  style={{
                    boxShadow: 'inset 0 0 10px rgba(130, 152, 183, 0.1)'
                  }}
                  disabled={loading}
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 font-mono"
                  >
                    ERROR: {error}
                  </motion.p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border-2 border-[#8298b7]/30 text-white rounded-none 
                  hover:border-[#8298b7] hover:bg-[#8298b7]/10 transition-all duration-200 font-mono"
                  style={{
                    boxShadow: '0 0 10px rgba(130, 152, 183, 0.2)'
                  }}
                  disabled={loading}
                >
                  CANCEL
                </motion.button>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading || !title.trim()}
                  className="flex-1 px-4 py-2 bg-[#8298b7]/20 border-2 border-[#8298b7] text-white rounded-none 
                  hover:bg-[#8298b7]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-mono"
                  style={{
                    boxShadow: '0 0 15px rgba(130, 152, 183, 0.4)'
                  }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="w-4 h-4 animate-spin mr-2 text-[#8298b7]" />
                      PROCESSING...
                    </div>
                  ) : (
                    'ADD TASK'
                  )}
                </motion.button>
              </div>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTodoModal;
