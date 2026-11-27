import React, { useEffect, useState } from 'react';
import { ArrowLeft, LogOut, RefreshCw, ShieldCheck, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { backendGet, backendPost } from '../lib/konarkBackend.js';

export default function AdminAccess() {
  const [credentials,setCredentials] = useState({code:'',pin:''});
  const [volunteer,setVolunteer] = useState(null);
  const [queue,setQueue] = useState([]);
  const [busy,setBusy] = useState(false);
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  const [verifyPin,setVerifyPin] = useState('');
  const [direct,setDirect] = useState({name:'',email:'',mobile:'',amount:'',purpose:'General project contribution',mode:'Cash'});
  const [showDirect,setShowDirect] = useState(false);
  const [actionBusy,setActionBusy] = useState('');
  const loadQueue = async () => {
    setLoading(true); setError('');
    try { const result=await backendGet('get_pending_queue'); setQueue(Array.isArray(result.pendingQueue)?result.pendingQueue:[]); setMessage(`Loaded ${result.count || 0} pending contribution(s).`); }
    catch(e) { setError(e.message || 'Unable to load pending contributions.'); }
    finally { setLoading(false); }
  };
  const login = async e => {
    e.preventDefault(); setBusy(true); setError(''); setMessage('');
    if (!/^\d{4}$/.test(credentials.pin.trim())) { setError('Enter your 4-digit PIN.'); setBusy(false); return; }
    try {
      const result=await backendPost({action:'authenticateVolunteer',volunteerCode:credentials.code.trim().toUpperCase(),pin:credentials.pin.trim()});
      if(!result.success || !result.volunteer) throw new Error(result.error || 'Invalid Volunteer ID or PIN.');
      const v=result.volunteer;
      const profile={volunteerCode:v.volunteerCode,volunteerName:v.volunteerName,role:v.role || 'Volunteer',status:v.status};
      setVolunteer(profile); setCredentials(v=>({...v,pin:''}));
    } catch(e) { setError(e.message || 'Unable to authenticate.'); }
    finally { setBusy(false); }
  };
  useEffect(()=>{ if(volunteer) loadQueue(); },[!!volunteer]);
  const verify = async e => {
    e.preventDefault(); if(!verifyPin.trim()) return;
    setActionBusy('verify'); setError(''); setMessage('');
    try {
      const matched = queue.find(item => String(item.confirmationCode || '') === verifyPin.trim());
      const result=await backendPost({action:'verifyDonation',confirmationCode:verifyPin.trim(),confirmedBy:volunteer.volunteerCode,volunteerName:volunteer.volunteerName});
      if(!result.success) throw new Error(result.error || 'Verification failed.');
      setVerifyPin('');
      if (matched?.donationId) {
        try { await backendPost({action:'send_receipt',donationId:matched.donationId}); setMessage('Contribution verified. Receipt request sent to the configured backend.'); }
        catch { setMessage('Contribution verification submitted. Receipt request could not be confirmed; use the backend receipt workflow after checking the record.'); }
      } else setMessage('Contribution verification submitted. Refresh the queue to confirm the updated status.');
      await loadQueue();
    } catch(e) { setError(e.message || 'Verification failed.'); }
    finally { setActionBusy(''); }
  };
  const sendReceipt = async donationId => {
    setActionBusy(donationId); setError(''); setMessage('');
    try { const result=await backendPost({action:'send_receipt',donationId}); if(!result.success) throw new Error(result.error || 'Receipt request failed.'); setMessage('Receipt request submitted to the configured backend.'); }
    catch(e) { setError(e.message || 'Receipt request failed.'); }
    finally { setActionBusy(''); }
  };
  const submitDirect = async e => {
    e.preventDefault(); setActionBusy('direct'); setError(''); setMessage('');
    try {
      const now = new Date().toISOString();
      const id = await backendGet('get_next_donation_id');
      if (!id.donationId) throw new Error('Could not generate a contribution reference.');
      const record = {donationId:String(id.donationId),submittedAt:now,createdAt:now,updatedAt:now,donorName:direct.name.trim(),email:direct.email.trim(),mobile:direct.mobile.trim(),phone:direct.mobile.trim(),amount:Number(direct.amount),paymentMode:direct.mode,paymentStatus:'Paid',paymentReference:'COUNTER-DIRECT',receiptUrl:'',emailStatus:direct.email?'Pending':'Not Required',emailMessageId:'',confirmedBy:volunteer.volunteerCode,volunteerName:volunteer.volunteerName,confirmationCode:'',sevaCategory:'Konark Chakra Project',sevaHead:direct.purpose};
      await backendPost({action:'sync_donation',donationId:record.donationId,timestamp:new Date().toLocaleString('en-IN'),donorName:record.donorName,mobile:record.mobile,phone:record.phone,email:record.email,amount:record.amount,paymentMode:record.paymentMode,towards:record.sevaHead,confirmationCode:'',paymentStatus:'Paid',confirmedBy:record.confirmedBy,volunteerName:record.volunteerName,receiptUrl:'',submittedAt:record.submittedAt,createdAt:record.createdAt,updatedAt:record.updatedAt,record});
      setMessage('Counter contribution recorded. Receipt can be requested from the backend once the record is available.');
      setDirect({name:'',email:'',mobile:'',amount:'',purpose:'General project contribution',mode:'Cash'});
      await loadQueue();
    } catch(e) { setError(e.message || 'Unable to record counter contribution.'); }
    finally { setActionBusy(''); }
  };
  const logout=()=>{setVolunteer(null);setQueue([]);setVerifyPin('');setMessage('');setError('');};
  return <main className="konark-admin-page"><header className="konark-donation-header"><a href="/" className="konark-back"><ArrowLeft size={16}/> Project website</a><div className="konark-mini-brand">KONARK CHAKRA PROJECT <span>· ADMIN</span></div></header>
    <div className="konark-admin-shell"><div className="konark-admin-heading"><div className="konark-admin-mark"><ShieldCheck size={26}/></div><p className="eyebrow">Authorised access</p><h1>{volunteer?'Contribution verification':'Admin login'}</h1><p>{volunteer?`Signed in as ${volunteer.volunteerName} · ${volunteer.role}`:'Sign in with your existing volunteer ID and 4-digit PIN.'}</p></div>
    {!volunteer ? <form className="konark-admin-form" onSubmit={login}><label>Volunteer ID<input required autoComplete="username" value={credentials.code} onChange={e=>setCredentials(v=>({...v,code:e.target.value}))}/></label><label>4-digit PIN<input required type="password" inputMode="numeric" maxLength={4} autoComplete="current-password" value={credentials.pin} onChange={e=>setCredentials(v=>({...v,pin:e.target.value.replace(/\D/g,'').slice(0,4)}))}/></label><button className="konark-primary" disabled={busy}>{busy?'Verifying…':'Sign in'}</button></form> : <>
      <div className="konark-admin-toolbar"><span>Pending contribution verification</span><button onClick={loadQueue} disabled={loading}><RefreshCw size={15}/>{loading?'Refreshing':'Refresh'}</button><button onClick={logout}><LogOut size={15}/>Sign out</button></div>
      <form className="konark-verify-form" onSubmit={verify}><label>6-digit contributor PIN<input required inputMode="numeric" maxLength={6} value={verifyPin} onChange={e=>setVerifyPin(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="Enter PIN shown by contributor"/></label><button className="konark-primary" disabled={actionBusy==='verify'}>{actionBusy==='verify'?'Verifying…':'Verify contribution'}</button></form>
      <div className="konark-queue">{queue.length===0?<p className="konark-empty">No pending contributions returned by the service.</p>:queue.map((item,i)=><article className="konark-queue-item" key={item.donationId || item.confirmationCode || i}><div><strong>{item.donorName || 'Contributor'}</strong><span>{item.donationId || 'Reference pending'} · {item.sevaHead || item.towards || 'Project contribution'}</span></div><b>₹{Number(item.amount || 0).toLocaleString('en-IN')}</b></article>)}</div>
      <p className="konark-admin-note">Receipt requests are forwarded to the existing backend. The backend must confirm payment before issuing a receipt.</p>
    </>}
    {message&&<p className="konark-message" role="status">{message}</p>}{error&&<p className="konark-error" role="alert">{error}</p>}
    <p className="konark-admin-foot">Temporary backend connection · Konark identity and payment details are kept separate from SJST.</p></div>
  </main>;
}
