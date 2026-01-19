import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, UserPlus, Calendar, Eye, EyeOff } from "lucide-react";
import StarRating from "@/components/StarRating";

const EvaluationPage = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState(0);
  const [match, setMatch] = useState(0);
  const [impression, setImpression] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [relationshipChoice, setRelationshipChoice] = useState<string>("");
  const [comment, setComment] = useState("");

  const quickTags = [
    "友善", "有趣", "健谈", "幽默", "真诚",
    "知识渊博", "耐心", "体贴", "开朗", "成熟"
  ];

  const relationshipOptions = [
    { id: "friend", label: "加为聊友", icon: UserPlus, description: "继续在线交流" },
    { id: "offline", label: "发起线下邀约", icon: Calendar, description: "参加线下活动" },
    { id: "none", label: "不再联系", icon: EyeOff, description: "结束此次交流" }
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (experience === 0 || match === 0 || impression === 0) {
      alert("请完成所有评分项");
      return;
    }
    
    // 模拟提交评价
    setTimeout(() => {
      navigate("/discover");
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-6 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          聊后评价
        </motion.h1>

        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* 多维度评价 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
              请为这次聊天体验评分
            </h2>
            
            <StarRating
              title="整体体验"
              rating={experience}
              onRatingChange={setExperience}
              size="lg"
            />
            
            <StarRating
              title="匹配度"
              rating={match}
              onRatingChange={setMatch}
              size="lg"
            />
            
            <StarRating
              title="第一印象"
              rating={impression}
              onRatingChange={setImpression}
              size="lg"
            />
          </div>

          {/* 快捷评价标签 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              选择适合对方的标签
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                    selectedTags.includes(tag)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center mt-3">
              已选择 {selectedTags.length} 个标签
            </p>
          </div>

          {/* 关系选择 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              关系沉淀选择
            </h3>
            <div className="grid gap-4">
              {relationshipOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setRelationshipChoice(option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      relationshipChoice === option.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-orange-200"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-orange-500" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-800">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      relationshipChoice === option.id
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300"
                    }`}>
                      {relationshipChoice === option.id && (
                        <div className="w-full h-full rounded-full bg-white border-2 border-orange-500"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 匿名评价选项 */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setAnonymous(!anonymous)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  anonymous
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {anonymous && (
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                )}
              </button>
              <div className="flex items-center gap-2">
                {anonymous ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
                <span className="text-gray-800 font-medium">
                  {anonymous ? "匿名评价" : "公开评价"}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
              {anonymous 
                ? "对方将无法看到您的身份信息" 
                : "对方可以看到您的基本信息"}
            </p>
          </div>

          {/* 评论输入 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              想说的话（可选）
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="分享您的聊天感受，或给对方一些建议..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows={4}
            />
          </div>

          {/* 提交按钮 */}
          <div className="text-center">
            <motion.button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              提交评价
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EvaluationPage;