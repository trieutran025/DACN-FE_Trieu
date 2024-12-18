import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card.tsx"
import { Button } from  "../../src/components/ui/button.tsx"

const courses = [
  {
    id: 1,
    title: 'Lập trình React cơ bản',
    description: 'Học cách xây dựng ứng dụng web với React từ cơ bản đến nâng cao.',
    duration: '8 tuần',
    level: 'Cơ bản',
  },
  {
    id: 2,
    title: 'JavaScript nâng cao',
    description: 'Khám phá các tính năng nâng cao của JavaScript và cách áp dụng chúng.',
    duration: '6 tuần',
    level: 'Trung cấp',
  },
];

const CourseCard = ({ course }) => (
  <Card>
    <CardHeader>
      <CardTitle>{course.title}</CardTitle>
      <CardDescription>{course.level} - {course.duration}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{course.description}</p>
    </CardContent>
    <CardFooter>
      <Button>Đăng ký khóa học</Button>
    </CardFooter>
  </Card>
);

export default function Courses() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Khóa học của chúng tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

