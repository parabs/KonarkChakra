import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Copy, HeartHandshake, ShieldCheck } from 'lucide-react';
import { createContribution } from '../lib/konarkBackend.js';

const purposes = ['Stone procurement and carving','Artisan charges','Transportation','Foundation and civil works','Engineering and installation','General project contribution'];
const contributionTiers = [
  { name: 'Surya Patron', amount: 25000, description: 'Help shape the stone, support the artisans and bring the Konark-inspired wheel to life.' },
  { name: 'Chakra Partner', amount: 10000, description: 'Support the monument’s journey to Thane, its foundation and its installation.' },
  { name: 'Shilpi Supporter', amount: 5000, description: 'Be part of the collective effort behind the stone, the craft and the creation of the monument.' }
];
const money = n => Number(n || 0).toLocaleString('en-IN');

export default function DonationsApp() {
  const [form,setForm] = useState({donorName:'',email:'',mobile:'',amount:'',purpose:purposes[5],contributionLevel:'Custom'});
  const [record,setRecord] = useState(null);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [copied,setCopied] = useState(false);
  const update = (key,value) => setForm(v=>({...v,[key]:value,...(key==='amount'?{contributionLevel:'Custom'}:{})}));
  const selectTier = tier => setForm(v=>({...v,contributionLevel:tier.name,amount:String(tier.amount)}));
  const submit = async e => {
    e.preventDefault(); setBusy(true); setError('');
    try { const result=await createContribution(form); setRecord(result); }
    catch(err) { setError(err.message || 'Unable to submit contribution.'); }
    finally { setBusy(false); }
  };
  const copy = async () => { try { await navigator.clipboard.writeText(record.confirmationCode); setCopied(true); } catch { setError('Unable to copy the confirmation PIN.'); } };
  return <main className="konark-donation-page">
    <header className="konark-donation-header"><a href="/" className="konark-back"><ArrowLeft size={16}/> Project website</a><div className="konark-mini-brand">KONARK CHAKRA PROJECT <span>· THANE</span></div><a className="konark-header-admin" href="/admin">Admin access</a></header>
    <div className="konark-donation-layout">
      <div className="konark-donation-left">
    <div className="konark-donation-shell">
      {!record ? <>
        <section className="konark-donation-intro">
          <p className="eyebrow">Community contribution</p>
          <h1>Support the Konark Chakra Project.</h1>
          <p>Your contribution will support the proposed stone monument inspired by the Konark Sun Temple wheel. Contributions are recorded against the project and verified by an authorised volunteer.</p>
          <div className="konark-trust-note"><ShieldCheck size={19}/><span>Contribution records are handled through the project’s administration service. Only Konark project identity is displayed here.</span></div>
        </section>
        <form className="konark-donation-form" onSubmit={submit}>
          <h2>Choose your contribution</h2>
          <div className="konark-tier-options" role="group" aria-label="Contribution level">
            {contributionTiers.map(tier=><button type="button" key={tier.name} className={form.contributionLevel===tier.name?'konark-tier-option is-selected':'konark-tier-option'} aria-pressed={form.contributionLevel===tier.name} onClick={()=>selectTier(tier)}>
              <span>Contribution level</span><strong>{tier.name}</strong><b>₹{money(tier.amount)}</b><small>{tier.description}</small>
            </button>)}
          </div>
          <h2>Contributor details</h2>
          <label>Full name<input required autoComplete="name" value={form.donorName} onChange={e=>update('donorName',e.target.value)} placeholder="Your full name"/></label>
          <div className="konark-form-row"><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="name@example.com"/></label><label>Mobile number<input required type="tel" autoComplete="tel" value={form.mobile} onChange={e=>update('mobile',e.target.value)} placeholder="+91"/></label></div>
          <label>Contribution towards<select value={form.purpose} onChange={e=>update('purpose',e.target.value)}>{purposes.map(p=><option key={p}>{p}</option>)}</select></label>
          <label>Contribution amount (₹)<input required min="1" max="10000000" type="number" inputMode="numeric" value={form.amount} onChange={e=>update('amount',e.target.value)} placeholder="Enter amount"/><small className="konark-amount-hint">{form.contributionLevel==='Custom'?'Enter the amount you wish to contribute.':`${form.contributionLevel} selected. You can change the amount if needed.`}</small></label>
          <p className="konark-payment-warning">Bank account and UPI payment details are not displayed yet. Please obtain the verified Konark Chakra Project payment instructions from the project team before transferring funds. SJST bank or UPI details are never used on this page.</p>
          {error && <p className="konark-error" role="alert">{error}</p>}
          <button className="konark-primary" disabled={busy}>{busy?'Submitting…':'Create contribution reference'}</button>
          <p className="konark-form-foot">Submitting this form records a contribution request; it does not confirm receipt of funds or issue a donation receipt.</p>
        </form>
      </> : <section className="konark-success">
        <div className="konark-success-icon"><CheckCircle2 size={30}/></div><p className="eyebrow">Reference created</p><h2>Thank you for supporting the project.</h2>
        <p>Your contribution request has been dispatched to the administration service. Please make the transfer only after receiving verified Konark payment instructions.</p>
        <div className="konark-reference"><span>Contribution reference</span><strong>{record.donationId}</strong><span>Contribution level</span><strong>{record.contributionLevel || 'Custom'}</strong><span>Amount</span><strong>₹{money(record.amount)}</strong><span>Purpose</span><strong>{record.sevaHead}</strong></div>
        <div className="konark-pin"><span>Volunteer verification PIN</span><strong>{record.confirmationCode}</strong><button onClick={copy} type="button"><Copy size={15}/>{copied?'Copied':'Copy PIN'}</button></div>
        <p className="konark-form-foot">Share the PIN with an authorised project volunteer only after the payment has been made. A receipt is issued only after payment verification.</p>
        <a className="konark-back-home" href="/">Return to project website</a>
    </section>}
      </div>
      </div>
      <div className="konark-donation-right">
    <section className="konark-funding-info" aria-label="Project funding information">
      <article className="konark-funds-panel">
        <h2>Planned use of funds</h2>
        <dl>
          <div><dt>Stone procurement and carving</dt><dd>Odisha</dd></div>
          <div><dt>Artisan charges</dt><dd>Carving</dd></div>
          <div><dt>Transportation</dt><dd>Logistics</dd></div>
          <div><dt>Foundation and civil works</dt><dd>Thane</dd></div>
          <div><dt>Engineering and installation</dt><dd>Execution</dd></div>
        </dl>
        <p>Contributions support the essential elements of the project: stone, carving, artisan work, transportation, foundation, civil works and installation. Thane Odia Association maintains the project’s contribution and expenditure records.</p>
      </article>
      <article className="konark-sponsor-panel">
        <h2>Corporate sponsorship and in-kind support</h2>
        <p>Businesses and institutions can help shape this landmark through sponsorship or in-kind support—including stone, transportation, equipment and professional expertise.</p>
        <p>Bring your organisation’s support to a lasting public heritage initiative through sponsorship, materials, logistics, equipment or professional expertise.</p>
        <a className="konark-sponsor-cta" href="/#contact">Institutional enquiry</a>
      </article>
    </section>
      </div>
    </div>
    <footer className="konark-donation-footer">KONARK CHAKRA PROJECT · THANE ODIA ASSOCIATION</footer>
  </main>;
}
