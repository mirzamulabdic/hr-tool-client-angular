import { Component, OnInit, inject } from '@angular/core';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { LeaveRequest, LeaveStatusEnum, LeaveTypeEnum } from '../../../models/leaveRequest.model';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../../models/pagination';
import { UserParams } from '../../../models/userParams';

@Component({
  selector: 'app-my-leave-requests',
  templateUrl: './my-leave-requests.component.html',
  styleUrl: './my-leave-requests.component.scss'
})
export class MyLeaveRequestsComponent implements OnInit {


  leaveRequests: LeaveRequest[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  public StatusEnum = LeaveStatusEnum;

  loading = false;

  public LeaveType!: LeaveTypeEnum

  leaveService = inject(LeaveRequestService);
  toastr = inject(ToastrService);

  constructor() {
    this.userParams = this.leaveService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMyLeaveRequests();
  }

  loadMyLeaveRequests(leaveStatusForEnum?: LeaveStatusEnum) {
    this.loading = true;
    if (this.userParams) {
      if (leaveStatusForEnum != undefined) {
        this.userParams.leaveStatus = leaveStatusForEnum!;
      }
      this.leaveService.setUserParams(this.userParams);
      this.leaveService.getMyLeaveRequests(this.userParams).subscribe(response=>{
        if (response.result && response.pagination) {
          this.leaveRequests = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        }
      })
    }
  }

  cancelLeaveRequest(leaveId: number) {
    this.leaveService.cancelLeaveREquest(leaveId).subscribe(res => {
        this.leaveRequests?.splice(this.leaveRequests.findIndex(m=> m.leaveRequestId === leaveId), 1)
        this.toastr.info('Leave request canceled!', '');
    })
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.leaveService.setUserParams(this.userParams);
      this.loadMyLeaveRequests();
    }
  }
}
