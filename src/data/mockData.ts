import { User, Activity } from "@/types";

export const mockUsers: User[] = [
  {
    id: 'user1',
    nickname: '小明',
    avatar: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=young+asian+man+portrait%2C+photography+style%2C+clean+background%2C+professional+headshot&image_size=square',
    age: 25,
    career: '摄影师',
    location: { lat: 31.2304, lng: 121.4737, city: '上海' },
    tags: {
      identity: ['摄影师', '90后'],
      interests: ['摄影', '露营', '咖啡'],
      mood: '探索新事物'
    },
    creditScore: 85,
    safetyLevel: 80
  },
  {
    id: 'user2',
    nickname: '小红',
    avatar: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=young+asian+woman+portrait%2C+photography+style%2C+clean+background%2C+professional+headshot&image_size=square',
    age: 23,
    career: '设计师',
    location: { lat: 31.2304, lng: 121.4737, city: '上海' },
    tags: {
      identity: ['设计师', '95后'],
      interests: ['设计', '绘画', '音乐'],
      mood: '寻找知己'
    },
    creditScore: 90,
    safetyLevel: 85
  }
];

export const mockActivities: Activity[] = [
  {
    id: 'activity1',
    title: '周末户外摄影采风',
    description: '一起探索城市美景，交流摄影技巧，结识志同道合的朋友',
    time: '2024-01-20 14:00',
    location: '中山公园',
    price: 0,
    budget: 50,
    tags: ['摄影', '户外', '社交'],
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=outdoor+photography+meetup%2C+group+of+people+with+cameras%2C+park+setting%2C+natural+lighting%2C+social+atmosphere&image_size=landscape_16_9',
    participants: [],
    maxParticipants: 10,
    organizerVerified: true,
    safetyInsurance: true
  },
  {
    id: 'activity2',
    title: '手冲咖啡品鉴会',
    description: '学习手冲咖啡技巧，品尝不同产地的咖啡豆，享受悠闲时光',
    time: '2024-01-21 15:00',
    location: '静安区咖啡馆',
    price: 68,
    budget: 100,
    tags: ['咖啡', '美食', '技能'],
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=coffee+cupping+session%2C+hand+drip+coffee+setup%2C+cozy+cafe+interior%2C+warm+lighting%2C+coffee+beans+and+equipment&image_size=landscape_16_9',
    participants: [],
    maxParticipants: 8,
    organizerVerified: true,
    safetyInsurance: true
  },
  {
    id: 'activity3',
    title: '城市夜跑团',
    description: '每周三晚上一起夜跑，保持健康生活方式，认识运动伙伴',
    time: '2024-01-17 19:30',
    location: '世纪公园',
    price: 0,
    budget: 30,
    tags: ['运动', '跑步', '健康'],
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=night+running+group%2C+city+park+at+evening%2C+runners+in+sportswear%2C+urban+lighting%2C+energetic+atmosphere&image_size=landscape_16_9',
    participants: [],
    maxParticipants: 15,
    organizerVerified: true,
    safetyInsurance: true
  }
];

export const interestTags = {
  '运动': ['跑步', '健身', '瑜伽', '游泳', '骑行'],
  '文艺': ['摄影', '绘画', '音乐', '读书', '写作'],
  '美食': ['咖啡', '烘焙', '品酒', '料理', '探店'],
  '户外': ['露营', '徒步', '攀岩', '钓鱼', '滑雪'],
  '技能': ['编程', '设计', '语言', '手工', '调酒']
};

export const identityTags = [
  '90后', '95后', '00后', '程序员', '设计师', 
  '摄影师', '教师', '医生', '律师', '创业者'
];

export const moodTags = [
  '探索新事物', '享受独处', '寻找知己', '扩展社交圈',
  '学习新技能', '放松解压', '冒险挑战', '文化交流'
];