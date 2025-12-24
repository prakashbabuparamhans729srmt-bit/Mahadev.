import { Folder, FileText, FileImage, FileVideo, Code } from 'lucide-react';
import React from 'react';

export const getFileIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'folder':
      return <Folder className="h-5 w-5 text-primary" />;
    case 'figma':
      return <FileText className="h-5 w-5 text-pink-400" />;
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-400" />;
    case 'image':
      return <FileImage className="h-5 w-5 text-blue-400" />;
    case 'video':
      return <FileVideo className="h-5 w-5 text-green-400" />;
    case 'code':
        return <Code className="h-5 w-5 text-teal-400" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
};
