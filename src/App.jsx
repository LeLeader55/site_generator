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

  return (
    <>
      <section className="city-hero">
        <div className="blob blob-left"></div>
        <div className="blob blob-right"></div>
        <div className="container city-grid">
          <div>
            <div className="breadcrumb">
              <span>Accueil</span><ChevronRight size={15} />
              <span>{city.serviceName.toLowerCase()}</span><ChevronRight size={15} />
              <span>{city.departmentCode}</span><ChevronRight size={15} />
              <strong>{city.name}</strong>
            </div>
            <span className="badge badge-soft-orange">Entreprise locale • {city.departmentCode} • {city.postalCode}</span>
            <h1 className="city-title">{city.seoTitle}</h1>
            <p className="city-text">{city.heroIntro}</p>
            <div className="city-actions">
              <a className="btn btn-dark" href={`tel:${city.phone.replace(/\s+/g, '')}`}><Phone size={18} /> {city.phone}</a>
              <a className="btn btn-outline" href={city.mapsUrl} target="_blank" rel="noreferrer">Voir la fiche Maps <ExternalLink size={18} /></a>
            </div>
            <div className="city-mini-stats">
              <div className="city-mini-stat"><span>Intervention</span><strong>30-45 min</strong></div>
              <div className="city-mini-stat"><span>Disponibilité</span><strong>24/7</strong></div>
              <div className="city-mini-stat"><span>Avant validation</span><strong>Devis gratuit</strong></div>
            </div>
          </div>

          <aside className="side-card">
            <div className="body">
              <small>Demande express</small>
              <h3>{city.serviceName} {city.name}</h3>
              <div className="field" style={{ marginTop: 18 }}><input className="input" placeholder="Adresse ou code postal" /></div>
              <div className="field" style={{ marginTop: 12 }}><input className="input" placeholder="Votre besoin" /></div>
              <div className="field" style={{ marginTop: 12 }}><input className="input" placeholder="Votre numéro" /></div>
              <div style={{ marginTop: 14 }}><button className="btn btn-primary" style={{ width: '100%' }}>Être rappelé rapidement</button></div>
              <div className="check-grid" style={{ gridTemplateColumns: '1fr', marginTop: 16 }}>
                <div className="check-item"><CheckCircle2 size={16} /> Intervention rapide annoncée</div>
                <div className="check-item"><CheckCircle2 size={16} /> Tarifs expliqués avant validation</div>
                <div className="check-item"><CheckCircle2 size={16} /> Disponibilité 24h/24 et 7j/7</div>
                <div className="check-item"><CheckCircle2 size={16} /> Paiement après intervention</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="badge badge-white">Prestations</span>
            <h2>Interventions les plus demandées à {city.name}</h2>
            <p>
              Les interventions de serrurerie les plus fréquentes à {city.name} ({city.postalCode}) concernent l’ouverture de porte claquée, le changement de serrure, le remplacement de cylindre et la mise en sécurité après effraction. Ces dépannages permettent de résoudre rapidement les problèmes de porte bloquée, clé cassée dans la serrure ou perte de clés.
            </p>          </div>
          <div className="prestation-grid">
            {city.prestations.map((item) => (
              <div className="prestation-card" key={item.title}>
                <div className="prestation-head">
                  <div>
                    <h3>{item.title}</h3>
                    <small>{item.delay}</small>
                  </div>
                  <span className="price-pill">{item.price}</span>
                </div>
                <p>{item.desc}</p>
                <div style={{ marginTop: 18 }}><button className="btn btn-outline">Réserver cette intervention</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-section">
        <div className="container" style={{ display: 'grid', gap: 30, gridTemplateColumns: '1fr 420px' }}>
          <div>
            <div className="section-head">
              <span className="badge badge-white">Zone couverte</span>
              <h2>Serrurier à {city.name} et communes autour du {city.postalCode}</h2>
              <p>
                Notre serrurier se déplace à {city.name} ({city.postalCode}) et dans les communes proches pour les dépannages de serrurerie : ouverture de porte claquée, remplacement de serrure, changement de cylindre ou mise en sécurité après effraction. Les interventions couvrent notamment les secteurs de {city.localAreas.join(', ')}.
              </p>            </div>
            <div className="pills-wrap">
              {city.localAreas.map((area) => (
                <span className="area-pill" key={area}><MapPin size={15} /> {area}</span>
              ))}
            </div>
            <div className="map-box">
              <iframe
                src={city.mapsUrl}
                loading="lazy"
                title={`Carte ${city.name}`}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
            <div className="feature-box">
              <h3>Pourquoi faire appel à un serrurier à {city.name} ?</h3>
              <div className="feature-grid">
                {[
                  `Intervention rapide de serrurier à ${city.name}`,
                  `Ouverture de porte claquée sans casse`,
                  `Changement de serrure et remplacement de cylindre`,
                  `Dépannage serrurerie 24h/24 dans le ${city.departmentCode}`,
                  `Mise en sécurité après effraction`,
                  `Devis annoncé avant toute intervention`
                ].map((item) => (<div className="feature-item" key={item}><CheckCircle2 size={18} color="#ea580c" /><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="side-card">
            <div className="body">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Clock3 size={18} color="#ea580c" /><h3 style={{ fontSize: 24 }}>Dernières demandes dans le secteur</h3></div>
              <div className="job-list">
                {city.currentJobs.map((job) => (
                  <div className="job-item" key={job}><p>{job}</p></div>
                ))}
              </div>
              <div className="price-box"><strong>Tarifs annoncés à l'avance</strong><span> Pas de surprise avant validation</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 30, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div className="section-head">
              <span className="badge badge-white">{city.seoBadge || 'Informations locales'}</span>
              <h2>{city.seoSectionTitle || `Informations utiles sur ${city.serviceName.toLowerCase()} à ${city.name}`}</h2>
              <p>
                {city.seoSectionIntro ||
                  `Retrouvez les informations utiles concernant les interventions de ${city.serviceName.toLowerCase()} à ${city.name}, les situations fréquentes et les zones couvertes.`}
              </p>
            </div>

            <div className="seo-copy" style={{ marginTop: 24 }}>
              {city.seoParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="final-cta">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Building2 size={22} color="#fdba74" />
              <h3>Communes d’intervention dans le {city.departmentCode}</h3>
            </div>

            <p>
              Notre serrurier intervient à {city.name} ({city.postalCode}) ainsi que dans
              d’autres communes du {city.department}. Retrouvez ci-dessous les pages
              locales disponibles dans le département pour les ouvertures de porte,
              changements de serrure et dépannages serrurerie.
            </p>

            <div className="intervention-links">
              {cities
                .filter(
                  (item) =>
                    item.departmentCode === city.departmentCode &&
                    item.serviceSlug === city.serviceSlug &&
                    item.slug !== city.slug
                )
                .map((item) => (
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
      </section >
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
