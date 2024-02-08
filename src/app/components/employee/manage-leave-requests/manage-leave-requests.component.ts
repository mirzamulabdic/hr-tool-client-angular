
import { Component, OnInit, inject } from '@angular/core';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { LeaveRequest, LeaveStatusEnum, LeaveTypeEnum, ReviewLeaveRequest } from '../../../models/leaveRequest.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-leave-requests',
  templateUrl: './manage-leave-requests.component.html',
  styleUrl: './manage-leave-requests.component.scss'
})
export class ManageLeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] | undefined;
  loading = false;
  leaveRequestService = inject(LeaveRequestService)
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getLeaveRequests();
  }


  getLeaveRequests() {
    this.loading = true;
    this.leaveRequestService.getLeaveRequestsForMyEmployees().subscribe(leaves => {
      this.leaveRequests = leaves;
      this.loading = false;
    })
  }

  reviewLeaveRequest(leave: LeaveRequest, statusAction: LeaveStatusEnum) {

    const reviewLeave: ReviewLeaveRequest = {
      leaveRequestId: Number(leave.leaveRequestId),
      employeeId: Number(leave.leaveSubmitterId),
      durationDays: leave.durationDays,
      leaveStatusAction: statusAction,
      leaveType: this.getEnumIndex(leave.leaveType, LeaveTypeEnum)!
    }
    console.log(reviewLeave)
    this.leaveRequestService.reviewLeaveRequest(reviewLeave).subscribe(res => {

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
}
