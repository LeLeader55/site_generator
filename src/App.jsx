import React from 'react';
import { pickVariant, shuffleArray } from "./utils/variation";
import { Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  Phone,
  Clock3,
  Star,
  MapPin,
  ChevronRight,
  Lock,
  Wrench,
  Zap,
  Flame,
  Droplets,
  Hammer,
  CheckCircle2,
  ArrowRight,
  Menu,
  Search,
  BadgeEuro,
  Building2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { cities, getCity } from './data/cities';
import SchemaOrg from "./components/SchemaOrg";
import SeoHelmet from "./components/SeoHelmet";

const services = [
  { title: 'Serrurier', delay: 'Sous 30 à 45 min', desc: 'Ouverture de porte, changement de serrure, mise en sécurité après effraction.', icon: Lock },
  { title: 'Plombier', delay: 'Sous 40 min', desc: 'Fuite d\'eau, chauffe-eau, débouchage, dépannage urgent ou sur RDV.', icon: Droplets },
  { title: 'Électricien', delay: 'Sous 40 min', desc: 'Panne, tableau électrique, prises, remise en service sécurisée.', icon: Zap },
  { title: 'Chauffagiste', delay: 'Sous 40 min', desc: 'Chaudière, chauffage, entretien et réparation rapide.', icon: Flame },
  { title: 'Travaux & Bricolage', delay: 'Devis sous 2h', desc: 'Petits travaux, installation, montage, réparations de l\'habitat.', icon: Hammer },
  { title: 'Volets & Fermetures', delay: 'Sous 40 min', desc: 'Volet roulant, rideau métallique, réglage et dépannage mécanique.', icon: Wrench },
];

const testimonials = [
  { name: 'Sonia R.', text: 'Design propre, rassurant et pro. On comprend tout en quelques secondes.' },
  { name: 'Nicolas M.', text: 'Le parcours est fluide, parfait pour convertir sur mobile et en urgence.' },
  { name: 'Amine T.', text: 'La page locale donne confiance avec les zones d\'intervention et les prestations visibles immédiatement.' },
];

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:serviceSlug/:departmentCode/:citySlug" element={<CityPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/:serviceSlug/:departmentCode"
          element={<DepartmentPage />}
        />
      </Routes>
      <Footer />
      <a className="floating-call hide-desktop" href="tel:0232002727">
        <Phone size={18} /> Appeler
      </a>
    </div>
  );
}

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <div className="inner">
        <Link to="/" className="logo-wrap">
          <div className="logo-icon"><ShieldCheck size={20} /></div>
          <div className="logo-text">
            <strong>Depanéo 27</strong>
            <span>Dépannage local premium</span>
          </div>
        </Link>

        <nav className="main-nav">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Accueil</Link>
          <Link to="/serrurier/27/val-de-reuil" className={pathname.includes('val-de-reuil') ? 'active' : ''}>Val-de-Reuil</Link>
          <a href="#services">Services</a>
        </nav>

        <div className="header-actions">
          <a className="phone-chip" href="tel:0232002727"><Phone size={16} /> 02 32 00 27 27</a>
          <a className="btn btn-dark" href="#contact">Devis gratuit</a>
        </div>

        <button className="mobile-menu-btn" aria-label="Menu"><Menu size={18} /></button>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <SeoHelmet
        title="Dépannage à domicile en France : serrurier, plombier, électricien"
        description="Dépannage à domicile partout en France : serrurier, plomberie, électricité, chauffage, volets et petits travaux."
        canonical="https://ton-domaine.fr/"
      />
      <section className="hero-home">
        <div className="blob blob-left"></div>
        <div className="blob blob-right"></div>

        <div className="container hero-grid">
          <div>
            <span className="badge badge-soft-orange">
              Dépannage en France • 24h/24 et 7j/7 selon disponibilité
            </span>

            <h1 className="hero-title">
              Dépannage à domicile partout en France :
              <span className="text-gradient"> serrurier, plomberie, électricité </span>
              et interventions d’urgence
            </h1>

            <p className="hero-text">
              Besoin d’un dépannage rapide ? Trouvez un professionnel pour les
              urgences du quotidien : porte claquée, serrure bloquée, fuite
              d’eau, panne électrique, problème de chauffage, volets roulants ou
              petits travaux. Notre réseau couvre de nombreuses villes en France
              avec des pages locales dédiées par métier et par secteur.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="tel:0232002727">
                <Phone size={18} /> Appeler maintenant
              </a>
              <Link className="btn btn-outline" to="/serrurier/27/val-de-reuil">
                Voir un exemple de page locale <ArrowRight size={18} />
              </Link>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <strong>France entière</strong>
                <span>Couverture nationale</span>
              </div>
              <div className="stat-card">
                <strong>24h/24</strong>
                <span>Urgences selon disponibilité</span>
              </div>
              <div className="stat-card">
                <strong>Devis gratuit</strong>
                <span>Avant validation lorsque possible</span>
              </div>
              <div className="stat-card">
                <strong>Pages locales</strong>
                <span>Par ville et par métier</span>
              </div>
            </div>
          </div>

          <div className="glass-card" id="contact">
            <div className="glass-card-head">
              <p>Demande d’intervention</p>
              <h3>Obtenir rapidement un rappel</h3>
            </div>

            <div className="glass-card-body">
              <div className="form-grid-2">
                <div className="field">
                  <label>Code postal</label>
                  <input className="input" placeholder="Ex : 75011" />
                </div>
                <div className="field">
                  <label>Métier recherché</label>
                  <input className="input" placeholder="Ex : Serrurier" />
                </div>
              </div>

              <div className="field" style={{ marginTop: 14 }}>
                <label>Votre besoin</label>
                <input
                  className="input"
                  placeholder="Ex : porte claquée, fuite d’eau, panne électrique..."
                />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary">Demander un devis</button>
                <button className="btn btn-outline">Être rappelé</button>
              </div>

              <div className="check-grid">
                <div className="check-item">
                  <CheckCircle2 size={16} /> Sans engagement
                </div>
                <div className="check-item">
                  <CheckCircle2 size={16} /> Devis avant validation
                </div>
                <div className="check-item">
                  <CheckCircle2 size={16} /> Orientation selon votre secteur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <span className="badge badge-white">Nos services</span>
            <h2>Les principaux métiers du dépannage à domicile</h2>
            <p>
              Retrouvez les interventions les plus demandées partout en France :
              serrurerie, plomberie, électricité, chauffage, fermetures et
              petits travaux, avec des pages locales dédiées pour chaque ville.
            </p>
          </div>

          <div className="cards-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div className="service-card" key={service.title}>
                  <div className="service-icon">
                    <Icon size={24} />
                  </div>

                  <div className="service-top">
                    <h3>{service.title}</h3>
                    <span className="badge badge-soft-blue">{service.delay}</span>
                  </div>

                  <p>{service.desc}</p>
                  <span className="service-link">
                    En savoir plus <ChevronRight size={16} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div
          className="container"
          style={{ display: 'grid', gap: 26, gridTemplateColumns: '0.9fr 1.1fr' }}
        >
          <div className="section-head">
            <span className="badge badge-white">Fonctionnement</span>
            <h2>Comment faire une demande de dépannage ?</h2>
            <p>
              Indiquez votre besoin, votre code postal et le métier recherché.
              La demande peut ensuite être orientée vers une prise de contact
              rapide selon la zone et le type d’intervention.
            </p>
          </div>

          <div className="steps-grid">
            {[
              [
                '1. Décrivez votre problème',
                "Indiquez votre besoin : serrurerie, plomberie, électricité, chauffage ou autre dépannage.",
              ],
              [
                '2. Renseignez votre localisation',
                "Le code postal permet d’orienter votre demande vers le bon secteur en France.",
              ],
              [
                '3. Recevez une prise de contact',
                'Selon la demande, vous pouvez être rappelé, obtenir un devis ou être orienté vers une intervention.',
              ],
              [
                '4. Intervention selon disponibilité',
                'Le dépannage dépend du métier recherché, de l’urgence et de la zone concernée.',
              ],
            ].map(([title, desc]) => (
              <div className="step-card" key={title}>
                <div className="step-bullet">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div
          className="container"
          style={{ display: 'grid', gap: 30, gridTemplateColumns: '1.1fr 0.9fr' }}
        >
          <div>
            <div className="section-head">
              <span className="badge badge-white">Pourquoi nous contacter</span>
              <h2>Un service pensé pour orienter rapidement les demandes</h2>
              <p>
                En cas de porte bloquée, fuite d’eau, panne électrique ou
                problème de chauffage, l’essentiel est d’obtenir rapidement une
                réponse claire, un rappel simple et une orientation adaptée à
                votre ville.
              </p>
            </div>

            <div className="trust-grid">
              {[
                'Couverture nationale',
                'Pages locales par ville et par métier',
                'Prise de contact rapide',
                'Demande simple à remplir',
                'Devis avant validation lorsque possible',
                'Interventions selon zone et disponibilité',
              ].map((item) => (
                <div className="trust-item" key={item}>
                  <ShieldCheck size={18} color="#ea580c" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: 'Claire D.',
                text: 'Le site permet de trouver rapidement le bon métier et de faire une demande selon sa ville.',
              },
              {
                name: 'Mehdi R.',
                text: 'Pratique pour une urgence, surtout quand on ne sait pas qui contacter directement.',
              },
              {
                name: 'Sophie T.',
                text: 'Navigation simple, demande rapide et pages locales utiles pour trouver un serrurier ou un plombier.',
              },
            ].map((item) => (
              <div className="testimonial-card" key={item.name}>
                <div className="stars">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p>“{item.text}”</p>
                <strong>{item.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <div className="section-head">
            <span className="badge badge-soft-orange">FAQ</span>
            <h2>Questions fréquentes sur le dépannage en France</h2>
            <p>
              Retrouvez les réponses aux questions les plus fréquentes concernant
              les demandes de dépannage à domicile partout en France.
            </p>
          </div>

          <div className="faq-grid">
            {[
              [
                'Intervenez-vous partout en France ?',
                'Le site a vocation à couvrir de nombreuses villes en France grâce à des pages locales par métier et par secteur. La disponibilité dépend ensuite de la zone concernée.',
              ],
              [
                'Puis-je demander un devis avant intervention ?',
                'Oui, selon le type de demande et les informations transmises, une estimation ou un devis peut être communiqué avant validation.',
              ],
              [
                'Quels métiers de dépannage sont proposés ?',
                'Les demandes les plus fréquentes concernent la serrurerie, la plomberie, l’électricité, le chauffage, les fermetures et certains petits travaux.',
              ],
              [
                'À quoi servent les pages locales ?',
                'Les pages locales permettent de trouver plus facilement un service de dépannage par ville, par département et par métier.',
              ],
            ].map(([q, a]) => (
              <div className="faq-card" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CityPage() {
  const { serviceSlug, departmentCode, citySlug } = useParams();
  const city = getCity(serviceSlug, departmentCode, citySlug);

  if (!city) return <Navigate to="/" replace />;

  const faqSection = city.faqSection || null;
  const trustSection = city.trustSection || null;

  const telHref = `tel:${city.phone.replace(/\s+/g, "")}`;
  const serviceNameLower = city.serviceName?.toLowerCase?.() || "service";

  const siblingCities = cities.filter(
    (item) =>
      item.departmentCode === city.departmentCode &&
      item.serviceSlug === city.serviceSlug &&
      item.slug !== city.slug
  );

  const heroBadge = city.heroBadge || "Entreprise locale";

  const miniStats =
    city.miniStats || [
      { label: "Intervention", value: city.responseTime || "30-45 min" },
      { label: "Disponibilité", value: city.availability || "24/7" },
      { label: "Avant validation", value: city.quoteLabel || "Devis gratuit" },
    ];

  const expressCard = {
    small: city.expressCard?.small || "Demande express",
    title: city.expressCard?.title || `${city.serviceName} ${city.name}`,
    placeholders: {
      address:
        city.expressCard?.placeholders?.address || "Adresse ou code postal",
      need: city.expressCard?.placeholders?.need || "Votre besoin",
      phone: city.expressCard?.placeholders?.phone || "Votre numéro",
    },
    cta: city.expressCard?.cta || "Être rappelé rapidement",
    reassuranceItems: city.expressCard?.reassuranceItems || [
      "Intervention rapide annoncée",
      "Tarifs expliqués avant validation",
      "Disponibilité 24h/24 et 7j/7",
      "Paiement après intervention",
    ],
  };

  const prestationsSection = {
    badge: city.prestationsSection?.badge || "Prestations",
    title:
      city.prestationsSection?.title ||
      `Interventions les plus demandées à ${city.name}`,
    intro:
      city.prestationsSection?.intro ||
      `Les interventions les plus fréquentes de ${serviceNameLower} à ${city.name} (${city.postalCode}) concernent les demandes courantes, les urgences, les remplacements d’équipements et les mises en sécurité selon les besoins sur place.`,
    cta: city.prestationsSection?.cta || "Réserver cette intervention",
  };

  const zoneSection = {
    badge: city.zoneSection?.badge || "Zone couverte",
    title:
      city.zoneSection?.title ||
      `${city.serviceName} à ${city.name} et communes autour du ${city.postalCode}`,
    intro:
      city.zoneSection?.intro ||
      `Notre ${serviceNameLower} intervient à ${city.name} (${city.postalCode}) ainsi que dans les secteurs proches. Les déplacements couvrent notamment ${city.localAreas?.join(", ") || city.name
      }.`,
  };

  const featuresSection = {
    title:
      city.featuresSection?.title ||
      `Pourquoi faire appel à un ${serviceNameLower} à ${city.name} ?`,
    items: city.featuresSection?.items || [
      `Intervention rapide à ${city.name}`,
      `Déplacement dans ${city.name} et ses alentours`,
      `Disponibilité étendue dans le ${city.departmentCode}`,
      "Tarifs expliqués avant validation",
      "Prise en charge des demandes urgentes",
      "Intervention adaptée à votre situation",
    ],
  };

  const jobsSection = {
    title: city.jobsSection?.title || "Dernières demandes dans le secteur",
    items: city.jobsSection?.items || city.currentJobs || [],
    boxTitle: city.jobsSection?.boxTitle || "Tarifs annoncés à l'avance",
    boxText: city.jobsSection?.boxText || "Pas de surprise avant validation",
  };

  const seoSection = {
    badge: city.seoSection?.badge || city.seoBadge || "Informations locales",
    title:
      city.seoSection?.title ||
      city.seoSectionTitle ||
      `Informations utiles sur ${serviceNameLower} à ${city.name}`,
    intro:
      city.seoSection?.intro ||
      city.seoSectionIntro ||
      `Retrouvez les informations utiles concernant les interventions de ${serviceNameLower} à ${city.name}, les demandes fréquentes et les zones couvertes.`,
  };

  const departmentSection = {
    title:
      city.departmentSection?.title ||
      `Communes d’intervention dans le ${city.departmentCode}`,
    text:
      city.departmentSection?.text ||
      `Notre ${serviceNameLower} intervient à ${city.name} (${city.postalCode}) ainsi que dans d’autres communes du ${city.department}. Retrouvez ci-dessous les autres pages locales disponibles dans le département.`,
  };

  const mapsPlaceUrl = city.mapsPlaceUrl || city.mapsUrl;
  const mapsEmbedUrl = city.mapsEmbedUrl || city.mapsUrl;

  return (
    <>
      <SeoHelmet
        title={city.seoTitle}
        description={city.metaDescription}
        canonical={`https://ton-domaine.fr/${serviceSlug}/${departmentCode}/${citySlug}`}
      />
      <SchemaOrg cityData={city} serviceSlug={serviceSlug} domain="https://ton-domaine.fr" />
      <section className="city-hero">
        <div className="blob blob-left"></div>
        <div className="blob blob-right"></div>

        <div className="container city-grid">
          <div>
            <div className="breadcrumb">
              <span>Accueil</span>
              <ChevronRight size={15} />
              <span>{serviceNameLower}</span>
              <ChevronRight size={15} />
              <span>{city.departmentCode}</span>
              <ChevronRight size={15} />
              <strong>{city.name}</strong>
            </div>

            <span className="badge badge-soft-orange">
              {heroBadge} • {city.departmentCode} • {city.postalCode}
            </span>

            <h1 className="city-title">{city.seoTitle}</h1>
            <p className="city-text">{city.heroIntro}</p>

            <div className="city-actions">
              <a className="btn btn-dark" href={telHref}>
                <Phone size={18} /> {city.phone}
              </a>

              {mapsPlaceUrl && (
                <a
                  className="btn btn-outline"
                  href={mapsPlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir la fiche Maps <ExternalLink size={18} />
                </a>
              )}
            </div>

            <div className="city-mini-stats">
              {miniStats.map((stat, index) => (
                <div className="city-mini-stat" key={`${stat.label}-${index}`}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <aside className="side-card">
            <div className="body">
              <small>{expressCard.small}</small>
              <h3>{expressCard.title}</h3>

              <div className="field" style={{ marginTop: 18 }}>
                <input
                  className="input"
                  placeholder={expressCard.placeholders.address}
                />
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <input
                  className="input"
                  placeholder={expressCard.placeholders.need}
                />
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <input
                  className="input"
                  placeholder={expressCard.placeholders.phone}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  {expressCard.cta}
                </button>
              </div>

              <div
                className="check-grid"
                style={{ gridTemplateColumns: "1fr", marginTop: 16 }}
              >
                {expressCard.reassuranceItems.map((item) => (
                  <div className="check-item" key={item}>
                    <CheckCircle2 size={16} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="badge badge-white">{prestationsSection.badge}</span>
            <h2>{prestationsSection.title}</h2>
            <p>{prestationsSection.intro}</p>
          </div>

          <div className="prestation-grid">
            {(city.prestations || []).map((item) => (
              <div className="prestation-card" key={item.title}>
                <div className="prestation-head">
                  <div>
                    <h3>{item.title}</h3>
                    <small>{item.delay}</small>
                  </div>
                  <span className="price-pill">{item.price}</span>
                </div>

                <p>{item.desc}</p>

                <div style={{ marginTop: 18 }}>
                  <button className="btn btn-outline">
                    {item.cta || prestationsSection.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-section">
        <div
          className="container"
          style={{ display: "grid", gap: 30, gridTemplateColumns: "1fr 420px" }}
        >
          <div>
            <div className="section-head">
              <span className="badge badge-white">{zoneSection.badge}</span>
              <h2>{zoneSection.title}</h2>
              <p>{zoneSection.intro}</p>
            </div>

            {!!city.localAreas?.length && (
              <div className="pills-wrap">
                {city.localAreas.map((area) => (
                  <span className="area-pill" key={area}>
                    <MapPin size={15} /> {area}
                  </span>
                ))}
              </div>
            )}

            {mapsEmbedUrl && (
              <div className="map-box">
                <iframe
                  src={mapsEmbedUrl}
                  loading="lazy"
                  title={`Carte ${city.name}`}
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="feature-box">
              <h3>{featuresSection.title}</h3>
              <div className="feature-grid">
                {featuresSection.items.map((item) => (
                  <div className="feature-item" key={item}>
                    <CheckCircle2 size={18} color="#ea580c" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="side-card">
            <div className="body">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Clock3 size={18} color="#ea580c" />
                <h3 style={{ fontSize: 24 }}>{jobsSection.title}</h3>
              </div>

              <div className="job-list">
                {jobsSection.items.map((job) => (
                  <div className="job-item" key={job}>
                    <p>{job}</p>
                  </div>
                ))}
              </div>

              <div className="price-box">
                <strong>{jobsSection.boxTitle}</strong>
                <span> {jobsSection.boxText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {trustSection && (
        <section className="section trust-section">
          <div className="container">
            <div className="section-head">
              <span className="badge badge-white">Confiance</span>
              <h2>{trustSection.title}</h2>
            </div>

            <div className="feature-grid">
              {trustSection.items.map((item, index) => (
                <div className="feature-item" key={index}>
                  <CheckCircle2 size={18} color="#ea580c" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div
          className="container"
          style={{ display: "grid", gap: 30, gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <div className="section-head">
              <span className="badge badge-white">{seoSection.badge}</span>
              <h2>{seoSection.title}</h2>
              <p>{seoSection.intro}</p>
            </div>

            <div className="seo-copy" style={{ marginTop: 24 }}>
              {(city.seoParagraphs || []).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="final-cta">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Building2 size={22} color="#fdba74" />
              <h3>{departmentSection.title}</h3>
            </div>

            <p>{departmentSection.text}</p>

            <div className="intervention-links">
              {siblingCities.map((item) => (
                <a
                  key={item.slug}
                  className="intervention-link"
                  href={`/${item.serviceSlug}/${item.departmentCode}/${item.slug}`}
                >
                  {item.serviceName} à {item.name} ({item.postalCode})
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {faqSection && (
        <section className="section faq-section">
          <div className="container">
            <div className="section-head">
              <span className="badge badge-white">FAQ</span>
              <h2>{faqSection.title}</h2>
            </div>

            <div className="faq-list">
              {faqSection.items.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
function DepartmentPage() {
  const { serviceSlug, departmentCode } = useParams();

  const departmentCities = cities.filter(
    (item) =>
      item.serviceSlug === serviceSlug &&
      item.departmentCode === departmentCode
  );

  if (!departmentCities.length) return <Navigate to="/" replace />;

  const firstCity = departmentCities[0];
  const serviceName = firstCity.serviceName || serviceSlug;
  const serviceNameLower = serviceName?.toLowerCase?.() || "service";
  const departmentName = firstCity.department || departmentCode;
  const telHref = `tel:${(firstCity.phone || "").replace(/\s+/g, "")}`;

  const departmentData =
    typeof getDepartment === "function"
      ? getDepartment(serviceSlug, departmentCode)
      : null;

  const heroBadge =
    departmentData?.heroBadge || "Intervention départementale";

  const heroTitle =
    departmentData?.heroTitle ||
    `${serviceName} dans le département ${departmentName} (${departmentCode})`;

  const heroIntro =
    departmentData?.heroIntro ||
    `Notre service de ${serviceNameLower} intervient dans les principales villes du département ${departmentName} (${departmentCode}) pour les demandes courantes, urgences et interventions sur rendez-vous selon disponibilité.`;

  const miniStats =
    departmentData?.miniStats || [
      { label: "Couverture", value: `Département ${departmentCode}` },
      { label: "Disponibilité", value: firstCity.availability || "24/7" },
      { label: "Avant validation", value: firstCity.quoteLabel || "Devis annoncé" },
    ];

  const expressCard = {
    small: departmentData?.expressCard?.small || "Demande départementale",
    title:
      departmentData?.expressCard?.title ||
      `${serviceName} dans le ${departmentName}`,
    placeholders: {
      address:
        departmentData?.expressCard?.placeholders?.address ||
        "Ville ou adresse de l’intervention",
      need:
        departmentData?.expressCard?.placeholders?.need ||
        `Ex : besoin en ${serviceNameLower}`,
      phone:
        departmentData?.expressCard?.placeholders?.phone || "Votre numéro",
    },
    cta:
      departmentData?.expressCard?.cta || "Être rappelé rapidement",
    reassuranceItems:
      departmentData?.expressCard?.reassuranceItems || [
        `Intervention dans les villes du ${departmentName}`,
        "Tarifs expliqués avant validation",
        "Prise en charge des urgences selon disponibilité",
        "Paiement après intervention",
      ],
  };

  const citiesSection = {
    badge: departmentData?.citiesSection?.badge || "Villes couvertes",
    title:
      departmentData?.citiesSection?.title ||
      `${serviceName} dans les principales villes du ${departmentName}`,
    intro:
      departmentData?.citiesSection?.intro ||
      `Consultez ci-dessous les pages locales disponibles pour les principales communes du département ${departmentName}.`,
  };

  const prestationsSection = {
    badge: departmentData?.prestationsSection?.badge || "Prestations",
    title:
      departmentData?.prestationsSection?.title ||
      `Interventions ${serviceNameLower} les plus demandées dans le ${departmentName}`,
    intro:
      departmentData?.prestationsSection?.intro ||
      `Les demandes les plus fréquentes concernent les dépannages urgents, les remplacements d’équipements, les mises en sécurité et les interventions planifiées selon la situation sur place.`,
    cta:
      departmentData?.prestationsSection?.cta || "Demander cette intervention",
  };

  const prestations =
    departmentData?.prestations || [
      {
        title: `Dépannage ${serviceNameLower}`,
        delay: "Selon disponibilité",
        price: "Devis",
        desc: `Intervention sur les demandes courantes de ${serviceNameLower} dans les principales villes du ${departmentName}.`,
      },
      {
        title: "Urgence et mise en sécurité",
        delay: "Rapide",
        price: "Avant validation",
        desc: "Prise en charge des situations urgentes et sécurisation selon le contexte rencontré sur place.",
      },
      {
        title: "Remplacement et réparation",
        delay: "Sur place",
        price: "Tarif annoncé",
        desc: "Réparation, remplacement ou remise en état selon le matériel et la nature de l’intervention.",
      },
    ];

  const zoneSection = {
    badge: departmentData?.zoneSection?.badge || "Zone couverte",
    title:
      departmentData?.zoneSection?.title ||
      `${serviceName} dans le ${departmentName} (${departmentCode})`,
    intro:
      departmentData?.zoneSection?.intro ||
      `Notre service couvre plusieurs communes du département ${departmentName}, avec des interventions organisées selon les besoins et les disponibilités locales.`,
  };

  const featuresSection = {
    title:
      departmentData?.featuresSection?.title ||
      `Pourquoi faire appel à un ${serviceNameLower} dans le ${departmentName} ?`,
    items:
      departmentData?.featuresSection?.items || [
        `Intervention dans plusieurs villes du ${departmentName}`,
        `Déplacement organisé sur le secteur ${departmentCode}`,
        "Prise en charge des urgences selon disponibilité",
        "Tarifs expliqués avant validation",
        "Service local lisible et rassurant",
        "Pages locales dédiées par commune",
      ],
  };

  const jobsSection = {
    title:
      departmentData?.jobsSection?.title ||
      `Demandes fréquentes dans le ${departmentName}`,
    items:
      departmentData?.jobsSection?.items || [
        `Demande urgente de ${serviceNameLower} sur une commune du ${departmentName}`,
        `Intervention planifiée dans le secteur ${departmentCode}`,
        "Besoin de diagnostic avant travaux",
        "Demande de rappel pour une intervention locale",
      ],
    boxTitle:
      departmentData?.jobsSection?.boxTitle || "Avant intervention",
    boxText:
      departmentData?.jobsSection?.boxText || "Explications et validation avant déplacement",
  };

  const trustSection = departmentData?.trustSection || {
    title: `Pourquoi choisir notre service dans le ${departmentName} ?`,
    items: [
      `Couverture de plusieurs villes du ${departmentName}`,
      "Intervention rapide selon disponibilité",
      "Tarif communiqué avant validation",
      "Approche claire et rassurante",
    ],
  };

  const seoSection = {
    badge:
      departmentData?.seoSection?.badge || "Informations départementales",
    title:
      departmentData?.seoSection?.title ||
      `Informations utiles sur ${serviceNameLower} dans le ${departmentName}`,
    intro:
      departmentData?.seoSection?.intro ||
      `Retrouvez ici les informations utiles concernant les interventions de ${serviceNameLower} dans le département ${departmentName}, les zones couvertes et les demandes les plus courantes.`,
  };

  const seoParagraphs =
    departmentData?.seoParagraphs || [
      `Faire appel à un ${serviceNameLower} dans le département ${departmentName} permet d’obtenir une prise en charge plus simple sur les principales communes et leurs alentours.`,
      `Cette page regroupe les pages locales disponibles dans le ${departmentName} afin de vous orienter plus facilement vers la commune concernée par votre demande.`,
      `Selon le type d’intervention, le contexte sur place et la disponibilité, notre service peut intervenir sur une large partie du département ${departmentName}.`,
    ];

  const internalSection = {
    title:
      departmentData?.internalSection?.title ||
      `Pages locales de ${serviceNameLower} dans le ${departmentName}`,
    text:
      departmentData?.internalSection?.text ||
      `Retrouvez ci-dessous les principales pages locales disponibles pour le département ${departmentName}. Chaque page regroupe des informations ciblées sur la commune concernée.`,
  };

  const faqSection = departmentData?.faqSection || {
    title: `Questions fréquentes sur nos interventions dans le ${departmentName}`,
    items: [
      {
        q: `Intervenez-vous dans tout le département ${departmentName} ?`,
        a: `Nous couvrons les principales communes du département ${departmentName} ainsi que les secteurs proches selon disponibilité.`,
      },
      {
        q: `Puis-je accéder à une page dédiée à ma ville ?`,
        a: "Oui, vous pouvez consulter la liste des communes couvertes et ouvrir la page locale correspondante.",
      },
      {
        q: "Comment demander une intervention ?",
        a: "Vous pouvez appeler directement ou utiliser le formulaire de demande de rappel affiché sur la page.",
      },
    ],
  };

  const mapsPlaceUrl = departmentData?.mapsPlaceUrl || firstCity.mapsPlaceUrl || firstCity.mapsUrl;

  return (
    <>
      <SeoHelmet
        title={
          departmentData?.seoTitle ||
          `${serviceName} dans le ${departmentName} (${departmentCode})`
        }
        description={
          departmentData?.metaDescription ||
          `Besoin d’un ${serviceNameLower} dans le ${departmentName} (${departmentCode}) ? Intervention dans les principales villes du département pour les demandes courantes et urgentes.`
        }
        canonical={`https://ton-domaine.fr/${serviceSlug}/${departmentCode}`}
      />

      <section className="city-hero">
        <div className="blob blob-left"></div>
        <div className="blob blob-right"></div>

        <div className="container city-grid">
          <div>
            <div className="breadcrumb">
              <span>Accueil</span>
              <ChevronRight size={15} />
              <span>{serviceNameLower}</span>
              <ChevronRight size={15} />
              <strong>{departmentCode}</strong>
            </div>

            <span className="badge badge-soft-orange">
              {heroBadge} • {departmentCode} • {departmentName}
            </span>

            <h1 className="city-title">{heroTitle}</h1>
            <p className="city-text">{heroIntro}</p>

            <div className="city-actions">
              <a className="btn btn-dark" href={telHref}>
                <Phone size={18} /> {firstCity.phone}
              </a>

              {mapsPlaceUrl && (
                <a
                  className="btn btn-outline"
                  href={mapsPlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir la fiche Maps <ExternalLink size={18} />
                </a>
              )}
            </div>

            <div className="city-mini-stats">
              {miniStats.map((stat, index) => (
                <div className="city-mini-stat" key={`${stat.label}-${index}`}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <aside className="side-card">
            <div className="body">
              <small>{expressCard.small}</small>
              <h3>{expressCard.title}</h3>

              <div className="field" style={{ marginTop: 18 }}>
                <input
                  className="input"
                  placeholder={expressCard.placeholders.address}
                />
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <input
                  className="input"
                  placeholder={expressCard.placeholders.need}
                />
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <input
                  className="input"
                  placeholder={expressCard.placeholders.phone}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  {expressCard.cta}
                </button>
              </div>

              <div
                className="check-grid"
                style={{ gridTemplateColumns: "1fr", marginTop: 16 }}
              >
                {expressCard.reassuranceItems.map((item) => (
                  <div className="check-item" key={item}>
                    <CheckCircle2 size={16} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="badge badge-white">{citiesSection.badge}</span>
            <h2>{citiesSection.title}</h2>
            <p>{citiesSection.intro}</p>
          </div>

          <div className="prestation-grid">
            {departmentCities.map((city) => (
              <div className="prestation-card" key={city.slug}>
                <div className="prestation-head">
                  <div>
                    <h3>
                      {serviceName} à {city.name}
                    </h3>
                    <small>{city.postalCode}</small>
                  </div>
                  <span className="price-pill">{city.departmentCode}</span>
                </div>

                <p>
                  Intervention locale à {city.name} et dans les communes voisines
                  du secteur {city.postalCode}.
                </p>

                <div style={{ marginTop: 18 }}>
                  <Link
                    className="btn btn-outline"
                    to={`/${city.serviceSlug}/${city.departmentCode}/${city.slug}`}
                  >
                    Voir la page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="badge badge-white">{prestationsSection.badge}</span>
            <h2>{prestationsSection.title}</h2>
            <p>{prestationsSection.intro}</p>
          </div>

          <div className="prestation-grid">
            {prestations.map((item) => (
              <div className="prestation-card" key={item.title}>
                <div className="prestation-head">
                  <div>
                    <h3>{item.title}</h3>
                    <small>{item.delay}</small>
                  </div>
                  <span className="price-pill">{item.price}</span>
                </div>

                <p>{item.desc}</p>

                <div style={{ marginTop: 18 }}>
                  <button className="btn btn-outline">
                    {item.cta || prestationsSection.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-section">
        <div
          className="container"
          style={{ display: "grid", gap: 30, gridTemplateColumns: "1fr 420px" }}
        >
          <div>
            <div className="section-head">
              <span className="badge badge-white">{zoneSection.badge}</span>
              <h2>{zoneSection.title}</h2>
              <p>{zoneSection.intro}</p>
            </div>

            <div className="pills-wrap">
              {departmentCities.map((city) => (
                <span className="area-pill" key={city.slug}>
                  <MapPin size={15} /> {city.name}
                </span>
              ))}
            </div>

            <div className="feature-box">
              <h3>{featuresSection.title}</h3>
              <div className="feature-grid">
                {featuresSection.items.map((item) => (
                  <div className="feature-item" key={item}>
                    <CheckCircle2 size={18} color="#ea580c" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="side-card">
            <div className="body">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Clock3 size={18} color="#ea580c" />
                <h3 style={{ fontSize: 24 }}>{jobsSection.title}</h3>
              </div>

              <div className="job-list">
                {jobsSection.items.map((job) => (
                  <div className="job-item" key={job}>
                    <p>{job}</p>
                  </div>
                ))}
              </div>

              <div className="price-box">
                <strong>{jobsSection.boxTitle}</strong>
                <span> {jobsSection.boxText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {trustSection && (
        <section className="section trust-section">
          <div className="container">
            <div className="section-head">
              <span className="badge badge-white">Confiance</span>
              <h2>{trustSection.title}</h2>
            </div>

            <div className="feature-grid">
              {trustSection.items.map((item, index) => (
                <div className="feature-item" key={index}>
                  <CheckCircle2 size={18} color="#ea580c" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div
          className="container"
          style={{ display: "grid", gap: 30, gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <div className="section-head">
              <span className="badge badge-white">{seoSection.badge}</span>
              <h2>{seoSection.title}</h2>
              <p>{seoSection.intro}</p>
            </div>

            <div className="seo-copy" style={{ marginTop: 24 }}>
              {seoParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="final-cta">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Building2 size={22} color="#fdba74" />
              <h3>{internalSection.title}</h3>
            </div>

            <p>{internalSection.text}</p>

            <div className="intervention-links">
              {departmentCities.map((item) => (
                <Link
                  key={item.slug}
                  className="intervention-link"
                  to={`/${item.serviceSlug}/${item.departmentCode}/${item.slug}`}
                >
                  {item.serviceName} à {item.name} ({item.postalCode})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {faqSection && (
        <section className="section faq-section">
          <div className="container">
            <div className="section-head">
              <span className="badge badge-white">FAQ</span>
              <h2>{faqSection.title}</h2>
            </div>

            <div className="faq-list">
              {faqSection.items.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <div>
          <strong>Depanéo 27</strong>
          <p>Projet React complet prêt à être modifié, dupliqué et déployé.</p>
        </div>
        <div className="footer-actions">
          <Link className="btn btn-outline" to="/serrurier/27/val-de-reuil"><Search size={18} /> Pages locales</Link>
          <a className="btn btn-dark" href="#contact">Demander le développement complet</a>
        </div>
      </div>
    </footer>
  );
}

export default App;
