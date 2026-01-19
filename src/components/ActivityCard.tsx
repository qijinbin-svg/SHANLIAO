import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { Activity } from "@/types";

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      {/* 活动图片 */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        {activity.organizerVerified && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Star className="w-3 h-3" fill="currentColor" />
            已认证
          </div>
        )}
        {activity.safetyInsurance && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            有保险
          </div>
        )}
      </div>

      {/* 活动信息 */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {activity.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            {formatTime(activity.time)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
            {activity.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2 text-orange-500" />
            {activity.participants.length}/{activity.maxParticipants} 人
          </div>
        </div>

        {/* 价格信息 */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-orange-500">
            {activity.price === 0 ? "免费" : `¥${activity.price}`}
          </div>
          <div className="text-sm text-gray-500">
            预算约 ¥{activity.budget}
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {activity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {activity.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{activity.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;