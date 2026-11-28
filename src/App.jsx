import React, { useState } from 'react';
import {
  ArrowRight, Menu, X, Mail, Instagram
} from 'lucide-react';
import AdminAccess from './components/AdminAccess.jsx';
import DonationsApp from './components/DonationsApp.jsx';

const A = `${import.meta.env.BASE_URL}assets/`;
const nav = [
  ['Project', '#project'], ['The Chakra', '#monument'], ['Location', '#location'],
  ['Why it matters', '#why-this-project'], ['Updates', '#updates'], ['FAQs', '#faq'],
  ['Support', '#sponsorship']
];

function Image({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`asset-fallback ${className}`} role="img" aria-label={alt}><span>Konark Chakra Project</span></div>;
  return <img className={className} src={A + src} alt={alt} loading={src === "toa_logo.png" ? "eager" : "lazy"} onError={() => setFailed(true)} />;
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
        <div className="nav-actions"><a className="nav-admin-link" href="?page=admin">Admin</a><a className="nav-cta" href="#contribute">Contribute</a></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{[...nav, ['Project stages','#journey'],['Contribute','#contribute'],['Governance','#governance'],['Contact','#contact'],['Admin access','?page=admin']].map(([label,href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}</nav>}
    </header>

    <main>
      <section className="hero" id="home">
        <Image src="01_hero_waterfront_chakra.png" alt="Concept visual of a carved Konark Chakra monument at a waterfront under a blue sky" className="hero-image"/>
        <div className="hero-overlay"/>
        <p className="hero-caption">Concept visualisation · Proposed Konark Chakra monument</p>
        <div className="container hero-content">
          <p className="eyebrow gold">A community-led heritage monument · Thane</p>
          <h1>Konark Chakra</h1>
          <p className="hero-subtitle">A stone monument inspired by the Konark Sun Temple wheel</p>
          <p className="hero-copy">Inspired by the timeless grandeur of the Konark Sun Temple, the Konark Chakra Project seeks to bring a magnificent stone replica of its iconic wheel to Thane. More than a monument, it is a heartfelt tribute by the Odia community of Thane to the rich cultural and architectural heritage of Odisha. Built on shared pride, collective participation and a deep connection to our roots, the project aims to create a lasting symbol of Odisha’s legacy for generations to discover, admire and cherish.</p>
          <div className="hero-actions"><a className="button button-gold" href="#sponsorship">Support the project</a><a className="button button-outline" href="#project">Explore the project</a></div>
        </div>
      </section>

      <section className="collective section" aria-labelledby="collective-title">
        <div className="container">
          <div className="collective-intro"><div><p className="eyebrow">Collective initiative</p><h2 id="collective-title">One vision. Many hands. A shared tribute to Odisha’s heritage.</h2></div><p>Led by Thane Odia Association, the Konark Chakra Project brings together all Odia Associations and Community Groups across Thane in a collective tribute to Odisha’s timeless heritage. United by pride in their roots, the community is coming together to celebrate its rich cultural legacy, honour the mastery of traditional craftsmanship and create a landmark that will inspire generations to come.</p></div>
          <div className="association-row client-partner-row"><div className="toa-card"><Image src="toa_logo.png" alt="Thane Odia Association logo"/><div><b>Project lead</b><span>Thane Odia Association</span></div></div></div>
          <div className="client-partner-logos" aria-label="Participating association logos">
            {Array.from({length:4},(_,index)=><div className="client-logo-slot" key={index}><span className="client-logo-mark">LOGO</span><strong>Participating association</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section project-section" id="project">
        <div className="container">
          <SectionHeading eyebrow="The project" title="A stone monument inspired by the Konark Sun Temple.">
            Inspired by one of India’s most celebrated architectural masterpieces, the Konark Chakra brings the form and symbolism of the Sun Temple wheel into the heart of Thane. The six-foot design reference honours Odisha’s stone-carving tradition and its extraordinary artisans.
          </SectionHeading>
          <div className="feature-grid">
            <article className="feature-card"><Image src="02_stone_chakra_monument.png" alt="Concept render of the proposed stone Chakra monument"/><div className="feature-copy"><h3>The Konark Chakra</h3><p>A six-foot design reference inspired by the celebrated wheel of the Konark Sun Temple.</p><small>01 · THE MONUMENT</small><h3>Stone Chakra</h3><p>A six-foot stone wheel draws its form from the celebrated Konark Sun Temple and its timeless artistry.</p></div></article>
            <article className="feature-card"><Image src="03_traditional_stone_carving_artisan.png" alt="Traditional stone artisan carving a wheel detail"/><div className="feature-copy"><h3>The Art of Stone Carving</h3><p>A tribute to Odisha’s traditional stone-carving heritage.</p><small>02 · THE CRAFT</small><h3>Traditional stone carving</h3><p>At its heart is the skill of Odisha’s traditional stone artisans, whose craft has shaped the region’s enduring architectural legacy.</p></div></article>
            <article className="feature-card"><Image src="04_chakra_technical_drawing.png" alt="Technical drawing of a proposed Chakra monument"/><div className="feature-copy"><h3>Design and Engineering</h3><p>Careful planning for the monument, its foundation and installation.</p><small>03 · THE DESIGN</small><h3>Design and installation</h3><p>The wheel, its pedestal and foundation are conceived as one harmonious monument, balancing sculptural presence, structural integrity and public access.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section heritage-section" id="monument">
        <div className="container heritage-layout">
          <div className="heritage-copy">
            <p className="eyebrow">The Konark Sun Temple</p>
            <h2>The wheel that represents time and movement.</h2>
            <p className="heritage-lead">The stone wheels of the Konark Sun Temple are masterpieces of geometry and intricate carving. Their form is closely associated with the passage of time and the ancient practice of reading the sun’s movement through shadows.</p>
            <p>The Thane monument draws inspiration from this remarkable legacy. It is a contemporary tribute to the Konark wheel—created to share its beauty, symbolism and craftsmanship with a new generation.</p>
            <p>The project will use the wheel’s form and carving tradition to introduce visitors to an important part of Odisha’s architectural heritage.</p>
            <blockquote>Through its form and interpretive displays, the monument invites visitors to discover the Konark wheel’s symbolism, the art of stone carving and the architectural brilliance of Odisha.</blockquote>
            <ul className="check-list"><li>Stone carving inspired by the Konark wheel</li><li>Interpretive information about its design and symbolism</li><li>A welcoming public setting, designed around access and visibility</li></ul>
          </div>
          <figure className="heritage-image">
            <h3>The Original Konark Wheel</h3>
            <p>The architectural inspiration behind the Thane monument.</p>
            <Image src="05_konark_wheel_heritage_detail.png" alt="Original Konark Sun Temple wheel detail, the architectural inspiration for the Thane monument"/>
            <figcaption className="image-caption">The original Konark wheel is shown here as the architectural inspiration for the Thane monument.</figcaption>
          </figure>
          <div className="sundial-copy">
            <p className="eyebrow">The Konark wheel as a sundial</p>
            <h2>The Konark wheel as a sundial.</h2>
            <p className="sundial-intro">The Konark wheel is widely interpreted as a sundial—a meeting point of art, astronomy and timekeeping. The Thane project seeks to bring this idea to life by exploring how sunlight and moving shadows can reveal the passage of time.</p>
            <p className="sundial-detail">The Konark wheel is widely interpreted as a sundial. The sundial study focuses on three essentials: the wheel’s orientation, the changing path of sunlight through the seasons, and a reliable method of reading time from its shadows. The monument will be described as a working sundial only after its time-reading accuracy has been demonstrated at the site.</p>
            <p className="sundial-note">A timeless idea expressed through sunlight, shadow and the geometry of the wheel.</p>
            <h3>Sunlight, Shadow and Time</h3>
            <p>An exploration of the Konark wheel’s association with traditional timekeeping.</p>
          </div>
        </div>
      </section>

      <section className="section why-section" id="why-this-project">
        <div className="container">
          <div className="why-intro">
            <p className="eyebrow">Why this project matters</p>
            <h2>Odisha’s Konark legacy, brought into Thane’s public life.</h2>
            <p className="why-lead">The Konark Chakra is envisioned as more than a monument. It is a place where heritage meets the everyday life of the city—inviting families, students and visitors to experience Odisha’s architecture, discover traditional craftsmanship and explore the science of sunlight and time.</p>
          </div>
          <div className="why-grid">
            <article className="why-card"><small>01 · HERITAGE</small><h3>Celebrate Odisha’s architecture</h3><p>Bring the design language of the Konark Sun Temple and its celebrated stone wheels into a contemporary public setting in Thane.</p></article>
            <article className="why-card"><small>02 · CRAFT</small><h3>Showcase traditional stone carving</h3><p>Showcase the skill of Odisha’s stone artisans through traditional carving techniques applied to the Konark-inspired wheel.</p></article>
            <article className="why-card"><small>03 · LEARNING</small><h3>Connect visitors with science</h3><p>Interpretive panels explain the Konark wheel, the movement of sunlight and shadows, and the principles of sundial timekeeping.</p></article>
          </div>
        </div>
      </section>

      <section className="section location-section" id="location">
        <div className="container">
          <SectionHeading eyebrow="Proposed location · Thane" title="Gaimukh waterfront.">
            Set against the open landscape of Gaimukh waterfront, the proposed site offers an evocative setting for a monument that celebrates heritage, community and the natural movement of the sun. Site planning is centred on public access, a suitable foundation and sunlight exposure for the sundial concept.
          </SectionHeading>
          <div className="location-grid"><figure><Image src="06_gaimukh_waterfront_overview.png" alt="Gaimukh waterfront overview"/><figcaption>Gaimukh Waterfront</figcaption><p>A proposed setting for a landmark that connects heritage, community and the city.</p></figure><figure><Image src="07_proposed_site_area.png" alt="Proposed site area concept"/><figcaption>The Proposed Setting</figcaption><p>A public space envisioned for the Konark-inspired stone monument.</p></figure><figure><Image src="08_location_plan_concept.png" alt="Concept location plan"/><figcaption>The Site Vision</figcaption><p>A place for visitors to encounter Odisha’s architectural legacy.</p></figure></div>
          <p className="image-caption">The photographs and site views in this section introduce Gaimukh and the proposed setting of the monument.</p>
          <div className="site-callout"><div><h3>Site planning requirements</h3><p>The site design brings together safe circulation around the monument, a stable foundation and clear sunlight exposure—essential elements for a welcoming public landmark and a meaningful sundial experience.</p></div><a className="button button-gold" href="#journey">View project stages <ArrowRight size={16}/></a></div>
        </div>
      </section>

      <section className="section stages-section" id="journey">
        <div className="container">
          <SectionHeading eyebrow="Project stages" title="From design and stone carving to installation.">
            From the first drawing to the final installation, the journey brings together thoughtful design, the hands of Odisha’s artisans, careful transportation and the creation of a lasting public space in Thane.
          </SectionHeading>
          <div className="stage-grid">
            {[
              ['stage_01_site_approvals.png','01 · SITE AND APPROVALS','Coordinate with Thane Municipal Corporation to finalise the site and complete the required permissions.'],
              ['stage_02_design.png','02 · DESIGN','Bring the monument design, dimensions and engineering details together in a coordinated final plan.'],
              ['stage_03_stone_carving.png','03 · STONE CARVING','Select the stone and shape the wheel through the skill of Odisha’s traditional artisans.'],
              ['stage_04_transport.png','04 · TRANSPORT','Protect, pack and transport the carved monument from Odisha to Thane.'],
              ['stage_05_installation.png','05 · INSTALLATION','Prepare the foundation, position the monument and complete its installation.'],
              ['stage_06_handover.png','06 · HANDOVER','Carry out final inspections, install visitor information and formally document the monument’s handover.']
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
            <article className="update-card update-card-design">
              <div className="update-image-wrap"><Image src="Chalk Wheel Design on Granite.png" alt="Chalk layout of the Konark wheel drawn on a granite slab" className="update-image"/></div>
              <div className="update-copy"><h3>Design and Engineering</h3><p>The monument’s design journey.</p><small>Design</small><h3>Design and engineering</h3><p>The design story behind the monument and its setting.</p></div>
            </article>
            <article className="update-card update-card-craft">
              <div className="update-image-wrap"><Image src="Sunlit Quarry with Excavator and Stone Blocks.png" alt="Stone quarry with cut blocks prepared for the monument" className="update-image"/></div>
              <div className="update-copy"><h3>Craftsmanship in Odisha</h3><p>The people and skills behind traditional stone carving.</p><small>Craftsmanship</small><h3>Stone carving in Odisha</h3><p>A celebration of the artisans and the craft tradition.</p></div>
            </article>
            <article className="update-card update-card-site">
              <div className="update-image-wrap"><Image src="Ornate Stone Beam Crane Lift.png" alt="Carved stone beam being lifted by a crane during monument installation" className="update-image"/></div>
              <div className="update-copy"><h3>Gaimukh, Thane</h3><p>The proposed setting for the Konark Chakra.</p><small>Thane site</small><h3>Site preparation and installation</h3><p>The journey towards creating a public heritage space at Gaimukh.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section client-fund-section" id="sponsorship">
        <div className="container">
          <SectionHeading eyebrow="Contribute to the project" title="Help bring the Konark Chakra to Thane.">
            Every contribution brings this shared vision closer. Individuals and families can participate through the contribution levels below or contact Thane Odia Association for current payment instructions.
          </SectionHeading>
          <div className="client-contribution-tiers">
            <article className="client-contribution-tier"><small>Contribution level</small><h3>Surya Patron</h3><div className="client-tier-amount">₹25,000</div><p>Help shape the stone, support the artisans and bring the Konark-inspired wheel to life.</p></article>
            <article className="client-contribution-tier"><small>Contribution level</small><h3>Chakra Partner</h3><div className="client-tier-amount">₹10,000</div><p>Support the monument’s journey to Thane, its foundation and its installation.</p></article>
            <article className="client-contribution-tier"><small>Contribution level</small><h3>Shilpi Supporter</h3><div className="client-tier-amount">₹5,000</div><p>Be part of the collective effort behind the stone, the craft and the creation of the monument.</p></article>
          </div>
          <div className="client-any-amount"><div><strong>Other contribution amounts</strong><span>For contribution instructions, connect directly with Thane Odia Association through its official channels.</span></div><a className="button button-gold" href="#contribute">Contribution details</a></div>
          <div className="client-fund-columns">
            <article className="client-fund-panel"><h3>Planned use of funds</h3>
              <div><span>Stone procurement and carving</span><em>Odisha</em></div><div><span>Artisan charges</span><em>Carving</em></div><div><span>Transportation</span><em>Logistics</em></div><div><span>Foundation and civil works</span><em>Thane</em></div><div><span>Engineering and installation</span><em>Execution</em></div>
              <p>Contributions support the essential elements of the project: stone, carving, artisan work, transportation, foundation, civil works and installation. Thane Odia Association maintains the project’s contribution and expenditure records.</p>
            </article>
            <article className="client-fund-panel"><h3>Corporate sponsorship and in-kind support</h3>
              <p>Businesses and institutions can help shape this landmark through sponsorship or in-kind support—including stone, transportation, equipment and professional expertise.</p>
              <p>Bring your organisation’s support to a lasting public heritage initiative through sponsorship, materials, logistics, equipment or professional expertise.</p>
              <a className="button button-gold" href="#contact">Institutional enquiry</a>
            </article>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <SectionHeading eyebrow="Frequently asked questions" title="About the Konark Chakra Project in Thane.">
            Answers about the monument’s design, proposed location, sundial evaluation, artisans and contributions.
          </SectionHeading>
          <div className="faq-grid">
            {[
              ['What is the Konark Chakra Project?','The Konark Chakra Project is a community-supported initiative led by Thane Odia Association to create and install a stone monument in Thane inspired by the wheel of the Konark Sun Temple in Odisha.'],
              ['Which organisation is leading the project?','Thane Odia Association is the lead organisation. The project is supported by Odia associations and community groups across Thane.'],
              ['Where is the Konark Chakra monument proposed to be installed?','Gaimukh waterfront is the proposed location. The exact site and installation plan require written confirmation from Thane Municipal Corporation and the concerned departments.'],
              ['Will the Konark Chakra monument function as a sundial?','The project draws on the Konark wheel’s association with sundial timekeeping. The proposed interpretation brings together wheel orientation, seasonal sunlight and the movement of shadows to explain how time can be read from the sun.'],
              ['Who will carve the stone monument?','The monument draws on Odisha’s traditional stone-carving expertise and the skill of its artisan community.'],
              ['How can I contribute to the Konark Chakra Project?','Individuals, families and institutions are invited to take part in this community effort. For contribution instructions, please contact Thane Odia Association through its official channels.'],
              ['How can I follow project progress?','The Project Updates section follows the key milestones—from design and artisan work to site development and installation.']
            ].map(([question, answer], index) => (
              <article className={`faq-card${index === 6 ? ' faq-card-wide' : ''}`} key={question}>
                <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="faq-card-copy">
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contribution-details" id="contribute"><div className="container contribution-layout"><div><p className="eyebrow">Support the project</p><h2>Be part of the Konark Chakra legacy.</h2><p className="section-lead">Thane Odia Association is the receiving organisation for contributions to the Konark Chakra Project. To participate, contact the association through its official communication channels for contribution instructions.</p><p className="security-note">For your security, make transfers only to an account held in the name of Thane Odia Association.</p></div><div className="contribution-invitation"><p className="contribution-aside-eyebrow">A legacy we build together</p><h3>Every contribution helps turn a shared vision into a lasting landmark.</h3><p>Your support helps celebrate Odisha’s architectural heritage, honour its traditional artisans and create a place of pride for the people of Thane.</p><a className="button button-rust" href="?page=donations">Contribute to the project <ArrowRight size={16}/></a></div></div></section>



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
    <footer className="footer"><div className="container"><b>THANE ODIA ASSOCIATION · KONARK CHAKRA PROJECT</b><span>HERITAGE · CRAFT · COMMUNITY</span><a href="?page=admin">Admin access</a></div></footer>
  </>;
}

function App() {
  const page = new URLSearchParams(window.location.search).get('page');
  if (page === 'donations') return <DonationsApp />;
  if (page === 'admin') return <AdminAccess />;
  return <HomePage />;
}

export default App;
