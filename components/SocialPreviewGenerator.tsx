"use client";

import { useEffect } from 'react';

interface SocialPreviewProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
}

const SocialPreviewGenerator = ({
  title = "Niloy Kumar Barman - Full-Stack .NET Developer & Cloud Solutions Expert",
  description = "Full-Stack .NET Developer specializing in scalable applications, cloud solutions, and practical AI integrations with .NET, React, Azure, and AWS. Microsoft Certified.",
  image = "niloykumarbarman.github.io/assets/profile/webp/niloy.webp",
  url = "https://niloykumarbarman.github.io",
  type = "website",
  twitterCard = "summary_large_image"
}: SocialPreviewProps) => {
  
  useEffect(() => {
    // Update meta tags dynamically for SPA navigation
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
      }
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:image:secure_url', image);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', title);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', title);

    // Update general meta tags
    updateMetaTag('description', description);
    document.title = title;

  }, [title, description, image, url, type, twitterCard]);

  return null;
};

export default SocialPreviewGenerator; 

