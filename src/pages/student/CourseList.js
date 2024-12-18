import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
    <p className="text-gray-600 mb-4">{course.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">Lessons: {course.lessonCount}</span>
      <Link to={`/courses/${course.id}`} className="text-blue-500 hover:text-blue-700">
        View Course
      </Link>
    </div>
  </div>
);

export default function CourseList() {
  const courses = [
    { id: 1, title: 'Introduction to React', description: 'Learn the basics of React', lessonCount: 10 },
    { id: 2, title: 'Advanced JavaScript', description: 'Master JavaScript concepts', lessonCount: 15 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

