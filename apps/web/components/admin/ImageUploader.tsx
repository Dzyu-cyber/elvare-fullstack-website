'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  onImagesChange?: (urls: string[]) => void;
  initialImages?: string[];
}

export function ImageUploader({ onImagesChange, initialImages = [] }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    const toastId = toast.loading('Uploading images...');
    
    try {
      const uploadedUrls: string[] = [];
      
      for (const file of files) {
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/uploads/image`, 
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        
        if (response.data?.url) {
          uploadedUrls.push(response.data.url);
        }
      }
      
      if (uploadedUrls.length > 0) {
        const updatedImages = [...images, ...uploadedUrls];
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
        toast.success('Images uploaded successfully', { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    } catch (error) {
      console.error('Upload failed', error);
      toast.error('Failed to upload images', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
    toast.success('Image removed');
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50 bg-surface-2"
        )}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
            <p className="text-sm font-medium text-text-primary">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-text-primary">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-text-muted mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        )}
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-surface-2">
              <Image
                src={url}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="p-2 bg-danger text-white rounded-full hover:bg-danger-dark transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-primary text-bg text-xs font-bold px-2 py-0.5 rounded-full">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
