# 💎 CuratedLux • High-Luxury Asset Valuation & Anti-Chat Trade Intake System

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.0.1-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-purple.svg)](https://vitejs.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.1-38bdf8.svg)](https://tailwindcss.com)
[![Gemini API](https://img.shields.io/badge/Gemini_AI-2.4-green.svg)](https://ai.google.dev)

**CuratedLux** is an enterprise-grade luxury asset valuation, neural AI authentication, and scale trade intake platform. It eliminates unstructured group chat chaos (WhatsApp / Telegram) by enforcing strict structured schemas, algorithmic buyer-seller matchmaking, 4K provenance video verification, and escrow deposit locking.

---

## 🌟 Key Features & Capabilities

### 1. 🛡️ Structured Anti-Chat Trade Intake & Scale Engine
* **Eliminates Unstructured Noise**: Replaces messy chat messages with validated JSON schema forms for high-value watches, fine jewelry, fine art, and luxury leather goods.
* **Algorithmic Matchmaking Engine**: Real-time scoring matrix linking seller inventory items with buyer client demand requests based on brand, model, target price, and condition thresholds.
* **Escrow Lock Protocol**: Step-by-step transaction pipeline incorporating a 10% vault escrow lock state and provenance request dispatches.

### 2. 🔬 Multi-Angle Neural AI Inspection & OCR Warranty Reader
* **Gemini 2.5 Vision Neural Inspection**: Evaluates luxury assets across multiple camera angles (dial, movement, crown, clasp) with a confidence score and breakdown by brand, reference model, and metal integrity.
* **Optical OCR Warranty Card Processor**: Automatically extracts serial numbers, reference codes, purchase dates, and authorized dealer names from physical warranty cards.
* **Audio-Guided Photo Protocol**: Live voice prompts instructing users on precise lighting, distance, and macro-focus positioning during image capture.

### 3. 📄 Expandable Print-Ready Official Dossier Document
* **Full-Screen Print View**: Animated transition from summary cards to a high-resolution, print-ready document formatted for luxury appraisals and insurance policies.
* **Theme Customization**: Live toggling between **Luxury Dark Mode** (for digital presentations) and **Paper White Mode** (for high-contrast ink printing / PDF save).
* **Export Settings Sub-Menu**: Toggle visibility for individual fields (estimated value, condition grade, neural breakdown, device metadata, QR verification code, appraiser signature, custom notes).
* **Cryptographic QR Passport**: Generates verification QR stamps and AES-256 device hardware hashes.

### 4. 🧭 Interactive Spatial Hotspot Inspection & Value Curve Analytics
* **3D Dial/Bezel Hotspots**: Interactive visual pins highlighting key craftsmanship details, movement calibers, and gem settings.
* **Interactive Historical Price Charts**: Visualizes 12-month market valuation trends alongside secondary market liquidity scores.

---

## 🏗️ Architecture & Technology Stack

```
           +-------------------------------------------------------+
           |                 CuratedLux Frontend                   |
           |   React 19 • Vite • Tailwind CSS v4 • Framer Motion   |
           +---------------------------+---------------------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
                   v                                       v
     +---------------------------+           +---------------------------+
     |   Gemini 2.5 Vision API   |           |    Local Vault Storage    |
     |   • Multi-Angle Auth      |           |    • Structured JSON      |
     |   • OCR Warranty Card     |           |    • Offline Cache         |
     |   • Valuation Engine      |           |    • Export Manifests      |
     +---------------------------+           +---------------------------+
                   |                                       |
                   +-------------------+-------------------+
                                       |
                                       v
                   +---------------------------------------+
                   |    Optional Enterprise Persistence    |
                   |   • Firebase Firestore (Realtime DB)   |
                   |   • PostgreSQL / Cloud SQL (ERP Sync)  |
                   +---------------------------------------+
```

* **Framework**: React 19 + TypeScript + Vite
* **Styling**: Tailwind CSS v4 + Framer Motion + Lucide Icons
* **AI Engine**: `@google/genai` (Google Gemini 2.5 Vision & Multimodal SDK)
* **Audio Processing**: Web Audio API (real-time voice synthesis guidance)

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/curatedlux.git
cd curatedlux
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure your API key:
```env
GEMINI_API_KEY="your_google_gemini_api_key_here"
PORT=3000
```

### 4. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 🗄️ Database & Production Persistence Recommendations

While CuratedLux includes zero-latency local caching out of the box, enterprise deployments can easily be linked to persistent backends:

### Option A: Firebase Firestore (Recommended for Real-Time Matchmaking)
Ideal for collaborative multi-user luxury trader portals and escrow status synchronization.
* **Collections Structure**:
  * `inventory`: Stores seller intake listings, neural AI scores, and images.
  * `client_requests`: Stores buyer wanted listings and budget parameters.
  * `dossiers`: Stores verified authenticity passports and appraisal logs.

### Option B: PostgreSQL / Cloud SQL (Recommended for Enterprise ERP)
Ideal for linking with legacy luxury retailer databases, inventory accounting, and audit logs.
* **Recommended Schema**:
  ```sql
  CREATE TABLE inventory_items (
    id VARCHAR(64) PRIMARY KEY,
    tracking_ref VARCHAR(32) UNIQUE NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    estimated_value NUMERIC(12, 2),
    confidence_score INT,
    condition_grade INT,
    seller_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

---

## 📜 Build & Deployment Instructions

### Production Build
To create a production-ready bundle in the `dist` folder:
```bash
npm run build
```

### Type Checking & Linting
```bash
npm run lint
```

### Docker Deployment (Optional)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📄 License
This project is licensed under the **MIT License**. See `LICENSE` for details.

Developed for **CuratedLux International** • Geneva • New York • Dubai
