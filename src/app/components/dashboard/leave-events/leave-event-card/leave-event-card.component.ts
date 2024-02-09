import { Component, Input } from '@angular/core';
import { LeaveRequest } from '../../../../models/leaveRequest.model';

@Component({
  selector: 'app-leave-event-card',
  templateUrl: './leave-event-card.component.html',
  styleUrl: './leave-event-card.component.scss'
})
export class LeaveEventCardComponent {
  @Input() leaveEvent: LeaveRequest | undefined;
}
