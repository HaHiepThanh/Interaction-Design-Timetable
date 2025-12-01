import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-timetableframe',
  imports: [CommonModule],
  templateUrl: './timetableframe.component.html',
  styleUrl: './timetableframe.component.scss'
})
export class TimetableframeComponent {
  @Input() day: number = 0;
  @Input() date: Date = new Date();
  @Input() events: Event[] = [];
  @Input() isSelected: boolean = false;
  @Input() isToday: boolean = false;
  @Output() frameClick = new EventEmitter<{ day: number; date: Date; events: Event[] }>();

  onFrameClick() {
    this.frameClick.emit({
      day: this.day,
      date: this.date,
      events: this.events
    });
  }

  getEventClass(event: Event): string {
    const baseClass = 'event-item';
    switch (event.type) {
      case 'class':
        return `${baseClass} class-event`;
      case 'event':
        return `${baseClass} regular-event`;
      case 'internship':
        // Different color for each internship instance based on date
        const internshipDate = this.getDateKey(this.date);
        if (internshipDate === '2023-05-24') {
          return `${baseClass} internship-event internship-1`;
        }
        return `${baseClass} internship-event internship-default`;
      case 'hackathon':
        // Different color for each hackathon instance based on date
        const hackathonDate = this.getDateKey(this.date);
        if (hackathonDate === '2023-05-12') {
          return `${baseClass} hackathon-event hackathon-1`;
        } else if (hackathonDate === '2023-05-29') {
          return `${baseClass} hackathon-event hackathon-2`;
        }
        return `${baseClass} hackathon-event hackathon-default`;
      case 'exam':
        return `${baseClass} exam-event`;
      default:
        return baseClass;
    }
  }

  getDateKey(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
  }

  hasImportantEvent(): boolean {
    return this.events.some(event => event.isImportant);
  }

  hasNote(): boolean {
    return this.events.some(event => event.note && event.note.trim());
  }

  hasEvents(): boolean {
    return this.events.length > 0;
  }

  getEventsWithTime(): Event[] {
    const events = this.events.filter(event => event.startTime && event.startTime.trim() !== '');
    // Sort by start time
    return events.sort((a, b) => {
      const timeA = a.startTime.split(':').map(Number);
      const timeB = b.startTime.split(':').map(Number);
      const minutesA = timeA[0] * 60 + timeA[1];
      const minutesB = timeB[0] * 60 + timeB[1];
      return minutesA - minutesB;
    });
  }

  hasMultipleClasses(): boolean {
    return this.getEventsWithTime().length > 2;
  }

  getMultipleClassesCount(): number {
    return this.getEventsWithTime().length;
  }

  getFirstEventIcon(): string {
    const eventsWithTime = this.getEventsWithTime();
    return eventsWithTime.length > 0 ? (eventsWithTime[0].icon || '') : '';
  }

  hasInternshipEvent(): boolean {
    return this.events.some(event => event.type === 'internship');
  }

  hasHackathonEvent(): boolean {
    return this.events.some(event => event.type === 'hackathon');
  }

  hasExamEvent(): boolean {
    return this.events.some(event => event.type === 'exam');
  }

  getFrameClass(): string {
    const dateKey = this.getDateKey(this.date);
    
    // Priority: exam > internship > hackathon
    // Check for special exam dates (2023-05-11 and 2023-05-25)
    if (this.hasExamEvent() || dateKey === '2023-05-11' || dateKey === '2023-05-25') {
      return 'has-exam';
    }
    if (this.hasInternshipEvent()) {
      if (dateKey === '2023-05-24') {
        return 'has-internship internship-1';
      }
      return 'has-internship internship-default';
    }
    if (this.hasHackathonEvent()) {
      if (dateKey === '2023-05-12') {
        return 'has-hackathon hackathon-1';
      } else if (dateKey === '2023-05-29') {
        return 'has-hackathon hackathon-2';
      }
      return 'has-hackathon hackathon-default';
    }
    return '';
  }

  isSpecialExamDate(): boolean {
    const dateKey = this.getDateKey(this.date);
    return dateKey === '2023-05-11' || dateKey === '2023-05-25';
  }

  getEventTitleWithExam(event: Event): string {
    const dateKey = this.getDateKey(this.date);
    if (dateKey === '2023-05-11' && event.title === 'Python') {
      return 'Python | Exam';
    }
    return event.title;
  }

  shouldShowExamText(event: Event): boolean {
    const dateKey = this.getDateKey(this.date);
    if (dateKey === '2023-05-25') {
      return event.startTime === '09:00' || event.startTime === '15:00';
    }
    return false;
  }
}
