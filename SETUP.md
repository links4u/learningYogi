# 🚀 Quick Setup Guide

Follow these steps to get the Teacher Timetable Extraction Prototype running:

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📝 Environment: development
🔗 API: http://localhost:3001/api/timetable/upload
```

## Step 5: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

## Step 6: Open in Browser

Visit: **http://localhost:3000**

## 🎉 You're Ready!

Upload a timetable image, PDF, or DOCX file and watch the AI extract your schedule!

---

## 🧪 Run Tests (Optional)

```bash
cd backend
npm test
```

---

## ⚠️ Troubleshooting

**"Missing OpenAI API key" error:**
- Make sure you've added `OPENAI_API_KEY` to `backend/.env`
- The key should start with `sk-`

**Port already in use:**
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change `port` in `frontend/vite.config.ts`

**Dependencies not installing:**
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
