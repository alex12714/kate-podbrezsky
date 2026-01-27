import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const LESSONS_TABLE = "tblhk4xYcBWwIrUxF";
const STUDENTS_TABLE = "tbl91jY4kHUXCbUuP";

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/watch\?.*v=([^&\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Parse text and extract links
const parseTextWithLinks = (text) => {
  if (!text) return [];

  const urlRegex = /<?(https?:\/\/[^\s>]+)>?/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    const url = match[1];
    const youtubeId = getYouTubeVideoId(url);

    if (youtubeId) {
      parts.push({ type: 'youtube', url, videoId: youtubeId });
    } else {
      parts.push({ type: 'link', url });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
};

// YouTube Embed Component
const YouTubeEmbed = ({ videoId }) => (
  <div className="my-3 rounded-xl overflow-hidden shadow-md">
    <div className="relative pb-[56.25%] h-0">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
);

// Link Preview Component
const LinkPreview = ({ url }) => {
  const domain = new URL(url).hostname.replace('www.', '');
  const isClaudeArtifact = url.includes('claude.ai/public/artifacts');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-2 flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
        {isClaudeArtifact ? '🤖' : '🔗'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 truncate">
          {isClaudeArtifact ? 'Claude Artifact - Interactive Exercise' : domain}
        </p>
        <p className="text-xs text-gray-500 truncate">{url}</p>
      </div>
      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

// Render formatted content with links and embeds
const FormattedContent = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-2">
      {lines.map((line, lineIndex) => {
        const parts = parseTextWithLinks(line);

        if (parts.length === 0) return <p key={lineIndex} className="mb-1">&nbsp;</p>;

        return (
          <div key={lineIndex}>
            {parts.map((part, partIndex) => {
              if (part.type === 'youtube') {
                return <YouTubeEmbed key={partIndex} videoId={part.videoId} />;
              }
              if (part.type === 'link') {
                return <LinkPreview key={partIndex} url={part.url} />;
              }
              if (part.type === 'text') {
                const trimmed = part.content.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('- ') || trimmed.match(/^\d+\./)) {
                  return (
                    <p key={partIndex} className="flex items-start gap-2 mb-1">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{trimmed.replace(/^[-\d.]+\s*/, '')}</span>
                    </p>
                  );
                }
                return <span key={partIndex}>{part.content}</span>;
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
};

// Calendar Component
const Calendar = ({ lessons, selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const lessonDates = useMemo(() => {
    const dates = {};
    lessons.forEach(lesson => {
      const dateField = lesson.fields?.["Date and Time"];
      if (dateField) {
        const date = new Date(dateField);
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (!dates[key]) dates[key] = [];
        dates[key].push(lesson);
      }
    });
    return dates;
  }, [lessons]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${day}`;
    const hasLesson = lessonDates[dateKey];
    const isSelected = selectedDate &&
      selectedDate.getFullYear() === currentMonth.getFullYear() &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getDate() === day;

    days.push(
      <button
        key={day}
        onClick={() => hasLesson && onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all
          ${hasLesson ? 'cursor-pointer hover:bg-orange-100' : 'cursor-default text-gray-400'}
          ${hasLesson ? 'font-semibold text-gray-800' : ''}
          ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
          ${hasLesson && !isSelected ? 'bg-orange-50 border-2 border-orange-300' : ''}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-semibold text-gray-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

// Lesson Detail Panel
const LessonDetailPanel = ({ lessons, onClose }) => {
  if (!lessons || lessons.length === 0) return null;

  const lesson = lessons[0]; // Show first lesson of the day
  const fields = lesson.fields || {};

  const lessonDateTime = fields["Lesson Date Time"] || "Date not available";
  const homework = fields["Homework"] || "";
  const vocabulary = fields["Vocabulary"] || "";
  const description = fields["Description"] || "";
  const status = fields["Status"] || "";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-lg">{lessonDateTime}</h3>
          {status && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              status === "Lesson completed"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              {status}
            </span>
          )}
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Description/Summary */}
        {description && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
              <span>📝</span> Lesson Summary
            </h4>
            <div className="text-gray-700 text-sm leading-relaxed">
              <FormattedContent text={description} />
            </div>
          </div>
        )}

        {/* Homework */}
        {homework && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <span>📚</span> Homework
            </h4>
            <div className="text-gray-700 text-sm leading-relaxed">
              <FormattedContent text={homework} />
            </div>
          </div>
        )}

        {/* Vocabulary */}
        {vocabulary && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <span>📖</span> Vocabulary
            </h4>
            <div className="text-gray-700 text-sm leading-relaxed font-mono">
              <FormattedContent text={vocabulary} />
            </div>
          </div>
        )}

        {!description && !homework && !vocabulary && (
          <div className="text-center text-gray-500 py-8">
            <p>No details available for this lesson.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Scheduled Lesson Card
const ScheduledLessonCard = ({ lesson }) => {
  const fields = lesson.fields || {};
  const lessonDateTime = fields["Lesson Date Time"] || "Date not available";
  const description = fields["Description"] || fields["Lesson"] || "";

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📅</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Upcoming</span>
          </div>
          <h3 className="font-bold text-xl mb-1">{lessonDateTime}</h3>
          {description && <p className="text-white/80 text-sm">{description.substring(0, 100)}</p>}
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const StudentPortal = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const studentResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/${STUDENTS_TABLE}/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            },
          }
        );

        if (!studentResponse.ok) {
          throw new Error("Student not found");
        }

        const studentData = await studentResponse.json();
        setStudent(studentData);

        const formula = encodeURIComponent(`FIND("${studentId}", ARRAYJOIN({Student Record ID}, ","))`);
        const lessonsResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/${LESSONS_TABLE}?filterByFormula=${formula}&sort%5B0%5D%5Bfield%5D=Date%20and%20Time&sort%5B0%5D%5Bdirection%5D=desc`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            },
          }
        );

        if (!lessonsResponse.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const lessonsData = await lessonsResponse.json();
        setLessons(lessonsData.records || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  // Separate scheduled and completed lessons
  const { scheduledLessons, completedLessons } = useMemo(() => {
    const scheduled = [];
    const completed = [];

    lessons.forEach(lesson => {
      const status = lesson.fields?.Status || "";
      if (status === "Lesson completed") {
        completed.push(lesson);
      } else {
        scheduled.push(lesson);
      }
    });

    return { scheduledLessons: scheduled, completedLessons: completed };
  }, [lessons]);

  // Get lessons for selected date
  const selectedLessons = useMemo(() => {
    if (!selectedDate) return null;

    return completedLessons.filter(lesson => {
      const dateField = lesson.fields?.["Date and Time"];
      if (!dateField) return false;
      const lessonDate = new Date(dateField);
      return lessonDate.getFullYear() === selectedDate.getFullYear() &&
             lessonDate.getMonth() === selectedDate.getMonth() &&
             lessonDate.getDate() === selectedDate.getDate();
    });
  }, [selectedDate, completedLessons]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const studentName = student?.fields?.["Student First Name Formula"] || student?.fields?.Name || "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {studentName}! 👋</h1>
              <p className="text-gray-500">Your lesson history and materials</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Scheduled Lessons Section */}
        {scheduledLessons.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>🗓️</span> Upcoming Lessons
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scheduledLessons.map(lesson => (
                <ScheduledLessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>
        )}

        {/* Completed Lessons - Calendar View */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>✅</span> Completed Lessons ({completedLessons.length})
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Calendar */}
            <div>
              <Calendar
                lessons={completedLessons}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />

              {!selectedDate && (
                <p className="text-center text-gray-500 mt-4 text-sm">
                  Click on a highlighted date to view lesson details
                </p>
              )}
            </div>

            {/* Detail Panel */}
            <div className={`transition-all duration-300 ${selectedDate ? 'opacity-100' : 'opacity-50'}`}>
              {selectedLessons && selectedLessons.length > 0 ? (
                <LessonDetailPanel
                  lessons={selectedLessons}
                  onClose={() => setSelectedDate(null)}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex items-center justify-center text-center">
                  <div>
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Lesson</h3>
                    <p className="text-gray-500">Click on a date in the calendar to view lesson details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>English Coaching Pro by Kate Podbrezsky</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentPortal;
