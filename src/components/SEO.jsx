import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.locazen7.fr';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';

export default function SEO({ title, description, canonical, image, jsonLd }) {
  const fullTitle = title
    ? `${title} · Locazen 7 Sète`
    : 'Locazen 7 · Conciergerie & Location Vacances à Sète';
  const fullUrl = `${SITE_URL}${canonical || '/'}`;
  const imgUrl = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
