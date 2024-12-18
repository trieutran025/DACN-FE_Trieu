import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";

const AssignmentList = ({ assignments, onGrade }) => (
  <div className="space-y-4">
    {assignments.map((assignment) => (
      <Card key={assignment.id}>
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <h3 className="font-semibold">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
          </div>
          <Button onClick={() => onGrade(assignment.id)}>Grade</Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CreateAssignmentForm = ({ onCreateAssignment }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateAssignment({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Assignment Title"
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Assignment Description"
        required
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <Button type="submit">Create Assignment</Button>
    </form>
  );
};

const GradeAssignmentDialog = ({ isOpen, onClose, assignmentId }) => {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the grade and feedback to your backend
    console.log(`Graded assignment ${assignmentId}: Grade: ${grade}, Feedback: ${feedback}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Grade Assignment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Grade"
            min="0"
            max="100"
            required
          />
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Feedback"
            required
          />
          <Button type="submit">Submit Grade</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function InstructorAssignments() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'React Components', dueDate: '2023-06-15' },
    { id: 2, title: 'State Management', dueDate: '2023-06-22' },
  ]);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  const handleCreateAssignment = (newAssignment) => {
    setAssignments([...assignments, { id: assignments.length + 1, ...newAssignment }]);
  };

  const handleGrade = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    setIsGradeDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assignments and Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <AssignmentList assignments={assignments} onGrade={handleGrade} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAssignmentForm onCreateAssignment={handleCreateAssignment} />
        </CardContent>
      </Card>
      <GradeAssignmentDialog
        isOpen={isGradeDialogOpen}
        onClose={() => setIsGradeDialogOpen(false)}
        assignmentId={currentAssignmentId}
      />
    </div>
  );
}
