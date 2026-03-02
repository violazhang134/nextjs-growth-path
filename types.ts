export interface TimelineData {
  date: string;
  value: number;
  metricType: string;
}

export interface KeyEvent {
  date: string;
  eventType: string;
  description: string;
  impactScore: number;
}

export interface ReportData {
  productName: string;
  timelineData: TimelineData[];
  keyEvents: KeyEvent[];
}