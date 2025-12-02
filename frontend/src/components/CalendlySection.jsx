import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';

const CalendlySection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // December 2025

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, isPast: true });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isPast = currentDate < today;
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      days.push({ 
        day: i, 
        isCurrentMonth: true, 
        isPast: isPast,
        isAvailable: !isPast && !isWeekend && i > 5 // Mock available dates
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isPast: false });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const timeSlots = ['9:00am', '10:00am', '11:00am', '2:00pm', '3:00pm', '4:00pm'];

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <section className="bg-white py-16 px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Calendly-style Widget */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Event Info */}
            <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748ef4d48436375b44b0f4e.png"
                  alt="Kate Podbrezsky"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-500 text-sm">Kate Podbrezsky</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">45 Minute Call</h3>
              
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>45 min</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Web conferencing details provided upon confirmation.</span>
              </div>
              
              <p className="text-gray-600 text-sm">
                This is a free introductory session to get to know about you and your learning goals
              </p>
            </div>
            
            {/* Right Panel - Calendar */}
            <div className="lg:w-2/3 p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Select a Date & Time</h4>
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={goToPrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h5 className="text-lg font-medium text-gray-800">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h5>
                <button 
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {days.map((dayObj, index) => (
                  <button
                    key={index}
                    onClick={() => dayObj.isAvailable && setSelectedDate(dayObj.day)}
                    disabled={!dayObj.isAvailable}
                    className={`
                      py-2 text-center text-sm rounded-full transition-colors
                      ${!dayObj.isCurrentMonth ? 'text-gray-300' : ''}
                      ${dayObj.isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${dayObj.isAvailable ? 'text-[#0069ff] font-semibold hover:bg-[#0069ff]/10 cursor-pointer' : ''}
                      ${selectedDate === dayObj.day && dayObj.isCurrentMonth ? 'bg-[#0069ff] text-white' : ''}
                    `}
                  >
                    {dayObj.day}
                  </button>
                ))}
              </div>
              
              {/* Time Slots */}
              {selectedDate && (
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Available times for {monthNames[currentMonth.getMonth()]} {selectedDate}
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        className="py-2 px-4 border border-[#0069ff] text-[#0069ff] rounded-md hover:bg-[#0069ff] hover:text-white transition-colors font-medium"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Timezone */}
              <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
                <Globe className="w-4 h-4" />
                <span>Time zone: UTC Time</span>
              </div>
            </div>
          </div>
          
          {/* Powered by Calendly */}
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <a 
              href="https://calendly.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              powered by <span className="font-semibold">Calendly</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;
