export enum TaskCategory {
  Cleaning_Task = 'Cleaning Task',
  DailyMaintenance = 'Daily Maintenance',
  Other = 'other',
}

export enum RobotType {
  Robot_A = 'Robot A',
  Robot_B = 'Robot B',
  Robot_C = 'Robot C',
}

export const TaskCategoryColors = {
  [TaskCategory.Cleaning_Task]: '#197278',  // 
  [TaskCategory.DailyMaintenance]: '#c18c5d', // 
  [TaskCategory.Other]: '#6d597a',    
};

export interface CustomEvent {
  id: number; // <-- Add this line
  title: string;
  start: Date;
  end: Date;
  type: string; 
  robotType: string;
  description?: string;
  recurrence?: {
    type: string; // Add a `type` field for recurrence (daily, weekly, etc.)
  };
  
  //resourceId: string; // Event type (category)
}