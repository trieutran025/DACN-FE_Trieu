import React, { useState, useEffect } from 'react';

const ClassList = ({ classes, onEdit, onDelete }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">Class Name</th>
        <th className="py-2 px-4 border-b">Instructor</th>
        <th className="py-2 px-4 border-b">Start Date</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {classes.map((cls) => (
        <tr key={cls.id}>
          <td className="py-2 px-4 border-b">{cls.name}</td>
          <td className="py-2 px-4 border-b">{cls.instructor}</td>
          <td className="py-2 px-4 border-b">{cls.startDate}</td>
          <td className="py-2 px-4 border-b">
            <button onClick={() => onEdit(cls)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
            <button onClick={() => onDelete(cls)} className="text-red-500 hover:text-red-700">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ClassFormModal = ({ isOpen, onClose, cls, onSave }) => {
  const [name, setName] = useState(cls ? cls.name : '');
  const [instructor, setInstructor] = useState(cls ? cls.instructor : '');
  const [startDate, setStartDate] = useState(cls ? cls.startDate : '');

  useEffect(() => {
    if (cls) {
      setName(cls.name);
      setInstructor(cls.instructor);
      setStartDate(cls.startDate);
    } else {
      setName('');
      setInstructor('');
      setStartDate('');
    }
  }, [cls]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: cls ? cls.id : Date.now(), name, instructor, startDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{cls ? 'Edit Class' : 'Add Class'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Class Name</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Instructor</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteClassModal = ({ isOpen, onClose, cls, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Delete Class</h2>
        <p className="mb-4">Are you sure you want to delete the class "{cls.name}"?</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={() => { onConfirm(cls.id); onClose(); }} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-4">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        {page}
      </button>
    ))}
  </div>
);

export default function ClassManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([
    { id: 1, name: 'Introduction to React', instructor: 'John Doe', startDate: '2023-06-01' },
    { id: 2, name: 'Advanced JavaScript', instructor: 'Jane Smith', startDate: '2023-07-15' },
    { id: 3, name: 'Node.js Fundamentals', instructor: 'Bob Johnson', startDate: '2023-08-01' },
    { id: 4, name: 'Python for Data Science', instructor: 'Alice Brown', startDate: '2023-09-01' },
    { id: 5, name: 'Machine Learning Basics', instructor: 'Charlie Davis', startDate: '2023-10-01' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 3;

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(classes.length / classesPerPage);

  const handleAddClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const handleEditClass = (updatedClass) => {
    setClasses(classes.map(cls => cls.id === updatedClass.id ? updatedClass : cls));
  };

  const handleDeleteClass = (classId) => {
    setClasses(classes.filter(cls => cls.id !== classId));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Class Management</h1>
      <div className="mb-4">
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Class
        </button>
      </div>
      <ClassList
        classes={currentClasses}
        onEdit={(cls) => { setSelectedClass(cls); setIsEditModalOpen(true); }}
        onDelete={(cls) => { setSelectedClass(cls); setIsDeleteModalOpen(true); }}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <ClassFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddClass}
      />
      <ClassFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        cls={selectedClass}
        onSave={handleEditClass}
      />
      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        cls={selectedClass}
        onConfirm={handleDeleteClass}
      />
    </div>
  );
}

