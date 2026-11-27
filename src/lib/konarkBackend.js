const CONFIG_URL = import.meta.env.VITE_KONARK_CONFIG_BOOTSTRAP_URL || import.meta.env.VITE_SJST_CONFIG_BOOTSTRAP_URL || 'https://script.google.com/macros/s/AKfycbxglEayhs9nPXWpa43RB5u0DpJl6FVJa9jH8XWL6H12x-ax8H4oOQD23RewCBRcxpfSjw/exec';

let runtimeConfig;
export async function getRuntimeConfig() {
  if (runtimeConfig) return runtimeConfig;
  const response = await fetch(`${CONFIG_URL}?action=get_config`);
  if (!response.ok) throw new Error('Unable to load contribution service configuration.');
  const result = await response.json();
  if (!result?.success || !result?.config?.api?.backendUrl) throw new Error(result?.error || 'Contribution service is not configured.');
  // Keep the legacy service configuration private to this module. Never return or render SJST trust/payment fields.
  runtimeConfig = { backendUrl: result.config.api.backendUrl, spreadsheetId: result.config.google?.spreadsheetId || '' };
  return runtimeConfig;
}

export async function backendGet(action) {
  const { backendUrl } = await getRuntimeConfig();
  const url = new URL(backendUrl);
  url.searchParams.set('action', action);
  const response = await fetch(url.toString(), { method: 'GET', redirect: 'follow' });
  const result = await response.json();
  if (!response.ok || result?.success === false) throw new Error(result?.error || `Service request failed (${response.status}).`);
  return result;
}

export async function backendPost(payload) {
  const { backendUrl } = await getRuntimeConfig();
  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow'
  });
  const raw = await response.text();
  try {
    const result = JSON.parse(raw);
    if (!response.ok || result?.success === false) throw new Error(result?.error || 'The service rejected the request.');
    return result;
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error('The service response could not be verified. Refresh the record list before retrying.');
    throw error;
  }
}

export async function createContribution(data) {
  const idResult = await backendGet('get_next_donation_id');
  if (!idResult.donationId) throw new Error('The service did not return a contribution reference.');
  const donation = {
    donationId: String(idResult.donationId),
    submittedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    donorName: data.donorName.trim(),
    mobile: data.mobile.trim(),
    phone: data.mobile.trim(),
    email: data.email.trim(),
    amount: Number(data.amount),
    paymentMode: 'UPI',
    paymentStatus: 'Confirmation Pending',
    paymentReference: '',
    receiptUrl: '',
    emailStatus: data.email ? 'Pending' : 'Not Required',
    emailMessageId: '',
    confirmedBy: '',
    confirmationCode: String(Math.floor(100000 + Math.random() * 900000)),
    sevaCategory: 'Konark Chakra Project',
    sevaHead: data.purpose
  };
  const payload = {
    action: 'sync_donation',
    donationId: donation.donationId,
    timestamp: new Date().toLocaleString('en-IN'),
    donorName: donation.donorName,
    mobile: donation.mobile,
    phone: donation.phone,
    email: donation.email,
    amount: donation.amount,
    paymentMode: donation.paymentMode,
    towards: donation.sevaHead,
    confirmationCode: donation.confirmationCode,
    paymentStatus: 'Pending',
    confirmedBy: '',
    volunteerName: '',
    receiptUrl: '',
    submittedAt: donation.submittedAt,
    createdAt: donation.createdAt,
    updatedAt: donation.updatedAt,
    record: donation
  };
  // Match the existing Apps Script integration's text/plain, no-cors dispatch.
  await fetch((await getRuntimeConfig()).backendUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  return donation;
}
