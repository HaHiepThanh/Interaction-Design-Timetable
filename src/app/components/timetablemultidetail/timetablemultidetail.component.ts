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
  @Input() dateNote: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() saveNote = new EventEmitter<{ eventId?: string; date?: Date; note: string }>();
  @Output() toggleImportant = new EventEmitter<{ eventId: string; isImportant: boolean }>();

  // Single important state for all events
  isImportantSingle: boolean = false;
  
  // Single note state for all events
  noteTextSingle: string = '';
  isNoteSavedSingle: boolean = false;
  isNoteEditableSingle: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && this.events) {
      // Check if any event is important
      this.isImportantSingle = this.events.some(ev => ev.isImportant);
    }
    // Initialize single note from dateNote input, or from first event's note, or empty
    if (changes['dateNote'] || changes['events']) {
      this.noteTextSingle = this.dateNote || '';
      if (!this.noteTextSingle && this.events) {
        const firstEventWithNote = this.events.find(ev => ev.note && ev.note.trim());
        this.noteTextSingle = firstEventWithNote?.note || '';
      }
      this.isNoteSavedSingle = !!(this.noteTextSingle && this.noteTextSingle.trim());
      this.isNoteEditableSingle = !this.isNoteSavedSingle;
    }
  }

  onClose() {
    this.close.emit();
  }

  onSaveNoteSingle() {
    const note = this.noteTextSingle || '';
    // Save note for the selected date (not per event)
    if (this.selectedDate) {
      this.saveNote.emit({
        date: this.selectedDate,
        note
      });
    }
    const saved = !!(note && note.trim());
    this.isNoteSavedSingle = saved;
    this.isNoteEditableSingle = false;
  }

  onEditNoteSingle() {
    this.isNoteEditableSingle = true;
  }

  onToggleImportantSingle() {
    const next = !this.isImportantSingle;
    this.isImportantSingle = next;
    // Toggle important for all events
    for (const ev of this.events) {
      this.toggleImportant.emit({
        eventId: ev.id,
        isImportant: next
      });
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

