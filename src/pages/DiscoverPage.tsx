import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Clock } from "lucide-react";
import ActivityCard from "@/components/ActivityCard";
import { mockActivities } from "@/data/mockData";

const DiscoverPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedTime, setSelectedTime] = useState("全部");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["全部", "运动", "文艺", "美食", "户外", "技能"];
  const timeFilters = ["全部", "今天", "本周", "本月"];

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || activity.tags.includes(selectedCategory);
    
    // 简单的时间过滤逻辑
    const activityDate = new Date(activity.time);
    const now = new Date();
    let matchesTime = true;
    
    if (selectedTime === "今天") {
      matchesTime = activityDate.toDateString() === now.toDateString();
    } else if (selectedTime === "本周") {
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      matchesTime = activityDate <= weekFromNow;
    } else if (selectedTime === "本月") {
      const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      matchesTime = activityDate <= monthFromNow;
    }
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  const handleActivityClick = (activityId: string) => {
    navigate(`/activity/${activityId}`);
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-6 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          发现精彩活动
        </motion.h1>

        {/* 搜索栏 */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索活动..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* 筛选器 */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>筛选</span>
            <span className="text-sm text-gray-500">
              ({selectedCategory !== "全部" || selectedTime !== "全部" ? "已启用" : "未启用"})
            </span>
          </button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white rounded-xl border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">活动分类</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">时间范围</h3>
                  <div className="flex flex-wrap gap-2">
                    {timeFilters.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTime === time
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 智能推荐提示 */}
        <motion.div 
          className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div>
              <h3 className="font-semibold text-orange-800">智能推荐</h3>
              <p className="text-sm text-orange-700">
                基于您的兴趣标签和地理位置，为您推荐最合适的活动
              </p>
            </div>
          </div>
        </motion.div>

        {/* 活动列表 */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ActivityCard
                activity={activity}
                onClick={() => handleActivityClick(activity.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 空状态 */}
        {filteredActivities.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">没有找到相关活动</h3>
            <p className="text-gray-600">试试调整搜索条件或筛选器</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;