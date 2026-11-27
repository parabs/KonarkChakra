import React, { useState } from 'react';
import { ArrowLeft, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react';

const CONFIG_BOOTSTRAP_URL =
  import.meta.env.VITE_SJST_CONFIG_BOOTSTRAP_URL ||
  'https://script.google.com/macros/s/AKfycbxglEayhs9nPXWpa43RB5u0DpJl6FVJa9jH8XWL6H12x-ax8H4oOQD23RewCBRcxpfSjw/exec';

async function authenticate(volunteerCode, pin) {
  const configResponse = await fetch(`${CONFIG_BOOTSTRAP_URL}?action=get_config`);
  if (!configResponse.ok) throw new Error('Unable to connect to the administration service.');
  const configResult = await configResponse.json();
  const backendUrl = configResult?.config?.api?.backendUrl;
  if (!configResult?.success || !backendUrl) {
    throw new Error(configResult?.error || 'Administration service configuration is unavailable.');
  }

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'authenticateVolunteer',
      volunteerCode: volunteerCode.trim().toUpperCase(),
      pin: pin.trim()
    }),
    redirect: 'follow'
  });
  const raw = await response.text();
  let result;
  try { result = JSON.parse(raw); }
  catch { throw new Error('The authentication service returned an invalid response.'); }
  if (!response.ok || !result.success || !result.volunteer) {
    throw new Error(result.error || 'Invalid Volunteer ID or PIN.');
  }
  return result.volunteer;
}

export default function AdminAccess() {
  const [volunteerCode, setVolunteerCode] = useState('');
  const [pin, setPin] = useState('');
  const [volunteer, setVolunteer] = useState(() => {
    try {
      const saved = sessionStorage.getItem('konark_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const login = async (event) => {
    event.preventDefault();
    setError('');
    if (!volunteerCode.trim() || !/^\\d{4}$/.test(pin.trim())) {
      setError('Enter your Volunteer ID and 4-digit PIN.');
      return;
    }
    setBusy(true);
    try {
      const result = await authenticate(volunteerCode, pin);
      const safeProfile = {
        volunteerCode: result.volunteerCode,
        volunteerName: result.volunteerName,
        role: result.role || 'Volunteer',
        status: result.status
      };
      sessionStorage.setItem('konark_admin_session', JSON.stringify(safeProfile));
      setVolunteer(safeProfile);
      setPin('');
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally { setBusy(false); }
  };

  const logout = () => {
    sessionStorage.removeItem('konark_admin_session');
    setVolunteer(null);
    setVolunteerCode('');
    setPin('');
  };

  return (
    <main className="admin-access">
      <div className="admin-access-card">
        <a className="admin-back-link" href="/"><ArrowLeft size={16}/> Back to project website</a>
        <div className="admin-access-mark"><ShieldCheck size={27}/></div>
        <p className="eyebrow">Konark Chakra Project · Thane</p>
        {volunteer ? (
          <>
            <h1>Admin access</h1>
            <p className="admin-access-lead">Signed in as <strong>{volunteer.volunteerName}</strong>.</p>
            <div className="admin-session">
              <span>Volunteer ID</span><strong>{volunteer.volunteerCode}</strong>
              <span>Access role</span><strong>{volunteer.role}</strong>
            </div>
            <p className="admin-access-note">Your sign-in has been verified by the existing administration service. The administration workspace will be presented here as the project’s requirements are confirmed.</p>
            <button className="button button-rust admin-submit" onClick={logout}><LogOut size={16}/> Sign out</button>
          </>
        ) : (
          <>
            <h1>Admin login</h1>
            <p className="admin-access-lead">This area is for authorised project administrators and volunteers.</p>
            <form onSubmit={login} className="admin-login-form">
              <label>Volunteer ID<input autoComplete="username" value={volunteerCode} onChange={e=>setVolunteerCode(e.target.value)} placeholder="Enter Volunteer ID" required/></label>
              <label>Security PIN<input autoComplete="current-password" type="password" inputMode="numeric" maxLength={4} value={pin} onChange={e=>setPin(e.target.value.replace(/\\D/g,'').slice(0,4))} placeholder="4-digit PIN" required/></label>
              {error && <p className="admin-login-error" role="alert">{error}</p>}
              <button className="button button-rust admin-submit" type="submit" disabled={busy}><LockKeyhole size={16}/>{busy ? 'Verifying…' : 'Sign in securely'}</button>
            </form>
            <p className="admin-access-note">Credentials are checked against the existing volunteer register. Do not share your PIN.</p>
          </>
        )}
      </div>
    </main>
  );
}
