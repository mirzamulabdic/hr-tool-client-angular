import { Component, OnInit, inject } from '@angular/core';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { LeaveRequest } from '../../../models/leaveRequest.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-leave-requests',
  templateUrl: './my-leave-requests.component.html',
  styleUrl: './my-leave-requests.component.css'
})
export class MyLeaveRequestsComponent implements OnInit {


  leaveRequests: LeaveRequest[] = [];

  leaveService = inject(LeaveRequestService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests() {
    this.leaveService.getLeaveRequests().subscribe(res=>{
      this.leaveRequests = res;
    })
  }

  cancelLeaveRequest(leaveId: number) {
    this.leaveService.cancelLeaveREquest(leaveId).subscribe(res => {
        this.leaveRequests?.splice(this.leaveRequests.findIndex(m=> m.leaveRequestId === leaveId), 1)
        this.toastr.info('Leave request canceled!', '');
    })
  }

}
