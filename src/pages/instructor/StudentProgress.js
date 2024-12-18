import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Textarea } from "../../components/ui/textarea.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog.tsx";
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

const StudentProgressTable = ({ students, onSendFeedback }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Student Name</TableHead>
        <TableHead>Course Progress</TableHead>
        <TableHead>Assignments Completed</TableHead>
        <TableHead>Average Grade</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {students.map((student) => (
        <TableRow key={student.id}>
          <TableCell>{student.name}</TableCell>
          <TableCell>{student.progress}%</TableCell>
          <TableCell>{student.assignmentsCompleted}</TableCell>
          <TableCell>{student.averageGrade}</TableCell>
          <TableCell>
            <Button onClick={() => onSendFeedback(student.id)}>Send Feedback</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const FeedbackDialog = ({ isOpen, onClose, studentId }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log(`Feedback for student ${studentId}: ${feedback}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here"
            required
          />
          <Button type="submit">Send Feedback</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function InstructorProgress() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', progress: 75, assignmentsCompleted: 15, averageGrade: 88 },
    { id: 2, name: 'Bob Smith', progress: 60, assignmentsCompleted: 12, averageGrade: 76 },
    { id: 3, name: 'Charlie Brown', progress: 90, assignmentsCompleted: 18, averageGrade: 95 },
  ]);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  const handleSendFeedback = (studentId) => {
    setCurrentStudentId(studentId);
    setIsFeedbackDialogOpen(true);
  };

  const chartData = {
    labels: students.map(student => student.name),
    datasets: [
      {
        label: 'Course Progress',
        data: students.map(student => student.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Average Grade',
        data: students.map(student => student.averageGrade),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
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
        text: 'Student Performance Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={chartData} options={chartOptions} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Student Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentProgressTable students={students} onSendFeedback={handleSendFeedback} />
        </CardContent>
      </Card>
      <FeedbackDialog
        isOpen={isFeedbackDialogOpen}
        onClose={() => setIsFeedbackDialogOpen(false)}
        studentId={currentStudentId}
      />
    </div>
  );
}
