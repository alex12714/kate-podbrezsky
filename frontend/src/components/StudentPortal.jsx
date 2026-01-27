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
  const isZoom = url.includes('zoom.us');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-2 flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${
        isZoom ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
        isClaudeArtifact ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
        'bg-gradient-to-br from-blue-400 to-blue-600'
      }`}>
        {isZoom ? '📹' : isClaudeArtifact ? '🤖' : '🔗'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 truncate">
          {isZoom ? 'Join Zoom Meeting' : isClaudeArtifact ? 'Claude Artifact - Interactive Exercise' : domain}
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

// Student Profile Modal
const StudentProfileModal = ({ student, onClose }) => {
  const [showContract, setShowContract] = useState(false);
  const fields = student?.fields || {};

  const name = fields["Name"] || "Student";
  const totalLessons = fields["Total Lessons By Student"] || 0;
  const contractHtml = fields["Student Contract HTML"] || "";
  const email = fields["Email"] || "";
  const phone = fields["Phone"] || "";
  const startDate = fields["Start date"] || "";
  const level = fields["Student Level"] || "";

  if (showContract && contractHtml) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">📄 Student Contract</h2>
            <button onClick={() => setShowContract(false)} className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: contractHtml }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-orange-500 mx-auto mb-4">
            {name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          {level && <p className="text-white/80 mt-1">{level}</p>}
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{totalLessons}</p>
            <p className="text-sm text-green-700">Total Lessons Completed</p>
          </div>

          {startDate && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-xl">📅</span>
              <div>
                <p className="text-xs text-gray-500">Student Since</p>
                <p className="font-medium text-gray-800">{startDate}</p>
              </div>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-xl">📱</span>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{phone}</p>
              </div>
            </div>
          )}

          {contractHtml && (
            <button
              onClick={() => setShowContract(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-700 font-medium transition-colors"
            >
              <span>📄</span>
              <span>View Contract</span>
            </button>
          )}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
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
const LessonDetailPanel = ({ lesson, isUpcoming, onClose }) => {
  if (!lesson) return null;

  const fields = lesson.fields || {};

  const lessonDateTime = fields["Lesson Date Time"] || "Date not available";
  const homework = fields["Homework"] || "";
  const vocabulary = fields["Vocabulary"] || "";
  const description = fields["Description"] || "";
  const status = fields["Status"] || "";
  const zoomUrl = fields["Zoom Meeting URL"] || fields["Zoom URL"] || "";
  const zoomMeetingId = fields["Zoom Meeting ID"] || "";
  const lessonTitle = fields["Lesson"] || "";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className={`px-6 py-4 flex items-center justify-between ${
        isUpcoming
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
          : 'bg-gradient-to-r from-orange-400 to-amber-500'
      }`}>
        <div>
          <h3 className="font-bold text-white text-lg">{lessonDateTime}</h3>
          {status && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              status === "Lesson completed"
                ? "bg-green-100 text-green-700"
                : "bg-white/20 text-white"
            }`}>
              {isUpcoming ? '🗓️ Upcoming' : status}
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
        {/* Zoom Link for upcoming lessons */}
        {isUpcoming && (zoomUrl || zoomMeetingId) && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span>📹</span> Join Your Lesson
            </h4>
            {zoomUrl ? (
              <a
                href={zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  📹
                </div>
                <div className="flex-1">
                  <p className="font-bold">Join Zoom Meeting</p>
                  <p className="text-sm text-white/80">Click to open Zoom</p>
                </div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : zoomMeetingId && (
              <div className="p-4 bg-white rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600">Meeting ID:</p>
                <p className="font-mono font-bold text-lg text-blue-800">{zoomMeetingId}</p>
              </div>
            )}
          </div>
        )}

        {/* Lesson Title */}
        {lessonTitle && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <span>📋</span> Lesson Topic
            </h4>
            <p className="text-gray-700">{lessonTitle}</p>
          </div>
        )}

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

        {!description && !homework && !vocabulary && !isUpcoming && (
          <div className="text-center text-gray-500 py-8">
            <p>No details available for this lesson.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Upcoming Lesson Card
const UpcomingLessonCard = ({ lesson, isSelected, onClick }) => {
  const fields = lesson.fields || {};
  const lessonDateTime = fields["Lesson Date Time"] || "Date not available";
  const lessonTitle = fields["Lesson"] || "";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-5 shadow-lg transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 ring-4 ring-blue-300'
          : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
      }`}
    >
      <div className="flex items-start justify-between text-white">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📅</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Next Lesson</span>
          </div>
          <h3 className="font-bold text-xl mb-1">{lessonDateTime}</h3>
          {lessonTitle && <p className="text-white/80 text-sm">{lessonTitle}</p>}
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <p className="text-white/70 text-sm mt-3">Tap to view details and join link →</p>
    </button>
  );
};

const StudentPortal = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUpcoming, setSelectedUpcoming] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  // Get next upcoming lesson (in the future)
  const nextUpcomingLesson = useMemo(() => {
    const now = new Date();
    const futureScheduled = lessons.filter(lesson => {
      const status = lesson.fields?.Status || "";
      const dateField = lesson.fields?.["Date and Time"];
      if (status === "Lesson completed" || !dateField) return false;
      const lessonDate = new Date(dateField);
      return lessonDate > now;
    });

    // Sort by date ascending and get the closest one
    futureScheduled.sort((a, b) => {
      const dateA = new Date(a.fields?.["Date and Time"]);
      const dateB = new Date(b.fields?.["Date and Time"]);
      return dateA - dateB;
    });

    return futureScheduled[0] || null;
  }, [lessons]);

  // Completed lessons
  const completedLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const status = lesson.fields?.Status || "";
      return status === "Lesson completed";
    });
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

  const handleSelectUpcoming = () => {
    setSelectedUpcoming(true);
    setSelectedDate(null);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedUpcoming(false);
  };

  const handleCloseDetail = () => {
    setSelectedDate(null);
    setSelectedUpcoming(false);
  };

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
            <button
              onClick={() => setShowProfile(true)}
              className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl hover:from-orange-500 hover:to-amber-600 transition-colors cursor-pointer"
            >
              {studentName.charAt(0).toUpperCase()}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {studentName}! 👋</h1>
              <p className="text-gray-500">Your lesson history and materials</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Next Upcoming Lesson */}
        {nextUpcomingLesson && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>🗓️</span> Your Next Lesson
            </h2>
            <div className="max-w-md">
              <UpcomingLessonCard
                lesson={nextUpcomingLesson}
                isSelected={selectedUpcoming}
                onClick={handleSelectUpcoming}
              />
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
                onSelectDate={handleSelectDate}
              />

              {!selectedDate && !selectedUpcoming && (
                <p className="text-center text-gray-500 mt-4 text-sm">
                  Click on a highlighted date to view lesson details
                </p>
              )}
            </div>

            {/* Detail Panel */}
            <div className={`transition-all duration-300 ${(selectedDate || selectedUpcoming) ? 'opacity-100' : 'opacity-50'}`}>
              {selectedUpcoming && nextUpcomingLesson ? (
                <LessonDetailPanel
                  lesson={nextUpcomingLesson}
                  isUpcoming={true}
                  onClose={handleCloseDetail}
                />
              ) : selectedLessons && selectedLessons.length > 0 ? (
                <LessonDetailPanel
                  lesson={selectedLessons[0]}
                  isUpcoming={false}
                  onClose={handleCloseDetail}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex items-center justify-center text-center min-h-[400px]">
                  <div>
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Lesson</h3>
                    <p className="text-gray-500">Click on your upcoming lesson or a date in the calendar to view details</p>
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

      {/* Profile Modal */}
      {showProfile && (
        <StudentProfileModal
          student={student}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default StudentPortal;
