import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const features = [
    {
      icon: Sparkles,
      title: "即时匹配",
      description: "基于兴趣标签和地理位置，快速找到志同道合的朋友"
    },
    {
      icon: Clock,
      title: "限时聊天",
      description: "5分钟限时聊天，让交流更高效，避免尴尬冷场"
    },
    {
      icon: MapPin,
      title: "活动发现",
      description: "发现附近的精彩活动，从线上聊到线下见面"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero区域 */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            一键闪聊
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-12 opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            遇见同好，发现精彩
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/match"
              className="bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              开始匹配
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/discover"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300"
            >
              浏览活动
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 价值主张 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            为什么选择闪玩？
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 信用体系介绍 */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            安全可信的社交环境
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            多重身份验证 + 实时行为监控 + 完善的举报机制，
            让您在安全的环境中放心社交
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/safety"
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              了解更多安全保障
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;