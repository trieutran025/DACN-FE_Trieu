import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";
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

const StatCard = ({ title, value, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </CardContent>
  </Card>
);

const NotificationList = ({ notifications }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Notifications</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <li key={index} className="bg-muted p-2 rounded-md">
            <p className="font-medium">{notification.title}</p>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AssignmentsToGrade = ({ assignments }) => (
  <Card>
    <CardHeader>
      <CardTitle>Assignments to Grade</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {assignments.map((assignment, index) => (
          <li key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
            <span>{assignment.title}</span>
            <Link to={`/instructor/assignments/${assignment.id}`} className="text-blue-500 hover:underline">
              Grade
            </Link>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function InstructorDashboard() {
  const stats = [
    { title: 'Active Courses', value: '5', description: 'Courses you are currently teaching' },
    { title: 'Total Students', value: '120', description: 'Students enrolled in your courses' },
    { title: 'Assignments to Grade', value: '15', description: 'Pending assignments' },
  ];

  const notifications = [
    { title: 'New Course Approval', message: 'Your new course "Advanced React" has been approved.' },
    { title: 'Student Question', message: 'A student has asked a question in "Intro to JavaScript".' },
  ];

  const assignmentsToGrade = [
    { id: 1, title: 'React Components Assignment' },
    { id: 2, title: 'JavaScript Arrays Quiz' },
    { id: 3, title: 'CSS Flexbox Project' },
  ];

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Student Engagement',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Engagement Over Time',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <NotificationList notifications={notifications} />
        <AssignmentsToGrade assignments={assignmentsToGrade} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Student Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={chartData} options={chartOptions} />
        </CardContent>
      </Card>
    </div>
  );
}
