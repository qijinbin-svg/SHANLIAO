import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  UserCheck, 
  Phone, 
  MapPin, 
  BookOpen,
  Star,
  Clock,
  UserPlus,
  Settings
} from "lucide-react";
import SafetyLevel from "@/components/SafetyLevel";
import { mockUsers } from "@/data/mockData";

const SafetyCenter = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const currentUser = mockUsers[0];

  const safetyFeatures = [
    {
      id: "verification",
      title: "实名认证",
      description: "验证您的真实身份，提高可信度",
      icon: UserCheck,
      status: false,
      points: 20
    },
    {
      id: "emergency",
      title: "紧急联系人",
      description: "设置紧急联系人，保障您的安全",
      icon: Phone,
      status: false,
      points: 15
    },
    {
      id: "location",
      title: "行程分享",
      description: "分享您的活动行程给信任的人",
      icon: MapPin,
      status: true,
      points: 10
    },
    {
      id: "education",
      title: "安全知识学习",
      description: "学习社交安全知识，提高防范意识",
      icon: BookOpen,
      status: false,
      points: 15
    }
  ];

  const safetyTips = [
    {
      title: "首次见面选择公共场所",
      content: "建议选择咖啡厅、公园等公共场所进行首次见面，避免私密空间。"
    },
    {
      title: "告知朋友您的行程",
      content: "参加活动前，请告知朋友您的行程安排和活动地点。"
    },
    {
      title: "保持通讯畅通",
      content: "确保手机电量充足，保持与外界的通讯联系。"
    },
    {
      title: "信任您的直觉",
      content: "如果感觉不对劲，请立即离开现场并寻求帮助。"
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    if (featureId === "verification") {
      alert("实名认证：请输入您的真实姓名和身份证号码进行验证。");
    } else if (featureId === "emergency") {
      alert("紧急联系人：请设置1-3位紧急联系人的姓名和电话号码。");
    } else if (featureId === "location") {
      alert("行程分享功能已启用，您的活动行程将自动分享给紧急联系人。");
    } else if (featureId === "education") {
      alert("安全知识：正在为您准备安全知识学习内容...");
    }
  };

  const getSafetyLevelText = (score: number) => {
    if (score >= 80) return { text: "安全等级高", color: "text-green-500" };
    if (score >= 60) return { text: "安全等级中等", color: "text-yellow-500" };
    return { text: "安全等级较低", color: "text-red-500" };
  };

  const safetyLevel = getSafetyLevelText(currentUser.safetyLevel);

  return (
    <div className="min-h-screen pb-20 pt-6 px-6 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          安全中心
        </motion.h1>

        {/* 安全等级概览 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex justify-center mb-6">
            <SafetyLevel score={currentUser.safetyLevel} size="lg" />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${safetyLevel.color}`}>
            {safetyLevel.text}
          </h2>
          <p className="text-gray-600 mb-4">
            您的安全评分为 {currentUser.safetyLevel} 分，{currentUser.safetyLevel >= 80 ? "表现优秀！" : "还有提升空间。"}
          </p>
          <div className="flex justify-center gap-2">
            {[0, 20, 40, 60, 80].map((threshold, index) => (
              <div
                key={threshold}
                className={`w-12 h-2 rounded-full ${
                  currentUser.safetyLevel >= threshold ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* 标签页切换 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex border-b border-gray-200 mb-6">
            {[
              { id: "overview", label: "安全概览", icon: Shield },
              { id: "features", label: "安全功能", icon: Settings },
              { id: "tips", label: "安全提示", icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 安全概览 */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h3 className="font-semibold text-green-800">已完成的安全措施</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• 基础身份验证</li>
                    <li>• 手机号码绑定</li>
                    <li>• 紧急联系人设置</li>
                    <li>• 行程分享功能</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                    <h3 className="font-semibold text-orange-800">待完善的安全措施</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• 实名认证 (+20分)</li>
                    <li>• 人脸识别验证 (+15分)</li>
                    <li>• 安全知识测试 (+10分)</li>
                    <li>• 更多紧急联系人 (+5分)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 安全功能 */}
          {activeTab === "features" && (
            <div className="grid md:grid-cols-2 gap-4">
              {safetyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      feature.status
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200 hover:border-orange-200"
                    }`}
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        feature.status ? "bg-green-100" : "bg-gray-100"
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          feature.status ? "text-green-600" : "text-gray-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                          {feature.status && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-600">
                            +{feature.points}分
                          </span>
                          <span className="text-xs text-gray-500">
                            {feature.status ? "已完成" : "点击设置"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* 安全提示 */}
          {activeTab === "tips" && (
            <div className="space-y-4">
              {safetyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">{tip.title}</h4>
                      <p className="text-sm text-blue-700">{tip.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* 紧急求助按钮 */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-lg flex items-center gap-2 mx-auto">
            <Phone className="w-5 h-5" />
            紧急求助
          </button>
          <p className="text-sm text-gray-600 mt-2">
            遇到紧急情况？立即联系我们
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SafetyCenter;