import { useState } from 'react';
import {
  ArrowDown, ArrowRight, Menu, X, Heart, MapPin, Landmark, Users, Sun,
  Hammer, Truck, HardHat, Flag, FileText, Pencil, ClipboardList, Cog,
  Database, Wallet, ShieldCheck, Mail, Phone, Instagram, CheckCircle2
} from 'lucide-react';
import { createDonation, submitPaymentReference } from './lib/donations.js';

const A = '/assets/';
const nav = [
  ['Project', '#project'], ['The Chakra', '#monument'], ['Location', '#location'],
  ['Updates', '#updates'], ['Support', '#sponsorship']
];

function Image({ src, alt, className = '' }) {
  return <img className={className} src={A + src} alt={alt} loading="lazy" />;
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading">
    <p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <div className="section-lead">{children}</div>}
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tier, setTier] = useState('Surya Patron');
  const [amount, setAmount] = useState('25000');
  const [donor, setDonor] = useState({ name: '', email: '', phone: '' });
  const [donation, setDonation] = useState(null);
  const [utr, setUtr] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  const selectTier = (name, value) => {
    setTier(name); setAmount(String(value));
    document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const startDonation = async (event) => {
    event.preventDefault(); setBusy(true); setNotice('');
    try {
      const result = await createDonation({ ...donor, amount: Number(amount), contributionLevel: tier });
      setDonation(result);
      setNotice('Your contribution reference has been created. Please complete the bank or UPI transfer and submit the payment reference below.');
    } catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  };

  const sendUtr = async (event) => {
    event.preventDefault(); if (!donation?.donationId) return;
    setBusy(true); setNotice('');
    try {
      await submitPaymentReference({ donationId: donation.donationId, utr, transferDate, amount: Number(amount) });
      setNotice('Payment details submitted for verification. Once the contribution is confirmed, your receipt will be generated and sent to your email.');
    } catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  };

  const closeMenu = () => setMenuOpen(false);

  return <>
    <header className="topbar">
      <div className="container nav">
        <a className="brand" href="#home" aria-label="Konark Chakra Project home">
          <span className="brand-seal">KCP</span><span>KONARK CHAKRA<br/>PROJECT · THANE</span>
        </a>
        <nav className="desktop-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <a className="nav-cta" href="#sponsorship"><Heart size={15}/> Contribute</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{[...nav, ['Governance','#governance'],['Contact','#contact']].map(([label,href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}</nav>}
    </header>

    <main>
      <section className="hero" id="home">
        <Image src="01_hero_waterfront_chakra.png" alt="Concept visual of a carved Konark Chakra monument at a waterfront at sunset" className="hero-image"/>
        <div className="hero-overlay"/>
        <div className="container hero-content">
          <p className="eyebrow gold">A shared cultural initiative · Thane</p>
          <h1>Konark Chakra</h1>
          <p className="hero-subtitle">A stone monument inspired by the Sun Temple</p>
          <p className="hero-copy">The Konark Chakra Project is led by Thane Odia Association, with the support and participation of all Odia associations and community groups across Thane. The initiative aims to install a stone monument inspired by the iconic wheel of the Konark Sun Temple, celebrating Odisha’s cultural heritage and traditional craftsmanship.</p>
          <div className="hero-actions"><a className="button button-gold" href="#sponsorship">Support the project</a><a className="button button-outline" href="#project">Explore the project</a></div>
        </div>
        <div className="hero-facts"><div><Users/><span><b>Project lead</b>Thane Odia Association</span></div><div><MapPin/><span><b>Proposed location</b>Gaimukh, Thane · Subject to written approvals and final site arrangements</span></div></div>
      </section>

      <section className="collective section" aria-labelledby="collective-title">
        <div className="container">
          <div className="collective-intro"><div><p className="eyebrow">Collective initiative</p><h2 id="collective-title">A project brought together by Thane’s Odia community.</h2></div><p>Led by Thane Odia Association, with the support and participation of Odia associations and community groups across Thane.</p></div>
          <div className="association-row"><div className="toa-card"><Image src="toa_logo.png" alt="Thane Odia Association logo"/><div><b>Lead organisation</b><span>Thane Odia Association</span></div></div>{Array.from({length:7},(_,i)=><div className="association-placeholder" key={i}><span>Association logo</span></div>)}</div>
        </div>
      </section>

      <section className="section project-section" id="project">
        <div className="container">
          <SectionHeading eyebrow="The project" title="A stone monument inspired by Konark.">
            The project proposes a carved stone replica inspired by the wheel of the Konark Sun Temple, to be installed in a public space in Thane. Traditional stone artisans from Odisha are proposed to undertake the carving.
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
          <div><p className="eyebrow">The Konark Sun Temple</p><h2>The wheel that represents time and movement.</h2><p className="body-large">The stone wheels of the Konark Sun Temple are recognised for their detailed carving and geometric design. The wheel is also associated with the passage of time and the movement of the sun.</p><p>The Thane project takes inspiration from this architectural element. It is a contemporary public monument proposal, not a reconstruction of the original temple.</p><blockquote>The project will use the wheel’s form and carving tradition to introduce visitors to an important part of Odisha’s architectural heritage.</blockquote><ul className="check-list"><li>Stone carving inspired by the Konark wheel</li><li>Interpretive information about its design and symbolism</li><li>Public access, subject to the final site plan and permissions</li></ul><p className="image-caption">Use a properly licensed reference photograph. Identify it as the original Konark wheel, not the proposed Thane monument.</p></div>
        </div>
      </section>

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
          <SectionHeading eyebrow="Project stages" title="How the project will be delivered.">
            The work is organised into six stages. The status and date of each stage should be updated only when confirmed by the project team.
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
          <SectionHeading eyebrow="Project updates" title="Progress and records.">
            This section will carry dated project updates, approved drawings, site photographs, artisan and carving photographs, and installation records.
          </SectionHeading>
          <div className="updates-grid">
            <article><Image src="04_chakra_technical_drawing.png" alt="Design update visual"/><small>Design</small><h3>Design and engineering</h3><p>Add update date and verified status.</p></article>
            <article><Image src="03_traditional_stone_carving_artisan.png" alt="Artisan workshop update visual"/><small>Craftsmanship</small><h3>Stone carving in Odisha</h3><p>Add update date and verified status.</p></article>
            <article><Image src="06_gaimukh_waterfront_overview.png" alt="Thane site update visual"/><small>Thane site</small><h3>Site preparation and installation</h3><p>Add update date and verified status.</p></article>
          </div>
        </div>
      </section>

      <section className="section sponsorship-section" id="sponsorship">
        <div className="container">
          <SectionHeading eyebrow="Contribute to the project" title="Contribution levels.">
            Individuals and families can support the project through the contribution levels below. Contributions of other amounts may also be accepted through the verified payment process.
          </SectionHeading>
          <div className="tier-grid">
            <button className={tier === 'Surya Patron' ? 'tier-card selected' : 'tier-card'} onClick={() => selectTier('Surya Patron',25000)}><Image src="contribution_surya_patron_sun.png" alt="Sun icon"/><small>Contribution level</small><h3>Surya Patron</h3><strong>₹25,000</strong><p>Contribution towards stone procurement, carving and artisan work.</p></button>
            <button className={tier === 'Chakra Partner' ? 'tier-card selected' : 'tier-card'} onClick={() => selectTier('Chakra Partner',10000)}><Image src="contribution_chakra_partner_wheel.png" alt="Chakra wheel icon"/><small>Contribution level</small><h3>Chakra Partner</h3><strong>₹10,000</strong><p>Contribution towards transport, foundation and installation costs.</p></button>
            <button className={tier === 'Shilpi Supporter' ? 'tier-card selected' : 'tier-card'} onClick={() => selectTier('Shilpi Supporter',5000)}><Image src="contribution_shilpi_supporter_tool.png" alt="Artisan tool icon"/><small>Contribution level</small><h3>Shilpi Supporter</h3><strong>₹5,000</strong><p>Contribution towards the project’s approved expenses.</p></button>
          </div>
          <div className="sponsorship-bottom">
            <div className="fund-use"><h3>Planned use of funds</h3>{[
              ['fund_stone_procurement_carving.png','Stone procurement and carving','Odisha'],
              ['fund_artisan_charges.png','Artisan charges','Carving'],
              ['fund_transportation.png','Transportation','Logistics'],
              ['fund_foundation_civil_works.png','Foundation and civil works','Thane'],
              ['fund_engineering_installation.png','Engineering and installation','Execution']
            ].map(([img,label,meta])=><div className="fund-row" key={label}><Image src={img} alt=""/><span>{label}</span><em>{meta}</em></div>)}<p>A component-wise project budget and expenditure updates should be published after the budget and reporting process are approved.</p></div>
            <div className="institutional"><h3>Institutional support</h3><p>Organisations may contact the project team to discuss sponsorship or in-kind support such as stone, transport, equipment and professional services.</p><p>Any corporate or CSR support will be considered only after eligibility, documentation and applicable legal requirements are reviewed.</p><a className="text-link" href="#contact">Institutional enquiry <ArrowRight size={16}/></a></div>
          </div>
        </div>
      </section>

      <section className="section governance-section" id="governance">
        <div className="container">
          <SectionHeading eyebrow="Project management" title="Roles and accountability.">
            Thane Odia Association is the lead organisation. Project activities will be coordinated with participating associations, volunteers, technical specialists and the relevant authorities.
          </SectionHeading>
          <div className="governance-grid">
            {[
              ['governance_lead_organisation.png','Lead organisation','Thane Odia Association'],
              ['governance_community_participation.png','Community participation','Odia associations and volunteers across Thane'],
              ['governance_project_coordination.png','Project coordination','Project steering and execution teams'],
              ['governance_government_coordination.png','Government coordination','Thane Municipal Corporation and relevant departments, subject to written approvals'],
              ['governance_technical_work.png','Technical work','Stone artisans, engineers and appointed contractors'],
              ['governance_financial_records.png','Financial records','Contributions and project expenditure to be recorded by the receiving organisation']
            ].map(([img,title,desc])=><article className="governance-card" key={title}><Image src={img} alt=""/><h3>{title}</h3><p>{desc}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section contribution-details" id="contribute">
        <div className="container contribution-layout">
          <div><p className="eyebrow">Contribution details</p><h2>Contributions are received by Thane Odia Association.</h2><p className="section-lead">Use only the bank or UPI details verified and published by Thane Odia Association. The details below are placeholders and must be completed before this page is made public.</p>
            <div className="bank-details">{[['Account name','Thane Odia Association'],['Bank name','[Insert verified bank name]'],['Account number','[Insert verified account number]'],['IFSC','[Insert verified IFSC]'],['Branch','[Insert verified branch]'],['UPI ID','[Insert verified UPI ID]']].map(([k,v])=><div key={k}><b>{k}</b><span>{v}</span></div>)}</div>
            <p className="image-caption">Confirm the account name, bank details and payment instructions with the association before transferring funds.</p>
          </div>
          <div className="qr-panel"><div className="qr-placeholder">Official payment QR<br/><small>Insert only after verification against the association’s account</small></div><p>Receipt and acknowledgement procedure: [Insert the association-approved process and contact.]</p></div>
        </div>
      </section>

      <section className="section donation-section" id="donation-form">
        <div className="container donation-layout">
          <div><p className="eyebrow">Make a contribution</p><h2>Support the Konark Chakra Project.</h2><p className="section-lead">Choose a contribution level, share your details and continue with the verified bank or UPI payment instructions.</p>
            <form className="donation-form" onSubmit={startDonation}>
              <label>Contribution level<select value={tier} onChange={e=>{setTier(e.target.value);setAmount(e.target.value==='Surya Patron'?'25000':e.target.value==='Chakra Partner'?'10000':e.target.value==='Shilpi Supporter'?'5000':'');}}><option>Surya Patron</option><option>Chakra Partner</option><option>Shilpi Supporter</option><option>Other contribution</option></select></label>
              <label>Contribution amount (₹)<input type="number" min="1" required value={amount} onChange={e=>{setAmount(e.target.value);if(!['5000','10000','25000'].includes(e.target.value))setTier('Other contribution');}}/></label>
              <label>Full name<input required value={donor.name} onChange={e=>setDonor({...donor,name:e.target.value})} autoComplete="name"/></label>
              <label>Email address<input required type="email" value={donor.email} onChange={e=>setDonor({...donor,email:e.target.value})} autoComplete="email"/></label>
              <label>Phone / WhatsApp<input required type="tel" value={donor.phone} onChange={e=>setDonor({...donor,phone:e.target.value})} autoComplete="tel"/></label>
              <button className="button button-rust" disabled={busy}>{busy?'Please wait…':'Continue to payment details'}</button>
            </form>
            {notice && <div className="form-notice" role="status">{notice}</div>}
          </div>
          <div className="payment-next">
            <h3>{donation ? 'Your contribution reference' : 'How payment works'}</h3>
            {donation ? <><p><b>Reference:</b> {donation.donationId || donation.reference || 'Created'}</p><p>Complete your transfer using the verified bank or UPI details above. Then submit the transfer reference below.</p><form onSubmit={sendUtr}><label>UTR / transaction reference<input required value={utr} onChange={e=>setUtr(e.target.value)}/></label><label>Transfer date<input required type="date" value={transferDate} onChange={e=>setTransferDate(e.target.value)}/></label><button className="button button-rust" disabled={busy}>{busy?'Submitting…':'Submit payment reference'}</button></form></> : <ol><li>Submit your donor details to create a contribution reference.</li><li>Transfer the contribution using the verified bank or UPI details.</li><li>Submit your UTR / transaction reference for verification.</li><li>After the payment is confirmed, your receipt will be sent to your email.</li></ol>}
            <p className="receipt-note"><ShieldCheck size={17}/> Receipts are generated only after the receiving organisation confirms the payment.</p>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container"><p className="eyebrow gold">Contact</p><h2>Contact the project team.</h2><p className="section-lead">For contribution, volunteering and institutional support enquiries, contact Thane Odia Association.</p>
          <div className="contact-grid"><div><Landmark/><b>Project lead</b><span>Thane Odia Association</span></div><div><Mail/><b>Email</b><span>[Insert verified project email]</span></div><div><Phone/><b>Phone / WhatsApp</b><span>[Insert verified contact number]</span></div><div><Instagram/><b>Instagram</b><span>[Insert official project Instagram link]</span></div></div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="container"><b>THANE ODIA ASSOCIATION · KONARK CHAKRA PROJECT</b><span>PROJECT INFORMATION · CONTRIBUTIONS · UPDATES</span></div></footer>
    <a className="mobile-contribute" href="#donation-form">Contribute to the project <ArrowDown size={16}/></a>
  </>;
}

export default App;
