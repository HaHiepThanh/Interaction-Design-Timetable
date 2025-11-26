import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimetableframeComponent } from './components/timetableframe/timetableframe.component';
import { TimetableframedetailComponent } from './components/timetableframedetail/timetableframedetail.component';
import { TimetablemultidetailComponent } from './components/timetablemultidetail/timetablemultidetail.component';
import { TimetablefilterComponent } from './components/timetablefilter/timetablefilter.component';
import { Event } from './models/event.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SidebarComponent, TimetableframeComponent, TimetableframedetailComponent, TimetablemultidetailComponent, TimetablefilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentMonth: Date = new Date(2023, 4, 1); // May 2023
  selectedDate: Date | null = null;
  selectedEvent: Event | null = null;
  showDetail: boolean = false;
  selectedEvents: Event[] = [];
  showMultiDetail: boolean = false;
  showFilter: boolean = false;

  // Sample data based on the image
  events: Map<string, Event[]> = new Map();
  // Store notes by date (for days without events)
  dateNotes: Map<string, string> = new Map();

  constructor() {
    this.initializeEvents();
  }

  initializeEvents() {
    // May 2nd - Python with checkmark
    this.addEvent('2023-05-02', {
      id: '1',
      title: 'Python',
      time: '',
      startTime: '',
      endTime: '',
      description: '',
      date: new Date(2023, 4, 2),
      type: 'event',
      status: 'completed'
    });

    // May 4th - Python with X
    this.addEvent('2023-05-04', {
      id: '2',
      title: 'Python',
      time: '',
      startTime: '',
      endTime: '',
      description: '',
      date: new Date(2023, 4, 4),
      type: 'event',
      status: 'pending'
    });

    // May 10th - Number 10
    // this.addEvent('2023-05-10', {
    //   id: '3',
    //   title: '10',
    //   time: '',
    //   startTime: '',
    //   endTime: '',
    //   description: '',
    //   date: new Date(2023, 4, 10),
    //   type: 'event'
    // });

    // May 11th - Python Class
    this.addEvent('2023-05-11', {
      id: '4',
      title: 'Python',
      time: '09:00',
      startTime: '09:00',
      endTime: '10:00',
      description: 'Fundamentals of Data Processing in Python. Learn to read and write text, CSV, and JSON files.',
      date: new Date(2023, 4, 11),
      type: 'class',
      icon: '🐍',
      status: 'registered',
      teacher: { name: 'Konyukhov A.V.' }
    });

    // May 12th - Spring Hacka
    this.addEvent('2023-05-12', {
      id: '5',
      title: 'Spring Hackathon',
      time: '20:00',
      startTime: '20:00',
      endTime: '22:00',
      description: 'Spring Hackathon event',
      date: new Date(2023, 4, 12),
      type: 'hackathon',
      icon: '⚡'
    });

    // May 16th - Python Class (selected in image)
    this.addEvent('2023-05-16', {
      id: '6',
      title: 'Python',
      time: '09:00',
      startTime: '16:45',
      endTime: '17:45',
      description: 'Fundamentals of Data Processing in Python. In this class, you will learn how to read and write text, CSV, and JSON files. You will also learn about the functions used to manipulate files. After completing this class, you will be able to read and write files, which opens up many possibilities for data processing.',
      date: new Date(2023, 4, 16),
      type: 'class',
      icon: '🐍',
      status: 'registered',
      teacher: { name: 'Konyukhov A.V.' }
    });

    // May 18th - Multiple classes (2-3 môn)
    this.addEvent('2023-05-18', {
      id: '7',
      title: 'Python',
      time: '09:00',
      startTime: '09:00',
      endTime: '10:30',
      description: 'Fundamentals of Data Processing in Python',
      date: new Date(2023, 4, 18),
      type: 'class',
      icon: '🐍',
      status: 'registered',
      teacher: { name: 'Konyukhov A.V.' }
    });
    this.addEvent('2023-05-18', {
      id: '7b',
      title: 'Mathematics',
      time: '14:00',
      startTime: '14:00',
      endTime: '15:30',
      description: 'Advanced Mathematics course',
      date: new Date(2023, 4, 18),
      type: 'class',
      icon: '📐',
      teacher: { name: 'Smith J.M.' }
    });
    this.addEvent('2023-05-18', {
      id: '7c',
      title: 'Web Development',
      time: '16:00',
      startTime: '16:00',
      endTime: '17:30',
      description: 'Frontend Development with React',
      date: new Date(2023, 4, 18),
      type: 'class',
      icon: '💻',
      teacher: { name: 'Johnson R.K.' }
    });

    // May 20th - Exam
    this.addEvent('2023-05-20', {
      id: 'exam1',
      title: 'Exam',
      time: '14:00',
      startTime: '14:00',
      endTime: '16:00',
      description: 'Final Examination',
      date: new Date(2023, 4, 20),
      type: 'exam',
      icon: '📝'
    });

    // May 23rd - Multiple classes (2 môn)
    this.addEvent('2023-05-23', {
      id: '8',
      title: 'Python',
      time: '09:00',
      startTime: '09:00',
      endTime: '10:30',
      description: 'Python Programming Fundamentals',
      date: new Date(2023, 4, 23),
      type: 'class',
      icon: '🐍',
      status: 'registered',
      teacher: { name: 'Konyukhov A.V.' }
    });


    // May 24th - Internship
    this.addEvent('2023-05-24', {
      id: '9',
      title: 'Internship',
      time: '11:45',
      startTime: '11:45',
      endTime: '13:00',
      description: 'Internship session',
      date: new Date(2023, 4, 24),
      type: 'internship',
      icon: '🧭'
    });

    // May 25th - Multiple classes (3 môn)
    this.addEvent('2023-05-25', {
      id: '10',
      title: 'Python',
      time: '09:00',
      startTime: '09:00',
      endTime: '10:30',
      description: 'Fundamentals of Data Processing in Python',
      date: new Date(2023, 4, 25),
      type: 'class',
      icon: '🐍',
      status: 'registered',
      teacher: { name: 'Konyukhov A.V.' }
    });
    this.addEvent('2023-05-25', {
      id: '10b',
      title: 'Machine Learning',
      time: '13:00',
      startTime: '13:00',
      endTime: '14:30',
      description: 'Introduction to Machine Learning Algorithms',
      date: new Date(2023, 4, 25),
      type: 'class',
      icon: '🤖',
      teacher: { name: 'Brown A.S.' }
    });
    this.addEvent('2023-05-25', {
      id: '10c',
      title: 'Data Structures',
      time: '15:00',
      startTime: '15:00',
      endTime: '16:30',
      description: 'Advanced Data Structures and Algorithms',
      date: new Date(2023, 4, 25),
      type: 'class',
      icon: '📊',
      teacher: { name: 'Davis M.T.' }
    });

    // May 29th - Spring Hackathon
    this.addEvent('2023-05-29', {
      id: '11',
      title: 'Spring Hackathon',
      time: '20:00',
      startTime: '20:00',
      endTime: '22:00',
      description: 'Spring Hackathon event',
      date: new Date(2023, 4, 29),
      type: 'hackathon',
      icon: '⚡'
    });

    // May 30th - Python Class
    this.addEvent('2023-05-30', {
      id: '12',
      title: 'Python',
      time: '09:00',
      startTime: '09:00',
      endTime: '10:00',
      description: 'Fundamentals of Data Processing in Python',
      date: new Date(2023, 4, 30),
      type: 'class',
      icon: '🐍',
      status: 'registered',
      teacher: { name: 'Konyukhov A.V.' }
    });
  }

  addEvent(dateKey: string, event: Event) {
    if (!this.events.has(dateKey)) {
      this.events.set(dateKey, []);
    }
    this.events.get(dateKey)!.push(event);
  }

  getDaysInMonth(): Date[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    
    // Get first day of week (Monday = 0)
    const startDay = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(new Date(year, month, -i));
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }

  getWeekRows(): Date[][] {
    const days = this.getDaysInMonth();
    const rows: Date[][] = [];
    
    // Only show 5 rows
    for (let i = 0; i < 5; i++) {
      const week = days.slice(i * 7, (i + 1) * 7);
      if (week.length > 0) {
        rows.push(week);
      }
    }
    
    return rows;
  }

  getEventsForDate(date: Date): Event[] {
    const dateKey = this.getDateKey(date);
    return this.events.get(dateKey) || [];
  }

  getDateKey(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
  }

  isDateInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth() &&
           date.getFullYear() === this.currentMonth.getFullYear();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  onFrameClick(data: { day: number; date: Date; events: Event[] }) {
    this.selectedDate = data.date;

    const eventsWithTime = data.events.filter(e => e.startTime && e.startTime.trim() !== '');

    // If this day has more than 2 classes with time slots, show multi-detail popup
    if (eventsWithTime.length > 2) {
      this.selectedEvents = eventsWithTime;
      this.showMultiDetail = true;
      this.selectedEvent = null;
      this.showDetail = false;
      return;
    }

    // Default: show single-event detail (or empty detail if no events)
    this.selectedEvent = data.events[0] || null;
    this.showDetail = true;
  }

  onCloseDetail() {
    this.showDetail = false;
    this.selectedDate = null;
    this.selectedEvent = null;
  }

  onCloseMultiDetail() {
    this.showMultiDetail = false;
    this.selectedEvents = [];
    this.selectedDate = null;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  closeFilter() {
    this.showFilter = false;
  }

  onSaveNote(data: { eventId?: string; date?: Date; note: string }) {
    if (data.eventId) {
      // Update event note
      for (const [dateKey, events] of this.events.entries()) {
        const event = events.find(e => e.id === data.eventId);
        if (event) {
          event.note = data.note;
          break;
        }
      }
    } else if (data.date) {
      // Save note for date without event
      const dateKey = this.getDateKey(data.date);
      if (data.note && data.note.trim()) {
        this.dateNotes.set(dateKey, data.note);
      } else {
        this.dateNotes.delete(dateKey);
      }
    }
  }

  onToggleImportant(data: { eventId: string; isImportant: boolean }) {
    // Update event importance
    for (const [dateKey, events] of this.events.entries()) {
      const event = events.find(e => e.id === data.eventId);
      if (event) {
        event.isImportant = data.isImportant;
        break;
      }
    }
  }

  getMonthName(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.currentMonth.getMonth()];
  }

  getYear(): number {
    return this.currentMonth.getFullYear();
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }

  getDateNote(date: Date | null): string {
    if (!date) return '';
    const dateKey = this.getDateKey(date);
    return this.dateNotes.get(dateKey) || '';
  }
}
