
import { Component, OnInit, inject } from '@angular/core';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { LeaveRequest, LeaveStatusEnum, LeaveTypeEnum, ReviewLeaveRequest } from '../../../models/leaveRequest.model';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../services/admin.service';
import { Pagination } from '../../../models/pagination';
import { UserParams } from '../../../models/userParams';

@Component({
  selector: 'app-manage-leave-requests',
  templateUrl: './manage-leave-requests.component.html',
  styleUrl: './manage-leave-requests.component.scss'
})
export class ManageLeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  public StatusEnum = LeaveStatusEnum;
  loading = false;

  leaveRequestService = inject(LeaveRequestService);
  managerService = inject(AdminService);
  toastr = inject(ToastrService);

  constructor() {
    this.userParams = this.leaveRequestService.getUserParams();
  }

  ngOnInit(): void {
    this.getLeaveRequests();
  }


  getLeaveRequests(leaveStatusForEnum?: LeaveStatusEnum) {
    this.loading = true;
    if (this.userParams) {
      if (leaveStatusForEnum != undefined) {
        this.userParams.leaveStatus = leaveStatusForEnum!;
      }
      this.leaveRequestService.setUserParams(this.userParams);
      this.managerService.getLeaveRequestsForMyEmployees(this.userParams).subscribe(response => {

        if (response.result && response.pagination) {
          this.leaveRequests = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        }
      })
    }
  }

  reviewLeaveRequest(leave: LeaveRequest, statusAction: LeaveStatusEnum) {

    const reviewLeave: ReviewLeaveRequest = {
      leaveRequestId: Number(leave.leaveRequestId),
      employeeId: Number(leave.leaveSubmitterId),
      durationDays: leave.durationDays,
      leaveStatusAction: statusAction,
      leaveType: this.getEnumIndex(leave.leaveType, LeaveTypeEnum)!
    }
    this.managerService.reviewLeaveRequest(reviewLeave).subscribe(res => {

      this.leaveRequests?.splice(this.leaveRequests.findIndex(m=> m.leaveRequestId === leave.leaveRequestId), 1)
      this.toastr.info(`You successfully ${statusAction == 1 ? 'Approved' : 'Rejected'} leave request`);

    })
  }


  getEnumIndex(enumValue: any, enumType: any) {
    const keys = Object.keys(enumType).filter(k => typeof enumType[k as any] === 'number');
    const index = keys.indexOf(enumValue.toString());
    return index !== -1 ? index : undefined;
  }

  getLeaveTypeCorrectName(leaveType: string) {
    if (leaveType === 'vacation') return 'Vacation'
    else if (leaveType === 'remotework') return 'Remote Work'
    else if (leaveType === 'sickday') return 'Sick Day'
    else return 'Family Leave'
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.leaveRequestService.setUserParams(this.userParams);
      this.getLeaveRequests();
    }
  }
}
