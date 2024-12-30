export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Recording {
  id: string;
  title: string;
  date: string;
  duration: number;
  thumbnail: string;
  transcript?: string;
  summary?: string;
}

export interface Room {
  id: string;
  name: string;
  participants: User[];
  isActive: boolean;
  createdAt: string;
}