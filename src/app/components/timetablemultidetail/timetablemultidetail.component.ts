import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-timetablemultidetail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timetablemultidetail.component.html',
  styleUrl: './timetablemultidetail.component.scss'
})
export class TimetablemultidetailComponent implements OnChanges {
  @Input() events: Event[] = [];
  @Input() selectedDate: Date | null = null;
  @Input() alignLeft: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() saveNote = new EventEmitter<{ eventId?: string; date?: Date; note: string }>();
  @Output() toggleImportant = new EventEmitter<{ eventId: string; isImportant: boolean }>();

  // State per event
  noteTexts: { [eventId: string]: string } = {};
  isNoteSaved: { [eventId: string]: boolean } = {};
  isNoteEditable: { [eventId: string]: boolean } = {};
  importantStates: { [eventId: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && this.events) {
      for (const ev of this.events) {
        this.noteTexts[ev.id] = ev.note || '';
        const saved = !!(ev.note && ev.note.trim());
        this.isNoteSaved[ev.id] = saved;
        this.isNoteEditable[ev.id] = !saved;
        this.importantStates[ev.id] = !!ev.isImportant;
      }
    }
  }

  onClose() {
    this.close.emit();
  }

  onSaveNoteFor(ev: Event) {
    const note = this.noteTexts[ev.id] || '';
    this.saveNote.emit({
      eventId: ev.id,
      note
    });
    const saved = !!(note && note.trim());
    this.isNoteSaved[ev.id] = saved;
    this.isNoteEditable[ev.id] = false;
  }

  onEditNoteFor(ev: Event) {
    this.isNoteEditable[ev.id] = true;
  }

  onToggleImportantFor(ev: Event) {
    const current = !!this.importantStates[ev.id];
    const next = !current;
    this.importantStates[ev.id] = next;
    this.toggleImportant.emit({
      eventId: ev.id,
      isImportant: next
    });
  }

  get formattedDate(): string {
    if (!this.selectedDate) return '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[this.selectedDate.getDay()];
    const day = this.selectedDate.getDate();
    const suffix = this.getDaySuffix(day);
    return `${day}${suffix} of ${this.getMonthName(this.selectedDate)} ${dayName}`;
  }

  private getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  private getMonthName(date: Date): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
  }
}

