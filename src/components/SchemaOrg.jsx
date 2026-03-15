import React from 'react';

const SchemaOrg = ({ cityData, domain = "https://monsite.fr" }) => {
  const {
    name,
    postalCode,
    department,
    departmentCode,
    slug,
    metaDescription,
    latitude,
    longitude,
    telephone,
    ratingScore,
    ratingCount,
    image,
    openingHours,
    mapsUrl
  } = cityData;

  const currentUrl = `${domain}/depannage/${departmentCode}/${slug}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": currentUrl,
    "url": currentUrl,
    "name": `Dépannage à ${name}`,
    "description": metaDescription,
    ...(telephone ? { "telephone": telephone } : {}),
    ...(image ? { "image": image } : {}),
    ...(openingHours ? { "openingHours": openingHours } : {}),
    ...(mapsUrl ? { "hasMap": mapsUrl } : {}),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": name,
      "postalCode": postalCode,
      "addressRegion": department,
      "addressCountry": "FR"
    },
    ...(latitude && longitude
      ? {
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": latitude,
            "longitude": longitude
          }
        }
      : {}),
    ...(ratingScore && ratingCount
      ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingScore,
            "reviewCount": ratingCount,
            "bestRating": "5"
          }
        }
      : {})
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaOrg;