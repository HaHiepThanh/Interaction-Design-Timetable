export interface Event {
  id: string;
  title: string;
  time: string;
  startTime: string;
  endTime: string;
  description: string;
  date: Date;
  type: 'class' | 'event' | 'internship' | 'hackathon' | 'exam';
  icon?: string;
  status?: 'registered' | 'completed' | 'pending';
  note?: string;
  isImportant?: boolean;
  teacher?: {
    name: string;
    avatar?: string;
  };
}
