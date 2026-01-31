import React, { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
}

/**
 * Sets document title and meta description for the current route.
 * Use on every page for SEO and social previews.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const prevContent = meta.getAttribute('content');
    meta.setAttribute('content', description);

    return () => {
      document.title = prevTitle;
      if (meta) {
        if (prevContent) meta.setAttribute('content', prevContent);
        else meta.remove();
      }
    };
  }, [title, description]);

  return null;
}
