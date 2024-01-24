import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { LeaveBalance } from '../../../models/leaveBalance.model';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent implements OnInit, OnChanges {



  @Input() leaveBalance: LeaveBalance | undefined;

  private employeeService = inject(EmployeeService);

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
