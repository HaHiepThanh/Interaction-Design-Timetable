import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { icon: 'home', active: true },
    { icon: 'cube', active: false },
    { icon: 'calendar', active: false },
    { icon: 'graduation', active: false },
    { icon: 'flame', active: false },
    { icon: 'group', active: false },
    { icon: 'clock', active: false },
    { icon: 'settings', active: false },
    { icon: 'globe', active: false }
  ];
}
