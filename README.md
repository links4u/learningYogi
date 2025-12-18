# Teacher Timetable Extraction Prototype

AI-powered timetable extraction system that converts images, PDFs, and documents into structured schedule data.

## 🎯 Overview

This prototype demonstrates an end-to-end solution for extracting teacher timetables from various file formats using:
- **LLM Vision AI** (GPT-4o) for intelligent extraction
- **OCR** (Tesseract.js) as fallback
- **React + TypeScript** frontend with educational gaming aesthetic
- **Node.js + Express** backend with comprehensive pipeline

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm
- OpenAI API key

### Installation

1. **Clone and navigate to project:**
```bash
cd "Learning Yogi"
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

Visit `http://localhost:3000` in your browser!

## 📁 Project Structure

```
Learning Yogi/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── api/            # Controllers
│   │   ├── services/       # Business logic (LLM, OCR, normalization)
│   │   ├── utils/          # Utilities (logger, validators)
│   │   └── config/         # Configuration
│   ├── package.json
│   └── README.md
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   └── utils/         # API utilities
│   ├── package.json
│   └── README.md
│
└── README.md              # This file
```

## 🎨 Features

### Backend
- ✅ Multi-format upload (PDF, JPG, PNG, DOCX)
- ✅ GPT-4o Vision extraction with few-shot prompting
- ✅ OCR fallback with Tesseract.js
- ✅ Image preprocessing (Sharp)
- ✅ Data normalization (time formatting, deduplication)
- ✅ Zod schema validation
- ✅ JSON storage
- ✅ Comprehensive logging
- ✅ Unit tests

### Frontend
- ✅ Drag & drop file upload
- ✅ Real-time upload progress
- ✅ Beautiful timetable grid (CSS Grid)
- ✅ Confidence score visualization
- ✅ Educational gaming aesthetic
- ✅ Responsive design
- ✅ Error handling

## 🔧 Technology Stack

### Backend
- Node.js + Express
- TypeScript
- OpenAI GPT-4o Vision
- Tesseract.js (OCR)
- Sharp (image processing)
- Zod (validation)
- Winston (logging)
- Jest (testing)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- react-dropzone

## 📊 API Documentation

### POST /api/timetable/upload

Upload a timetable file for extraction.

**Request:**
```bash
curl -X POST http://localhost:3001/api/timetable/upload \
  -F "file=@timetable.pdf"
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "timetableId": "uuid",
    "days": [
      {
        "day": "Monday",
        "blocks": [
          {
            "start": "09:00",
            "end": "10:00",
            "subject": "Mathematics",
            "notes": "",
            "confidence": 0.95
          }
        ]
      }
    ]
  }
}
```

## 🧪 Testing

**Backend tests:**
```bash
cd backend
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

## 📝 Pipeline Flow

1. **Upload** → File received via Multer
2. **Preprocessing** → Image enhancement (grayscale, contrast, noise reduction)
3. **Extraction** → LLM Vision (primary) or OCR (fallback)
4. **Normalization** → Time formatting, subject cleaning, deduplication
5. **Validation** → Zod schema enforcement
6. **Storage** → JSON file persistence
7. **Response** → Structured timetable data

## 🎯 Design Philosophy

The UI follows an **educational gaming aesthetic** inspired by:
- Duolingo
- LearningYogi
- Byju's
- ClassDojo

Features:
- Vibrant, friendly colors
- Rounded corners and soft shadows
- Smooth animations
- Clear visual hierarchy
- Confidence score indicators

## 🔐 Environment Variables

**Backend (.env):**
```env
PORT=3001
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o
MAX_FILE_SIZE=10485760
```

## 📄 License

MIT

## 🙏 Acknowledgments

Built following the architectural specifications in:
- `Architectural_Design_Plan.pdf`
- `00_START_HERE.md`
- `01_BACKEND_INSTRUCTIONS.md`
- `02_FRONTEND_INSTRUCTIONS.md`
- `03_BUILD_ORDER.md`
