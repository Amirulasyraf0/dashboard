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
  [TaskCategory.Cleaning_Task]: '#FF5733',  // Red for meeting
  [TaskCategory.DailyMaintenance]: '#33FF57', // Green for reminder
  [TaskCategory.Other]: '#F0E68C',    // Yellow for other
};

export interface CustomEvent {
  id: number; // <-- Add this line
  title: string;
  start: Date;
  end: Date;
  type: string; 
  robotType: string;
  //resourceId: string; // Event type (category)
}