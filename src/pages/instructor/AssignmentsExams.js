import React, { useState } from 'react';
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog.tsx";

const AssignmentsExams = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Midterm Exam", dueDate: "2023-06-15", course: "Introduction to React" },
    { id: 2, title: "Final Project", dueDate: "2023-07-30", course: "Advanced JavaScript" },
  ]);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', course: '' });

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate && newAssignment.course) {
      setAssignments([...assignments, { ...newAssignment, id: Date.now() }]);
      setNewAssignment({ title: '', dueDate: '', course: '' });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assignments and Exams</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Create New Assignment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <Input
              type="date"
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            />
            <Input
              placeholder="Course"
              value={newAssignment.course}
              onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
            />
            <Button onClick={handleAddAssignment}>Add Assignment</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.dueDate}</TableCell>
              <TableCell>{assignment.course}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Submissions</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignmentsExams;
