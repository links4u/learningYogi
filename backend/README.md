# Teacher Timetable Extraction Backend

Node.js + Express + TypeScript backend for AI-powered timetable extraction.

## Features

- 📤 Multi-format file upload (PDF, Images, DOCX)
- 🤖 LLM Vision extraction (GPT-4o)
- 🔍 OCR fallback (Tesseract.js)
- 🎯 Schema validation (Zod)
- 📊 Confidence scoring
- 🔄 Data normalization
- 💾 JSON storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for LLM Vision)

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_api_key_here
```

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### Build

```bash
npm run build
npm start
```

### Testing

```bash
npm test
npm run test:watch
```

## API Endpoints

### POST /api/timetable/upload

Upload a timetable file for extraction.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF, JPG, PNG, or DOCX)

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
  },
  "metadata": {
    "extractionMethod": "llm",
    "processingTime": 1234,
    "originalFilename": "timetable.pdf"
  }
}
```

### GET /api/timetable/:id

Retrieve a stored timetable by ID.

### GET /api/timetable

List all stored timetable IDs.

## Architecture

### Pipeline Flow

1. **Upload** - File received via Multer
2. **Preprocessing** - Image enhancement with Sharp
3. **Extraction** - LLM Vision (primary) or OCR (fallback)
4. **Normalization** - Time formatting, deduplication, sorting
5. **Validation** - Zod schema validation
6. **Storage** - JSON file storage

### Project Structure

```
src/
├── api/              # Controllers
│   └── upload.controller.ts
├── services/         # Business logic
│   ├── preprocessing.service.ts
│   ├── ocr.service.ts
│   ├── llm.service.ts
│   ├── normalization.service.ts
│   └── storage.service.ts
├── utils/            # Utilities
│   ├── logger.ts
│   ├── file.utils.ts
│   └── schema.validator.ts
├── config/           # Configuration
│   └── env.ts
├── app.ts            # Express app
└── server.ts         # Entry point
```

## Technologies

- **Node.js + Express** - Server framework
- **TypeScript** - Type safety
- **Multer** - File uploads
- **Sharp** - Image preprocessing
- **Tesseract.js** - OCR
- **OpenAI GPT-4o** - Vision LLM
- **Zod** - Schema validation
- **Winston** - Logging
- **Jest** - Testing

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| NODE_ENV | Environment | development |
| OPENAI_API_KEY | OpenAI API key | (required) |
| OPENAI_MODEL | OpenAI model | gpt-4o |
| MAX_FILE_SIZE | Max upload size (bytes) | 10485760 (10MB) |
| UPLOAD_DIR | Upload directory | ./uploads |
| LOG_LEVEL | Logging level | info |
