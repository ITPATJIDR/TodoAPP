import { useState } from 'react';
import WelcomeText from './components/WelcomText';
import TodoContent from './components/TodoContent';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const todoMessages = [
    "HI",
    "Welcome to Todo System",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      { isStarted ? (
        <TodoContent />
      ) : (
        <WelcomeText messages={todoMessages} setIsStarted={setIsStarted} />
      )}
    </div>
  )
}

export default App
