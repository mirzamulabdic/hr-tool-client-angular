import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { LeaveBalance } from '../../../models/leaveBalance.model';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent implements OnInit {


  leaveBalance: LeaveBalance | undefined;

  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getLeaveBalance();
  }

  getLeaveBalance() {
    this.employeeService.getLeaveBalance().subscribe(res=>{
      this.leaveBalance = res;
    })
  }
}
