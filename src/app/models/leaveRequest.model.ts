export interface LeaveRequest {
  leaveType: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  comment?: string;
}
