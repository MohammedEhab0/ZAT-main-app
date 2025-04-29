// Centralized dummy data for the application

export interface Skill {
  id: string;
  name: string;
  dimension: "heart" | "brain";
  definition: string;
}
export interface Quiz {
  id: string;

  quizName: string;
}

export interface Level {
  id: string;
  name: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  level: string;
  questionText: string;
  skillLeft: string;
  skillRight: string;
  skillLeftDefinition: string;
  skillRightDefinition: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  lastActive: string;
  status: string;
}

export const skills: Skill[] = [
  {
    id: "communication",
    name: "Communication",
    dimension: "heart",
    definition:
      "The ability to convey information effectively and efficiently.",
  },
  {
    id: "problemSolving",
    name: "Problem Solving",
    dimension: "brain",
    definition:
      "The capacity to identify issues and find appropriate solutions.",
  },
  {
    id: "empathy",
    name: "Empathy",
    dimension: "heart",
    definition: "The ability to understand and share the feelings of another.",
  },
  {
    id: "criticalThinking",
    name: "Critical Thinking",
    dimension: "brain",
    definition:
      "The objective analysis and evaluation of an issue to form a judgment.",
  },
];

export const levels: Level[] = [
  { id: "beginner", name: "Beginner", score: 1.0 },
  { id: "intermediate", name: "Intermediate", score: 2.0 },
  { id: "advanced", name: "Advanced", score: 3.0 },
  { id: "expert", name: "Expert", score: 4.0 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    level: "beginner",
    questionText: "When faced with a misunderstanding in the team...",
    skillLeft: "communication",
    skillRight: "problemSolving",
    skillLeftDefinition:
      "I focus on clear and open dialogue to resolve the confusion.",
    skillRightDefinition:
      "I analyze the root causes of the misunderstanding to prevent it from happening again.",
  },
  {
    id: "q2",
    level: "intermediate",
    questionText: "In a situation where team morale is low...",
    skillLeft: "empathy",
    skillRight: "criticalThinking",
    skillLeftDefinition:
      "I connect with team members' feelings and provide emotional support.",
    skillRightDefinition:
      "I evaluate the factors causing low morale and develop a systematic approach to improve it.",
  },
];
export const quizes: Quiz[] = [
  {
    id: "quiz1",
    quizName: " Communication Assessment ",
  },
  {
    id: "quiz2",
    quizName: "Problem Solving Assessment ",
  },
];

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    lastActive: "2025-04-23",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    lastActive: "2025-04-22",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    lastActive: "2025-04-20",
    status: "Inactive",
  },
];

export const skillScores = [
  { name: "Data Analysis", score: 85 },
  { name: "Problem Solving", score: 72 },
  { name: "Communication", score: 90 },
  { name: "Leadership", score: 65 },
  { name: "Adaptability", score: 78 },
];

export const recommendedRoles = [
  "Data Analyst",
  "Business Intelligence Specialist",
  "Communications Manager",
  "Project Coordinator",
];
