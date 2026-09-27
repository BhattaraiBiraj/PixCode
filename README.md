<p align="center">
  <img src="frontend/public/pixcode-logo.svg" alt="PixCode Logo" width="170"/>
</p>

**PixCode** is a simple web app for sharing images across devices using a unique code — no cables, no accounts required (though creating one gets you upload history). Upload an image, get a short code, and enter that code on any other device to retrieve it instantly.

🔗 **Live:** [pixcode.birajbhattarai.com.np](https://pixcode.birajbhattarai.com.np)

---

## ✨ Features

- 📤 **Upload & retrieve** images using a unique, auto-generated code
- 🔓 **Guest-friendly** — upload and retrieve without creating an account
- 🔐 **JWT-based authentication** — sign up / log in to unlock upload history
- 🕘 **Upload history** for logged-in users, tied to their account
- 🔑 **PIN-based password recovery** — reset your password using a 4-digit PIN set at signup, no email required
- ☁️ **Cloudinary** for reliable image storage and delivery
- 🎨 Clean, responsive UI built with React + Bootstrap

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- Bootstrap

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary (image storage)
- Multer (file upload handling)
- JSON Web Tokens (JWT) — authentication
- bcrypt — password & PIN hashing

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## 📁 Project Structure

```
pixcode/
├── frontend/                   # React (Vite) frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── pixcode-logo.svg
│   └── src/
│       ├── App.jsx
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── Form.jsx            # Upload form
│       ├── Retrieve.jsx        # Retrieve image by code
│       ├── Login.jsx
│       ├── Signup.jsx
│       ├── History.jsx
│       ├── main.jsx
│       └── style.css
│
└── backend/                    # Express backend
    ├── configs/
    │   ├── cloudinaryConfig.js
    │   └── multerConfig.js
    ├── models/
    │   ├── image.js
    │   └── user.js
    ├── helper.js                # Random code generator
    └── index.js                 # App entry point & all routes
```

---

## ⚙️ Environment Variables

**Backend (`backend/.env`)**
```
MONGO_URL=your_mongodb_connection_string
SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (`frontend/.env`)**
```
VITE_API_URL=http://localhost:8080
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/pixcode.git
cd pixcode
```

### 2. Set up the backend
```bash
cd backend
npm install
# add your .env file (see above)
node index.js
```

### 3. Set up the frontend
```bash
cd frontend
npm install
# add your .env file (see above)
npm run dev
```

The app should now be running locally, with the frontend talking to your backend at the URL set in `VITE_API_URL`.

---

## 🔌 API Overview

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/register` | Create a new account (username, password, PIN) | — |
| POST | `/login` | Log in and receive a JWT | — |
| POST | `/api/upload` | Upload an image, get back a code | Optional |
| GET | `/api/image/:code` | Retrieve an image by its code | — |
| GET | `/api/history` | Get the logged-in user's upload history | Required |
| POST | `/verify-pin` | Verify a username + PIN combo | — |
| POST | `/reset-password` | Reset password after PIN verification | — |

Authenticated routes expect a header: `Authorization: Bearer <token>`

---

## 🔒 How Authentication Works

- Passwords and PINs are hashed with **bcrypt** before being stored — never saved as plain text.
- On login/signup, the server issues a **JWT** containing the user's ID, valid for a few days.
- The frontend stores this token and attaches it to requests that need to know who's logged in.
- **Uploads work for everyone** — if a valid token is present, the upload is tied to that user's account; otherwise it's saved as a guest upload.
- **History requires login** — protected by middleware that rejects requests without a valid token.
- **Forgot password** uses a 4-digit PIN (set at signup) instead of email — enter your username + PIN to unlock the option to set a new password.

---

## 👤 Author

**Biraj Bhattarai**

---

## 📄 License

This project is open source and available for learning purposes.
