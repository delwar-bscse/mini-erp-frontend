# Mini ERP Frontend

A modern ERP frontend built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Prerequisites

Before running this project, make sure you have installed:

* Node.js (v20 or later recommended)
* npm, Yarn, or pnpm
* Git

## 1. Clone the Repository

```bash
git clone https://github.com/delwar-bscse/mini-erp-frontend.git
```

Navigate to the project directory:

```bash
cd mini-erp-frontend
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Copy the following configuration into the file:

```env
# Server & API Configurations
SERVER_URL="http://192.168.0.104:5000/api/v1"
BASE_URL="http://192.168.0.104:5000/api/v1"

# Next.js Public Environment Variables
NEXT_PUBLIC_BASE_URL="http://192.168.0.104:5000/"
NEXT_PUBLIC_IMAGE_URL="http://192.168.0.104:5000/uploads"
```

> **Note**
>
> If your backend is running on another machine or server, replace `192.168.0.104` with the correct IP address or domain.

---

## 4. Start the Backend Server

Make sure the backend server is running before starting the frontend.

Example:

```
Backend:
http://192.168.0.104:5000
```

---

## 5. Run the Development Server

Using npm:

```bash
npm run dev
```

Using Yarn:

```bash
yarn dev
```

Using pnpm:

```bash
pnpm dev
```

---

## 6. Open the Application

Visit:

```
http://localhost:3000
```

---

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Run production server    |
| `npm run lint`  | Run ESLint               |

---

## Project Structure

```
mini-erp-frontend/
│
├── app/
├── components/
├── hooks/
├── lib/
├── providers/
├── services/
├── types/
├── utils/
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod
* Axios

---

## Troubleshooting

### Images are not loading

* Ensure the backend server is running.
* Verify `NEXT_PUBLIC_IMAGE_URL` is correct.
* Confirm uploaded images exist in the backend `uploads` directory.

### API requests are failing

* Verify the backend server is running.
* Check that `SERVER_URL`, `BASE_URL`, and `NEXT_PUBLIC_BASE_URL` point to the correct backend.
* If the backend is running on another computer, ensure both devices are on the same network and the backend port is accessible.

### Environment variables are not updating

After changing `.env.local`, restart the development server:

```bash
npm run dev
```

---

## License

This project is intended for educational and internal ERP development purposes.
