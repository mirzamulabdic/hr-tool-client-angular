export interface LeaveRequest {
  leaveRequestId?: number;
  leaveType: string;
  leaveStatus?: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  comment?: string;
}
