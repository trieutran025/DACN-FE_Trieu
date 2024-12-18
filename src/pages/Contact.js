import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card.tsx";
import { Input } from "../../src/components/ui/input.tsx";
import { Textarea } from "../../src/components/ui/textarea.tsx";
import { Button } from "../../src/components/ui/button.tsx";
import { Label } from "../../src/components/ui/lable.tsx";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liên hệ với chúng tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Gửi tin nhắn cho chúng tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" placeholder="Nhập họ và tên của bạn" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Nhập địa chỉ email của bạn" />
              </div>
              <div>
                <Label htmlFor="message">Tin nhắn</Label>
                <Textarea id="message" placeholder="Nhập tin nhắn của bạn" />
              </div>
              <Button type="submit">Gửi tin nhắn</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>Địa chỉ:</strong><br />
                123 Đường ABC, Quận XYZ<br />
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
              <p>
                <strong>Email:</strong><br />
                support@saaslms.com
              </p>
              <p>
                <strong>Điện thoại:</strong><br />
                +84 123 456 789
              </p>
              <p>
                <strong>Giờ làm việc:</strong><br />
                Thứ Hai - Thứ Sáu: 9:00 - 18:00<br />
                Thứ Bảy: 9:00 - 12:00
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
