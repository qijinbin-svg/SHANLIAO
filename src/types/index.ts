export interface User {
  id: string;
  nickname: string;
  avatar: string;
  age: number;
  career: string;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  tags: {
    identity: string[];
    interests: string[];
    mood: string;
  };
  creditScore: number;
  safetyLevel: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  price: number;
  budget: number;
  tags: string[];
  image: string;
  participants: User[];
  maxParticipants: number;
  organizerVerified: boolean;
  safetyInsurance: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'voice' | 'emoji';
  timestamp: number;
  translated?: string;
}

export interface Evaluation {
  sessionId: string;
  experience: number;
  match: number;
  impression: number;
  tags: string[];
  anonymous: boolean;
  comment?: string;
}