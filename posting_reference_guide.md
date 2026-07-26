# 📲 CuratedLux External Posting Reference Guide
### Structured Format Standard for WhatsApp & Telegram High-Luxury Trade Groups

> **Notice**: While the CuratedLux platform interface provides automated multi-angle AI authentication and instant buyer-seller matchmaking, dealers who prefer posting in external WhatsApp or Telegram trade groups can follow this standardized template. Posts formatted according to this guide are automatically ingested and parsed into structured JSON schemas by the CuratedLux Natural Language Parser.

---

## 💬 1. Telegram Dark Theme Posting Standard (WTS - Want To Sell)

### Ideal Format Structure
```text
WTS Rolex Daytona
Ref: 116500LN
Year: 2021
Dial: White Panda
Condition: Mint
Includes: Box & Papers
Price: USD 32,500
```

### Visual Preview & Layout
* **Theme**: Telegram Dark Blue `#17212b`
* **Media Attachment**: High-Resolution 4K Front/Dial Photograph attached directly above the text block.
* **Fields Required**:
  - `Action Tag`: `WTS` (Want To Sell) or `FS` (For Sale)
  - `Brand & Model`: e.g., `Rolex Daytona`
  - `Reference Number`: e.g., `116500LN`
  - `Year / Production Era`: e.g., `2021`
  - `Dial / Variant`: e.g., `White Panda`
  - `Condition Grade`: `Unworn`, `Mint`, `Excellent`, `Fair`
  - `Inclusions`: `Box & Papers`, `Watch Only`, `Archives`
  - `Asking Price`: Currency code + Amount (e.g., `USD 32,500`)

---

## 💬 2. WhatsApp Light Theme Posting Standard (WTB - Want To Buy)

### Ideal Format Structure
```text
WTB Richard Mille RM35
Ref: RM35-02
Year: 2020
Dial: NTPT Black
Condition: Unworn
Includes: Box & Papers
Price: HKD 2,400,000
```

### Visual Preview & Layout
* **Theme**: WhatsApp Light Green `#efeae2` / `#dcf8c6`
* **Media Attachment**: Sample reference photo attached above the request specification.
* **Fields Required**:
  - `Action Tag`: `WTB` (Want To Buy) or `ISO` (In Search Of)
  - `Brand & Model`: e.g., `Richard Mille RM35`
  - `Reference Number`: e.g., `RM35-02`
  - `Year / Range`: e.g., `2020+`
  - `Dial / Material`: e.g., `NTPT Carbon Black`
  - `Condition Required`: `Unworn` or `Mint`
  - `Inclusions Required`: `Full Set (Box & Papers)`
  - `Target Budget`: Currency code + Amount (e.g., `HKD 2,400,000`)

---

## ⚡ 3. Automated Natural Language AI Parsing Engine

When a dealer copies and pastes an external chat post into CuratedLux (or transmits via CuratedLux Telegram/WhatsApp Webhook Integration), the neural parser automatically maps the unstructured message into a verified JSON object:

```json
{
  "action": "WTS",
  "category": "Watch",
  "brand": "Rolex",
  "model": "Daytona 116500LN",
  "variant": "White Panda",
  "year": 2021,
  "conditionGrade": 4,
  "inclusions": ["Box", "Papers"],
  "price": 32500,
  "currency": "USD",
  "confidenceScore": 99.4,
  "ingestedFrom": "Telegram Chat Ingestion"
}
```

---

## 🛠️ 4. Quick-Copy Template Snippets

### Option A: WTS (Want To Sell)
```text
WTS [BRAND] [MODEL]
Ref: [REFERENCE_NUMBER]
Year: [YEAR]
Dial: [DIAL_COLOR/MATERIAL]
Condition: [CONDITION]
Includes: [BOX_PAPERS]
Price: [CURRENCY] [AMOUNT]
```

### Option B: WTB (Want To Buy)
```text
WTB [BRAND] [MODEL]
Ref: [REFERENCE_NUMBER]
Year: [TARGET_YEAR]
Dial: [PREFERRED_VARIANT]
Condition: [REQUIRED_CONDITION]
Includes: [REQUIRED_INCLUSIONS]
Price: [CURRENCY] [TARGET_BUDGET]
```

---
*CuratedLux International • Geneva • New York • Dubai*
