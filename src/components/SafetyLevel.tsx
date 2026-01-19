import { motion } from "framer-motion";

interface SafetyLevelProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

const SafetyLevel = ({ score, size = "md" }: SafetyLevelProps) => {
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getBgColor = (score: number) => {
    if (score >= 80) return "stroke-green-500";
    if (score >= 60) return "stroke-yellow-500";
    return "stroke-red-500";
  };

  const sizeMap = {
    sm: { width: 80, strokeWidth: 6, fontSize: "text-lg" },
    md: { width: 120, strokeWidth: 8, fontSize: "text-2xl" },
    lg: { width: 160, strokeWidth: 10, fontSize: "text-3xl" }
  };

  const { width, strokeWidth, fontSize } = sizeMap[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={width} height={width} className="transform -rotate-90">
        {/* 背景圆环 */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* 进度圆环 */}
        <motion.circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${getBgColor(score)} transition-colors duration-300`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center ${fontSize} font-bold ${getColor(score)}`}>
        {score}
      </div>
    </div>
  );
};

export default SafetyLevel;