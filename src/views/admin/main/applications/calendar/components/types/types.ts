export enum TaskCategory {
  Sweep = 'sweep',
  Mop = 'mop',
  DailyMaintenance = 'DailyMaintenance',
  Other = 'other',
}

export const TaskCategoryColors = {
  [TaskCategory.Sweep]: '#FF5733',  // Red for meeting
  [TaskCategory.Mop]: '#33B5FF',     // Blue for task
  [TaskCategory.DailyMaintenance]: '#33FF57', // Green for reminder
  [TaskCategory.Other]: '#F0E68C',    // Yellow for other
};

export interface CustomEvent {
  title: string;
  start: Date;
  end: Date;
  type: TaskCategory;  // Event type (category)
}