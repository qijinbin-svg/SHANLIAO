import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Shield, 
  Phone, 
  Share2, 
  Bookmark,
  Calendar,
  CheckCircle
} from "lucide-react";
import { mockActivities } from "@/data/mockData";

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const activity = mockActivities.find(a => a.id === id);
  
  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">活动未找到</h2>
          <button
            onClick={() => navigate("/discover")}
            className="text-orange-500 hover:text-orange-600"
          >
            返回发现页
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSignUp = () => {
    alert("报名功能演示：报名成功！我们会尽快与您联系确认活动详情。");
  };

  const handleShare = () => {
    alert("分享功能演示：活动链接已复制到剪贴板");
  };

  const handleBookmark = () => {
    alert("收藏功能演示：活动已添加到收藏夹");
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-orange-50 to-white">
      {/* 活动图片 */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activity.title}
          </motion.h1>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {activity.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 基本信息 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">活动详情</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-800">活动时间</div>
                  <div className="text-gray-600">{formatTime(activity.time)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-800">活动地点</div>
                  <div className="text-gray-600">{activity.location}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-800">参与人数</div>
                  <div className="text-gray-600">{activity.participants.length}/{activity.maxParticipants} 人</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-orange-500">¥</div>
                <div>
                  <div className="font-medium text-gray-800">费用说明</div>
                  <div className="text-gray-600">
                    {activity.price === 0 ? "免费参与" : `报名费 ¥${activity.price}`}
                    <span className="text-sm ml-2">(预计人均消费 ¥{activity.budget})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 安全保障 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            安全保障
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {activity.organizerVerified && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium text-green-800">主办方已认证</div>
                  <div className="text-sm text-green-600">身份真实可靠</div>
                </div>
              </div>
            )}
            
            {activity.safetyInsurance && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium text-blue-800">活动保险覆盖</div>
                  <div className="text-sm text-blue-600">为您的安全保驾护航</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Phone className="w-5 h-5 text-orange-500" />
              <div>
                <div className="font-medium text-orange-800">24小时客服</div>
                <div className="text-sm text-orange-600">随时为您提供帮助</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Star className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium text-purple-800">实名认证参与者</div>
                <div className="text-sm text-purple-600">确保参与者身份真实</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 参与者头像墙 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">已报名的小伙伴</h2>
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: Math.min(activity.participants.length + 3, activity.maxParticipants) }).map((_, index) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {index < activity.participants.length 
                    ? activity.participants[index].nickname.charAt(0)
                    : "?"
                  }
                </div>
                {index >= activity.participants.length && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">+</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            已有 {activity.participants.length} 人报名，还可报名 {activity.maxParticipants - activity.participants.length} 人
          </p>
        </motion.div>

        {/* 操作按钮 */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleSignUp}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
          >
            立即报名
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">分享</span>
            </button>
            
            <button
              onClick={handleBookmark}
              className="flex items-center gap-2 px-4 py-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bookmark className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">收藏</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityDetail;