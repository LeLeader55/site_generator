import { useEffect } from "react";

function upsertMeta(name, content) {
  if (!content) return;

  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(url) {
  if (!url) return;

  let element = document.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

export default function SeoHelmet({ title, description, canonical }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    upsertMeta("description", description);
    upsertCanonical(canonical);
  }, [title, description, canonical]);

  return null;
}