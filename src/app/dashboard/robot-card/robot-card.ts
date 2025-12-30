import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
@Component({
  selector: 'app-robot-card',
  standalone: true,
  imports: [],
  templateUrl: './robot-card.html',
  styleUrl: './robot-card.css',
})
export class RobotCard implements OnInit {
 robotId = '';   // 👈 affiché dans le dashboard

  constructor(private employee: EmployeeService) {}

  async ngOnInit() {
    const profile = await this.employee.getMyProfileUniversal();
    this.robotId = profile.robotId || '---';
  }
}
