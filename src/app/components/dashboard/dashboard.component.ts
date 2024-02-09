import { LeaveRequest } from '../../models/leaveRequest.model';
import { LeaveEventsService } from '../../services/leave-events.service';
import { Employee } from './../../models/employee.model';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  employee: Employee | undefined

  leaveEvents: LeaveRequest[] = [];
  leaveEventsService = inject(LeaveEventsService);

  ngOnInit(): void {
    this.getEmployeesOnLeaveToday();
  }

  getEmployeesOnLeaveToday() {
    this.leaveEventsService.getEmplyoeesOnLeaveToday().subscribe(leaveRes=>{
      this.leaveEvents = leaveRes;
    })
  }
}
