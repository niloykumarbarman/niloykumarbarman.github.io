"use client";

import React from 'react';
import Script from 'next/script';

// Component to enhance SEO with additional structured data
const SEOOptimizer = () => {
  const portfolioData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Niloy Kumar Barman",
      "jobTitle": "Full-Stack .NET Developer",
      "description": "Professional Full-Stack .NET Developer with 10+ years of experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.",
      "url": "https://github.com/niloykumarbarman",
      "sameAs": [
        "https://github.com/niloykumarbarman",
        "https://www.linkedin.com/in/niloy-barman-552634339/",
        // Add other social profiles here
      ],
      "knowsAbout": [
        {
          "@type": "SoftwareApplication",
          "name": ".NET Core",
          "applicationCategory": "DeveloperApplication"
        },
        {
          "@type": "SoftwareApplication",
          "name": "React",
          "applicationCategory": "DeveloperApplication"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Azure",
          "applicationCategory": "DeveloperApplication"
        },
        {
          "@type": "SoftwareApplication",
          "name": "AWS",
          "applicationCategory": "DeveloperApplication"
        }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Microsoft Certified: Azure Fundamentals",
          "credentialCategory": "certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Microsoft"
          }
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://niloykumarbarman.github.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://niloykumarbarman.github.io/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Skills",
        "item": "https://niloykumarbarman.github.io/skills"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Certifications",
        "item": "https://niloykumarbarman.github.io/certifications"
      }
    ]
  };

  // FAQ Schema for common questions about services
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What technologies does Niloy Kumar Barman specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Niloy specializes in .NET Core, React, TypeScript, Azure, AWS, SQL Server, MongoDB, and modern web development frameworks with over 10 years of experience."
        }
      },
      {
        "@type": "Question",
        "name": "What types of projects does Niloy work on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Niloy works on full-stack web applications, cloud solutions, enterprise software, API development, database design, and DevOps implementations."
        }
      },
      {
        "@type": "Question",
        "name": "Is Niloy available for freelance projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Niloy is available for consulting and freelance projects. Contact through the portfolio website for project inquiries and collaboration opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "What certifications does Niloy hold?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Niloy holds Microsoft Azure Fundamentals certification and multiple professional development certifications in software development and cloud technologies."
        }
      }
    ]
  };

  // Professional Service Schema
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Full-Stack Development Services",
    "description": "Professional full-stack development services specializing in .NET, React, and cloud solutions",
    "provider": {
      "@type": "Person",
      "name": "Niloy Kumar Barman"
    },
    "areaServed": "Worldwide",
    "serviceType": [
      "Web Application Development",
      "Cloud Solutions",
      "API Development",
      "Database Design",
      "DevOps Implementation"
    ]
  };

  return (
    <>
      <Script 
        id="schema-portfolio" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioData) }}
        strategy="afterInteractive"
      />
      <Script 
        id="schema-breadcrumbs" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        strategy="afterInteractive"
      />
      <Script 
        id="schema-faq" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        strategy="afterInteractive"
      />
      <Script 
        id="schema-service" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
        strategy="afterInteractive"
      />
    </>
  );
};

export default SEOOptimizer; 