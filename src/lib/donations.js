/**
 * Donation API adapter.
 *
 * Set VITE_DONATION_API_URL to the deployed Google Apps Script web-app endpoint.
 * The endpoint must create a PENDING_PAYMENT donation, accept UTR submission,
 * and expose an admin verification action. Only a bank-confirmed PAID status
 * may trigger receipt generation and email delivery on the backend.
 */
const API_URL = import.meta.env.VITE_DONATION_API_URL || '';

async function request(path, body) {
  if (!API_URL) {
    throw new Error('Donation service is not configured yet. Please contact the project team.');
  }
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  });
  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || 'The request could not be completed.');
  }
  return payload;
}

export function createDonation(data) {
  return request('', { action: 'createDonation', source: 'KONARK_CHAKRA_WEBSITE', ...data });
}

export function submitPaymentReference(data) {
  return request('', { action: 'submitPaymentReference', source: 'KONARK_CHAKRA_WEBSITE', ...data });
}
