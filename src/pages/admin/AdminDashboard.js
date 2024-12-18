import React from 'react';

const StatsCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-8">
    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
    <ul>
      <li className="mb-2">New student enrolled in "Introduction to React"</li>
      <li className="mb-2">Class "Advanced JavaScript" was created</li>
      <li className="mb-2">Instructor "John Doe" updated their profile</li>
    </ul>
  </div>
);

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Classes" value="25" />
        <StatsCard title="Total Students" value="500" />
        <StatsCard title="Total Instructors" value="15" />
      </div>
      <RecentActivity />
    </div>
  );
}

