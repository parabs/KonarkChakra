# Konark Chakra Project · Thane

Independent React + Vite single-page project website for Thane Odia Association.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx` — one-page website, content sections and donor experience
- `src/styles.css` — responsive heritage design system
- `src/lib/donations.js` — Google Apps Script donation API adapter
- `public/assets/` — approved project visuals and icon assets (to be populated)

## Donation lifecycle

The frontend API adapter expects the Google Apps Script backend to:
1. Create a donation record with `PENDING_PAYMENT`.
2. Accept the donor's UTR / transaction reference as `PENDING_VERIFICATION`.
3. Allow authorised admin verification against the actual bank credit.
4. Change status to `PAID` only after successful verification.
5. Trigger receipt generation, PDF storage and email delivery server-side after the verified `PAID` transition.

A donor-submitted UTR or screenshot is not proof of payment. Receipt generation must never be triggered merely by form submission.

Set `VITE_DONATION_API_URL` to the deployed Apps Script web-app URL. The backend action contract must be matched to the existing Apps Script before production use.

## Pre-launch items

- Add the final generated images and icon assets to `public/assets/`.
- Add Thane Odia Association's verified bank details and official UPI QR.
- Confirm receipt wording, numbering and email policy.
- Configure the Apps Script endpoint and test all donation/verification/receipt paths.
- Add verified association logos, project contact details and privacy wording.
- Review all concept images and labels; no visual should imply site approval or project completion.
