import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timetablefilter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timetablefilter.component.html',
  styleUrl: './timetablefilter.component.scss'
})
export class TimetablefilterComponent {
  @Output() close = new EventEmitter<void>();

  semester: string = '';
  year: string = '';

  onClose() {
    this.close.emit();
  }

  onApply() {
    // Placeholder: no filtering logic, only UI
    this.close.emit();
  }
}


