import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const LESSONS_TABLE = "tblhk4xYcBWwIrUxF";
const STUDENTS_TABLE = "tbl91jY4kHUXCbUuP";

const StudentPortal = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch student info
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

        // Fetch lessons for this student using filterByFormula
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
        <div className="max-w-4xl mx-auto px-4 py-6">
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        {lessons.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No lessons yet</h2>
            <p className="text-gray-500">Your completed lessons will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Lessons ({lessons.length})
              </h2>
            </div>

            {lessons.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>English Coaching Pro by Kate Podbrezsky</p>
        </div>
      </footer>
    </div>
  );
};

const LessonCard = ({ lesson, index }) => {
  const [expanded, setExpanded] = useState(index === 0);
  const fields = lesson.fields || {};

  const lessonDateTime = fields["Lesson Date Time"] || "Date not available";
  const studentName = fields["Student First Name Formula"]?.[0] || "";
  const homework = fields["Homework"] || "";
  const vocabulary = fields["Vocabulary"] || "";
  const description = fields["Description"] || "";
  const status = fields["Status"] || "";

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <p key={i} className="mb-1">
        {line.startsWith('- ') ? (
          <span className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            <span>{line.substring(2)}</span>
          </span>
        ) : line.startsWith('http') ? (
          <a href={line} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
            {line}
          </a>
        ) : (
          line
        )}
      </p>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Header - Always Visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold">
            {index + 1}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">{lessonDateTime}</h3>
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
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content */}
      {expanded && (
        <div className="px-6 py-4 space-y-4 border-t border-orange-100">
          {/* Description/Appraise */}
          {description && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <span>📝</span> Lesson Summary
              </h4>
              <div className="text-gray-700 text-sm leading-relaxed">
                {formatText(description)}
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
                {formatText(homework)}
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
                {formatText(vocabulary)}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!description && !homework && !vocabulary && (
            <div className="text-center text-gray-500 py-4">
              <p>No additional details available for this lesson.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
