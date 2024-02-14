import { Component, Input, OnInit } from '@angular/core';
import { LeaveRequest } from '../../../../models/leaveRequest.model';

@Component({
  selector: 'app-leave-event-card',
  templateUrl: './leave-event-card.component.html',
  styleUrl: './leave-event-card.component.scss'
})
export class LeaveEventCardComponent implements OnInit {

  @Input() leaveEvent: LeaveRequest | undefined;

  ngOnInit(): void {
    console.log(this.leaveEvent)
  }
}
