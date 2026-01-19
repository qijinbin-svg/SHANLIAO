import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: {
    id: string;
    senderId: string;
    content: string;
    type: 'text' | 'voice' | 'emoji';
    timestamp: number;
    translated?: string;
  };
  isOwn: boolean;
}

const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageContent = () => {
    if (message.type === 'emoji') {
      return <span className="text-2xl">{message.content}</span>;
    }
    return message.content;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        isOwn 
          ? 'bg-orange-500 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <div className="text-sm">
          {getMessageContent()}
        </div>
        {message.translated && (
          <div className={`text-xs mt-1 opacity-75 ${
            isOwn ? 'text-orange-100' : 'text-gray-600'
          }`}>
            翻译: {message.translated}
          </div>
        )}
        <div className={`text-xs mt-1 opacity-60 ${
          isOwn ? 'text-orange-100' : 'text-gray-500'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;