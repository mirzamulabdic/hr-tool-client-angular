import { LeaveStatusEnum } from "./leaveRequest.model";

export class UserParams {
  pageNumber = 1;
  pageSize = 5;
  leaveStatus = LeaveStatusEnum.Pending;

  constructor() {}
}
