import { LeaveBalance } from './../../../models/leaveBalance.model';
import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveRequest } from '../../../models/leaveRequest.model';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-new-leave-request',
  templateUrl: './new-leave-request.component.html',
  styleUrl: './new-leave-request.component.css'
})
export class NewLeaveRequestComponent implements OnInit, OnChanges {

  leaveTypes: string[] = ['Vacation', 'Sick Day', 'Remote Work', 'Family Leave'];
  leaveForm = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    startDate: new FormControl('',[ Validators.required]),
    endDate: new FormControl('', [ Validators.required]),
    comment: new FormControl(''),
  });

  leaveService = inject(LeaveRequestService);
  employeeService = inject(EmployeeService);
  toastr = inject(ToastrService);

  leaveBalance: LeaveBalance | undefined;



  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.getLeaveBalance();
  }

  validateStartDate(control: FormControl) {
    let today: object = new Date();
    const invalid = control.value >= today;
    return !invalid ? { invalidDate: true } : null;
  }

  onSubmit() {
    const startDate = new Date(this.leaveForm.value.startDate as string)
    const endDate = new Date(this.leaveForm.value.endDate as string)

    const durationInDays = this.getDaysWithoutWeekend(startDate, endDate);

    if (durationInDays <= 0)
    {
      this.toastr.error('Invalid date!', 'Bad Request!');
      return;
    }
    const leaveType = String(this.leaveForm.value.leaveType).replace(/\s/g, '').toLocaleLowerCase();

    if (leaveType != "vacation" && leaveType != "remotework" && leaveType != "sickday" && leaveType != "familyleave")
    {
      this.toastr.error('Invalid leave type!', 'Bad Request!');
      return;
    }
    const newLeave: LeaveRequest = {
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      durationDays: durationInDays,
      comment: String(this.leaveForm.value.comment)
    }

    this.leaveService.createLeaveRequest(newLeave).subscribe({
      next: res => {
        if (this.leaveBalance) {
              this.leaveBalance.vacationDaysTaken = res.vacationDaysTaken;
              this.leaveBalance.remoteWorkDaysTaken = res.remoteWorkDaysTaken;
              this.leaveBalance.sickDaysTaken = res.sickDaysTaken;
              this.leaveBalance.familyDaysTaken = res.familyDaysTaken;
        }
        this.leaveForm.reset();

        console.log(this.leaveForm)
        this.toastr.success('Leave request created!');
      },
      error: error=>{
        if (error.error == 'Leave balance invalid' && error.status == 400) {
            this.toastr.warning("You don't have enough leave days!");
        }
      }
    })
  }


  getLeaveBalance() {
    this.employeeService.getLeaveBalance().subscribe(res=>{
      this.leaveBalance = res;
    })
  }

  getDaysWithoutWeekend(startDate: Date, endDate: Date) {
    const current = new Date(startDate);
    const end = new Date(endDate);
    let weekdays = 0;

    while (current <= end) {
      if (current.getDay() !== 6 && current.getDay() !== 0) {
        weekdays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return weekdays;
  }
}
