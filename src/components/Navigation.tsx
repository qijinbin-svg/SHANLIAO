import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageCircle, Compass, User, Shield } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "首页" },
    { path: "/match", icon: Users, label: "匹配" },
    { path: "/chat", icon: MessageCircle, label: "聊天" },
    { path: "/discover", icon: Compass, label: "发现" },
    { path: "/profile", icon: User, label: "我的" },
    { path: "/safety", icon: Shield, label: "安全" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
                isActive 
                  ? "text-orange-500" 
                  : "text-gray-600 hover:text-orange-400"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;