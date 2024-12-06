import React, { useState } from 'react';
import './CalenderPage.css'; // Importing the CSS file

// Mock data for events
const events = [
    { date: '2024-10-25', title: 'Midterm Exam' },
    { date: '2024-11-01', title: 'Group Project Submission' },
    { date: '2024-11-10', title: 'Football Game' },
    { date: '2024-10-24', title: 'Club Meeting' },
    { date: '2024-10-24', title: 'cs meeting' },
    { date: '2024-10-29', title: 'lunch' },
    { date: '2024-10-24', title: 'need food?' }
];

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const handleDateClick = (day) => {
        const selected = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(selected);
    };

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <h2>Calendar - {new Date().toLocaleString('default', { month: 'long' })} {currentYear}</h2>
                </div>
                <div className="calendar-grid">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="day-label">{day}</div>
                    ))}
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={`empty-${index}`} className="empty-day" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayEvents = events.filter(event => event.date === dateString);
                        return (
                            <div 
                                key={day}
                                className={`calendar-day ${selectedDate === dateString ? 'selected-day' : ''}`}
                                onClick={() => handleDateClick(day)}
                            >
                                <span>{day}</span>
                                {dayEvents.length > 0 && (
                                    <div className="event-indicator">
                                        {dayEvents.map((event, index) => (
                                            <div key={index} className="event-title">{event.title}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {selectedDate && (
                    <div className="event-details">
                        <h3>Events on {selectedDate}</h3>
                        <ul>
                            {events.filter(event => event.date === selectedDate).map((event, index) => (
                                <li key={index}>{event.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;