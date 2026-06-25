# Portfolio Contact Backend

A tiny Node.js + Express API that receives submissions from the portfolio contact form and forwards them to your inbox using **Nodemailer** over **SMTP**.

## Why a separate backend?

You can't send email directly from a React/Vite frontend — browsers don't expose SMTP. A small backend acts as a secure middleman:

- Receives the form data via `POST /api/contact`.
- Validates and rate-limits it.
- Sends an email to you using your SMTP credentials (kept server-side).

## Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your real SMTP credentials.

3. Start the API:
   ```bash
   npm run dev
   ```
   It will run on `http://localhost:5000`.

## SMTP providers (any works)

| Provider | Host                  | Port | Notes                                                                    |
| -------- | --------------------- | ---- | ------------------------------------------------------------------------ |
| Gmail    | `smtp.gmail.com`      | 587  | Use an [App Password](https://support.google.com/accounts/answer/185833) |
| Outlook  | `smtp.office365.com`  | 587  | App password or OAuth2                                                   |
| Yahoo    | `smtp.mail.yahoo.com` | 587  | App password required                                                    |
| SendGrid | `smtp.sendgrid.net`   | 587  | `apikey` / your API key                                                  |
| Mailgun  | `smtp.mailgun.org`    | 587  | SMTP credentials from dashboard                                          |

## API

### `GET /api/health`

Returns `{ ok: true }` — useful for uptime checks.

### `POST /api/contact`

Body (JSON):

```json
{ "name": "Jane", "email": "jane@example.com", "message": "Hello!" }
```

Responses:

- `200 { ok: true, message: "Message sent successfully." }`
- `400 { ok: false, error: "..." }` — validation error
- `429` — rate limit (5 requests / 10 min per IP)
- `500 { ok: false, error: "Failed to send message." }`

## Deployment tips
- Deploy on Render, Railway, Fly.io, or Vercel (serverless function).
- Set the env vars in your hosting dashboard.
- Update `FRONTEND_ORIGIN` to your deployed frontend URL.
- Update the frontend to call `https://your-api.example.com/api/contact` (see `VITE_API_URL` in the React component).

## Deploy to Render (recommended, easiest)

Render has a free tier for Node web services and a one-click **Blueprint** flow.

### Option A — One-click Blueprint
1. Push this repo to GitHub.
2. Go to **https://render.com/deploy?repo=https://github.com/<you>/<repo>** (or click **New + → Blueprint** in the Render dashboard and pick the repo).
3. Render reads `backend/render.yaml` and creates the service for you.
4. In the new service's **Environment** tab, fill in the `sync: false` vars:
   - `FRONTEND_ORIGIN` → `https://<your-frontend>.onrender.com` (or your custom domain)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`
5. Click **Manual Deploy → Deploy latest commit**. Your API will be live at:
   ```
   https://portfolio-contact-api.onrender.com
   ```
6. Set the frontend's `VITE_API_URL` to that URL (no trailing slash) and redeploy the frontend.

### Option B — Manual setup
1. **New + → Web Service** → connect the repo.
2. **Root Directory:** `backend`
3. **Runtime:** Node
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. **Plan:** Free
7. Add the env vars above and deploy.

### ⚠️ Free-tier caveat
Render's free web service **spins down after 15 min of inactivity** and may take ~30s to wake up on the first request. For a low-traffic contact form this is fine. To keep it warm, see "Keep-alive" below.

## Keep-alive (free cron-ping)

If the cold start bothers you, hit `/api/health` every 10 minutes from a free cron service:

- **cron-job.org** (free) — create a job that calls `https://portfolio-contact-api.onrender.com/api/health` every 10 min.
- **UptimeRobot** (free) — add a new monitor with the same URL.
- **GitHub Actions** (free) — a scheduled workflow that `curl`s the URL.

This is optional — your form will still work after the first cold start.
