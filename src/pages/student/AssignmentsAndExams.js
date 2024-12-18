import React from 'react';

const AssignmentCard = ({ assignment }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
    <p className="text-gray-600 mb-4">{assignment.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">Due: {assignment.dueDate}</span>
      <span className={`text-sm ${assignment.submitted ? 'text-green-500' : 'text-red-500'}`}>
        {assignment.submitted ? 'Submitted' : 'Not Submitted'}
      </span>
    </div>
    {!assignment.submitted && (
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Assignment
      </button>
    )}
  </div>
);

const ExamCard = ({ exam }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
    <p className="text-gray-600 mb-4">{exam.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">Date: {exam.date}</span>
      <span className="text-sm text-gray-500">Duration: {exam.duration} minutes</span>
    </div>
    {exam.completed ? (
      <div className="mt-4 text-green-500">Score: {exam.score}%</div>
    ) : (
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Start Exam
      </button>
    )}
  </div>
);

export default function AssignmentsAndExams() {
  const assignments = [
    { id: 1, title: 'React Components', description: 'Create a reusable React component', dueDate: '2023-06-15', submitted: false },
    { id: 2, title: 'JavaScript Arrays', description: 'Implement array methods', dueDate: '2023-06-20', submitted: true },
  ];

  const exams = [
    { id: 1, title: 'React Midterm', description: 'Cover React fundamentals', date: '2023-07-01', duration: 90, completed: false },
    { id: 2, title: 'JavaScript Final', description: 'Comprehensive JavaScript exam', date: '2023-07-15', duration: 120, completed: true, score: 85 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
          {assignments.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Exams</h2>
          {exams.map(exam => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  );
}

