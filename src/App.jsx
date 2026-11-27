import React, { useState } from 'react';
import {
  ArrowRight, Menu, X, MapPin, Users, Mail, Instagram
} from 'lucide-react';
import AdminAccess from './components/AdminAccess.jsx';
import DonationsApp from './components/DonationsApp.jsx';

const A = '/assets/';
const nav = [
  ['Project', '#project'], ['The Chakra', '#monument'], ['Location', '#location'],
  ['Why it matters', '#why-this-project'], ['Updates', '#updates'], ['FAQs', '#faq']
];

function Image({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`asset-fallback ${className}`} role="img" aria-label={alt}><span>Konark Chakra Project</span></div>;
  return <img className={className} src={A + src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading">
    <p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <div className="section-lead">{children}</div>}
  </div>;
}

// Homepage content follows the updated client HTML reference.
function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <>
    <header className="topbar">
      <div className="container nav">
        <a className="brand" href="#home" aria-label="Konark Chakra Project home">
          <span className="brand-seal">KCP</span><span>KONARK CHAKRA<br/>PROJECT · THANE</span>
        </a>
        <nav className="desktop-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="nav-actions"><a className="nav-admin-link" href="/admin">Admin</a><a className="nav-cta" href="/donations">Contribute</a></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{[...nav, ['Project stages','#journey'],['Governance','#governance'],['Contact','#contact'],['Admin access','/admin']].map(([label,href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}</nav>}
    </header>

    <main>
      <section className="hero" id="home">
        <Image src="01_hero_waterfront_chakra.png" alt="Concept visual of a carved Konark Chakra monument at a waterfront at sunset" className="hero-image"/>
        <div className="hero-overlay"/>
        <div className="container hero-content">
          <p className="eyebrow gold">A community-led heritage monument · Thane</p>
          <h1>Konark Chakra</h1>
          <p className="hero-subtitle">A stone monument inspired by the Konark Sun Temple wheel</p>
          <p className="hero-copy">Inspired by the timeless grandeur of the Konark Sun Temple, the Konark Chakra Project seeks to bring a magnificent stone replica of its iconic wheel to Thane. More than a monument, it is a heartfelt tribute by the Odia community of Thane to the rich cultural and architectural heritage of Odisha. Built on shared pride, collective participation and a deep connection to our roots, the project aims to create a lasting symbol of Odisha’s legacy for generations to discover, admire and cherish.</p>
          <div className="hero-actions"><a className="button button-gold" href="#contribute">Support the project</a><a className="button button-outline" href="#project">Explore the project</a></div>
        </div>
        <div className="hero-facts"><div><Users/><span><b>Project lead</b>Thane Odia Association</span></div><div><MapPin/><span><b>Proposed location</b>Gaimukh, Thane · Subject to written approvals and final site arrangements</span></div></div>
      </section>

      <section className="collective section" aria-labelledby="collective-title">
        <div className="container">
          <div className="collective-intro"><div><p className="eyebrow">Collective initiative</p><h2 id="collective-title">One vision. Many hands. A shared tribute to Odisha’s heritage.</h2></div><p>Led by Thane Odia Association, the Konark Chakra Project brings together all Odia Associations and Community Groups across Thane in a collective tribute to Odisha’s timeless heritage. United by pride in their roots, the community is coming together to celebrate its rich cultural legacy, honour the mastery of traditional craftsmanship and create a landmark that will inspire generations to come.</p></div>
          <div className="association-row"><div className="toa-card"><Image src="toa_logo.png" alt="Thane Odia Association logo"/><div><b>Lead organisation</b><span>Thane Odia Association</span></div></div><div className="community-note"><span className="community-mark">✳</span><div><b>One community. A shared endeavour.</b><span>Odia associations, community groups, families and volunteers across Thane</span></div></div></div>
        </div>
      </section>

      <section className="section project-section" id="project">
        <div className="container">
          <SectionHeading eyebrow="The project" title="A stone monument inspired by the Konark Sun Temple.">
            Inspired by one of India’s most celebrated architectural masterpieces, the Konark Chakra brings the form and symbolism of the Sun Temple wheel into the heart of Thane. The six-foot design reference honours Odisha’s stone-carving tradition and its extraordinary artisans.
          </SectionHeading>
          <div className="feature-grid">
            <article className="feature-card"><Image src="02_stone_chakra_monument.png" alt="Concept render of the proposed stone Chakra monument"/><div className="feature-copy"><small>01 · THE MONUMENT</small><h3>Stone Chakra</h3><p>A six-foot wheel is the current design reference. Final dimensions will follow approved engineering drawings.</p></div></article>
            <article className="feature-card"><Image src="03_traditional_stone_carving_artisan.png" alt="Traditional stone artisan carving a wheel detail"/><div className="feature-copy"><small>02 · THE CRAFT</small><h3>Traditional stone carving</h3><p>The monument is planned to be carved in Odisha by traditional stone artisans.</p></div></article>
            <article className="feature-card"><Image src="04_chakra_technical_drawing.png" alt="Technical drawing of a proposed Chakra monument"/><div className="feature-copy"><small>03 · THE DESIGN</small><h3>Design and installation</h3><p>Structural design, foundation details and installation method will be finalised with the relevant technical teams.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section heritage-section" id="monument">
        <div className="container heritage-grid">
          <div className="heritage-image"><Image src="05_konark_wheel_heritage_detail.png" alt="Detailed stone carving inspired by the Konark Sun Temple wheel"/></div>
          <div><p className="eyebrow">The Konark Sun Temple</p><h2>The wheel that represents time and movement.</h2><p className="body-large">The stone wheels of the Konark Sun Temple are masterpieces of geometry and intricate carving. Their form is closely associated with the passage of time and the ancient practice of reading the sun’s movement through shadows.</p><p>The Thane monument draws inspiration from this remarkable legacy. It is a contemporary tribute to the Konark wheel—created to share its beauty, symbolism and craftsmanship with a new generation. Through its form and interpretive displays, the monument invites visitors to discover the Konark wheel’s symbolism, the art of stone carving and the architectural brilliance of Odisha.</p><blockquote>The project will use the wheel’s form and carving tradition to introduce visitors to an important part of Odisha’s architectural heritage.</blockquote><ul className="check-list"><li>Stone carving inspired by the Konark wheel</li><li>Interpretive information about its design and symbolism</li><li>Public access, subject to the final site plan and permissions</li></ul><p className="image-caption">Use a properly licensed reference photograph. Identify it as the original Konark wheel, not the proposed Thane monument.</p></div>
        </div>
      </section>

      <section className="section why-section" id="why-this-project"><div className="container"><SectionHeading eyebrow="Why this project matters" title="Odisha’s Konark legacy, brought into Thane’s public life.">The Konark Chakra is envisioned as more than a monument. It is a place where heritage meets the everyday life of the city—inviting families, students and visitors to experience Odisha’s architecture, discover traditional craftsmanship and explore the science of sunlight and time.</SectionHeading><div className="feature-grid"><article className="feature-card"><div className="feature-copy"><small>01 · HERITAGE</small><h3>Celebrate Odisha’s architecture</h3><p>Bring the design language of the Konark Sun Temple and its celebrated stone wheels into a contemporary public setting in Thane.</p></div></article><article className="feature-card"><div className="feature-copy"><small>02 · CRAFT</small><h3>Showcase traditional stone carving</h3><p>Showcase the skill of Odisha’s stone artisans through traditional carving techniques applied to the Konark-inspired wheel.</p></div></article><article className="feature-card"><div className="feature-copy"><small>03 · LEARNING</small><h3>Connect visitors with science</h3><p>Interpretive panels explain the Konark wheel, the movement of sunlight and shadows, and the principles of sundial timekeeping.</p></div></article></div></div></section>

      <section className="section location-section" id="location">
        <div className="container">
          <SectionHeading eyebrow="Proposed location · Thane" title="Gaimukh waterfront.">
            Gaimukh is the proposed location for the monument. Final site selection, layout, permissions and installation arrangements must be confirmed in writing by the relevant authorities.
          </SectionHeading>
          <div className="location-grid"><figure><Image src="06_gaimukh_waterfront_overview.png" alt="Gaimukh waterfront overview"/><figcaption>Gaimukh overview</figcaption></figure><figure><Image src="07_proposed_site_area.png" alt="Proposed site area concept"/><figcaption>Proposed site area</figcaption></figure><figure><Image src="08_location_plan_concept.png" alt="Concept location plan"/><figcaption>Location plan</figcaption></figure></div>
          <p className="image-caption">Do not use general waterfront photographs as evidence of site approval. Label all concept visuals and proposed layouts clearly.</p>
          <div className="site-callout"><div><h3>Site planning requirements</h3><p>The layout must provide access around the monument, a suitable foundation and the sunlight exposure required if the sundial concept is pursued.</p></div><a className="button button-gold" href="#journey">View project stages <ArrowRight size={16}/></a></div>
        </div>
      </section>

      <section className="section stages-section" id="journey">
        <div className="container">
          <SectionHeading eyebrow="Project stages" title="From design and stone carving to installation.">
            From the first drawing to the final installation, the journey brings together thoughtful design, the hands of Odisha’s artisans, careful transportation and the creation of a lasting public space in Thane.
          </SectionHeading>
          <div className="stage-grid">
            {[
              ['stage_01_site_approvals.png','01 · SITE AND APPROVALS','Confirm the site and obtain written permissions.'],
              ['stage_02_design.png','02 · DESIGN','Approve drawings, dimensions and engineering requirements.'],
              ['stage_03_stone_carving.png','03 · STONE CARVING','Procure stone and complete carving in Odisha.'],
              ['stage_04_transport.png','04 · TRANSPORT','Arrange packing and transport from Odisha to Thane.'],
              ['stage_05_installation.png','05 · INSTALLATION','Complete foundation, delivery and monument installation.'],
              ['stage_06_handover.png','06 · HANDOVER','Complete inspection, public information and handover arrangements.']
            ].map(([img,title,desc])=><article className="stage-card" key={title}><Image src={img} alt=""/><b>{title}</b><p>{desc}</p></article>)}
          </div>
          <p className="disclaimer">This is the proposed execution sequence. It does not indicate that any stage has been completed.</p>
        </div>
      </section>

      <section className="section updates-section" id="updates">
        <div className="container">
          <SectionHeading eyebrow="Project updates" title="Project progress and dated updates.">
            Follow the making of the Konark Chakra: from design and stone selection to the artisans’ work in Odisha and the monument’s arrival in Thane.
          </SectionHeading>
          <div className="updates-grid">
            <article><Image src="04_chakra_technical_drawing.png" alt="Design update visual"/><small>Design</small><h3>Design and engineering</h3><p>The design story behind the monument and its setting.</p></article>
            <article><Image src="03_traditional_stone_carving_artisan.png" alt="Artisan workshop update visual"/><small>Craftsmanship</small><h3>Stone carving in Odisha</h3><p>A celebration of the artisans and the craft tradition.</p></article>
            <article><Image src="06_gaimukh_waterfront_overview.png" alt="Thane site update visual"/><small>Thane site</small><h3>Site preparation and installation</h3><p>The journey towards creating a public heritage space at Gaimukh.</p></article>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq"><div className="container"><SectionHeading eyebrow="Frequently asked questions" title="About the Konark Chakra Project in Thane.">Answers about the monument’s design, proposed location, sundial evaluation, artisans and contributions.</SectionHeading><div className="faq-list">{[['What is the Konark Chakra Project?','The Konark Chakra Project is a community-supported initiative led by Thane Odia Association to create and install a stone monument in Thane inspired by the wheel of the Konark Sun Temple in Odisha.'],['Which organisation is leading the project?','Thane Odia Association is the lead organisation. The project is supported by Odia associations and community groups across Thane.'],['Where is the Konark Chakra monument proposed to be installed?','Gaimukh waterfront is the proposed location. The exact site and installation plan require written confirmation from Thane Municipal Corporation and the concerned departments.'],['Will the Konark Chakra monument function as a sundial?','The project draws on the Konark wheel’s association with sundial timekeeping. The proposed interpretation brings together wheel orientation, seasonal sunlight and the movement of shadows to explain how time can be read from the sun.'],['Who will carve the stone monument?','The monument draws on Odisha’s traditional stone-carving expertise and the skill of its artisan community.'],['How can I contribute to the Konark Chakra Project?','Individuals, families and institutions are invited to take part in this community effort. For contribution instructions, please contact Thane Odia Association through its official channels.'],['Where can I follow project progress?','The Project Updates section follows the key milestones—from design and artisan work to site development and installation.']].map(([q,a])=><details className="faq-item" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>

      <section className="section contribution-details" id="contribute"><div className="container contribution-layout"><div><p className="eyebrow">Support the project</p><h2>Be part of the Konark Chakra legacy.</h2><p className="section-lead">Thane Odia Association is the receiving organisation for contributions to the Konark Chakra Project. To participate, contact the association through its official communication channels for contribution instructions.</p><p className="security-note">For your security, make transfers only to an account held in the name of Thane Odia Association.</p></div><div><h3>Every contribution helps turn a shared vision into a lasting landmark.</h3><p>Your support helps celebrate Odisha’s architectural heritage, honour its traditional artisans and create a place of pride for the people of Thane.</p><a className="button button-rust" href="/donations">Contribute to the project <ArrowRight size={16}/></a></div></div></section>

      <section className="section governance-section" id="governance">
        <div className="container">
          <SectionHeading eyebrow="Project management" title="Project leadership, responsibilities and financial oversight.">
            Thane Odia Association leads the initiative, bringing together participating associations, volunteers, engineers, stone artisans, appointed contractors and Thane Municipal Corporation for coordinated execution.
          </SectionHeading>
          <div className="governance-grid">
            {[
              ['Lead organisation','Thane Odia Association'],
              ['Community participation','Odia associations and volunteers across Thane'],
              ['Project coordination','Teams guiding design, permissions, procurement and on-ground execution'],
              ['Government coordination','Thane Municipal Corporation and concerned departments for site coordination and permissions'],
              ['Technical work','Stone artisans, engineers and appointed contractors'],
              ['Financial records','Thane Odia Association maintains contribution and expenditure records for periodic reporting']
            ].map(([title,desc])=><article className="governance-card" key={title}><small>{title}</small><p>{desc}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <p className="eyebrow gold">Connect with the project</p>
          <h2>We would love to hear from you.</h2>
          <p className="section-lead">Have a question, wish to volunteer, explore a partnership or support the Konark Chakra Project? Reach out through the channels below. Follow our journey for project news, photographs and milestone updates.</p>
          <div className="contact-grid">
            <article><b>Email</b><strong>Write to us</strong><span>For enquiries, collaboration and participation.</span><em>Add official project email</em></article>
            <article><b>WhatsApp</b><strong>Start a conversation</strong><span>Message us to know more or get involved.</span><em>Add official WhatsApp number</em></article>
            <article><b>Instagram</b><strong>Follow the journey</strong><span>See project stories, photographs and progress updates.</span><a href="https://www.instagram.com/konarkchakrathane/" target="_blank" rel="noreferrer">@konarkchakrathane</a></article>
          </div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="container"><b>THANE ODIA ASSOCIATION · KONARK CHAKRA PROJECT</b><span>HERITAGE · CRAFT · COMMUNITY</span><a href="/admin">Admin access</a></div></footer>
  </>;
}

function App() {
  const route = window.location.pathname.replace(/\/$/, '');
  if (route === '/donations') return <DonationsApp />;
  if (route === '/admin') return <AdminAccess />;
  return <HomePage />;
}

export default App;
