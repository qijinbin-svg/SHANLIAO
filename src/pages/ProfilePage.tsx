import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, MapPin, Calendar, Award, Heart, Camera, Palette, Music, Book, Coffee } from "lucide-react";
import { mockUsers } from "@/data/mockData";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = mockUsers[0]; // 使用第一个用户作为当前用户

  const getTagColor = (index: number) => {
    const colors = [
      "bg-orange-100 text-orange-600",
      "bg-blue-100 text-blue-600", 
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-yellow-100 text-yellow-600"
    ];
    return colors[index % colors.length];
  };

  const getTagSize = (length: number) => {
    if (length <= 2) return "text-lg px-4 py-2";
    if (length <= 4) return "text-base px-3 py-1";
    return "text-sm px-2 py-1";
  };

  const getInterestIcon = (interest: string) => {
    const iconMap: { [key: string]: any } = {
      "摄影": Camera,
      "绘画": Palette,
      "音乐": Music,
      "读书": Book,
      "咖啡": Coffee
    };
    return iconMap[interest] || Heart;
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-6 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* 个人资料头部 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* 头像 */}
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.nickname}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full">
                <Award className="w-4 h-4" />
              </div>
            </div>
            
            {/* 基本信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentUser.nickname}</h1>
              <p className="text-gray-600 mb-2">{currentUser.career} · {currentUser.age}岁</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{currentUser.location.city}</span>
                <span>•</span>
                <span>信用分 {currentUser.creditScore}</span>
                <span>•</span>
                <span>安全等级 {currentUser.safetyLevel}</span>
              </div>
            </div>
            
            {/* 编辑按钮 */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? "保存" : "编辑"}
            </button>
          </div>
        </motion.div>

        {/* 三维标签系统 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">我的标签</h2>
          
          {/* 身份标签 */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              身份标签
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentUser.tags.identity.map((tag, index) => (
                <span
                  key={tag}
                  className={`${getTagColor(index)} ${getTagSize(tag.length)} rounded-full font-medium`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 兴趣技能标签 */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              兴趣技能
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentUser.tags.interests.map((tag, index) => {
                const Icon = getInterestIcon(tag);
                return (
                  <span
                    key={tag}
                    className={`${getTagColor(index + 2)} ${getTagSize(tag.length)} rounded-full font-medium flex items-center gap-1`}
                  >
                    <Icon className="w-4 h-4" />
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>

          {/* 情绪状态标签 */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              当前状态
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className={`${getTagColor(4)} ${getTagSize(currentUser.tags.mood.length)} rounded-full font-medium`}>
                {currentUser.tags.mood}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 个人统计 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">个人统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-500 mb-1">12</div>
              <div className="text-sm text-gray-600">参与活动</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-500 mb-1">28</div>
              <div className="text-sm text-gray-600">聊天次数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-500 mb-1">4.8</div>
              <div className="text-sm text-gray-600">平均评分</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-500 mb-1">15</div>
              <div className="text-sm text-gray-600">好友数量</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;