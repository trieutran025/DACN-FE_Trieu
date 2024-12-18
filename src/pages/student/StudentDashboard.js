import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
    <p className="text-gray-600 mb-4">{course.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">Progress: {course.progress}%</span>
      <Link to={`/courses/${course.id}`} className="text-blue-500 hover:text-blue-700">
        Continue
      </Link>
    </div>
  </div>
);

const NotificationList = ({ notifications }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4">Recent Notifications</h3>
    <ul>
      {notifications.map((notification, index) => (
        <li key={index} className="mb-2 pb-2 border-b last:border-b-0">
          <p className="font-medium">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default function StudentDashboard() {
  const enrolledCourses = [
    { id: 1, title: 'Introduction to React', description: 'Learn the basics of React', progress: 60 },
    { id: 2, title: 'Advanced JavaScript', description: 'Master JavaScript concepts', progress: 30 },
  ];

  const notifications = [
    { title: 'New assignment', message: 'You have a new assignment in React course' },
    { title: 'Upcoming exam', message: 'Prepare for the JavaScript exam next week' },
  ];

  const chartData = {
    labels: enrolledCourses.map(course => course.title),
    datasets: [
      {
        label: 'Course Progress',
        data: enrolledCourses.map(course => course.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progress (%)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Course Progress Overview',
      },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
          {enrolledCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div>
          <NotificationList notifications={notifications} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Learning Progress</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

