import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, Play, Loader2 } from "lucide-react";
import TagSelector from "@/components/TagSelector";
import { interestTags, identityTags, moodTags } from "@/data/mockData";

const MatchPage = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedIdentities, setSelectedIdentities] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [locationRange, setLocationRange] = useState(10);
  const [isMatching, setIsMatching] = useState(false);

  const handleInterestToggle = (tag: string) => {
    setSelectedInterests(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleIdentityToggle = (tag: string) => {
    setSelectedIdentities(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(selectedMood === mood ? "" : mood);
  };

  const handleMatch = async () => {
    setIsMatching(true);
    // 模拟匹配过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsMatching(false);
    navigate("/chat");
  };

  const allInterests = Object.values(interestTags).flat();

  return (
    <div className="min-h-screen pb-20 pt-6 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          开始匹配
        </motion.h1>

        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* 兴趣标签配置 */}
          <TagSelector
            title="选择你的兴趣爱好"
            tags={allInterests}
            selectedTags={selectedInterests}
            onTagToggle={handleInterestToggle}
            color="orange"
          />

          {/* 身份标签配置 */}
          <TagSelector
            title="选择身份标签"
            tags={identityTags}
            selectedTags={selectedIdentities}
            onTagToggle={handleIdentityToggle}
            color="blue"
          />

          {/* 情绪状态选择 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">当前心情状态</h3>
            <div className="flex flex-wrap gap-3">
              {moodTags.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                    selectedMood === mood
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-green-300"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* 地理位置设置 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              位置范围设置
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="50"
                value={locationRange}
                onChange={(e) => setLocationRange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-orange-500 min-w-16">
                {locationRange}km
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              搜索范围：{locationRange}公里内的用户
            </p>
          </div>

          {/* 匹配按钮 */}
          <div className="text-center">
            <motion.button
              onClick={handleMatch}
              disabled={isMatching || (selectedInterests.length === 0 && selectedIdentities.length === 0 && !selectedMood)}
              className={`w-64 h-64 rounded-full text-white text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isMatching
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl"
              }`}
              whileHover={{ scale: isMatching ? 1 : 1.05 }}
              whileTap={{ scale: isMatching ? 1 : 0.95 }}
            >
              {isMatching ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span>匹配中...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Users className="w-8 h-8" />
                  <span>一键匹配</span>
                </div>
              )}
            </motion.button>
            <p className="text-sm text-gray-600 mt-4">
              {selectedInterests.length + selectedIdentities.length + (selectedMood ? 1 : 0)} 个标签已选择
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MatchPage;