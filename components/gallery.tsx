"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span: string;
}

interface GalleryProps {
  folderId?: string;
}

// Default Google Drive folder ID
const DEFAULT_FOLDER_ID = '1s3gmvBis2Nm634wDEnHm8FmSx3U19E-y';

export function Gallery({ folderId }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use provided folderId, environment variable, or default
    const effectiveFolderId = folderId || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || DEFAULT_FOLDER_ID;
    
    // Fetch images from Google Drive
    fetchImages(effectiveFolderId);
  }, [folderId]);

  const fetchImages = async (folderId: string) => {
    try {
      // For public Google Drive folders, we can use the Google Drive API
      // You'll need to enable Google Drive API and get an API key
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
      
      if (!apiKey) {
        // Fallback: Use manual file IDs if API key is not available
        console.warn('Google Drive API key not found. Please set NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY');
        setError('API key not configured. Please add NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY to your .env.local file');
        setLoading(false);
        return;
      }

      const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,thumbnailLink,webContentLink)&key=${apiKey}`;
      
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Google Drive API error:', errorData);
        throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const files = data.files || [];
      
      console.log('Fetched files from Google Drive:', files);

      // Filter image files and create image URLs
      const imageFiles = files.filter((file: any) => 
        file.mimeType?.startsWith('image/')
      );
      
      console.log('Image files found:', imageFiles.length, imageFiles);

      const galleryImages: GalleryImage[] = imageFiles.map((file: any, index: number) => {
        // Generate direct image URL for Google Drive
        // For public files, use the thumbnail link or construct a direct view URL
        let imageUrl: string;
        
        // For Google Drive images, we need to use a format that works for public files
        // The thumbnailLink from API works best, but we can also use direct view URLs
        if (file.thumbnailLink) {
          // Use thumbnail link but get a larger size
          imageUrl = file.thumbnailLink.replace(/=s\d+/, '=s1600');
        } else {
          // Use direct view URL format that works for publicly shared files
          imageUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
        }
        
        console.log(`Image ${index + 1} (${file.name}):`, {
          id: file.id,
          thumbnailLink: file.thumbnailLink,
          webContentLink: file.webContentLink,
          finalUrl: imageUrl
        });
        
        return {
          id: file.id,
          src: imageUrl,
          alt: file.name || `Gallery Image ${index + 1}`,
          span: index === 1 
            ? "col-span-1 md:col-span-1 md:row-span-2 row-span-1" 
            : "col-span-1 md:col-span-1 row-span-1"
        };
      });

      setImages(galleryImages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError('Failed to load gallery images');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-royal-cream/60">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-royal-red">{error}</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-royal-cream/60">No images found in gallery</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative overflow-hidden bg-royal-dark-2/60 group cursor-pointer ${image.span}`}
        >
          <div className="relative w-full h-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // Fallback: try alternative Google Drive URL formats
                const target = e.target as HTMLImageElement;
                const fileId = image.id;
                const currentSrc = target.src;
                
                // Try different URL formats
                if (currentSrc.includes('uc?export=view')) {
                  // Try download format
                  target.src = `https://drive.google.com/uc?export=download&id=${fileId}`;
                } else if (currentSrc.includes('uc?export=download')) {
                  // Try thumbnail format
                  target.src = `https://lh3.googleusercontent.com/d/${fileId}=w1200-h800`;
                } else {
                  // Try view format
                  target.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                }
                
                console.error(`Failed to load image ${image.alt} (${fileId})`);
              }}
              onLoad={() => {
                console.log(`Successfully loaded image: ${image.alt}`);
              }}
            />
            <div className="absolute inset-0 bg-royal-dark/0 group-hover:bg-royal-dark/20 transition-colors duration-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

