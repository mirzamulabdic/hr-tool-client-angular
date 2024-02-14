import { Component, OnInit, inject } from '@angular/core';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { LeaveRequest } from '../../../models/leaveRequest.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-leave-requests',
  templateUrl: './my-leave-requests.component.html',
  styleUrl: './my-leave-requests.component.scss'
})
export class MyLeaveRequestsComponent implements OnInit {


  leaveRequests: LeaveRequest[] = [];
  loading = false;

  leaveService = inject(LeaveRequestService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMyLeaveRequests();
  }

  loadMyLeaveRequests() {
    this.loading = true;
    this.leaveService.getMyLeaveRequests().subscribe(res=>{
      this.leaveRequests = res;
      this.loading = false;
    })
  }

  cancelLeaveRequest(leaveId: number) {
    this.leaveService.cancelLeaveREquest(leaveId).subscribe(res => {
        this.leaveRequests?.splice(this.leaveRequests.findIndex(m=> m.leaveRequestId === leaveId), 1)
        this.toastr.info('Leave request canceled!', '');
    })
  }

  getLeaveTypeCorrectName(leaveType: string) {
    if (leaveType === 'vacation') return 'Vacation'
    else if (leaveType === 'remotework') return 'Remote Work'
    else if (leaveType === 'sickday') return 'Sick Day'
    else return 'Family Leave'
  }
}
