"use client"
import Header from '@/components/header';
import React, { useState } from 'react';

type ServiceEvent = {
  id: number;
  date: Date;
  equipment: string;
  description: string;
};

export default function Services() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<ServiceEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    date: '',
    equipment: '',
    description: '',
  });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id: newId, date: new Date(newEvent.date) }]);
    setNewEvent({ date: '', equipment: '', description: '' });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <>
    <Header activePage={'Services'} />
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-500 text-white rounded">&lt; Prev</button>
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Next &gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 bg-gray-100"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
          const dayEvents = getEventsForDate(date);
          return (
            <div key={index} className="h-24 border p-1 overflow-y-auto">
              <div className="font-bold">{index + 1}</div>
              {dayEvents.map(event => (
                <div key={event.id} className="text-xs bg-blue-100 p-1 mb-1 rounded">
                  {event.equipment}: {event.description}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <form onSubmit={addEvent} className="mt-4">
        <h3 className="text-xl font-bold mb-2">Add Service Event</h3>
        <div className="flex gap-2">
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newEvent.equipment}
            onChange={(e) => setNewEvent({ ...newEvent, equipment: e.target.value })}
            placeholder="Equipment"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Add Event
          </button>
        </div>
      </form>
    </div>
    </>
  );
}