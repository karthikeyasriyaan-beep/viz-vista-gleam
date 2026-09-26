import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  imageUrl?: string;
  noindex?: boolean;
}

/**
 * SEOHead component dynamically updates document head for better SEO.
 * Sets meta tags for title, description, Open Graph, Twitter Cards, and more.
 */
export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Sriyaan karthikeya",
  section,
  imageUrl,
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title. Many pages already include "| Trackora" or
    // "— Trackora" in the title they pass in, so only append the suffix
    // when it's missing — otherwise every one of those pages ends up with
    // "...| Trackora | Trackora" in the actual <title> tag.
    const hasTrackoraSuffix = /trackora\s*$/i.test(title.trim());
    document.title = hasTrackoraSuffix ? title : `${title} | Trackora`;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Robots directive — keeps pages like NotFound out of the index
    setMetaTag("robots", noindex ? "noindex, follow" : "index, follow");

    // Canonical URL — clear any stale one when this page shouldn't set its own
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.setAttribute("href", canonicalUrl);
    } else if (canonicalElement) {
      canonicalElement.remove();
    }

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords) {
      setMetaTag("keywords", keywords);
    }
    setMetaTag("author", author);

    // Open Graph meta tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", type === "article" ? "article" : "website", true);
    if (canonicalUrl) {
      setMetaTag("og:url", canonicalUrl, true);
    }
    setMetaTag("og:site_name", "Trackora", true);
    if (imageUrl) {
      setMetaTag("og:image", imageUrl, true);
    }

    // Twitter Card meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    if (imageUrl) {
      setMetaTag("twitter:image", imageUrl);
    }

    // Article-specific meta tags + BlogPosting structured data. Structured
    // data is what makes a post eligible for rich results (author, date,
    // headline) in search — none of the blog posts had this before.
    const articleLdId = "seohead-article-ld";
    const existingArticleLd = document.getElementById(articleLdId);
    if (existingArticleLd) existingArticleLd.remove();

    if (type === "article") {
      if (publishedTime) {
        setMetaTag("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        setMetaTag("article:modified_time", modifiedTime, true);
      }
      if (author) {
        setMetaTag("article:author", author, true);
      }
      if (section) {
        setMetaTag("article:section", section, true);
      }

      // Structured-data headline shouldn't carry the "| Trackora" /
      // "— Trackora" site suffix — that's a document.title convention,
      // not part of the article's actual headline.
      const headline = title.replace(/\s*[|—]\s*Trackora\s*$/i, "").trim();

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = articleLdId;
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        image: imageUrl ? [imageUrl] : undefined,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: { "@type": "Person", name: author },
        publisher: {
          "@type": "Organization",
          name: "Trackora",
          logo: { "@type": "ImageObject", url: "https://trackorapp.in/android-chrome-512x512.png" },
        },
        mainEntityOfPage: canonicalUrl ? { "@type": "WebPage", "@id": canonicalUrl } : undefined,
      });
      document.head.appendChild(script);
    }

    // Cleanup function - reset to defaults when component unmounts
    return () => {
      document.title = "Trackora - Smart Expense Tracker & Budget Analytics Platform";
      setMetaTag("robots", "index, follow");
      const ld = document.getElementById(articleLdId);
      if (ld) ld.remove();
    };
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    type,
    publishedTime,
    modifiedTime,
    author,
    section,
    imageUrl,
    noindex,
  ]);

  return null;
};