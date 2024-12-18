import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button } from './ui/button.tsx'
import { Input } from './ui/input.tsx'
import { Slider } from './ui/sider.tsx'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.tsx'
import { Label } from './ui/lable.tsx'


export function AvatarUpload({ currentAvatar, onSave }) {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const editorRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setIsDialogOpen(true);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          onSave(url);
          setIsDialogOpen(false);
          setImage(null);
        }
      });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={currentAvatar} alt="Current avatar" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Label htmlFor="avatar-upload" className="cursor-pointer">
          <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
            Change Avatar
          </span>
        </Label>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Avatar</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
            />
            <div className="w-full max-w-xs">
              <Label htmlFor="zoom" className="block text-sm font-medium mb-1">
                Zoom
              </Label>
              <Slider
                id="zoom"
                min={1}
                max={3}
                step={0.1}
                value={[scale]}
                onValueChange={(value) => setScale(value[0])}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}