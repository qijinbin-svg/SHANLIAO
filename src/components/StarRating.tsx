import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface StarRatingProps {
  title: string;
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ title, rating, onRatingChange, size = "md" }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  return (
    <div className="text-center mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={`transition-all duration-200 ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 scale-110"
                : "text-gray-300 hover:text-yellow-200"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Star className={sizeClasses[size]} fill="currentColor" />
          </motion.button>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {rating === 0 ? "点击星星评分" : `您的评分：${rating}星`}
      </p>
    </div>
  );
};

export default StarRating;