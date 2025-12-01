import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-timetableframedetail',
  imports: [CommonModule, FormsModule],
  templateUrl: './timetableframedetail.component.html',
  styleUrl: './timetableframedetail.component.scss'
})
export class TimetableframedetailComponent implements OnChanges {
  @Input() event: Event | null = null;
  @Input() selectedDate: Date | null = null;
  @Input() dateNote: string = '';
  @Input() alignLeft: boolean = false;
  @Input() isDateImportant: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() saveNote = new EventEmitter<{ eventId?: string; date?: Date; note: string }>();
  @Output() toggleImportant = new EventEmitter<{ eventId?: string; date?: Date; isImportant: boolean }>();

  noteText: string = '';
  isImportant: boolean = false;
  isNoteSaved: boolean = false;
  isNoteEditable: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event'] && this.event) {
      this.noteText = this.event.note || '';
      this.isImportant = this.event.isImportant || false;
      this.isNoteSaved = !!(this.event.note && this.event.note.trim());
      this.isNoteEditable = !this.isNoteSaved;
    } else if (changes['dateNote'] || changes['isDateImportant']) {
      this.noteText = this.dateNote || '';
      this.isImportant = this.isDateImportant || false;
      this.isNoteSaved = !!(this.dateNote && this.dateNote.trim());
      this.isNoteEditable = !this.isNoteSaved;
    }
  }

  get formattedDate(): string {
    if (!this.selectedDate) return '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[this.selectedDate.getDay()];
    const day = this.selectedDate.getDate();
    const suffix = this.getDaySuffix(day);
    return `${day}${suffix} of ${this.getMonthName(this.selectedDate)} ${dayName}`;
  }

  getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  getMonthName(date: Date): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
  }

  onClose() {
    this.close.emit();
  }

  onSaveNote() {
    if (this.event) {
      this.saveNote.emit({
        eventId: this.event.id,
        note: this.noteText
      });
    } else if (this.selectedDate) {
      this.saveNote.emit({
        date: this.selectedDate,
        note: this.noteText
      });
    }
    this.isNoteSaved = !!(this.noteText && this.noteText.trim());
    this.isNoteEditable = false;
  }

  onEditNote() {
    this.isNoteEditable = true;
    setTimeout(() => {
      const textarea = (document.getElementById('note') || document.getElementById('note-empty')) as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    }, 0);
  }

  onToggleImportant() {
    this.isImportant = !this.isImportant;
    if (this.event) {
      this.toggleImportant.emit({
        eventId: this.event.id,
        isImportant: this.isImportant
      });
    } else if (this.selectedDate) {
      // Toggle important for date without event
      this.toggleImportant.emit({
        date: this.selectedDate,
        isImportant: this.isImportant
      });
    }
  }
}
