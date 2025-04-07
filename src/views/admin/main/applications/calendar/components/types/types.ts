export enum TaskCategory {
  Sweep = 'sweep',
  Mop = 'mop',
  DailyMaintenance = 'Daily Maintenance',
  Other = 'other',
}

export const TaskCategoryColors = {
  [TaskCategory.Sweep]: '#FF5733',  // Red for meeting
  [TaskCategory.Mop]: '#33B5FF',     // Blue for task
  [TaskCategory.DailyMaintenance]: '#33FF57', // Green for reminder
  [TaskCategory.Other]: '#F0E68C',    // Yellow for other
};

export interface CustomEvent {
  id: number; // <-- Add this line
  title: string;
  start: Date;
  end: Date;
  type: string; 
  resource: string;
  //resourceId: string; // Event type (category)
}