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

export enum ZoneType {
  Zone_A = 'Zone 1',
  Zone_B = 'Zone 2',
  Zone_C = 'Zone 3',
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
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  repeatUntil?: Date;
  zoneType?: string;
  
  

}