import { ResolveFn } from '@angular/router';
import { LeaveRequest } from '../models/leaveRequest.model';
import { inject } from '@angular/core';
import { LeaveRequestService } from '../services/leave-request.service';

export const leaveRequestsResolverResolver: ResolveFn<LeaveRequest[]> = (route, state) => {

  const leaveRequestService = inject(LeaveRequestService);

  return leaveRequestService.getMyLeaveRequests();
};
