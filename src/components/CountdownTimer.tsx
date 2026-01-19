import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  initialTime: number; // 初始时间（秒）
  onTimeUp: () => void;
  onExtendRequest: () => void;
}

const CountdownTimer = ({ initialTime, onTimeUp, onExtendRequest }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    if (timeLeft <= 30) {
      setIsWarning(true);
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / initialTime) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">聊天倒计时</h3>
        <motion.button
          onClick={onExtendRequest}
          className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          申请延时
        </motion.button>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <motion.div
            className={`h-3 rounded-full transition-colors duration-300 ${
              isWarning ? "bg-red-500" : "bg-orange-500"
            }`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
        
        <div className="text-center">
          <motion.div
            className={`text-4xl font-bold ${
              isWarning ? "text-red-500" : "text-orange-500"
            }`}
            animate={{ scale: isWarning ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: isWarning ? Infinity : 0 }}
          >
            {formatTime(timeLeft)}
          </motion.div>
          <p className="text-sm text-gray-600 mt-1">
            {isWarning ? "时间快到了！" : "享受聊天时光"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;