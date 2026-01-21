import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Smile, Shield, AlertTriangle, Globe } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import MessageBubble from "@/components/MessageBubble";
import { Message } from "@/types";
import { sendKouziMessage } from "@/lib/kouzi";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showFunctions, setShowFunctions] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // 模拟聊天数据
  const mockMessages: Message[] = [
    {
      id: "1",
      senderId: "other",
      content: "你好！很高兴认识你，我也是摄影爱好者",
      type: "text",
      timestamp: Date.now() - 300000,
      translated: "Hello! Nice to meet you, I'm also a photography enthusiast"
    },
    {
      id: "2",
      senderId: "me",
      content: "太好了！你平时喜欢拍什么类型的照片？",
      type: "text",
      timestamp: Date.now() - 240000
    },
    {
      id: "3",
      senderId: "other",
      content: "我比较喜欢街拍和风景摄影，你呢？",
      type: "text",
      timestamp: Date.now() - 180000,
      translated: "I prefer street and landscape photography, what about you?"
    },
    {
      id: "4",
      senderId: "me",
      content: "我也是！最近想去中山公园拍樱花",
      type: "text",
      timestamp: Date.now() - 120000
    },
    {
      id: "5",
      senderId: "other",
      content: "😊",
      type: "emoji",
      timestamp: Date.now() - 60000
    }
  ];

  useEffect(() => {
    // 初始化消息
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        content: inputMessage,
        type: "text",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage("");
      const res = await sendKouziMessage(newMessage.content);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: "other",
        content: res.reply,
        type: "text",
        timestamp: Date.now(),
        translated: res.translated
      };
      setMessages(prev => [...prev, reply]);
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setTimeout(() => {
      navigate("/evaluate");
    }, 2000);
  };

  const handleExtendRequest = () => {
    // 模拟延时申请
    alert("延时申请已发送，等待对方确认...");
  };

  const handleReport = () => {
    alert("举报功能已触发，我们会尽快处理");
  };

  const handleEmergency = () => {
    alert("紧急求助已发送，我们会立即联系您");
  };

  if (isTimeUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">聊天时间结束</h2>
          <p className="text-gray-600">正在跳转到评价页面...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 flex flex-col bg-gradient-to-br from-orange-50 to-white">
      {/* 顶部倒计时 */}
      <div className="sticky top-0 z-10 p-4 bg-white/80 backdrop-blur-sm">
        <CountdownTimer
          initialTime={300} // 5分钟
          onTimeUp={handleTimeUp}
          onExtendRequest={handleExtendRequest}
        />
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === "me"}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 功能浮层 */}
      <div className="sticky bottom-20 p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowFunctions(!showFunctions)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Shield className="w-4 h-4" />
            功能菜单
          </button>
        </div>

        <AnimatePresence>
          {showFunctions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-center gap-4 mb-4"
            >
              <button
                onClick={handleReport}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                举报
              </button>
              <button
                onClick={handleEmergency}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Shield className="w-4 h-4" />
                紧急求助
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
                <Globe className="w-4 h-4" />
                实时翻译
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 输入区域 */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-orange-500 transition-colors">
            <Smile size={24} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入消息..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            <Send size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-orange-500 transition-colors">
            <Mic size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
