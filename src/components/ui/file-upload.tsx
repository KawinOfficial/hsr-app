"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  X,
  File,
  FileText,
  Image,
  FileArchive,
  FileVideo,
  FileAudio,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

interface FileUploadProps {
  files: FileWithPreview[];
  onFilesChange: (files: FileWithPreview[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
  className?: string;
  disabled?: boolean;
}

const getFileIcon = (file: File) => {
  const type = file.type.split("/")[0];
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (type === "image") return <Image className="h-4 w-4" />;
  if (type === "video") return <FileVideo className="h-4 w-4" />;
  if (type === "audio") return <FileAudio className="h-4 w-4" />;
  if (extension === "pdf") return <FileText className="h-4 w-4" />;
  if (["zip", "rar", "7z", "tar", "gz"].includes(extension || ""))
    return <FileArchive className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "text/plain": [".txt"],
    "application/zip": [".zip", ".rar"],
  },
  className,
  disabled = false,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: FileWithPreview[] = acceptedFiles.map((file) => ({
        ...file,
        id: Math.random().toString(36).substring(2, 9),
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      onFilesChange(updatedFiles);
    },
    [files, maxFiles, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
    disabled,
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const removeAllFiles = () => {
    onFilesChange([]);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragActive || dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-xs text-muted-foreground">
          Max {maxFiles} files, {formatFileSize(maxSize)} each
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          disabled={disabled}
        >
          Select Files
        </Button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Selected Files ({files.length}/{maxFiles})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeAllFiles}
              className="text-destructive hover:text-destructive"
            >
              Remove All
            </Button>
          </div>

          <div className="grid gap-2">
            {files.map((file) => (
              <Card key={file.id} className="p-3">
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
