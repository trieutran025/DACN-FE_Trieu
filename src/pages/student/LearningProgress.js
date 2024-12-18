import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function LearningProgress() {
    const courseProgress = [
        { id: 1, title: 'Introduction to React', progress: 60 },
        { id: 2, title: 'Advanced JavaScript', progress: 30 },
          ];
      

  const overallProgress = {
    completed: 2,
    inProgress: 3,
    notStarted: 1,
  };

  const barChartData = {
    labels: courseProgress.map(course => course.title),
    datasets: [
      {
        label: 'Course Progress',
        data: courseProgress.map(course => course.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
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

  const doughnutChartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [overallProgress.completed, overallProgress.inProgress, overallProgress.notStarted],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#45a049', '#e6ae06', '#da190b'],
      },
    ],
  };

  const doughnutChartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Overall Course Status',
      },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Progress</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {courseProgress.map(course => (
              <tr key={course.id} className="border-t">
                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.progress}%</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${
                    course.progress === 100 ? 'bg-green-200 text-green-800' :
                    course.progress > 0 ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {course.progress === 100 ? 'Completed' :
                     course.progress > 0 ? 'In Progress' :
                     'Not Started'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

