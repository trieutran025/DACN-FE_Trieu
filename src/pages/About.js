import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from  "../../src/components/ui/card.tsx"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Về chúng tôi</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sứ mệnh của chúng tôi</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Tại SaaS LMS, chúng tôi cam kết cung cấp nền tảng học tập trực tuyến chất lượng cao, 
            giúp học viên và giảng viên kết nối và phát triển trong một môi trường học tập số hiện đại. 
            Chúng tôi tin rằng công nghệ có thể mở ra cơ hội học tập cho mọi người, mọi lúc, mọi nơi.
          </p>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Đội ngũ của chúng tôi</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Đội ngũ của chúng tôi bao gồm các chuyên gia trong lĩnh vực công nghệ giáo dục, 
            phát triển phần mềm và thiết kế trải nghiệm người dùng. Chúng tôi làm việc không ngừng 
            để cải thiện và phát triển nền tảng, đảm bảo rằng SaaS LMS luôn đáp ứng nhu cầu 
            của cộng đồng học tập trực tuyến ngày càng phát triển.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tầm nhìn</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Chúng tôi hướng tới việc trở thành nền tảng quản lý học tập hàng đầu, 
            nơi mà kiến thức và kỹ năng được chia sẻ và phát triển một cách hiệu quả nhất. 
            Chúng tôi tin rằng học tập là một hành trình suốt đời, và công nghệ có thể 
            giúp làm cho hành trình đó trở nên thú vị và đầy ý nghĩa hơn.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

