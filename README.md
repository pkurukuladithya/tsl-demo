# TSL Demo (tsl-demo)

Modern MERN app for an online clothing customization platform called TSL.

## Local setup
1. Install dependencies:
   - `cd server && npm install`
   - `cd client && npm install`
2. Create env files:
   - `server/.env` (copy from `server/.env.example`)
   - `client/.env` (copy from `client/.env.example`)
3. Run in two terminals:
   - `cd server && npm run dev`
   - `cd client && npm run dev`

The client defaults to `http://localhost:5173` and the API to `http://localhost:5000`.

## Environment variables
### Server (`server/.env`)
- `PORT=5000`
- `MONGO_URI=<your MongoDB Atlas connection string>`
- `JWT_SECRET=<strong secret>`
- `CLIENT_URL=http://localhost:5173`
- `NODE_ENV=development`

### Client (`client/.env`)
- `VITE_API_URL=http://localhost:5000`

## WhatsApp order flow
- Clicking **Place Order** builds a WhatsApp message with user/guest details and all cart items.
- If logged in, the order is stored in MongoDB with status `initiated` before opening WhatsApp.
- If not logged in, a quick modal collects guest name + mobile, and the order continues via WhatsApp (no DB record by default).

## API summary
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/cart` (protected)
- `POST /api/cart` (protected)
- `GET /api/orders` (protected)
- `POST /api/orders` (protected)

## Deployment notes (Vercel-friendly)
- Deploy the client (Vite) to Vercel or similar.
- Deploy the server to a Node-capable host (Render, Railway, Fly.io, etc.).
- Set `CLIENT_URL` on the server to your deployed client URL.
- Use HTTPS in production to keep secure cookies working (`NODE_ENV=production`).
- Alternatively, host the API under the same domain and proxy `/api` to the server.
