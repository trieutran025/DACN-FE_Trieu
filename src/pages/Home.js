import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
 

      <main>
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Hệ thống lớp học trực tuyến Saas lms</h1>
              <p className="text-xl text-gray-600 mb-8">Khám phá các khóa học và công cụ học tập tại đây</p>
              <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 inline-flex items-center">
                Khám phá ngay hệ thống của chúng tôi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Các tính năng chính</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Quản lý khóa học trực tuyến"
                description="Dễ dàng tạo, chỉnh sửa và quản lý các khóa học trực tuyến với giao diện thân thiện."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>}
              />
              <FeatureCard
                title="Đánh giá và thi trực tuyến"
                description="Tạo và quản lý các bài kiểm tra, đánh giá trực tuyến với nhiều loại câu hỏi khác nhau."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>}
              />
              <FeatureCard
                title="Báo cáo và phân tích kết quả học tập"
                description="Theo dõi tiến độ học tập và phân tích kết quả với các biểu đồ và báo cáo chi tiết."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>}
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-10">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cần hỗ trợ?</h3>
            <p className="text-gray-600 mb-4">Chúng tôi luôn sẵn sàng giúp đỡ bạn!</p>
            <div className="flex justify-center space-x-4">
              <a href="/faq" className="text-blue-500 hover:text-blue-600 transition duration-300">FAQ</a>
              <a href="/support" className="text-blue-500 hover:text-blue-600 transition duration-300">Liên hệ hỗ trợ</a>
              <a href="/docs" className="text-blue-500 hover:text-blue-600 transition duration-300">Tài liệu hướng dẫn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2023 SaaS LMS. Bảo lưu mọi quyền.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

