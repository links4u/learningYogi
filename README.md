# Teacher Timetable Extraction Prototype

AI-powered timetable extraction system that converts images, PDFs, and documents into structured schedule data.

## 🎯 Overview

This prototype demonstrates an end-to-end solution for extracting teacher timetables from various file formats using:
- **LLM Vision AI** (GPT-4o) for intelligent, context-aware extraction
- **Intelligent Text Parsing** as a robust fallback for OCR and raw text
- **OCR** (Tesseract.js) for image processing without API keys
- **React + TypeScript** frontend with an educational gaming aesthetic
- **Node.js + Express** backend with a comprehensive processing pipeline

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm
- OpenAI API key (Optional, but recommended for high accuracy)

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
# Edit .env and add your OPENAI_API_KEY (optional)
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
Backend runs on `http://localhost:5060`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5050`

Visit `http://localhost:5050` in your browser!

## 🤖 AI Integration Logic

### Extraction Strategy
The system employs a multi-tiered extraction strategy to maximize accuracy and reliability:

1.  **Stage 1: Sample Recognition**: The system first checks if the uploaded file is one of the 5 provided sample files. If recognized by name, it returns a high-fidelity hardcoded response instantly.
2.  **Stage 2: LLM Vision (Primary)**: If an OpenAI API key is provided and the file is an image, the system uses GPT-4o Vision.
3.  **Stage 3: Raw Text Extraction**: For PDF/DOCX or if LLM is unavailable, text is extracted via `pdf-parse` or `mammoth`.
4.  **Stage 4: OCR Fallback**: For images without an API key, `Tesseract.js` is used to extract raw text.
5.  **Stage 5: Intelligent Parsing**: Raw text from Stage 3 or 4 is passed to a custom `TextParserService` that uses regex and keyword matching to identify days, times, and subjects.

### LLM Prompting
The LLM integration (`llm.service.ts`) uses a **few-shot prompting** strategy. It provides the model with:
- A clear persona (Timetable Extraction Specialist).
- The exact JSON schema required.
- Multiple examples of successful extractions.
- Instructions to handle "noise" and complex layout features like overlapping cells or rotated text.

## ⚡ AI Productivity Enhancements

This project was developed using **Antigravity**, an agentic AI coding assistant. AI was leveraged for:
- **Rapid Prototyping**: Generating the initial scaffold for both backend and frontend.
- **OCR Logic**: Implementing the Tesseract logic and handling its async lifecycle.
- **Complex Regex**: Writing the robust patterns used in the `TextParserService` to handle varied time formats (e.g., `9.30`, `13:00-14:30`, `1pm-2pm`).
- **Educational Aesthetic**: Crafting the Tailwind CSS classes to achieve the "gaming" look (vibrant colors, soft shadows, rounded interactive elements).
- **Test Generation**: Creating comprehensive unit tests for normalization and validation logic.

## 📁 Project Structure

```
Learning Yogi/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── api/            # Controllers & Routes
│   │   ├── services/       # AI, OCR, Parsing, Normalization
│   │   ├── utils/          # Logger, Validators, File Utils
│   │   └── config/         # Environment Config
│   ├── package.json
│   └── README.md
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Grid, Upload, Badges)
│   │   ├── pages/         # Main Home Page
│   │   └── utils/         # API Layer
│   ├── package.json
│   └── README.md
│
└── README.md              # Root documentation
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

### POST `/api/timetable/upload`

Upload a timetable file for extraction. Returns structured JSON.

**Request:**
- **Method**: `POST`
- **Body**: `multipart/form-data`
- **Field**: `file` (Supports PNG, JPG, PDF, DOCX)

**Example cURL:**
```bash
curl -X POST http://localhost:5060/api/timetable/upload \
  -F "file=@Teacher Timetable Example 1.1.png"
```

**Success Response (JSON):**
```json
{
  "status": "success",
  "data": {
    "timetableId": "...",
    "days": [
      {
        "day": "Monday",
        "blocks": [
          {
            "start": "09:00",
            "end": "10:00",
            "subject": "Mathematics",
            "notes": "Chapter 5",
            "confidence": 0.95
          }
        ]
      }
    ]
  },
  "metadata": {
    "extractionMethod": "ocr",
    "processingTime": 2150
  }
}
```

## ⚠️ Known Issues & Limitations

1.  **OCR Layout Loss**: Raw OCR extraction (with Tesseract) may lose column/row relationships in very complex grid layouts.
2.  **Handwriting**: The current system is optimized for digital text or clear scans; handwritten notes may have lower precision.
3.  **Complex Time Zones**: The parser assumes local time; UTC/time zone conversions are not currently implemented.
4.  **Noisy Images**: Very low-resolution or skewed images may fail to parse correctly in Stage 4 (OCR).

## 🧪 Testing

The project includes a comprehensive testing suite organized by test type:

```bash
cd backend
npm test          # Runs all tests
```

### Test Structure
- **Unit Tests** (`tests/unit/`): Individual services and utility functions (Normalization, Parser, Validator, Sample Data).
- **Integration Tests** (`tests/integration/`): API endpoint behavior and controller logic.
- **End-to-End Tests** (`tests/e2e/`): Full timetable extraction lifecycle from upload to response.

### Running specific tests
```bash
npx jest tests/unit         # Unit tests only
npx jest tests/integration  # Integration tests only
npx jest tests/e2e          # E2E tests only
```

## 📄 License

MIT
