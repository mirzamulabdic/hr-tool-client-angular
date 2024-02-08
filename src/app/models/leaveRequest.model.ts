export interface LeaveRequest {
  leaveRequestId?: number;
  leaveSubmitterId?: number;
  submitterFullName?: string;
  leaveType: LeaveTypeEnum;
  leaveStatus?: LeaveStatusEnum;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  comment?: string;
}

export interface ReviewLeaveRequest {
  leaveRequestId: number;
  employeeId: number;
  durationDays: number;
  leaveType: LeaveTypeEnum;
  leaveStatusAction: LeaveStatusEnum;
}

export enum LeaveTypeEnum {
  Vacation,
  RemoteWork,
  SickDay,
  FamilyLeave
}

export enum LeaveStatusEnum {
  Pending,
  Approved,
  Rejected,
  Taken
}
