# Timetable Extraction Frontend

React + Vite + TypeScript + Tailwind CSS frontend for the Teacher Timetable Extraction Prototype.

## Features

- 📤 Drag & drop file upload
- 🎨 Educational gaming aesthetic (inspired by Duolingo/LearningYogi)
- 📊 Confidence score visualization
- 📱 Responsive design
- ⚡ Lightning-fast with Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── UploadBox.tsx
│   ├── TimetableGrid.tsx
│   └── ConfidenceBadge.tsx
├── pages/           # Page components
│   └── Home.tsx
├── utils/           # Utility functions
│   └── api.ts
├── types.ts         # TypeScript type definitions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## API Integration

The frontend connects to the backend API at `http://localhost:3001` (proxied through Vite).

Endpoint: `POST /api/timetable/upload`

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **react-dropzone** - File upload
