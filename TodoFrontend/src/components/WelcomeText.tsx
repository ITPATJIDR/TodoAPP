import TypingAnimation from "./TypingAnimation"

interface WelcomeTextProps {
  messages: string[];
  setIsStarted: (isStarted: boolean) => void;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({ messages, setIsStarted }) => {
  return (
      <div className="text-center space-y-8">
        <TypingAnimation 
          texts={messages}
          typingSpeed={80}
          deletingSpeed={40}
          pauseTime={2500}
          className="mb-8"
        />
        <button 
        onClick={() => setIsStarted(true)}
        className="border-2 border-[#8298b7] text-white font-light py-3 px-8 rounded-full transition-all duration-300 shadow-lg 
        hover:shadow-xl hover:border-[#a0b8d0] hover:bg-[#8298b7]/10">
          Get Started
        </button>
      </div>
  )
}

export default WelcomeText