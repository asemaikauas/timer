import { useState, useEffect } from 'react';

export default function BeginnerTimer() {
  const [name, setName] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  const motivationalPhrases = [
    "Ты можешь это сделать! 💪",
    "Не сдавайся, чемпион! 🏆",
    "Ещё немного и победа! 🔥",
    "Ты настоящий боец! ⚡",
    "Продолжай, ты молодец! ✨",
    "Сила воли — твое оружие! 🗡️",
    "Ты сильнее, чем думаешь! 💎",
    "Каждая секунда приближает к цели! 🎯",
    "Ты — герой этого момента! 🦸",
    "Невозможное становится возможным! 🌟"
  ];

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          if (newTime === 6 && !motivationalPhrase) {
            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            setMotivationalPhrase(randomPhrase);
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, motivationalPhrase, motivationalPhrases]);

  const startTimer = () => {
    if (name.trim()) {
      setIsRunning(true);
      setIsCompleted(false);
      setMotivationalPhrase('');
    }
  };

  const resetTimer = () => {
    setName('');
    setTimeLeft(10);
    setIsRunning(false);
    setIsCompleted(false);
    setMotivationalPhrase('');
  };

  const tryAgain = () => {
    setTimeLeft(10);
    setIsRunning(false);
    setIsCompleted(false);
    setMotivationalPhrase('');
  };

  return (
    <>
      <style>{`
        :root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.5;
          font-weight: 400;
          color-scheme: light dark;
          color: rgba(255, 255, 255, 0.87);
          background-color: #1a1a1a;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 320px;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        }

        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
          background: #ffffff;
        }

        .timer-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          max-width: 600px;
        }

        .timer-title {
          font-size: 2.5rem;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #646cff, #535bf2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          text-align: center;
        }

        .timer-subtitle {
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-bottom: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
        }

        .timer-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.87);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .timer-input:focus {
          outline: none;
          border-color: #646cff;
          box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.3);
        }

        .timer-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .timer-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .countdown-display {
          text-align: center;
          margin: 2rem 0;
        }

        .countdown-number {
          font-size: 4rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        .countdown-status {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin: 1.5rem 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #646cff, #535bf2);
          transition: width 1s ease;
          border-radius: 4px;
        }

        .button-group {
          display: flex;
          gap: 1rem;
        }

        .timer-button {
          flex: 1;
          border-radius: 12px;
          border: 2px solid transparent;
          padding: 0.8em 1.6em;
          font-size: 1rem;
          font-weight: 600;
          font-family: inherit;
          background-color: #2d2d2d;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .timer-button:hover:not(:disabled) {
          border-color: #646cff;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .timer-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.3);
        }

        .timer-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button-primary {
          background: linear-gradient(45deg, #22c55e, #16a34a);
        }

        .button-secondary {
          background: linear-gradient(45deg, #ef4444, #dc2626);
        }

        .button-accent {
          background: linear-gradient(45deg, #646cff, #535bf2);
        }

        .completion-screen {
          text-align: center;
        }

        .completion-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .completion-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 1rem;
        }

        .motivation-phrase {
          background: linear-gradient(45deg, #f59e0b, #f97316);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          margin: 1rem 0;
          font-weight: 600;
          text-align: center;
          animation: slideIn 0.5s ease-out;
        }

        .running-status {
          background: linear-gradient(45deg, #646cff, #535bf2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          display: inline-block;
          margin-top: 0.5rem;
        }

        .try-again-button {
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          margin-right: 1rem;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-color-scheme: light) {
          :root {
            color: #213547;
            background-color: #ffffff;
          }
          
          .app-container {
            background: #ffffff;
          }
          
          .timer-card {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
            color: #213547;
          }

          .timer-subtitle {
            color: rgba(33, 53, 71, 0.7);
          }

          .input-label {
            color: rgba(33, 53, 71, 0.8);
          }

          .timer-input {
            background-color: rgba(255, 255, 255, 0.8);
            color: #213547;
            border-color: rgba(0, 0, 0, 0.1);
          }

          .timer-input::placeholder {
            color: rgba(33, 53, 71, 0.4);
          }

          .countdown-number {
            color: #213547;
          }

          .countdown-status {
            color: rgba(33, 53, 71, 0.6);
          }

          .progress-bar {
            background-color: rgba(0, 0, 0, 0.1);
          }

          .timer-button {
            background-color: #ffffff;
            color: #213547;
            border: 2px solid #e9ecef;
          }

          .completion-message {
            color: rgba(33, 53, 71, 0.7);
          }

          .motivation-phrase {
            color: white;
          }

          .running-status {
            color: white;
          }
        }
      `}</style>
      
      <div className="app-container">
        <div className="timer-card">
          <div>
            <h1 className="timer-title">Таймер</h1>
          </div>

          {!isCompleted ? (
            <div>
              <div className="input-group">
                <label className="input-label">
                  Введи своё имя:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как тебя зовут?"
                  disabled={isRunning}
                  className="timer-input"
                />
              </div>

              {isRunning && motivationalPhrase && (
                <div className="motivation-phrase">
                  {motivationalPhrase}
                </div>
              )}

              <div className="countdown-display">
                <div className="countdown-number">
                  {timeLeft}
                </div>
                <div className="countdown-status">
                  {isRunning ? 'Идёт обратный отсчёт...' : 'Готов к запуску!'}
                </div>
                {isRunning && name && (
                  <div className="running-status">
                    {name}, осталось {timeLeft} сек
                  </div>
                )}
              </div>

              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
                ></div>
              </div>

              <div className="button-group">
                <button
                  onClick={startTimer}
                  disabled={!name.trim() || isRunning}
                  className="timer-button button-primary"
                >
                  {isRunning ? 'Идёт...' : 'Старт таймера'}
                </button>
                
                <button
                  onClick={resetTimer}
                  className="timer-button button-secondary"
                >
                  Сброс
                </button>
              </div>
            </div>
          ) : (
            <div className="completion-screen">
              <h2 className="completion-title">
                Ты справился, {name}!
              </h2>
              <div className="button-group">
                <button
                  onClick={tryAgain}
                  className="timer-button try-again-button"
                >
                  🎯 Попробовать ещё раз
                </button>
                <button
                  onClick={resetTimer}
                  className="timer-button button-accent"
                >
                  🔄 Полный сброс
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}