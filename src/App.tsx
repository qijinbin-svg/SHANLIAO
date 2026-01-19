import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import MatchPage from "@/pages/MatchPage";
import ChatRoom from "@/pages/ChatRoom";
import EvaluationPage from "@/pages/EvaluationPage";
import DiscoverPage from "@/pages/DiscoverPage";
import ActivityDetail from "@/pages/ActivityDetail";
import ProfilePage from "@/pages/ProfilePage";
import SafetyCenter from "@/pages/SafetyCenter";
import Navigation from "@/components/Navigation";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/evaluate" element={<EvaluationPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/safety" element={<SafetyCenter />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}