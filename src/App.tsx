/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gem,
  Globe,
  Clock,
  User,
  Camera,
  Image as ImageIcon,
  Mic,
  FileText,
  CheckCircle2,
  X,
  ChevronDown,
  Sparkles,
  Download,
  Check,
  FileSpreadsheet,
  RefreshCw,
  AlertCircle,
  Upload,
  Database,
  Table,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Tag,
  Coins,
  QrCode,
  Scan,
  Save,
  History,
  Trash2,
  Sun,
  Moon,
  MapPin,
  BadgeCheck,
  Search,
  Filter,
  Users,
  Target,
  Briefcase,
  Building2,
  DollarSign,
  Layers,
  MessageSquare,
  PlusCircle,
  Send,
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
  Eye,
  ShieldCheck,
  Heart,
  Printer,
  Share2,
  Copy,
  Maximize2,
  Minimize2,
  Award,
  FileCheck,
  Crown,
  Compass,
  Fingerprint,
  Hexagon,
  Scale,
  MessageSquareCode,
  FileCode,
  Watch,
  Car,
  Gauge,
  Key
} from 'lucide-react';

const MOCK_QR_TAGS = [
  {
    id: "QR-RLX-DAY-116",
    brand: "Rolex",
    category: "Watch",
    model: "Daytona 116500LN",
    estimatedValue: "34500",
    currency: "USD",
    condition: 4, // Mint
    description: "Verified Rolex Oyster Cosmograph Daytona (Oystersteel, 40mm, Black Cerachrom Bezel, White Panda Dial). Original warranty registration matches tag chip serial RLX-DAY-8812.",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "QR-HER-BIR-30",
    brand: "Hermès",
    category: "Handbag",
    model: "Birkin 30 Togo",
    estimatedValue: "22000",
    currency: "USD",
    condition: 3, // Excellent
    description: "Verified Hermès Birkin 30 in Gold Togo leather with gold-plated hardware. Handcrafted in France, matches serial stamping H-30-T-827.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "QR-PAT-NAU-571",
    brand: "Patek Philippe",
    category: "Watch",
    model: "Nautilus 5711/1A",
    estimatedValue: "115000",
    currency: "USD",
    condition: 4, // Mint
    description: "Verified Patek Philippe Nautilus self-winding stainless steel watch. Iconic blue embossed dial with sapphire crystal case back. Matches caliber 324 SC factory specifications.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "QR-CHA-FLAP-25",
    brand: "Chanel",
    category: "Handbag",
    model: "Classic Double Flap",
    estimatedValue: "10200",
    currency: "USD",
    condition: 3, // Excellent
    description: "Verified Chanel Medium Classic Double Flap in Black caviar quilted leather with gold-tone metal hardware. Iconic CC turn-lock and chain-leather shoulder strap.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "QR-FER-SF90-XX",
    brand: "Ferrari",
    category: "Exotic Car / Luxury Vehicle",
    model: "SF90 XX Stradale Fiorano",
    estimatedValue: "980000",
    currency: "USD",
    condition: 4, // Mint
    description: "Verified Ferrari SF90 XX Stradale Assetto Fiorano. Twin-Turbo V12 Hybrid 1016 HP. Certified Maranello production serial FER-SF90-9921.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "QR-POR-GT3RS-992",
    brand: "Porsche",
    category: "Exotic Car / Luxury Vehicle",
    model: "911 GT3 RS Weissach",
    estimatedValue: "465000",
    currency: "USD",
    condition: 4, // Mint
    description: "Verified Porsche 911 GT3 RS (992) with Weissach Lightweight Aero Package & Carbon Magnesium Wheels. Match VIN POR-992-GT3-RS-8820.",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80"
  }
];

const SIMULATED_RESPONSE = {
  brand: "Rolex",
  category: "Watch",
  model: "Submariner 126610LN",
  confidence: 87,
  confidence_breakdown: { brand: 92, model: 88, material: 85, anomaly: 83 },
  materials: ["Oystersteel", "Cerachrom Ceramic"],
  color: "Black",
  condition_estimate: "excellent",
  anomalies_detected: ["Minor hair scratches on case back match authentic wear patterns"],
  recommended_actions: ["Request movement shot for 100% confirmation"],
  reasoning: "Logos, font typography sizing, and alignment metrics map cleanly inside acceptable standard deviations for production year parameters."
};

const CONDITIONS = ["Poor", "Fair", "Good", "Excellent", "Mint"];

const shakeVariants = {
  invalid: {
    x: [0, -6, 6, -6, 6, 0],
    transition: { duration: 0.4 }
  }
};

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    brandName: "CurateLux",
    captureTitle: "Capture Your",
    luxuryItem: "Luxury Item",
    subTitle: "AI-powered identification, authentication & valuation",
    recommended: "GPT-5 Thinking recommended for luxury items. Uses chain-of-thought reasoning. Confidence threshold: 85%",
    tapToCapture: "Tap to Capture",
    takeClearPhoto: "Take a clear photo of your item",
    camera: "Camera",
    gallery: "Gallery",
    voice: "Voice",
    text: "Text",
    aiConfidence: "AI Confidence",
    authenticMatch: "AUTHENTIC MATCH",
    reviewRequired: "REVIEW REQUIRED",
    visualMatch: "Visual Match",
    shapeAnalysis: "Shape Analysis",
    materialScan: "Material Scan",
    anomalyCheck: "Anomaly Check",
    requiredEvidence: "Required Evidence",
    itemDetails: "Item Details",
    reviewVerify: "Review and verify AI extracted metadata.",
    category: "Category",
    brand: "Brand",
    model: "Model / Reference",
    aiReasoning: "AI Reasoning / Description",
    evidencePhotos: "Evidence Photos",
    condition: "Condition",
    estimatedValue: "Estimated Value (Optional)",
    verification: "Verification",
    finalizeLegal: "Finalize your submission legally.",
    termsTitle: "Terms & Agreement",
    terms1: "1. Authenticity Declaration: I certify that the item depicted is in my possession and not a known counterfeit.",
    terms2: "2. AI-Assisted Review: I acknowledge that the initial analysis is AI-generated and subject to expert human validation.",
    terms3: "3. Data Processing: Images and metadata are securely processed for valuation purposes.",
    terms4: "4. Liability: CurateLux holds no liability for preliminary estimations.",
    terms5: "5. Pipeline Review: Final valuation requires physical inspection.",
    agreeTerms: "I agree to the Terms of Service",
    digitalSignature: "Digital Signature",
    signHere: "Sign here with finger or stylus",
    clear: "Clear",
    typeName: "Type Name Instead",
    location: "Location",
    dateTime: "Date & Time",
    deviceId: "Device ID",
    timezone: "Timezone",
    submitted: "Submitted!",
    submittedDesc: "Your luxury item has been entered into the review pipeline.",
    trackingRef: "Tracking Ref",
    initialScore: "Initial Score",
    status: "Status",
    underReview: "Under Review (2-4 hrs)",
    submitAnother: "Submit Another Item",
    photoGuide: "Photo Guide",
    continue: "Continue",
    submitToPipeline: "Submit to Pipeline",
    selectCategory: "Select Category",
    back: "Back",
    cancel: "Cancel"
  },
  zh: {
    brandName: "CurateLux",
    captureTitle: "捕捉您的",
    luxuryItem: "奢华单品",
    subTitle: "AI驱动的识别、鉴定与估值",
    recommended: "推荐使用 GPT-5 Thinking 处理奢华单品。采用思维链推理。置信度阈值：85%",
    tapToCapture: "点击拍摄",
    takeClearPhoto: "请拍摄一张清晰的单品照片",
    camera: "相机",
    gallery: "相册",
    voice: "语音",
    text: "文本",
    aiConfidence: "AI 置信度",
    authenticMatch: "正品匹配",
    reviewRequired: "需要复核",
    visualMatch: "视觉匹配",
    shapeAnalysis: "形状分析",
    materialScan: "材质扫描",
    anomalyCheck: "异常检测",
    requiredEvidence: "所需附加凭证",
    itemDetails: "单品详情",
    reviewVerify: "核对并确认 AI 提取的元数据。",
    category: "类别",
    brand: "品牌",
    model: "型号 / 参考号",
    aiReasoning: "AI 推理 / 描述说明",
    evidencePhotos: "佐证照片",
    condition: "品相状况",
    estimatedValue: "预估价值 (选填)",
    verification: "法律确认",
    finalizeLegal: "完成您提交的法律确认步骤。",
    termsTitle: "条款与协议",
    terms1: "1. 真实性声明：我保证所示单品为本人所有，非已知仿冒品。",
    terms2: "2. AI 辅助审核：我知悉初步分析由 AI 生成，仍需专家人工审核。",
    terms3: "3. 数据处理：图片和元数据将安全处理，仅用于估值目的。",
    terms4: "4. 免责声明：CurateLux 不对初步评估结果承担任何法律责任。",
    terms5: "5. 流程审核：最终估值须经实物检验确认。",
    agreeTerms: "我同意服务条款",
    digitalSignature: "电子签名",
    signHere: "在此处使用手指或手写笔签名",
    clear: "清除",
    typeName: "改用打字输入姓名",
    location: "地点",
    dateTime: "日期与时间",
    deviceId: "设备 ID",
    timezone: "时区",
    submitted: "已成功提交！",
    submittedDesc: "您的奢华单品已进入审核队列。",
    trackingRef: "追踪编号",
    initialScore: "初始评分",
    status: "当前状态",
    underReview: "正在审核 (2-4 小时)",
    submitAnother: "提交另一件单品",
    photoGuide: "拍摄指南",
    continue: "继续",
    submitToPipeline: "提交审核",
    selectCategory: "选择类别",
    back: "返回",
    cancel: "取消"
  },
  ja: {
    brandName: "CurateLux",
    captureTitle: "アイテムを",
    luxuryItem: "撮影する",
    subTitle: "AIによる識別・鑑定・査定評価",
    recommended: "高級品には GPT-5 Thinking の使用を推奨します。思考チェーン推論を使用。信頼度しきい値：85%",
    tapToCapture: "タップして撮影",
    takeClearPhoto: "アイテムの鮮明な写真を撮影してください",
    camera: "カメラ",
    gallery: "ギャラリー",
    voice: "音声入力",
    text: "テキスト",
    aiConfidence: "AI 信頼度",
    authenticMatch: "鑑定一致",
    reviewRequired: "要再確認",
    visualMatch: "視覚一致度",
    shapeAnalysis: "形状解析",
    materialScan: "素材スキャン",
    anomalyCheck: "異常検知",
    requiredEvidence: "必要な追加証拠",
    itemDetails: "アイテム詳細",
    reviewVerify: "AIが抽出したメタデータを確認・検証してください。",
    category: "カテゴリ",
    brand: "ブランド",
    model: "モデル / リファレンス番号",
    aiReasoning: "AI推論 / 説明",
    evidencePhotos: "証拠写真",
    condition: "状態ランク",
    estimatedValue: "予想査定額 (任意)",
    verification: "法的確認",
    finalizeLegal: "提出前に法的な規約に同意してください。",
    termsTitle: "規約と同意事項",
    terms1: "1. 真贋宣言：描写されたアイテムは自身が所有するものであり、偽造品ではないことを保証します。",
    terms2: "2. AIアシストレビュー：初期解析はAIによって生成され、専門家による検証の対象であることを承нокします。",
    terms3: "3. データ処理：画像とメタデータは、査定目的のために安全に処理されます。",
    terms4: "4. 免責事項：CurateLuxは、予備的な見積もりに対して一切の責任を負いません。",
    terms5: "5. パイプラインレビュー：最終的な査定には実物鑑定が必要です。",
    agreeTerms: "利用規約に同意する",
    digitalSignature: "署名",
    signHere: "指またはスタイラスでここに署名してください",
    clear: "クリア",
    typeName: "代わりに名前を入力する",
    location: "位置情報",
    dateTime: "日時",
    deviceId: "デバイス ID",
    timezone: "タイムゾーン",
    submitted: "送信完了！",
    submittedDesc: "アイテムは審査パイプラインに正常に登録されました。",
    trackingRef: "追跡コード",
    initialScore: "初期スコア",
    status: "ステータス",
    underReview: "審査中 (2〜4時間)",
    submitAnother: "別のアイテムを提出する",
    photoGuide: "撮影ガイド",
    continue: "次へ進む",
    submitToPipeline: "申請を送信する",
    selectCategory: "カテゴリを選択",
    back: "戻る",
    cancel: "キャンセル",
    geminiQuestion: "Geminiは、調査写真の査定において公正かつ正確な品質結果を保証しますか？",
    geminiAnswer: "はい！Geminiは極めて高い客観性、公正さ、そして正確性を提供します。高度なマルチモーダル・ビジョンモデルと思考チェーン分析により、製品の質感、シリアル刻印、証明書のOCRデータ、幾何学的形状をクロスリファレンスし、主観的な偏りのない正確な鑑定を行います。さらに、専門家によるリアルタイムの最終審査を組み合わせることで、絶対的な信頼性を確保しています。"
  },
  ru: {
    brandName: "CurateLux",
    captureTitle: "Загрузите",
    luxuryItem: "Люкс-предмет",
    subTitle: "Идентификация, аутентификация и оценка на базе ИИ",
    recommended: "Рекомендуется GPT-5 Thinking для предметов роскоши. Использует цепочку рассуждений. Порог уверенности: 85%",
    tapToCapture: "Нажмите для фото",
    takeClearPhoto: "Сделайте четкое фото вашего предмета",
    camera: "Камера",
    gallery: "Галерея",
    voice: "Голос",
    text: "Текст",
    aiConfidence: "Уверенность ИИ",
    authenticMatch: "ПОДЛИННОСТЬ ПОДТВЕРЖДЕНА",
    reviewRequired: "ТРЕБУЕТСЯ ПРОВЕРКА",
    visualMatch: "Визуальное совпадение",
    shapeAnalysis: "Анализ формы",
    materialScan: "Сканирование материала",
    anomalyCheck: "Проверка на аномалии",
    requiredEvidence: "Необходимые доказательства",
    itemDetails: "Детали предмета",
    reviewVerify: "Проверьте и подтвердите метаданные, извлеченные ИИ.",
    category: "Категория",
    brand: "Бренд",
    model: "Модель / Референс",
    aiReasoning: "Обоснование ИИ / Описание",
    evidencePhotos: "Дополнительные фото",
    condition: "Состояние",
    estimatedValue: "Оценочная стоимость (опционально)",
    verification: "Верификация",
    finalizeLegal: "Юридически подтвердите вашу отправку.",
    termsTitle: "Условия и соглашение",
    terms1: "1. Декларация подлинности: Я подтверждаю, что изображенный предмет находится в моем владении и не является подделкой.",
    terms2: "2. Обзор с помощью ИИ: Я признаю, что первоначальный анализ генерируется ИИ и подлежит проверке экспертом.",
    terms3: "3. Обработка данных: Изображения и метаданные безопасно обрабатываются для целей оценки.",
    terms4: "4. Ответственность: CurateLux не несет ответственности за предварительные оценки.",
    terms5: "5. Проверка в конвейере: Окончательная оценка требует физического осмотра.",
    agreeTerms: "Я согласен с Условиями предоставления услуг",
    digitalSignature: "Цифровая подпись",
    signHere: "Подпишите пальцем или стилусом",
    clear: "Очистить",
    typeName: "Ввести имя текстом",
    location: "Местоположение",
    dateTime: "Дата и время",
    deviceId: "ID устройства",
    timezone: "Часовой пояс",
    submitted: "Отправлено!",
    submittedDesc: "Ваш люкс-предмет отправлен на проверку экспертам.",
    trackingRef: "Код отслеживания",
    initialScore: "Начальный балл",
    status: "Статус",
    underReview: "На проверке (2-4 часа)",
    submitAnother: "Отправить еще один предмет",
    photoGuide: "Руководство по фото",
    continue: "Продолжить",
    submitToPipeline: "Отправить на проверку",
    selectCategory: "Выберите категорию",
    back: "Назад",
    cancel: "Отмена"
  },
  es: {
    brandName: "CurateLux",
    captureTitle: "Capture su",
    luxuryItem: "Artículo de Lujo",
    subTitle: "Identificación, autenticación y valoración impulsadas por IA",
    recommended: "Se recomienda GPT-5 Thinking para artículos de lujo. Utiliza razonamiento de cadena de pensamiento. Umbral de confianza: 85%",
    tapToCapture: "Toque para Capturar",
    takeClearPhoto: "Tome una foto clara de su artículo",
    camera: "Cámara",
    gallery: "Galería",
    voice: "Voz",
    text: "Texto",
    aiConfidence: "Confianza de IA",
    authenticMatch: "COINCIDENCIA AUTÉNTICA",
    reviewRequired: "REVISIÓN REQUERIDA",
    visualMatch: "Coincidencia Visual",
    shapeAnalysis: "Análisis de Forma",
    materialScan: "Escaneo de Material",
    anomalyCheck: "Control de Anomalías",
    requiredEvidence: "Evidencia Requerida",
    itemDetails: "Detalles del Artículo",
    reviewVerify: "Revise y verifique los metadatos extraídos por la IA.",
    category: "Categoría",
    brand: "Marca",
    model: "Modelo / Referencia",
    aiReasoning: "Razonamiento de IA / Descripción",
    evidencePhotos: "Fotos de Evidencia",
    condition: "Estado",
    estimatedValue: "Valor Estimado (Opcional)",
    verification: "Verificación",
    finalizeLegal: "Finalice su envío legalmente.",
    termsTitle: "Términos y Acuerdo",
    terms1: "1. Declaración de autenticidad: Certifico que el artículo representado está en mi posesión y no es una falsificación conocida.",
    terms2: "2. Revisión asistida por IA: Reconozco que el análisis inicial es generado por IA y está sujeto a validación humana experta.",
    terms3: "3. Procesamiento de datos: Las imágenes y los metadatos se procesan de forma segura para fines de valoración.",
    terms4: "4. Responsabilidad: CurateLux no asume responsabilidad alguna por las estimaciones preliminares.",
    terms5: "5. Revisión del canal de producción: La valoración final requiere una inspección física.",
    agreeTerms: "Acepto los Términos de Servicio",
    digitalSignature: "Firma Digital",
    signHere: "Firme aquí con su dedo o lápiz óptico",
    clear: "Limpiar",
    typeName: "Escribir Nombre en su Lugar",
    location: "Ubicación",
    dateTime: "Fecha y Hora",
    deviceId: "ID de Dispositivo",
    timezone: "Zona Horaria",
    submitted: "¡Enviado!",
    submittedDesc: "Su artículo de lujo ha sido ingresado en el canal de revisión.",
    trackingRef: "Ref. de Seguimiento",
    initialScore: "Puntuación Inicial",
    status: "Estado",
    underReview: "En Revisión (2-4 horas)",
    submitAnother: "Enviar Otro Artículo",
    photoGuide: "Guía de Fotos",
    continue: "Continuar",
    submitToPipeline: "Enviar al Canal",
    selectCategory: "Seleccione Categoría",
    back: "Atrás",
    cancel: "Cancelar"
  }
};

const VOICE_PRESETS = [
  {
    id: 1,
    title: "⌚ Rolex Submariner (English)",
    flag: "🇬🇧",
    speech: "I want to register my Rolex Submariner watch. It's reference twelve sixty-six ten, has a black bezel and dial. It's in mint condition, practically brand new. I think it's worth around thirteen thousand five hundred dollars. I have the certificate too.",
    structured: {
      category: "Watch",
      brand: "Rolex",
      model: "Submariner 126610LN",
      condition: 4, // Mint
      estimatedValue: "13500",
      currency: "USD",
      description: "Mint Rolex Submariner 126610LN with black ceramic bezel and black dial, oyster bracelet. Extracted and parsed via voice assistant."
    }
  },
  {
    id: 2,
    title: "👜 Hermès Birkin Bag (Spanish)",
    flag: "🇪🇸",
    speech: "Hola, quiero registrar una bolsa de lujo. Es una Hermès Birkin de tamaño treinta, confeccionada en cuero Epsom de color negro con herrajes dorados. Está en un estado excelente, muy bien cuidada. El valor aproximado de mercado para este modelo es de veintidós mil dólares.",
    structured: {
      category: "Handbag",
      brand: "Hermès",
      model: "Birkin 30 Epsom Gold Hardware",
      condition: 3, // Excellent
      estimatedValue: "22000",
      currency: "USD",
      description: "Bolso Hermès Birkin 30 en cuero Epsom negro con herrajes dorados. Estado excelente. Extraído mediante asistente de voz."
    }
  },
  {
    id: 3,
    title: "💎 Cartier Love Bracelet (English)",
    flag: "🇬🇧",
    speech: "Hello, this is a Cartier Love Bracelet. It's made of eighteen karat yellow gold, size eighteen. It has some light surface hairline scratches, so I'd say the condition is good. The current value is seven thousand two hundred dollars.",
    structured: {
      category: "Jewelry",
      brand: "Cartier",
      model: "Love Bracelet 18k Gold (Size 18)",
      condition: 2, // Good
      estimatedValue: "7200",
      currency: "USD",
      description: "Cartier Love Bracelet in 18k yellow gold, size 18. Good condition with light surface scratches. Extracted from voice assistant."
    }
  },
  {
    id: 4,
    title: "🏎️ Ferrari SF90 XX Hypercar (English)",
    flag: "🏎️",
    speech: "I am submitting my Ferrari SF90 XX Stradale Assetto Fiorano hypercar for valuation. It has a twin-turbo V12 hybrid engine producing one thousand sixteen horsepower, painted in Rosso Corsa with carbon fiber wing and lightweight magnesium wheels. Condition is absolute mint, under two hundred miles. Valued at nine hundred eighty thousand dollars.",
    structured: {
      category: "Exotic Car / Luxury Vehicle",
      brand: "Ferrari",
      model: "SF90 XX Stradale Fiorano",
      condition: 4, // Mint
      estimatedValue: "980000",
      currency: "USD",
      description: "Mint Ferrari SF90 XX Stradale Assetto Fiorano in Rosso Corsa with full carbon aerodynamic package and magnesium wheels. Verified via neural voice parser."
    }
  }
];

const MOCK_CERTIFICATES = [
  {
    id: "cert-rolex",
    name: "Rolex Green Warranty Card",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=300&q=80",
    ocr: {
      brand: "Rolex",
      model: "Submariner 126610LN",
      serial: "X928C301",
      date: "2023-06-12",
      category: "Watch",
      description: "Rolex Oyster Perpetual Submariner Date. Serial Number verified via Genuineness Database. Certification date: June 12, 2023.",
      value: "14500"
    }
  },
  {
    id: "cert-hermes",
    name: "Hermès Paris Invoice/Cert",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80",
    ocr: {
      brand: "Hermès",
      model: "Birkin 30 Epsom",
      serial: "H-2022-8921-A",
      date: "2022-11-04",
      category: "Handbag",
      description: "Hermès Birkin handbag certified with original Epsom leather stampings and matching dust jacket. Invoice reference verified.",
      value: "21000"
    }
  },
  {
    id: "cert-cartier",
    name: "Cartier Certificate of Authenticity",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
    ocr: {
      brand: "Cartier",
      model: "Love Bracelet",
      serial: "CR-7810A-92",
      date: "2024-01-15",
      category: "Jewelry",
      description: "Cartier Love Bracelet certificated gold weight 32g. serial engraving maps perfectly with central registers.",
      value: "7500"
    }
  }
];

const DEMO_ITEMS = [
  {
    id: "demo-rolex",
    name: "Rolex Daytona 116500LN",
    nameEs: "Rolex Daytona 116500LN",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=600&q=80",
    category: "Watch",
    brand: "Rolex",
    model: "Daytona 116500LN",
    condition: 4, // Mint
    estimatedValue: "34,500",
    currency: "USD",
    confidence: 96,
    confidence_breakdown: { brand: 98, model: 95, material: 97, anomaly: 94 },
    reasoning: "Visual hallmarks and bezel ceramic structure match standard catalog specifications for production model ref 116500LN. Dial layout and subdials are perfectly aligned."
  },
  {
    id: "demo-patek",
    name: "Patek Philippe Nautilus",
    nameEs: "Patek Philippe Nautilus",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    category: "Watch",
    brand: "Patek Philippe",
    model: "Nautilus 5711/1A",
    condition: 3, // Excellent
    estimatedValue: "115,000",
    currency: "USD",
    confidence: 94,
    confidence_breakdown: { brand: 96, model: 93, material: 95, anomaly: 92 },
    reasoning: "Embossed dial horizontal lines, integrated bracelet architecture, and bezel shape match authentic caliber 324 SC factory reference."
  },
  {
    id: "demo-chanel",
    name: "Chanel Classic Flap Bag",
    nameEs: "Bolso Chanel Classic Flap",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    category: "Handbag",
    brand: "Chanel",
    model: "Classic Double Flap",
    condition: 3, // Excellent
    estimatedValue: "10,200",
    currency: "USD",
    confidence: 89,
    confidence_breakdown: { brand: 91, model: 88, material: 89, anomaly: 88 },
    reasoning: "Caviar quilted leather stitching count, CC turn-lock metallics, and internal branding align with standard design specs. Handcrafted details validated."
  }
];

const DEFAULT_USER_PROFILE = {
  fullName: "Alexander Vance",
  email: "a.vance@geneva-vaults.ch",
  phone: "+41 22 819 9000",
  userRole: "seller", // 'seller' | 'buyer' | 'appraiser' | 'hybrid'
  location: "Geneva, Switzerland",
  country: "Switzerland",
  vipTier: "Platinum Vault",
  verificationStatus: "Verified KYC Tier 1",
  budgetRange: "$25,000 - $150,000 USD",
  preferredCategories: ["Watch", "Jewelry"],
  preferredBrands: ["Rolex", "Patek Philippe", "Audemars Piguet"],
  contactPreference: "Encrypted Concierge Signal"
};

const DEFAULT_CLIENT_REQUESTS = [
  {
    id: "req-1",
    clientName: "Lord Alistair Sterling",
    clientTitle: "Private Vault Collector",
    vipTier: "Sovereign Circle",
    location: "Geneva, Switzerland",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    lookingForCategory: "Watch",
    lookingForBrand: "Rolex",
    lookingForModel: "Daytona 116500LN",
    maxBudget: 38000,
    currency: "USD",
    preferredCondition: 4, // Mint
    urgency: "Immediate Wire Ready",
    contactPreference: "Encrypted Concierge Signal",
    notes: "Seeking pristine condition white Panda dial with original guarantee card & box.",
    postedDate: "2026-07-24"
  },
  {
    id: "req-2",
    clientName: "Elena Rostova",
    clientTitle: "Horology Portfolio Manager",
    vipTier: "Platinum Vault",
    location: "Monaco",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    lookingForCategory: "Watch",
    lookingForBrand: "Patek Philippe",
    lookingForModel: "Nautilus 5711/1A",
    maxBudget: 125000,
    currency: "USD",
    preferredCondition: 3, // Excellent
    urgency: "Active Escrow",
    contactPreference: "Private Escrow Desk",
    notes: "Looking for blue dial factory calibration. Willing to fly to Zurich or Geneva for direct vault transfer.",
    postedDate: "2026-07-22"
  },
  {
    id: "req-3",
    clientName: "Carlos Mendoza",
    clientTitle: "Luxury Accessories Collector",
    vipTier: "Gold VIP",
    location: "Madrid, Spain",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    lookingForCategory: "Handbag",
    lookingForBrand: "Chanel",
    lookingForModel: "Classic Double Flap",
    maxBudget: 11500,
    currency: "USD",
    preferredCondition: 3, // Very Good
    urgency: "30-Day Window",
    contactPreference: "Verified Email",
    notes: "Prefer black caviar leather with gold hardware and original serial authenticity hologram intact.",
    postedDate: "2026-07-20"
  },
  {
    id: "req-4",
    clientName: "Dr. Marcus Vance",
    clientTitle: "Horological Society Member",
    vipTier: "Platinum Vault",
    location: "New York, USA",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    lookingForCategory: "Watch",
    lookingForBrand: "Audemars Piguet",
    lookingForModel: "Royal Oak 15500ST",
    maxBudget: 48000,
    currency: "USD",
    preferredCondition: 4, // Mint
    urgency: "Immediate Wire Ready",
    contactPreference: "Encrypted Concierge Signal",
    notes: "Stainless steel 41mm blue or slate dial. Full set required.",
    postedDate: "2026-07-18"
  }
];

function calculateMatchScore(item: any, clientReq: any): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const itemCategory = (item.formData?.category || "").toLowerCase();
  const reqCategory = (clientReq.lookingForCategory || "").toLowerCase();
  if (itemCategory && reqCategory && itemCategory === reqCategory) {
    score += 20;
    reasons.push("Category Alignment");
  }

  const itemBrand = (item.formData?.brand || "").toLowerCase();
  const reqBrand = (clientReq.lookingForBrand || "").toLowerCase();
  if (itemBrand && reqBrand && (itemBrand.includes(reqBrand) || reqBrand.includes(itemBrand))) {
    score += 35;
    reasons.push(`Brand Match (${item.formData?.brand || clientReq.lookingForBrand})`);
  }

  const itemModel = (item.formData?.model || "").toLowerCase();
  const reqModel = (clientReq.lookingForModel || "").toLowerCase();
  if (itemModel && reqModel && (itemModel.includes(reqModel) || reqModel.includes(itemModel))) {
    score += 25;
    reasons.push("Model Specification Match");
  } else if (itemModel && reqModel) {
    const itemTokens = itemModel.split(/[\s/\-_]+/);
    const reqTokens = reqModel.split(/[\s/\-_]+/);
    const common = itemTokens.filter((t: string) => t.length > 2 && reqTokens.includes(t));
    if (common.length > 0) {
      score += 15;
      reasons.push(`Partial Ref Match (${common.join(", ")})`);
    }
  }

  const estVal = parseFloat(String(item.formData?.estimatedValue || "0").replace(/[^0-9.]/g, ""));
  if (estVal > 0 && clientReq.maxBudget > 0) {
    if (estVal <= clientReq.maxBudget) {
      score += 15;
      reasons.push(`Within Client Target Budget ($${clientReq.maxBudget.toLocaleString()})`);
    } else if (estVal <= clientReq.maxBudget * 1.15) {
      score += 8;
      reasons.push(`Close Target Margin (+15% budget margin)`);
    }
  }

  if ((item.formData?.condition || 0) >= (clientReq.preferredCondition || 1)) {
    score += 5;
    reasons.push("Condition Grade Accepted");
  }

  return { score: Math.min(score, 99), reasons };
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(1);
  const [isPhotoGuideOpen, setIsPhotoGuideOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem("luxury_appraisal_theme");
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("luxury_appraisal_theme", theme);
    } catch (e) {
      console.error("Failed to save theme:", e);
    }
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setPremiumToast({
      message: lang === 'es'
        ? `Modo ${nextTheme === 'light' ? 'claro de alto contraste' : 'oscuro'} activado`
        : `Switched to ${nextTheme === 'light' ? 'high-contrast light mode' : 'luxury dark mode'}`,
      type: "gold"
    });
  };

  // User Demographics & Profile State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("luxury_appraisal_user_profile");
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch (e) {
      return DEFAULT_USER_PROFILE;
    }
  });

  const saveUserProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem("luxury_appraisal_user_profile", JSON.stringify(updatedProfile));
      setPremiumToast({
        message: lang === 'es' ? "Perfil demográfico de usuario actualizado" : "User demographic profile saved",
        type: "gold"
      });
    } catch (e) {
      console.error("Failed to save profile:", e);
    }
  };

  // Client Demand / Want-To-Buy Requests State
  const [clientRequests, setClientRequests] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("luxury_appraisal_client_requests");
      return saved ? JSON.parse(saved) : DEFAULT_CLIENT_REQUESTS;
    } catch (e) {
      return DEFAULT_CLIENT_REQUESTS;
    }
  });

  const saveClientRequests = (updatedRequests: any[]) => {
    setClientRequests(updatedRequests);
    try {
      localStorage.setItem("luxury_appraisal_client_requests", JSON.stringify(updatedRequests));
    } catch (e) {
      console.error("Failed to save client requests:", e);
    }
  };

  // Inventory Library & Matchmaking States
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryTab, setLibraryTab] = useState<'history' | 'matches' | 'new_request' | 'profile' | 'curatedlux_ops' | 'whatsapp_telegram'>('history');
  const [postingFilter, setPostingFilter] = useState<'all' | 'active_listing' | 'appraised_only' | 'matched_with_buyer'>('all');
  const [selectedLibraryItemId, setSelectedLibraryItemId] = useState<string | null>(null);
  const [selectedMatchRequestId, setSelectedMatchRequestId] = useState<string | null>(null);

  // Natural Language Chat Ingestion & Parser States
  const [chatInputText, setChatInputText] = useState(`WTS Rolex Daytona
Ref: 116500LN
Year: 2021
Dial: White Panda
Condition: Mint
Includes: Box & Papers
Price: USD 32,500`);
  const [parsedChatResult, setParsedChatResult] = useState<any>(null);
  const [isParsingChat, setIsParsingChat] = useState(false);

  const handleParseChatMessage = (textToParse?: string) => {
    const text = textToParse || chatInputText;
    setIsParsingChat(true);
    setTimeout(() => {
      const isWts = /WTS|FS|FOR SALE/i.test(text);
      const isWtb = /WTB|ISO|IN SEARCH OF/i.test(text);
      const action = isWtb ? 'WTB' : 'WTS';
      
      let brand = "Rolex";
      if (/Patek/i.test(text)) brand = "Patek Philippe";
      else if (/Audemars|AP/i.test(text)) brand = "Audemars Piguet";
      else if (/Richard Mille|RM/i.test(text)) brand = "Richard Mille";
      else if (/Cartier/i.test(text)) brand = "Cartier";
      else if (/Omega/i.test(text)) brand = "Omega";
      
      const refMatch = text.match(/Ref:\s*([A-Za-z0-9\-]+)/i) || text.match(/Reference:\s*([A-Za-z0-9\-]+)/i);
      const ref = refMatch ? refMatch[1] : (brand === 'Richard Mille' ? 'RM35-02' : '116500LN');
      
      const yearMatch = text.match(/Year:\s*(\d{4})/i) || text.match(/\b(20\d{2}|19\d{2})\b/);
      const year = yearMatch ? parseInt(yearMatch[1]) : 2021;
      
      const dialMatch = text.match(/Dial:\s*([^\n]+)/i);
      const dial = dialMatch ? dialMatch[1].trim() : (brand === 'Richard Mille' ? 'NTPT Black Carbon' : 'White Panda');
      
      const condMatch = text.match(/Condition:\s*([^\n]+)/i);
      const conditionStr = condMatch ? condMatch[1].trim() : "Mint / Unworn";
      
      const priceMatch = text.match(/Price:\s*([A-Z]{3})?\s*\$?([0-9,]+)/i);
      const currency = priceMatch && priceMatch[1] ? priceMatch[1].toUpperCase() : (text.includes('HKD') ? 'HKD' : 'USD');
      const priceVal = priceMatch ? parseInt(priceMatch[2].replace(/,/g, '')) : (currency === 'HKD' ? 2400000 : 32500);

      setParsedChatResult({
        action,
        brand,
        model: `${brand === 'Rolex' ? 'Daytona' : brand === 'Richard Mille' ? 'RM35 Automatic' : 'Luxury Model'} ${ref}`,
        reference: ref,
        year,
        dial,
        condition: conditionStr,
        inclusions: ["Box", "Papers"],
        price: priceVal,
        currency,
        confidenceScore: 99.4,
        rawText: text
      });
      setIsParsingChat(false);
    }, 350);
  };

  // Expanded Full-Screen Dossier View States
  const [isDossierExpanded, setIsDossierExpanded] = useState(false);
  const [expandedDossierItemData, setExpandedDossierItemData] = useState<any | null>(null);
  const [dossierPrintTheme, setDossierPrintTheme] = useState<'luxury_dark' | 'paper_white'>('luxury_dark');
  const [isExportSettingsOpen, setIsExportSettingsOpen] = useState(false);
  const [dossierExportConfig, setDossierExportConfig] = useState({
    showValuation: true,
    showCondition: true,
    showNeuralBreakdown: true,
    showDeviceMetadata: true,
    showWarrantyCert: true,
    showSignatureBlock: true,
    showQRHash: true,
    customNotes: '',
  });

  const openExpandedDossier = (item?: any) => {
    if (item) {
      setExpandedDossierItemData(item);
    } else if (selectedLibraryItem) {
      setExpandedDossierItemData(selectedLibraryItem);
    } else {
      setExpandedDossierItemData({
        id: `dossier-current-${Date.now()}`,
        trackingRef: `${metadata.deviceId || 'DEV'}-7892`,
        timestamp: new Date().toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        formData: { ...formData },
        imageSrc: imageSrc,
        confidenceScore: confidenceScore || 88,
        confidenceBreakdown: { ...confidenceBreakdown },
        scannedCert: scannedCert ? { ...scannedCert } : null,
        deviceMetadata: { ...metadata },
        postingStatus: 'active_listing',
        askingPrice: formData.estimatedValue || '0',
        sellerProfile: { ...userProfile }
      });
    }
    setIsDossierExpanded(true);
  };

  // New Client Want-To-Buy Request Form
  const [newReqForm, setNewReqForm] = useState({
    lookingForCategory: "Watch",
    lookingForBrand: "",
    lookingForModel: "",
    maxBudget: "",
    preferredCondition: 4,
    urgency: "Immediate Wire Ready",
    contactPreference: "Encrypted Concierge Signal",
    notes: ""
  });

  const handleCreateClientRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqForm.lookingForBrand || !newReqForm.lookingForModel || !newReqForm.maxBudget) {
      alert(lang === 'es' ? "Por favor complete la marca, modelo y presupuesto objetivo." : "Please specify brand, model reference, and target budget.");
      return;
    }

    const newReq = {
      id: `req-${Date.now()}`,
      clientName: userProfile.fullName || "Anonymous Collector",
      clientTitle: `${userProfile.vipTier || "Verified"} ${userProfile.userRole === 'buyer' ? 'Buyer' : 'Collector'}`,
      vipTier: userProfile.vipTier || "Platinum Vault",
      location: userProfile.location || "Geneva, Switzerland",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      lookingForCategory: newReqForm.lookingForCategory,
      lookingForBrand: newReqForm.lookingForBrand,
      lookingForModel: newReqForm.lookingForModel,
      maxBudget: parseFloat(newReqForm.maxBudget.toString()) || 0,
      currency: "USD",
      preferredCondition: newReqForm.preferredCondition,
      urgency: newReqForm.urgency,
      contactPreference: newReqForm.contactPreference || userProfile.contactPreference,
      notes: newReqForm.notes || "High-intent buyer seeking authenticated piece with provenance.",
      postedDate: new Date().toISOString().split('T')[0]
    };

    const updated = [newReq, ...clientRequests];
    saveClientRequests(updated);

    setNewReqForm({
      lookingForCategory: "Watch",
      lookingForBrand: "",
      lookingForModel: "",
      maxBudget: "",
      preferredCondition: 4,
      urgency: "Immediate Wire Ready",
      contactPreference: "Encrypted Concierge Signal",
      notes: ""
    });

    setLibraryTab('matches');
    setPremiumToast({
      message: lang === 'es' 
        ? `Solicitud de compra creada para ${newReq.lookingForBrand} ${newReq.lookingForModel}` 
        : `Want-To-Buy request active for ${newReq.lookingForBrand} ${newReq.lookingForModel}!`,
      type: "gold"
    });
  };

  const [inventory, setInventory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("luxury_appraisal_inventory");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load inventory:", e);
      return [];
    }
  });

  const selectedLibraryItem = inventory.find(item => item.id === selectedLibraryItemId);

  const loadLibraryItem = (item: any) => {
    setImageSrc(item.imageSrc);
    setViewfinderState("loaded");
    setShowConfidence(true);
    setConfidenceScore(item.confidenceScore);
    setConfidenceBreakdown(item.confidenceBreakdown || { brand: 92, model: 88, material: 85, anomaly: 83 });
    setFormData(item.formData);
    setScannedCert(item.scannedCert);
    setSelectedLibraryItemId(item.id);
    
    // Auto fill form's validation touched states so they look complete
    const touched: Record<string, boolean> = {};
    Object.keys(item.formData).forEach(key => {
      touched[key] = true;
    });
    setTouchedFields(touched);
    
    setStep(4); // Immediately show the completed receipt / success screen
    setIsLibraryOpen(false);
    
    setPremiumToast({
      message: lang === 'es'
        ? `Mostrando expediente de ${item.formData.brand} de la biblioteca`
        : `Viewing archived dossier for ${item.formData.brand} ${item.formData.model}`,
      type: "gold"
    });
  };

  const deleteLibraryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent loading it
    try {
      const updated = inventory.filter(item => item.id !== id);
      setInventory(updated);
      localStorage.setItem("luxury_appraisal_inventory", JSON.stringify(updated));
      if (selectedLibraryItemId === id) {
        setSelectedLibraryItemId(null);
        resetFlow();
      }
      setPremiumToast({
        message: lang === 'es' ? "Elemento eliminado de la biblioteca" : "Item removed from inventory library",
        type: "gold"
      });
    } catch (e) {
      console.error("Failed to delete library item:", e);
    }
  };

  // Translation Helper
  const t = (key: string) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
  };

  // Step 1 State
  const [selectedModel, setSelectedModel] = useState("GPT-5 Thinking (9/10)");
  const [viewfinderState, setViewfinderState] = useState<"empty" | "analyzing" | "loaded">("empty");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showConfidence, setShowConfidence] = useState(false);
  const [scanText, setScanText] = useState("AI ANALYZING...");
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [confidenceBreakdown, setConfidenceBreakdown] = useState({ brand: 92, model: 88, material: 85, anomaly: 83 });

  // Step 2 State
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("luxury_appraisal_form_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.formData) {
          return parsed.formData;
        }
      }
    } catch (e) {
      console.error("Failed to load initial draft:", e);
    }
    return {
      category: "",
      brand: "",
      model: "",
      description: "",
      condition: 3, // 0-4 mapping to CONDITIONS
      estimatedValue: "",
      currency: "USD",
    };
  });
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // Premium OCR & Voice & Toast States
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [ocrScanningState, setOcrScanningState] = useState<"idle" | "scanning" | "completed">("idle");
  const [scannedCert, setScannedCert] = useState<typeof MOCK_CERTIFICATES[number] | null>(null);
  const [ocrScanStepText, setOcrScanStepText] = useState("");
  const [highlightedFields, setHighlightedFields] = useState<Record<string, boolean>>({});
  const [ocrActiveCertId, setOcrActiveCertId] = useState<string | null>(null);

  // QR Scanner States
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrScanningState, setQrScanningState] = useState<"idle" | "scanning" | "completed">("idle");
  const [qrActiveTagId, setQrActiveTagId] = useState<string | null>(null);
  const [qrScanStepText, setQrScanStepText] = useState("");

  const [prevCurrency, setPrevCurrency] = useState("USD");

  // Real-time validation states and handler
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Draft Autosave States
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  // Sync draft information and set touched states on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("luxury_appraisal_form_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.formData) {
          setLastSavedTime(parsed.timestamp || null);
          setHasSavedDraft(true);
          
          // Mark fields that have saved data as touched
          const touched: Record<string, boolean> = {};
          Object.keys(parsed.formData).forEach(key => {
            if (parsed.formData[key as keyof typeof parsed.formData]) {
              touched[key] = true;
            }
          });
          setTouchedFields(touched);
        }
      }
    } catch (e) {
      console.error("Failed to restore draft details on mount:", e);
    }
  }, []);

  // Autosave formData every 30 seconds if any data exists
  useEffect(() => {
    const timer = setInterval(() => {
      const hasContent = formData.brand.trim() !== "" || 
                        formData.model.trim() !== "" || 
                        formData.category !== "" || 
                        formData.description.trim() !== "" || 
                        formData.estimatedValue.trim() !== "";
      
      if (hasContent) {
        setIsDraftSaving(true);
        setTimeout(() => {
          try {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const payload = {
              formData,
              timestamp: timeStr
            };
            localStorage.setItem("luxury_appraisal_form_draft", JSON.stringify(payload));
            setLastSavedTime(timeStr);
            setHasSavedDraft(true);
          } catch (e) {
            console.error("Failed to autosave form draft:", e);
          } finally {
            setIsDraftSaving(false);
          }
        }, 800);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [formData]);

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem("luxury_appraisal_form_draft");
      setFormData({
        category: "",
        brand: "",
        model: "",
        description: "",
        condition: 3,
        estimatedValue: "",
        currency: "USD",
      });
      setErrors({});
      setTouchedFields({});
      setLastSavedTime(null);
      setHasSavedDraft(false);
      setPremiumToast({
        message: lang === 'es' ? "Borrador descartado" : "Draft discarded",
        type: "gold"
      });
    } catch (e) {
      console.error("Failed to discard draft:", e);
    }
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === "category") {
      if (!value) {
        errorMsg = lang === 'es' ? "Debe seleccionar una categoría" : "Category must be selected";
      }
    } else if (name === "brand") {
      if (!value.trim()) {
        errorMsg = lang === 'es' ? "El nombre de la marca no puede estar vacío" : "Brand name cannot be empty";
      }
    } else if (name === "model") {
      if (!value.trim()) {
        errorMsg = lang === 'es' ? "El nombre del modelo no puede estar vacío" : "Model name cannot be empty";
      }
    } else if (name === "estimatedValue") {
      if (!value.trim()) {
        errorMsg = lang === 'es' ? "El valor estimado no puede estar vacío" : "Estimated value cannot be empty";
      } else {
        const cleanVal = value.replace(/,/g, '');
        if (isNaN(Number(cleanVal)) || Number(cleanVal) <= 0) {
          errorMsg = lang === 'es' ? "Formato de moneda inválido" : "Invalid currency format";
        }
      }
    }
    return errorMsg;
  };

  // Keep errors in sync in real-time as formData or lang updates
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ["category", "brand", "model", "estimatedValue"];
    fieldsToValidate.forEach(field => {
      const err = validateField(field, String(formData[field as keyof typeof formData] || ""));
      if (err) {
        newErrors[field] = err;
      }
    });
    setErrors(newErrors);
  }, [formData, lang]);

  const [voiceStep, setVoiceStep] = useState<"idle" | "listening" | "transcribing" | "structuring" | "ready">("idle");
  const [voiceSelectedPresetId, setVoiceSelectedPresetId] = useState<number | null>(null);
  const [voiceSpokenTranscript, setVoiceSpokenTranscript] = useState("");
  const [voiceStructuredPreview, setVoiceStructuredPreview] = useState<any>(null);
  const [premiumToast, setPremiumToast] = useState<{ message: string; type: "success" | "info" | "gold" } | null>(null);

  // Pre-fill questionnaire based on expected question selected
  const prefillSample = (questionId: number) => {
    setActiveQuestionId(questionId);
    if (questionId === 1) {
      setFormData(prev => ({
        ...prev,
        category: "Watch",
        brand: "Rolex",
        model: "Submariner 126610LN",
      }));
      setTouchedFields(prev => ({ ...prev, brand: true, model: true, category: true }));
      setHighlightedFields({ brand: true, model: true, category: true });
      setPremiumToast({ message: "Auto-filled Q1 (Brand & Model) with catalog details!", type: "gold" });
    } else if (questionId === 2) {
      setFormData(prev => ({
        ...prev,
        condition: 3, // Excellent
        description: (prev.description ? prev.description + "\n" : "") + "Physical Condition: Excellent. dial & bezel are pristine. Movement runs within COSC specs (+2s/d). Minor wear marks on case back.",
      }));
      setHighlightedFields({ description: true, condition: true });
      setPremiumToast({ message: "Auto-filled Q2 (Physical Condition) wear details!", type: "gold" });
    } else if (questionId === 3) {
      setFormData(prev => ({
        ...prev,
        description: (prev.description ? prev.description + "\n" : "") + "Certificates & Authenticity: Includes original Rolex inner/outer green boxes, official certified warranty card #K19028, and manual booklets.",
      }));
      setHighlightedFields({ description: true });
      setPremiumToast({ message: "Auto-filled Q3 (Certificates & Papers) records!", type: "gold" });
    } else if (questionId === 4) {
      setFormData(prev => ({
        ...prev,
        estimatedValue: "12500",
        currency: "USD",
      }));
      setTouchedFields(prev => ({ ...prev, estimatedValue: true }));
      setHighlightedFields({ estimatedValue: true });
      setPremiumToast({ message: "Auto-filled Q4 (Market Value) suggestion!", type: "gold" });
    }

    // Clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedFields({});
    }, 3000);
  };

  // Step 3 State
  const [agreed, setAgreed] = useState(false);
  const signatureRef = useRef<HTMLCanvasElement>(null);
  const [metadata, setMetadata] = useState({
    location: "Miami, FL",
    time: "",
    deviceId: "LV-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageSrc(url);
      setViewfinderState("analyzing");
      setShowConfidence(false);
      
      const scanTexts = ["AI ANALYZING...", "EVALUATING BRAND LOGO...", "EXAMINING MATERIAL FINISH..."];
      let textIndex = 0;
      const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % scanTexts.length;
        setScanText(scanTexts[textIndex]);
      }, 800);

      setTimeout(() => {
        clearInterval(textInterval);
        setViewfinderState("loaded");
        setShowConfidence(true);
        setConfidenceBreakdown(SIMULATED_RESPONSE.confidence_breakdown);
        
        // Animate score
        let currentScore = 0;
        const scoreInterval = setInterval(() => {
          currentScore += 2;
          if (currentScore >= SIMULATED_RESPONSE.confidence) {
            currentScore = SIMULATED_RESPONSE.confidence;
            clearInterval(scoreInterval);
          }
          setConfidenceScore(currentScore);
        }, 20);

        // Pre-fill form
        setFormData(prev => ({
          ...prev,
          category: SIMULATED_RESPONSE.category,
          brand: SIMULATED_RESPONSE.brand,
          model: SIMULATED_RESPONSE.model,
          description: SIMULATED_RESPONSE.reasoning,
        }));
        
      }, 2500);
    }
  };

  // Demo Item Simulation Handler
  const triggerDemoItemScan = (item: typeof DEMO_ITEMS[0]) => {
    setImageSrc(item.image);
    setViewfinderState("analyzing");
    setShowConfidence(false);
    
    const scanTexts = ["AI ANALYZING...", "EVALUATING BRAND LOGO...", "EXAMINING MATERIAL FINISH..."];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % scanTexts.length;
      setScanText(scanTexts[textIndex]);
    }, 600);

    setTimeout(() => {
      clearInterval(textInterval);
      setViewfinderState("loaded");
      setShowConfidence(true);
      setConfidenceBreakdown(item.confidence_breakdown);
      
      // Animate score
      let currentScore = 0;
      const scoreInterval = setInterval(() => {
        currentScore += 2;
        if (currentScore >= item.confidence) {
          currentScore = item.confidence;
          clearInterval(scoreInterval);
        }
        setConfidenceScore(currentScore);
      }, 15);

      // Pre-fill form with specific demo specs
      setFormData(prev => ({
        ...prev,
        category: item.category,
        brand: item.brand,
        model: item.model,
        condition: item.condition,
        estimatedValue: item.estimatedValue,
        currency: item.currency,
        description: item.reasoning + `\n\n[Auto-extracted via Certified Interactive Demo scan | Simulated confidence: ${item.confidence}%]`,
      }));

      setTouchedFields(prev => ({
        ...prev,
        category: true,
        brand: true,
        model: true,
        estimatedValue: true
      }));

      // Highlight all structured fields for high visual reward
      setHighlightedFields({
        category: true,
        brand: true,
        model: true,
        estimatedValue: true,
        description: true
      });

      // Clear highlights after 4s
      setTimeout(() => {
        setHighlightedFields({});
      }, 4000);

      setPremiumToast({
        message: lang === 'es'
          ? `¡Demo escaneado! Datos de ${item.brand} ${item.model} importados.`
          : `Demo item scanned! Loaded authentic specs for ${item.brand} ${item.model}.`,
        type: "gold"
      });
      
    }, 2000);
  };

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setMetadata(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString()
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Voice recorder timer
  useEffect(() => {
    let timer: any;
    if (showVoiceRecorder && voiceStep === "listening") {
      timer = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [showVoiceRecorder, voiceStep]);

  // Toast self-clearing timer
  useEffect(() => {
    if (premiumToast) {
      const timer = setTimeout(() => setPremiumToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [premiumToast]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Premium OCR Handler
  const triggerOcrScan = (certId: string) => {
    const cert = MOCK_CERTIFICATES.find(c => c.id === certId);
    if (!cert) return;

    setOcrActiveCertId(certId);
    setOcrScanningState("scanning");
    setOcrScanStepText("📄 READING CERTIFICATE LAYOUT...");

    setTimeout(() => {
      setOcrScanStepText("🔍 RECOGNIZING TYPOGRAPHY & SERIAL STAMPINGS...");
    }, 450);

    setTimeout(() => {
      setOcrScanStepText("⚡ CROSS-REFERENCING MANUFACTURER REGISTRY...");
    }, 900);

    setTimeout(() => {
      setOcrScanStepText("✨ VERIFYING PHYSICAL HALLMARKS AND SIGNATURE...");
    }, 1300);

    setTimeout(() => {
      setOcrScanningState("completed");
      setScannedCert(cert);
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        brand: cert.ocr.brand,
        model: cert.ocr.model,
        category: cert.ocr.category,
        estimatedValue: cert.ocr.value,
        description: cert.ocr.description + `\n\n[Auto-extracted via Certified OCR Scan | Serial: ${cert.ocr.serial} | Verification Date: ${cert.ocr.date}]`
      }));

      setTouchedFields(prev => ({
        ...prev,
        brand: true,
        model: true,
        category: true,
        estimatedValue: true
      }));

      // Highlight fields for high visual reward
      setHighlightedFields({
        brand: true,
        model: true,
        category: true,
        estimatedValue: true,
        description: true
      });

      // Clear highlights after 4s
      setTimeout(() => {
        setHighlightedFields({});
      }, 4000);

      setIsOcrModalOpen(false);
      setPremiumToast({
        message: lang === 'es' 
          ? `¡Certificado leído con éxito! Se extrajeron los datos de ${cert.ocr.brand} ${cert.ocr.model}.` 
          : `Certificate read successfully! Extracted ${cert.ocr.brand} ${cert.ocr.model}.`,
        type: "gold"
      });
    }, 1800);
  };

  // QR Tag Scan Handler
  const triggerQrScan = (tagId: string) => {
    const tag = MOCK_QR_TAGS.find(t => t.id === tagId);
    if (!tag) return;

    setQrActiveTagId(tagId);
    setQrScanningState("scanning");
    setQrScanStepText(lang === 'es' ? "📷 CONECTANDO A LA CÁMARA DE ALTA RESOLUCIÓN..." : "📷 CONNECTING TO SECURE HIGH-RESOLUTION CAMERA...");

    setTimeout(() => {
      setQrScanStepText(lang === 'es' ? "🔍 DETECTANDO Y ENFOCANDO CÓDIGO QR..." : "🔍 ROTATING AUTOFOCUS & DETECTING HIGHLIGHTS...");
    }, 400);

    setTimeout(() => {
      setQrScanStepText(lang === 'es' ? "⚡ ADQUIRIENDO IDENTIFICACIÓN DE CHIP SEGURO..." : "⚡ ACQUIRING HARDWARE SECURE TAG ID...");
    }, 800);

    setTimeout(() => {
      setQrScanStepText(lang === 'es' ? "💎 DECODIFICANDO FIRMA CRIPTOGRÁFICA..." : "💎 CRYPTOGRAPHIC SIGNATURE DECODING OK...");
    }, 1200);

    setTimeout(() => {
      setQrScanningState("completed");
      setImageSrc(tag.image);
      setViewfinderState("loaded");
      setShowConfidence(true);
      setConfidenceScore(99); // Cryptographic matches yield near perfect score!

      // Update form data with QR tag details
      setFormData(prev => ({
        ...prev,
        brand: tag.brand,
        model: tag.model,
        category: tag.category,
        estimatedValue: tag.estimatedValue,
        currency: tag.currency,
        description: tag.description + `\n\n[Auto-extracted via Cryptographic physical item QR tag | Secure Chip ID: ${tag.id}]`
      }));

      setTouchedFields(prev => ({
        ...prev,
        brand: true,
        model: true,
        category: true,
        estimatedValue: true
      }));

      setPrevCurrency(tag.currency);

      // Highlight fields for high visual reward
      setHighlightedFields({
        brand: true,
        model: true,
        category: true,
        estimatedValue: true,
        description: true
      });

      // Clear highlights after 4s
      setTimeout(() => {
        setHighlightedFields({});
      }, 4000);

      setIsQrModalOpen(false);
      setStep(2); // Automatically advance to Step 2
      setPremiumToast({
        message: lang === 'es'
          ? `¡Etiqueta QR escaneada! Se importaron los detalles de ${tag.brand} ${tag.model}.`
          : `QR Tag scanned! Imported details for ${tag.brand} ${tag.model}.`,
        type: "gold"
      });
    }, 1600);
  };

  // Currency conversion tool with mock rate fetcher
  const handleCurrencyChange = (newCurrency: string) => {
    const rawVal = formData.estimatedValue.replace(/,/g, '');
    const numericVal = parseFloat(rawVal);
    
    if (!isNaN(numericVal) && numericVal > 0) {
      // Mock exchange rates relative to USD
      const rates: Record<string, number> = {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.78,
        CHF: 0.89,
        HKD: 7.8,
        JPY: 155.0
      };
      
      const fromRate = rates[prevCurrency] || 1.0;
      const toRate = rates[newCurrency] || 1.0;
      
      // Conversion math
      const valueInUSD = numericVal / fromRate;
      const converted = valueInUSD * toRate;
      
      // Format number nicely
      const formatted = Math.round(converted).toLocaleString();
      
      setFormData(prev => ({
        ...prev,
        currency: newCurrency,
        estimatedValue: formatted
      }));
      
      const conversionRate = toRate / fromRate;
      setPremiumToast({
        message: lang === 'es'
          ? `Convertido a ${newCurrency}. Tasa: 1 ${prevCurrency} = ${conversionRate.toFixed(4)} ${newCurrency}`
          : `Converted to ${newCurrency}. Rate: 1 ${prevCurrency} = ${conversionRate.toFixed(4)} ${newCurrency}`,
        type: "gold"
      });
    } else {
      setFormData(prev => ({
        ...prev,
        currency: newCurrency
      }));
    }
    setPrevCurrency(newCurrency);
  };

  // Custom user file upload simulation for OCR
  const handleCustomCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Simulate scanning of custom certificate using Rolex card details as fallback
      const mockCustomCertId = "cert-rolex";
      triggerOcrScan(mockCustomCertId);
    }
  };

  // Live Camera Stream States
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Real Web Speech API & Microphone States
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [micVolumeLevel, setMicVolumeLevel] = useState(0);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const micMediaStreamRef = useRef<MediaStream | null>(null);

  // Stop camera stream on unmount or manual stop
  const stopLiveCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
    }
    setIsLiveCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopLiveCamera();
      stopRealVoiceDictation();
    };
  }, []);

  // Start live camera stream (cellphone environment camera or webcam)
  const startLiveCamera = async (facing: 'environment' | 'user' = cameraFacingMode) => {
    setCameraError(null);
    stopLiveCamera();
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(lang === 'es' ? "Cámara no soportada en este navegador" : "Camera API not supported in this browser");
      }
      
      const constraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error("Error playing video:", e));
      }
      setCameraFacingMode(facing);
      setIsLiveCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(
        lang === 'es'
          ? "No se pudo acceder a la cámara del celular. Puede usar la selección de imagen directa."
          : "Could not access device camera. Please check permissions or use image file picker."
      );
      setIsLiveCameraActive(false);
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
      }, 300);
    }
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacingMode === 'environment' ? 'user' : 'environment';
    startLiveCamera(nextFacing);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = cameraCanvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        stopLiveCamera();
        triggerImageAnalysis(dataUrl);
      }
    } catch (e) {
      console.error("Error capturing camera photo:", e);
    }
  };

  const triggerImageAnalysis = async (url: string) => {
    setImageSrc(url);
    setViewfinderState("analyzing");
    setShowConfidence(false);
    
    const scanTexts = lang === 'es' 
      ? ["ANALIZANDO CON IA DE TAGMYWATCH...", "EVALUANDO LOGO CON VISION API...", "EXAMINANDO CATALOGO DE EDICIONES DE LUJO..."]
      : ["TAGMYWATCH AI ANALYZING...", "EVALUATING BRAND LOGO WITH VISION API...", "EXAMINING EDITORIAL WATCH DATASET..."];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % scanTexts.length;
      setScanText(scanTexts[textIndex]);
    }, 700);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: url })
      });

      const data = await response.json();
      clearInterval(textInterval);

      if (data && data.brand) {
        setViewfinderState("loaded");
        setShowConfidence(true);
        if (data.confidence_breakdown) {
          setConfidenceBreakdown(data.confidence_breakdown);
        }
        
        const finalScore = data.confidence || 95;
        let currentScore = 0;
        const scoreInterval = setInterval(() => {
          currentScore += 2;
          if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(scoreInterval);
          }
          setConfidenceScore(currentScore);
        }, 20);

        setFormData(prev => ({
          ...prev,
          category: data.category || prev.category,
          brand: data.brand || prev.brand,
          model: data.model || prev.model,
          description: data.reasoning || prev.description,
          estimatedValue: data.estimatedValue ? String(data.estimatedValue) : prev.estimatedValue
        }));

        setPremiumToast({
          message: lang === 'es' 
            ? `Análisis de Visión Real Completado: ${data.brand} ${data.model}`
            : `Real AI Visual Identification Complete: ${data.brand} ${data.model}`,
          type: "success"
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.warn("API Analysis fallback triggered:", err);
      clearInterval(textInterval);
      setViewfinderState("loaded");
      setShowConfidence(true);
      setConfidenceBreakdown(SIMULATED_RESPONSE.confidence_breakdown);
      setConfidenceScore(SIMULATED_RESPONSE.confidence);
      setFormData(prev => ({
        ...prev,
        category: SIMULATED_RESPONSE.category,
        brand: SIMULATED_RESPONSE.brand,
        model: SIMULATED_RESPONSE.model,
        description: SIMULATED_RESPONSE.reasoning,
      }));
    }
  };

  // Real Speech Recognition & Microphone logic
  const startRealVoiceDictation = async () => {
    setSpeechError(null);
    setVoiceSelectedPresetId(null);
    setVoiceSpokenTranscript("");

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    // Mic volume audio level visualization
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micMediaStreamRef.current = stream;
        
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          const analyser = audioCtx.createAnalyser();
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.fftSize = 64;
          
          audioContextRef.current = audioCtx;
          audioAnalyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateVolume = () => {
            if (audioAnalyserRef.current) {
              audioAnalyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              setMicVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)));
            }
          };
          const volumeInterval = setInterval(updateVolume, 100);
          (stream as any)._volumeInterval = volumeInterval;
        }
      }
    } catch (err: any) {
      console.warn("Audio Context setup notice:", err);
    }

    if (SpeechRecognitionClass) {
      try {
        const recognition = new SpeechRecognitionClass();
        speechRecognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang === 'es' ? 'es-ES' : 'en-US';

        recognition.onstart = () => {
          setIsRecordingMic(true);
          setVoiceStep("listening");
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setVoiceSpokenTranscript(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          if (event.error === 'not-allowed') {
            setSpeechError(lang === 'es' ? "Permiso de micrófono denegado en el navegador." : "Microphone permission denied by browser.");
          }
        };

        recognition.onend = () => {
          setIsRecordingMic(false);
        };

        recognition.start();
        setIsRecordingMic(true);
        setVoiceStep("listening");
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
        fallbackVoiceListening();
      }
    } else {
      fallbackVoiceListening();
    }
  };

  const fallbackVoiceListening = () => {
    setIsRecordingMic(true);
    setVoiceStep("listening");
    setVoiceSpokenTranscript(
      lang === 'es'
        ? "Micrófono activo. Diga el nombre del reloj o artículo de lujo..."
        : "Microphone active. Speak your luxury item details..."
    );
  };

  const stopRealVoiceDictation = () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }

    if (micMediaStreamRef.current) {
      if ((micMediaStreamRef.current as any)._volumeInterval) {
        clearInterval((micMediaStreamRef.current as any)._volumeInterval);
      }
      micMediaStreamRef.current.getTracks().forEach(track => track.stop());
      micMediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }

    setIsRecordingMic(false);
    setMicVolumeLevel(0);
  };

  const processSpokenVoiceToAI = async () => {
    stopRealVoiceDictation();
    const textToProcess = voiceSpokenTranscript.trim();
    if (!textToProcess) {
      setSpeechError(lang === 'es' ? "No se detectó voz. Por favor intente de nuevo o use un preset." : "No speech detected. Please speak clearly or select a preset.");
      setVoiceStep("idle");
      return;
    }

    setVoiceStep("transcribing");

    try {
      const response = await fetch('/api/parse-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: textToProcess })
      });

      const parsedData = await response.json();
      setVoiceStep("structuring");

      setTimeout(() => {
        setVoiceStructuredPreview({
          brand: parsedData.brand || "Rolex",
          model: parsedData.model || "Submariner 126610LN",
          category: parsedData.category || "Watches",
          condition: typeof parsedData.condition === 'number' ? parsedData.condition : 4,
          estimatedValue: parsedData.estimatedValue ? String(parsedData.estimatedValue) : "13500",
          currency: parsedData.currency || "USD",
          description: parsedData.description || textToProcess
        });
        setVoiceStep("ready");
      }, 600);
    } catch (err) {
      console.warn("Voice API fallback:", err);
      setVoiceStep("structuring");

      setTimeout(() => {
        const textLower = textToProcess.toLowerCase();
        let brand = "Rolex";
        let model = "Submariner 126610LN";
        let category = "Watches";
        let estimatedValue = "13500";
        let currency = "USD";
        let condition = 4;

        if (textLower.includes("birkin") || textLower.includes("hermes") || textLower.includes("hermès")) {
          brand = "Hermès";
          model = "Birkin 30 Epsom Leather";
          category = "Handbags";
          estimatedValue = "22000";
        } else if (textLower.includes("cartier") || textLower.includes("love")) {
          brand = "Cartier";
          model = "Love Bracelet 18k Gold";
          category = "Fine Jewelry";
          estimatedValue = "7200";
        }

        const valMatch = textToProcess.match(/(\d[\d,.]*)/);
        if (valMatch && valMatch[1]) {
          const extractedNum = valMatch[1].replace(/,/g, '');
          if (!isNaN(Number(extractedNum)) && Number(extractedNum) > 100) {
            estimatedValue = extractedNum;
          }
        }

        setVoiceStructuredPreview({
          brand,
          model,
          category,
          condition,
          estimatedValue,
          currency,
          description: textToProcess
        });

        setVoiceStep("ready");
      }, 600);
    }
  };

  // Premium Voice Simulation Handler
  const triggerVoicePreset = (presetId: number) => {
    stopRealVoiceDictation();
    const preset = VOICE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setVoiceSelectedPresetId(presetId);
    setVoiceStep("listening");
    setVoiceSpokenTranscript("");
    
    // Simulate speaking transcription word-by-word
    const words = preset.speech.split(" ");
    let currentText = "";
    let wordIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? "" : " ") + words[wordIndex];
        setVoiceSpokenTranscript(currentText);
        wordIndex++;
      } else {
        clearInterval(typingInterval);
        
        setTimeout(() => {
          setVoiceStep("transcribing");
          
          setTimeout(() => {
            setVoiceStep("structuring");
            
            setTimeout(() => {
              setVoiceStep("ready");
              setVoiceStructuredPreview(preset.structured);
            }, 1200);
          }, 800);
        }, 500);
      }
    }, 50);
  };

  // Apply voice structured data to form
  const applyVoiceData = () => {
    stopRealVoiceDictation();
    if (!voiceStructuredPreview) return;

    setFormData(prev => ({
      ...prev,
      category: voiceStructuredPreview.category,
      brand: voiceStructuredPreview.brand,
      model: voiceStructuredPreview.model,
      condition: voiceStructuredPreview.condition,
      estimatedValue: voiceStructuredPreview.estimatedValue,
      currency: voiceStructuredPreview.currency || "USD",
      description: voiceStructuredPreview.description
    }));

    setTouchedFields(prev => ({
      ...prev,
      category: true,
      brand: true,
      model: true,
      estimatedValue: true
    }));

    // Highlight all structured fields
    setHighlightedFields({
      category: true,
      brand: true,
      model: true,
      condition: true,
      estimatedValue: true,
      description: true
    });

    setTimeout(() => {
      setHighlightedFields({});
    }, 4000);

    setShowVoiceRecorder(false);
    setVoiceStep("idle");
    setVoiceStructuredPreview(null);
    setVoiceSelectedPresetId(null);
    setStep(2); // Auto navigate to Step 2 so user sees prefilled form!

    setPremiumToast({
      message: lang === 'es'
        ? "¡La voz ha sido estructurada y aplicada al formulario con éxito!"
        : "Unstructured voice narration parsed and applied to form fields!",
      type: "success"
    });
  };

  // Export structured dossier data to Excel compatible CSV
  const exportToCSV = () => {
    const headers = [
      "Tracking Reference",
      "Timestamp (UTC)",
      "Item Category",
      "Item Brand",
      "Model/Reference Number",
      "Estimated Value",
      "Currency",
      "Physical Condition Score (0-4)",
      "Physical Condition Name",
      "Certificate Status",
      "Verification Location",
      "Verified Device ID",
      "Hardware Fingerprint",
      "Expert Pipeline Status",
      "AI Confidence Score (%)",
      "Description / Extraction Logs"
    ];

    const isCertLinked = scannedCert ? `Scanned: ${scannedCert.name} (Serial: ${scannedCert.ocr.serial})` : "No Certificate Scan Linked";

    const rows = [
      [
        metadata.deviceId,
        new Date().toISOString(),
        formData.category || "Unspecified",
        formData.brand || "Unspecified",
        formData.model || "Unspecified",
        formData.estimatedValue || "N/A",
        formData.currency,
        formData.condition.toString(),
        CONDITIONS[formData.condition],
        isCertLinked,
        metadata.location,
        metadata.deviceId,
        metadata.deviceId + "-CHIP-SECURE",
        "PENDING_EXPERT_REVIEW",
        (confidenceScore || SIMULATED_RESPONSE.confidence).toString(),
        formData.description.replace(/"/g, '""') // Escape quotes for CSV
      ]
    ];

    const csvContent = "\uFEFF" // UTF-8 BOM for Excel Spanish/Special character compatibility
      + [headers.join(","), ...rows.map(row => row.map(cell => `"${cell}"`).join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CurateLux-Dossier-${metadata.deviceId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setPremiumToast({
      message: lang === 'es' ? "¡Expediente de Excel descargado!" : "Excel (CSV) item dossier downloaded successfully!",
      type: "success"
    });
  };

  const handleNextStep = () => {
    if (step === 1 && !imageSrc) {
      alert(lang === 'es' ? "Por favor capture una imagen para continuar." : "Please capture an image to proceed.");
      return;
    }
    if (step === 2) {
      const newErrors: Record<string, string> = {};
      const fieldsToValidate = ["category", "brand", "model", "estimatedValue"];
      fieldsToValidate.forEach(field => {
        const err = validateField(field, String(formData[field as keyof typeof formData] || ""));
        if (err) {
          newErrors[field] = err;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const touched: Record<string, boolean> = {};
        fieldsToValidate.forEach(field => {
          touched[field] = true;
        });
        setTouchedFields(touched);
        setPremiumToast({
          message: lang === 'es' 
            ? "Por favor complete los campos obligatorios y corrija los formatos inválidos." 
            : "Please fill in all required fields and correct invalid formats.",
          type: "gold"
        });
        return;
      }
    }
    if (step === 3) {
      if (!agreed) {
        alert(lang === 'es' ? "Por favor acepte los Términos de Servicio." : "Please agree to the Terms of Service.");
        return;
      }
      
      // Save item to inventory library
      try {
        const trackingRef = `${metadata.deviceId || 'DEV'}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newItem = {
          id: `item-${Date.now()}`,
          trackingRef: trackingRef,
          timestamp: new Date().toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          formData: { ...formData },
          imageSrc: imageSrc,
          confidenceScore: confidenceScore || 88,
          confidenceBreakdown: { ...confidenceBreakdown },
          scannedCert: scannedCert ? { ...scannedCert } : null,
          deviceMetadata: { ...metadata },
          postingStatus: 'active_listing', // 'active_listing' | 'appraised_only' | 'matched_with_buyer' | 'sold_archived'
          askingPrice: formData.estimatedValue || '0',
          visibility: 'Public Luxury Exchange',
          sellerProfile: { ...userProfile }
        };
        
        const updatedInventory = [newItem, ...inventory];
        setInventory(updatedInventory);
        localStorage.setItem("luxury_appraisal_inventory", JSON.stringify(updatedInventory));
        setSelectedLibraryItemId(newItem.id); // Mark as viewing this newly submitted item
        
        // Clear draft
        localStorage.removeItem("luxury_appraisal_form_draft");
        setLastSavedTime(null);
        setHasSavedDraft(false);
        
        setPremiumToast({
          message: lang === 'es' 
            ? `¡Expediente guardado! ${formData.brand} agregado al inventario.` 
            : `Dossier saved! ${formData.brand} ${formData.model} added to inventory.`,
          type: "success"
        });
      } catch (e) {
        console.error("Failed to save item to inventory:", e);
      }
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const resetFlow = () => {
    try {
      localStorage.removeItem("luxury_appraisal_form_draft");
    } catch (e) {
      console.error("Failed to clear draft:", e);
    }
    setLastSavedTime(null);
    setHasSavedDraft(false);
    setSelectedLibraryItemId(null); // Clear selected library item reference
    setStep(1);
    setViewfinderState("empty");
    setImageSrc(null);
    setShowConfidence(false);
    setFormData({
      category: "",
      brand: "",
      model: "",
      description: "",
      condition: 3,
      estimatedValue: "",
      currency: "USD",
    });
    setErrors({});
    setTouchedFields({});
    setAgreed(false);
    clearSignature();
  };

  const clearSignature = () => {
    const canvas = signatureRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Canvas drawing logic
  useEffect(() => {
    if (step === 3 && signatureRef.current) {
      const canvas = signatureRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let isDrawing = false;
      
      const startDrawing = (e: MouseEvent | TouchEvent) => {
        isDrawing = true;
        ctx.beginPath();
        const pos = getPos(e);
        ctx.moveTo(pos.x, pos.y);
      };
      
      const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = '#C9A962';
        ctx.lineWidth = 2;
        ctx.stroke();
      };
      
      const stopDrawing = () => {
        isDrawing = false;
      };

      const getPos = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      };

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
      
      canvas.addEventListener('touchstart', startDrawing, { passive: true });
      canvas.addEventListener('touchmove', draw, { passive: true });
      canvas.addEventListener('touchend', stopDrawing);

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
      };
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-dot-pattern w-full flex justify-center text-text-primary relative">
      
      {/* FLOATING PREMIUM TOAST */}
      <AnimatePresence>
        {premiumToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-[999] max-w-[340px] md:max-w-[400px] w-full px-4 flex justify-center"
          >
            <div className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 border ${
              premiumToast.type === "gold"
                ? "bg-dark-surface border-gold/40 text-gold shadow-gold/10"
                : premiumToast.type === "success"
                  ? "bg-dark-surface border-success/40 text-success shadow-success/10"
                  : "bg-dark-surface border-dark-border text-text-primary"
            }`}>
              {premiumToast.type === "gold" ? <Sparkles className="w-5 h-5 flex-shrink-0 text-gold" /> : <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-success" />}
              <p className="text-xs font-medium leading-normal text-text-primary">{premiumToast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[600px] bg-dark min-h-screen relative shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-dark-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gem className="text-gold w-6 h-6" />
            <span className="text-xl font-serif tracking-wide font-semibold">
              <span className="text-gold">Curate</span><span className="text-white">Lux</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-text-secondary relative">
            {/* THEME SWITCHER BUTTON */}
            <button 
              onClick={toggleTheme} 
              className="flex items-center gap-1 p-1 rounded-lg hover:text-gold transition-colors focus:outline-none relative group"
              title={theme === 'dark' 
                ? (lang === 'es' ? "Cambiar a Modo Claro de Alto Contraste" : "Switch to High-Contrast Light Mode") 
                : (lang === 'es' ? "Cambiar a Modo Oscuro" : "Switch to Luxury Dark Mode")}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gold cursor-pointer group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-gold cursor-pointer group-hover:scale-110 transition-transform" />
              )}
            </button>

            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
              className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none"
            >
              <Globe className="w-5 h-5 cursor-pointer" />
              <span className="text-xs uppercase font-mono">{lang}</span>
            </button>
            
            {/* WHATSAPP / TELEGRAM CHAT POSTING GUIDE BUTTON */}
            <button
              onClick={() => {
                setLibraryTab('whatsapp_telegram');
                setIsLibraryOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm group"
              title={lang === 'es' ? "Guía de Formato de Publicación para WhatsApp y Telegram" : "WhatsApp & Telegram External Posting Guide & Parser"}
            >
              <Watch className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{lang === 'es' ? 'Guía Chat' : 'Chat Posting Guide'}</span>
            </button>

            {/* INVENTORY LIBRARY BUTTON */}
            <button 
              onClick={() => {
                setLibraryTab('history');
                setIsLibraryOpen(true);
              }} 
              className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none relative"
              title={lang === 'es' ? "Historial de Publicaciones e Inventario" : "Posting History & Inventory"}
            >
              <History className="w-5 h-5 cursor-pointer" />
              {inventory.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-dark text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {inventory.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => {
                setLibraryTab('matches');
                setIsLibraryOpen(true);
              }}
              className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none relative"
              title={lang === 'es' ? "Clientes Buscando Relojes y Coincidencias" : "Clients Looking For Watches & Matches"}
            >
              <Users className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-dark text-[9px] font-bold flex items-center justify-center">
                {clientRequests.length}
              </span>
            </button>

            <button
              onClick={() => {
                setLibraryTab('profile');
                setIsLibraryOpen(true);
              }}
              className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none relative"
              title={lang === 'es' ? "Perfil Demográfico y Rol" : "User Demographics & Profile"}
            >
              <User className="w-5 h-5 cursor-pointer text-gold" />
            </button>

            {/* Language dropdown menu */}
            <AnimatePresence>
              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-8 mt-2 w-36 bg-dark-surface border border-dark-border rounded-xl shadow-2xl z-20 py-2 overflow-hidden"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs flex items-center gap-2 hover:bg-dark hover:text-gold transition-colors ${lang === l.code ? 'text-gold font-medium bg-dark/40' : 'text-text-secondary'}`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* STEP INDICATOR */}
        <div className="px-6 py-4 flex items-center justify-center gap-3">
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step 
                  ? 'w-8 bg-gold' 
                  : s < step 
                    ? 'w-2 bg-success' 
                    : 'w-2 bg-dark-border'
              }`}
            />
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 px-6 pb-24 overflow-x-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CAPTURE ENGINE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="font-serif text-3xl font-bold">
                    {t('captureTitle')} <span className="text-gold">{t('luxuryItem')}</span>
                  </h1>
                  <p className="text-text-secondary mt-2 text-sm">
                    {t('subTitle')}
                  </p>
                </div>

                {/* PROMINENT CHAT POSTING GUIDE & PARSER BANNER */}
                <div 
                  onClick={() => {
                    setLibraryTab('whatsapp_telegram');
                    setIsLibraryOpen(true);
                  }}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-gold/15 via-dark-surface to-dark-surface border border-gold/40 hover:border-gold cursor-pointer transition-all flex items-center justify-between gap-3 shadow-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                      <Watch className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                          {lang === 'es' ? 'Guía de Publicación para WhatsApp y Telegram' : 'WhatsApp & Telegram External Posting Guide'}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-gold/20 text-gold text-[9px] font-mono font-bold">
                          AI PARSER
                        </span>
                      </div>
                      <p className="text-[11px] text-text-secondary font-mono mt-0.5">
                        {lang === 'es'
                          ? '¿Publicas en grupos de chat externos? Ver formato WTS/WTB e ingestión de mensajes.'
                          : 'Posting in external trade groups? See standard WTS/WTB templates & instant chat parser.'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform shrink-0" />
                </div>



                {/* VIEWFINDER */}
                <div className="glass-card aspect-[4/3] w-full flex items-center justify-center relative overflow-hidden">
                  
                  {viewfinderState === "empty" && !isLiveCameraActive && (
                    <div className="absolute inset-4 border-2 border-dashed border-dark-border rounded-xl flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-3 pulse-gold">
                        <Camera className="w-8 h-8 text-gold" />
                      </div>
                      <p className="font-medium text-lg text-center">{t('tapToCapture')}</p>
                      <p className="text-sm text-text-secondary mt-1 text-center">{t('takeClearPhoto')}</p>
                      
                      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                        <button
                          onClick={() => startLiveCamera('environment')}
                          className="px-4 py-2 bg-gold text-dark font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 hover:bg-gold-light transition-all shadow-lg"
                        >
                          <Camera className="w-4 h-4" />
                          <span>{lang === 'es' ? 'Activar Cámara' : 'Activate Camera'}</span>
                        </button>
                        
                        <label className="px-4 py-2 bg-dark-surface border border-dark-border text-white font-medium text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 hover:border-gold/50 cursor-pointer transition-colors">
                          <Upload className="w-4 h-4 text-gold" />
                          <span>{lang === 'es' ? 'Subir Foto' : 'Upload Image'}</span>
                          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
                        </label>
                      </div>

                      {cameraError && (
                        <p className="text-xs text-amber-400 mt-3 text-center font-mono max-w-sm bg-amber-400/10 p-2 rounded border border-amber-400/20">
                          {cameraError}
                        </p>
                      )}
                    </div>
                  )}

                  {isLiveCameraActive && viewfinderState === "empty" && (
                    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Live Viewfinder Frame Overlay */}
                      <div className="absolute inset-4 border border-gold/40 rounded-2xl pointer-events-none flex flex-col justify-between p-2">
                        <div className="flex justify-between">
                          <div className="w-6 h-6 border-t-2 border-l-2 border-gold" />
                          <div className="w-6 h-6 border-t-2 border-r-2 border-gold" />
                        </div>
                        <div className="text-center font-mono text-[10px] text-gold tracking-widest bg-black/70 px-3 py-1 rounded-full self-center border border-gold/40 shadow-lg">
                          {lang === 'es' ? '📷 CÁMARA DEL CELULAR ACTIVA' : '📷 CELLPHONE CAMERA STREAM ACTIVE'}
                        </div>
                        <div className="flex justify-between">
                          <div className="w-6 h-6 border-b-2 border-l-2 border-gold" />
                          <div className="w-6 h-6 border-b-2 border-r-2 border-gold" />
                        </div>
                      </div>

                      {/* Live Camera Toolbar */}
                      <div className="absolute bottom-3 left-0 right-0 px-4 flex items-center justify-between z-10">
                        <button
                          onClick={stopLiveCamera}
                          className="p-3 bg-dark/80 backdrop-blur-md rounded-full text-white border border-dark-border hover:bg-dark transition-colors"
                          title={lang === 'es' ? 'Cerrar Cámara' : 'Close Camera'}
                        >
                          <X className="w-5 h-5" />
                        </button>

                        <button
                          onClick={captureCameraPhoto}
                          className="px-5 py-3 bg-gradient-to-r from-gold to-gold-light text-dark font-mono font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/30"
                        >
                          <Camera className="w-5 h-5" />
                          <span>{lang === 'es' ? 'TOMAR FOTO Y ANALIZAR' : 'CAPTURE & ANALYZE'}</span>
                        </button>

                        <button
                          onClick={toggleCameraFacing}
                          className="p-3 bg-dark/80 backdrop-blur-md rounded-full text-gold border border-gold/40 hover:bg-gold/20 transition-colors"
                          title={lang === 'es' ? 'Voltear Cámara (Trasera/Frontal)' : 'Switch Camera (Back/Front)'}
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {viewfinderState === "analyzing" && (
                    <div className="absolute inset-0 bg-dark-surface flex flex-col items-center justify-center">
                      {imageSrc && <img src={imageSrc} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" alt="scanning" />}
                      <div className="scan-line" />
                      {/* Registration brackets */}
                      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-gold" />
                      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-gold" />
                      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-gold" />
                      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-gold" />
                      
                      <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
                      <p className="font-mono text-gold tracking-widest text-sm animate-pulse">{scanText}</p>
                    </div>
                  )}

                  {viewfinderState === "loaded" && imageSrc && (
                    <div className="absolute inset-0 border-2 border-gold">
                      <img src={imageSrc} className="w-full h-full object-cover" alt="captured" />
                      <button
                        onClick={() => {
                          setViewfinderState("empty");
                          setImageSrc(null);
                          setShowConfidence(false);
                          startLiveCamera('environment');
                        }}
                        className="absolute top-3 right-3 px-3 py-1.5 bg-dark/80 backdrop-blur-md border border-gold/40 text-gold text-xs font-mono rounded-lg flex items-center gap-1.5 hover:bg-dark transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Repetir Foto' : 'Retake Photo'}</span>
                      </button>
                    </div>
                  )}

                </div>

                {/* CAPTURE BUTTONS */}
                <div className="grid grid-cols-5 gap-2 md:gap-4">
                  {[
                    { icon: Camera, label: t('camera'), action: () => startLiveCamera('environment') },
                    { icon: ImageIcon, label: t('gallery'), action: () => document.querySelector<HTMLInputElement>('input[type="file"]')?.click() },
                    { icon: QrCode, label: lang === 'es' ? 'Escanear QR' : lang === 'zh' ? '二维码' : lang === 'ja' ? 'QRコード' : 'Scan QR', action: () => setIsQrModalOpen(true) },
                    { 
                      icon: Mic, 
                      label: t('voice'), 
                      action: () => { 
                        setShowVoiceRecorder(true); 
                        startRealVoiceDictation(); 
                      } 
                    },
                    { icon: FileText, label: t('text'), action: () => setStep(2) },
                  ].map((btn, i) => (
                    <button key={i} onClick={btn.action} className="flex flex-col items-center gap-2 group">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center group-hover:border-gold transition-colors">
                        <btn.icon className="w-4 h-4 md:w-5 md:h-5 text-text-secondary group-hover:text-gold" />
                      </div>
                      <span className="text-[9px] md:text-[10px] text-text-muted uppercase tracking-wider text-center">{btn.label}</span>
                    </button>
                  ))}
                </div>

                {/* INTERACTIVE DEMO ITEMS SELECTION */}
                <div className="bg-dark-surface/60 border border-dark-border rounded-xl p-4 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="text-xs uppercase font-semibold tracking-wider text-text-primary">
                        {lang === 'es' ? 'Probar con Artículo Demo' : 'Try with Demo Item'}
                      </span>
                    </div>
                    <span className="text-[10px] text-gold font-mono px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                      Demo Mode
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                    {lang === 'es' 
                      ? '¿No tiene una foto a mano? Toque cualquiera de estos artículos reales para simular el escaneo con IA en tiempo real.' 
                      : "Don't have a physical photo on hand? Tap any real-world luxury item below to simulate real-time AI scan and valuation."}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2.5">
                    {DEMO_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => triggerDemoItemScan(item)}
                        disabled={viewfinderState === "analyzing"}
                        className="flex flex-col text-left rounded-lg overflow-hidden border border-dark-border bg-dark/40 hover:border-gold/40 hover:bg-dark-surface transition-all group relative disabled:opacity-50"
                      >
                        <div className="aspect-[4/3] w-full bg-dark overflow-hidden relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                        </div>
                        <div className="p-2 flex flex-col justify-between flex-1">
                          <div className="text-[10px] font-medium text-text-primary line-clamp-1 group-hover:text-gold transition-colors">
                            {lang === 'es' ? item.nameEs : item.name}
                          </div>
                          <div className="text-[9px] text-gold font-mono mt-1">
                            {item.currency} {item.estimatedValue}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CONFIDENCE CARD */}
                <AnimatePresence>
                  {showConfidence && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-6 mt-2 border-gold/30"
                    >
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">{t('aiConfidence')}</p>
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono text-4xl text-gold">{confidenceScore}</span>
                            <span className="text-xl text-gold/60">%</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${confidenceScore >= 85 ? 'border-success text-success bg-success/10' : 'border-warning text-warning bg-warning/10'}`}>
                            {confidenceScore >= 85 ? t('authenticMatch') : t('reviewRequired')}
                          </span>
                        </div>
                      </div>

                      <div className="h-2 bg-dark-elevated rounded-full overflow-hidden mb-6">
                        <div 
                          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-1000 ease-out" 
                          style={{ width: `${confidenceScore}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: t('visualMatch'), score: confidenceBreakdown.brand },
                          { label: t('shapeAnalysis'), score: confidenceBreakdown.model },
                          { label: t('materialScan'), score: confidenceBreakdown.material },
                          { label: t('anomalyCheck'), score: confidenceBreakdown.anomaly },
                        ].map((metric, i) => (
                          <div key={i} className="bg-dark p-3 rounded-lg border border-dark-border flex justify-between items-center">
                            <span className="text-xs text-text-secondary">{metric.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{metric.score}%</span>
                              <div className={`w-2 h-2 rounded-full ${metric.score > 85 ? 'bg-success' : 'bg-warning'}`} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {confidenceScore < 90 && (
                        <div className="mt-6 pt-6 border-t border-dark-border">
                          <p className="text-xs text-warning mb-3 uppercase tracking-wider">{t('requiredEvidence')}</p>
                          <div className="flex gap-2">
                            {["Detail Shot", "Serial Number", "Movement"].map(action => (
                              <button key={action} className="flex-1 bg-dark-elevated border border-warning/30 text-warning text-xs py-2 rounded-lg hover:bg-warning/10 transition-colors">
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EXPECTED RESEARCH QUESTIONNAIRE */}
                <div className="glass-card p-5 mt-4 border-dark-border text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-gold animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white">Expected Research Questions</h3>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-mono">Structured Pre-Assessment Questionnaire</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                    Our luxury valuation pipeline assesses physical assets via specific text questionnaires. Tap any question below to automatically pre-fill or guide your item details:
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      {
                        id: 1,
                        question: lang === 'es' ? "1. ¿Qué marca y modelo específico está evaluando?" :
                                  lang === 'zh' ? "1. 您正在评估什么品牌和具体型号？" :
                                  lang === 'ja' ? "1. どのブランドと具体的なモデルを評価していますか？" :
                                  lang === 'ru' ? "1. Какой бренд и конкретную модель вы оцениваете?" :
                                  "1. What brand and specific model are you evaluating?",
                        desc: lang === 'es' ? "Rellena automáticamente la categoría, marca y referencia del modelo." :
                              lang === 'zh' ? "自动填写类别、品牌和具体型号引文。" :
                              lang === 'ja' ? "カテゴリ、ブランド、モデル参照を自動入力します。" :
                              lang === 'ru' ? "Автоматически заполняет категорию, бренд и модель." :
                              "Auto-fills the category, brand, and model reference fields."
                      },
                      {
                        id: 2,
                        question: lang === 'es' ? "2. ¿Cuál es la condición física actual y hay defectos?" :
                                  lang === 'zh' ? "2. 当前的物理状况如何，是否有缺陷？" :
                                  lang === 'ja' ? "2. 現在の物理的な状態はどうですか？欠陥はありますか？" :
                                  lang === 'ru' ? "2. Каково физическое состояние и есть ли дефекты?" :
                                  "2. What is the current physical condition and are there any defects?",
                        desc: lang === 'es' ? "Establece la condición y añade notas de desgaste detalladas." :
                              lang === 'zh' ? "设置产品状况并添加详细磨损说明。" :
                              lang === 'ja' ? "状態を設定し、詳細な摩耗状態のメモを追加します。" :
                              lang === 'ru' ? "Устанавливает состояние и добавляет описание износа." :
                              "Sets condition quality and adds detailed physical wear notes."
                      },
                      {
                        id: 3,
                        question: lang === 'es' ? "3. ¿Tiene el certificado original o número de serie?" :
                                  lang === 'zh' ? "3. 您是否有原始证书或匹配的序列号？" :
                                  lang === 'ja' ? "3. オリジナルの証明書やシリアル番号はありますか？" :
                                  lang === 'ru' ? "3. Есть ли у вас оригинальный сертификат или серийный номер?" :
                                  "3. Do you have the original certificate or serial number?",
                        desc: lang === 'es' ? "Escribe detalles de autenticidad, caja original y papeles." :
                              lang === 'zh' ? "写入有关原始包装、配件和证书文件的详细信息。" :
                              lang === 'ja' ? "オリジナルの箱、付属品、証明書類のデータを入力します。" :
                              lang === 'ru' ? "Добавляет информацию о сертификате, коробке и документах." :
                              "Writes high-fidelity box, accessory, and certification details."
                      },
                      {
                        id: 4,
                        question: lang === 'es' ? "4. ¿Cuál es el valor estimado de mercado o precio de compra?" :
                                  lang === 'zh' ? "4. 预计的市场价值或原始购买价格是多少？" :
                                  lang === 'ja' ? "4. 推定市場価値または元の購入価格はいくらですか？" :
                                  lang === 'ru' ? "4. Какова ориентировочная стоимость или цена покупки?" :
                                  "4. What is the estimated market value or purchase price?",
                        desc: lang === 'es' ? "Pre-rellena el campo de valoración de mercado en USD." :
                              lang === 'zh' ? "预填以美元为基准的市场评估金额。" :
                              lang === 'ja' ? "米ドル基準の市場査定評価額を自動入力します。" :
                              lang === 'ru' ? "Заполняет поле рыночной стоимости в USD." :
                              "Pre-populates the reference market valuation field in USD."
                      }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setStep(2);
                          prefillSample(item.id);
                        }}
                        className="w-full text-left p-3.5 bg-dark/40 hover:bg-gold/5 border border-dark-border hover:border-gold/30 rounded-xl transition-all flex items-start gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute right-0 top-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all pointer-events-none" />
                        <div className="w-8 h-8 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center shrink-0 mt-0.5 group-hover:border-gold/30">
                          {item.id === 1 ? <Tag className="w-4 h-4 text-text-secondary group-hover:text-gold" /> :
                           item.id === 2 ? <AlertCircle className="w-4 h-4 text-text-secondary group-hover:text-gold" /> :
                           item.id === 3 ? <FileSpreadsheet className="w-4 h-4 text-text-secondary group-hover:text-gold" /> :
                           <Coins className="w-4 h-4 text-text-secondary group-hover:text-gold" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-gold transition-colors leading-snug">{item.question}</p>
                          <p className="text-[10px] text-text-muted mt-1 leading-normal">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* STEP 2: ITEM DETAILS FORM */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h1 className="font-serif text-3xl font-bold">
                      {t('itemDetails')}
                    </h1>
                    
                    {/* Autosave Status Indicator */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-surface border border-dark-border text-[11px] text-text-secondary select-none">
                        <History className={`w-3.5 h-3.5 ${isDraftSaving ? 'text-gold animate-spin' : 'text-success'}`} />
                        <span>
                          {isDraftSaving 
                            ? (lang === 'es' ? 'Guardando...' : 'Saving draft...') 
                            : lastSavedTime 
                              ? `${lang === 'es' ? 'Guardado:' : 'Saved:'} ${lastSavedTime}`
                              : (lang === 'es' ? 'Borrador activo' : 'Draft active')}
                        </span>
                      </div>
                      {hasSavedDraft && (
                        <button
                          onClick={handleDiscardDraft}
                          className="px-2.5 py-1 rounded-lg bg-danger/10 hover:bg-danger/20 border border-danger/20 text-[10px] text-danger uppercase tracking-wider font-semibold transition-colors"
                          title={lang === 'es' ? "Descartar borrador y reiniciar" : "Discard draft and start fresh"}
                        >
                          {lang === 'es' ? 'Descartar' : 'Reset'}
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-text-secondary mt-2 text-sm">
                    {t('reviewVerify')}
                  </p>
                </div>

                <div className="space-y-5">
                  
                  {/* Category */}
                  <motion.div 
                    animate={touchedFields.category && errors.category ? "invalid" : "default"}
                    variants={shakeVariants}
                    className="space-y-1"
                  >
                    <label className="text-xs text-text-secondary uppercase tracking-wider">{t('category')}</label>
                    <div className="relative">
                      <select 
                        value={formData.category}
                        onChange={e => {
                          setFormData({...formData, category: e.target.value});
                          setTouchedFields(prev => ({...prev, category: true}));
                        }}
                        className={`w-full bg-dark-surface border transition-all duration-500 ${
                          touchedFields.category && errors.category
                            ? 'border-danger ring-2 ring-danger/20 bg-danger/5'
                            : highlightedFields.category 
                              ? 'border-gold ring-2 ring-gold/20 scale-[1.01] shadow-[0_0_15px_rgba(201,169,98,0.3)] bg-gold/5' 
                              : formData.category 
                                ? 'border-success' 
                                : 'border-dark-border'
                        } rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:border-gold`}
                      >
                        <option value="">{t('selectCategory')}</option>
                        {["Watch", "Handbag", "Jewelry", "Exotic Car / Luxury Vehicle", "Art & Collectibles", "Wine & Spirits", "Other"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {touchedFields.category && errors.category && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-danger flex items-center gap-1.5 mt-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-danger" />
                        <span>{errors.category}</span>
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Brand */}
                  <motion.div 
                    animate={touchedFields.brand && errors.brand ? "invalid" : "default"}
                    variants={shakeVariants}
                    className="space-y-1"
                  >
                    <label className="text-xs text-text-secondary uppercase tracking-wider">{t('brand')}</label>
                    <div className="relative flex">
                      <input 
                        type="text" 
                        value={formData.brand}
                        onChange={e => {
                          setFormData({...formData, brand: e.target.value});
                          setTouchedFields(prev => ({...prev, brand: true}));
                        }}
                        className={`flex-1 bg-dark-surface border transition-all duration-500 ${
                          touchedFields.brand && errors.brand
                            ? 'border-danger ring-2 ring-danger/20 bg-danger/5'
                            : highlightedFields.brand 
                              ? 'border-gold ring-2 ring-gold/20 scale-[1.01] shadow-[0_0_15px_rgba(201,169,98,0.3)] bg-gold/5' 
                              : formData.brand 
                                ? 'border-success' 
                                : 'border-dark-border'
                        } rounded-l-xl px-4 py-3 text-sm outline-none focus:border-gold`}
                        placeholder="e.g. Rolex"
                      />
                      <button 
                        type="button"
                        className="bg-dark-surface border-y border-r border-dark-border px-3 text-text-muted hover:text-gold transition-colors" 
                        onClick={() => {
                          setVoiceStep("idle");
                          setShowVoiceRecorder(true);
                        }}
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        className="bg-dark-surface border-y border-r border-dark-border rounded-r-xl px-3 text-text-muted hover:text-gold transition-colors"
                        onClick={() => setIsOcrModalOpen(true)}
                      >
                        <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                      </button>
                    </div>
                    {touchedFields.brand && errors.brand && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-danger flex items-center gap-1.5 mt-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-danger" />
                        <span>{errors.brand}</span>
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Model */}
                  <motion.div 
                    animate={touchedFields.model && errors.model ? "invalid" : "default"}
                    variants={shakeVariants}
                    className="space-y-1"
                  >
                    <label className="text-xs text-text-secondary uppercase tracking-wider">{t('model')}</label>
                    <input 
                      type="text" 
                      value={formData.model}
                      onChange={e => {
                        setFormData({...formData, model: e.target.value});
                        setTouchedFields(prev => ({...prev, model: true}));
                      }}
                      className={`w-full bg-dark-surface border transition-all duration-500 ${
                        touchedFields.model && errors.model
                          ? 'border-danger ring-2 ring-danger/20 bg-danger/5'
                          : highlightedFields.model 
                            ? 'border-gold ring-2 ring-gold/20 scale-[1.01] shadow-[0_0_15px_rgba(201,169,98,0.3)] bg-gold/5' 
                            : formData.model 
                              ? 'border-success' 
                              : 'border-dark-border'
                      } rounded-xl px-4 py-3 text-sm outline-none focus:border-gold`}
                      placeholder="e.g. Submariner 126610LN"
                    />
                    {touchedFields.model && errors.model && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-danger flex items-center gap-1.5 mt-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-danger" />
                        <span>{errors.model}</span>
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-xs text-text-secondary uppercase tracking-wider">{t('aiReasoning')}</label>
                    <div className="relative">
                      <textarea 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className={`w-full bg-dark-surface border transition-all duration-500 ${
                          highlightedFields.description 
                            ? 'border-gold ring-2 ring-gold/20 scale-[1.01] shadow-[0_0_15px_rgba(201,169,98,0.3)] bg-gold/5' 
                            : formData.description 
                              ? 'border-success' 
                              : 'border-dark-border'
                        } rounded-xl px-4 py-3 text-sm min-h-[110px] outline-none focus:border-gold resize-none`}
                        placeholder="Describe the item or certification notes..."
                      />
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button 
                          type="button"
                          className="p-2 bg-dark rounded-lg text-text-muted hover:text-gold transition-colors border border-dark-border" 
                          onClick={() => {
                            setVoiceStep("idle");
                            setShowVoiceRecorder(true);
                          }}
                        >
                          <Mic className="w-3 h-3" />
                        </button>
                        <button 
                          type="button"
                          className="p-2 bg-dark rounded-lg text-text-muted hover:text-gold transition-colors border border-dark-border"
                          onClick={() => setIsOcrModalOpen(true)}
                        >
                          <Sparkles className="w-3 h-3 text-gold" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Evidence Photos Grid */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-text-secondary uppercase tracking-wider">{t('evidencePhotos')}</label>
                      <span className="text-[10px] text-gold uppercase tracking-widest font-mono">Scan cert for OCR</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-square rounded-xl border-2 border-dashed border-dark-border flex flex-col items-center justify-center bg-dark-surface hover:border-gold/50 cursor-pointer transition-colors p-2 text-center">
                        <Camera className="w-5 h-5 text-text-muted mb-2" />
                        <span className="text-[10px] text-text-secondary leading-tight">Barcode/Serial</span>
                      </div>
                      
                      {/* Certificate with Interactive OCR simulator */}
                      <div 
                        onClick={() => setIsOcrModalOpen(true)}
                        className={`aspect-square rounded-xl border-2 ${
                          scannedCert 
                            ? 'border-success bg-success/5 shadow-[0_0_10px_rgba(74,222,128,0.2)]' 
                            : 'border-dashed border-gold/40 bg-dark-surface hover:border-gold'
                        } flex flex-col items-center justify-center cursor-pointer transition-all p-2 text-center relative overflow-hidden`}
                      >
                        {scannedCert ? (
                          <>
                            <Check className="w-5 h-5 text-success mb-1" />
                            <span className="text-[10px] text-success font-medium uppercase tracking-wider">Cert Scanned</span>
                            <span className="text-[8px] text-text-muted truncate max-w-full mt-1 px-1">{scannedCert.name}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 text-gold mb-1 pulse-gold" />
                            <span className="text-[10px] text-gold font-semibold uppercase tracking-wider">Certificate</span>
                            <span className="text-[8px] text-text-secondary mt-1">Read OCR</span>
                          </>
                        )}
                      </div>

                      <div className="aspect-square rounded-xl border-2 border-dashed border-dark-border flex flex-col items-center justify-center bg-dark-surface hover:border-gold/50 cursor-pointer transition-colors p-2 text-center">
                        <Camera className="w-5 h-5 text-text-muted mb-2" />
                        <span className="text-[10px] text-text-secondary leading-tight">Detail Shot</span>
                      </div>
                    </div>
                  </div>

                  {/* Condition Slider */}
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs text-text-secondary uppercase tracking-wider">{t('condition')}</label>
                      <span className={`font-mono text-gold text-sm transition-all duration-300 ${highlightedFields.condition ? 'scale-110 text-gold-light' : ''}`}>{CONDITIONS[formData.condition]}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="4" 
                      step="1"
                      value={formData.condition}
                      onChange={e => setFormData({...formData, condition: parseInt(e.target.value)})}
                      className={`w-full transition-all duration-500 ${highlightedFields.condition ? 'scale-[1.02]' : ''}`}
                    />
                    <div className="flex justify-between text-[10px] text-text-muted">
                      <span>Poor</span>
                      <span>Fair</span>
                      <span>Good</span>
                      <span>Exc.</span>
                      <span>Mint</span>
                    </div>
                  </div>

                  {/* Estimated Value */}
                  <motion.div 
                    animate={touchedFields.estimatedValue && errors.estimatedValue ? "invalid" : "default"}
                    variants={shakeVariants}
                    className="space-y-1 pt-2"
                  >
                    <label className="text-xs text-text-secondary uppercase tracking-wider">{t('estimatedValue')}</label>
                    <div className={`flex border transition-all duration-500 ${
                      touchedFields.estimatedValue && errors.estimatedValue
                        ? 'border-danger ring-2 ring-danger/20 bg-danger/5'
                        : highlightedFields.estimatedValue 
                          ? 'border-gold ring-2 ring-gold/20 scale-[1.01] shadow-[0_0_15px_rgba(201,169,98,0.3)] bg-gold/5' 
                          : formData.estimatedValue 
                            ? 'border-success' 
                            : 'border-dark-border'
                    } rounded-xl overflow-hidden bg-dark-surface focus-within:border-gold`}>
                      <div className="px-4 py-3 bg-dark border-r border-dark-border flex items-center">
                        <select 
                          value={formData.currency}
                          onChange={e => handleCurrencyChange(e.target.value)}
                          className="bg-transparent text-sm outline-none font-mono text-text-primary"
                        >
                          {["USD", "EUR", "GBP", "CHF", "HKD", "JPY"].map(c => <option key={c} value={c} className="bg-dark-surface">{c}</option>)}
                        </select>
                      </div>
                      <input 
                        type="text" 
                        value={formData.estimatedValue}
                        onChange={e => {
                          setFormData({...formData, estimatedValue: e.target.value});
                          setTouchedFields(prev => ({...prev, estimatedValue: true}));
                        }}
                        className="flex-1 bg-transparent px-4 py-3 text-sm outline-none font-mono text-text-primary"
                        placeholder="12,500"
                      />
                    </div>
                    {touchedFields.estimatedValue && errors.estimatedValue && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-danger flex items-center gap-1.5 mt-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-danger" />
                        <span>{errors.estimatedValue}</span>
                      </motion.p>
                    )}
                  </motion.div>

                  {/* EXPECTED QUESTIONS HELPER IN STEP 2 */}
                  <div className="glass-card p-5 mt-6 border-dark-border text-left relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-gold shrink-0" />
                        <h4 className="text-xs font-bold uppercase text-white tracking-wider">Expected Questions Helper</h4>
                      </div>
                      <span className="px-2 py-0.5 bg-gold/15 border border-gold/20 text-[9px] text-gold rounded font-mono uppercase tracking-widest animate-pulse">Fill Assist</span>
                    </div>
                    <p className="text-[11px] text-text-secondary mb-3.5 leading-relaxed">
                      Tap any expected research question below to instantly pre-fill its corresponding form input field with simulated luxury standards:
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: 1, q: lang === 'es' ? "Q1: Marca y modelo del artículo" : lang === 'zh' ? "Q1: 评估的品牌和型号" : lang === 'ja' ? "Q1: 評価しているブランドとモデル" : lang === 'ru' ? "Q1: Оцениваемый бренд и модель" : "Q1: Brand and specific model", icon: Tag },
                        { id: 2, q: lang === 'es' ? "Q2: Condición física y desgaste" : lang === 'zh' ? "Q2: 物理状况与缺陷" : lang === 'ja' ? "Q2: 物理的状態と磨耗" : lang === 'ru' ? "Q2: Физическое состояние и износ" : "Q2: Physical condition & wear", icon: AlertCircle },
                        { id: 3, q: lang === 'es' ? "Q3: Certificados y números de serie" : lang === 'zh' ? "Q3: 原始证书与序列号" : lang === 'ja' ? "Q3: 証明書とシリアル番号" : lang === 'ru' ? "Q3: Сертификаты и серийные номера" : "Q3: Certificates & serial numbers", icon: FileSpreadsheet },
                        { id: 4, q: lang === 'es' ? "Q4: Valor de mercado estimado" : lang === 'zh' ? "Q4: 预估市场价值" : lang === 'ja' ? "Q4: 推定市場価値" : lang === 'ru' ? "Q4: Ориентировочная стоимость" : "Q4: Estimated market value", icon: Coins }
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => prefillSample(item.id)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                            activeQuestionId === item.id 
                              ? 'bg-gold/10 border-gold text-gold font-medium' 
                              : 'bg-dark/30 border-dark-border text-text-secondary hover:border-gold/30 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <item.icon className={`w-3.5 h-3.5 shrink-0 ${activeQuestionId === item.id ? 'text-gold' : 'text-text-muted'}`} />
                            <span className="truncate">{item.q}</span>
                          </div>
                          <span className="text-[9px] text-gold font-mono uppercase tracking-widest shrink-0 ml-2">Tap to Fill</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 3: LEGAL VERIFICATION & METADATA */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="font-serif text-3xl font-bold">
                    <span className="text-gold">{t('verification')}</span>
                  </h1>
                  <p className="text-text-secondary mt-2 text-sm">
                    {t('finalizeLegal')}
                  </p>
                </div>

                {/* Terms Box */}
                <div className="glass-card p-5 space-y-4">
                  <h3 className="font-medium text-sm">{t('termsTitle')}</h3>
                  <div className="h-40 overflow-y-auto no-scrollbar text-xs text-text-secondary space-y-3 bg-dark p-4 rounded-lg border border-dark-border">
                    <p><strong className="text-text-primary">{t('terms1').split(':')[0]}:</strong>{t('terms1').split(':')[1]}</p>
                    <p><strong className="text-text-primary">{t('terms2').split(':')[0]}:</strong>{t('terms2').split(':')[1]}</p>
                    <p><strong className="text-text-primary">{t('terms3').split(':')[0]}:</strong>{t('terms3').split(':')[1]}</p>
                    <p><strong className="text-text-primary">{t('terms4').split(':')[0]}:</strong>{t('terms4').split(':')[1]}</p>
                    <p><strong className="text-text-primary">{t('terms5').split(':')[0]}:</strong>{t('terms5').split(':')[1]}</p>
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer group mt-2">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-success border-success' : 'border-dark-border group-hover:border-gold'}`}>
                      {agreed && <CheckCircle2 className="w-3 h-3 text-dark" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                    <span className={`text-sm ${agreed ? 'text-success' : 'text-text-primary'}`}>{t('agreeTerms')}</span>
                  </label>
                </div>

                {/* Digital Signature */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-xs text-text-secondary uppercase tracking-wider">{t('digitalSignature')}</label>
                    <button onClick={clearSignature} className="text-[10px] text-text-muted hover:text-gold uppercase tracking-widest">{t('clear')}</button>
                  </div>
                  <div className="border-2 border-dashed border-dark-border rounded-xl bg-dark-surface overflow-hidden relative">
                    <canvas 
                      ref={signatureRef} 
                      width={600} 
                      height={120} 
                      className="w-full h-[120px] cursor-crosshair touch-none"
                    />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                      <span className="font-serif text-2xl italic">{t('signHere')}</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button className="text-[10px] text-gold uppercase tracking-widest hover:text-white transition-colors">{t('typeName')}</button>
                  </div>
                </div>

                {/* Metadata Dashboard */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { label: t('location'), value: metadata.location },
                    { label: t('dateTime'), value: metadata.time },
                    { label: t('deviceId'), value: metadata.deviceId },
                    { label: t('timezone'), value: metadata.timezone },
                  ].map((meta, i) => (
                    <div key={i} className="bg-dark-surface border border-dark-border rounded-xl p-3">
                      <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">{meta.label}</div>
                      <div className="font-mono text-xs text-gold truncate">{meta.value || "..."}</div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION MODAL */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                {selectedLibraryItem && (
                  <div className="mb-4 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>{lang === 'es' ? 'Expediente del Inventario' : 'Inventory Record'}</span>
                  </div>
                )}

                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </motion.div>
                
                <h1 className="font-serif text-3xl font-bold mb-2">
                  {selectedLibraryItem 
                    ? (lang === 'es' ? "Expediente Guardado" : "Saved Dossier") 
                    : t('submitted')}
                </h1>
                <p className="text-text-secondary text-sm max-w-[320px]">
                  {selectedLibraryItem 
                    ? (lang === 'es' ? "Visualizando este artículo histórico guardado localmente en su biblioteca de inventario." : "Viewing historical appraisal record stored in your persistent local inventory library.") 
                    : t('submittedDesc')}
                </p>

                {/* EXPAND FULL-SCREEN DOSSIER ACTION BUTTON */}
                <button
                  onClick={() => openExpandedDossier()}
                  className="w-full mt-5 py-3.5 px-4 bg-gradient-to-r from-gold via-gold-light to-gold text-dark font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 hover:brightness-110 transition-all shadow-[0_8px_25px_rgba(201,169,98,0.3)] group"
                >
                  <Maximize2 className="w-4 h-4 text-dark group-hover:scale-110 transition-transform" />
                  <span>{lang === 'es' ? 'Ver Expediente Completo (Print-Ready Document)' : 'Expand Full Official Dossier (Print-Ready)'}</span>
                </button>

                {/* Accounted Structured Data Summary */}
                <div className="glass-card w-full mt-6 p-5 space-y-3 text-left border-gold/20">
                  <h3 className="text-xs text-gold font-bold uppercase tracking-widest border-b border-dark-border pb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-gold" />
                    <span>Structured Item Dossier Overview</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div className="bg-dark/40 p-2 rounded-lg border border-dark-border">
                      <span className="text-text-muted block mb-0.5">Category</span>
                      <span className="text-white font-medium">{formData.category || "Unspecified"}</span>
                    </div>
                    <div className="bg-dark/40 p-2 rounded-lg border border-dark-border">
                      <span className="text-text-muted block mb-0.5">Brand</span>
                      <span className="text-white font-medium">{formData.brand || "Unspecified"}</span>
                    </div>
                    <div className="bg-dark/40 p-2 rounded-lg border border-dark-border">
                      <span className="text-text-muted block mb-0.5">Model / Reference</span>
                      <span className="text-white font-medium truncate block">{formData.model || "Unspecified"}</span>
                    </div>
                    <div className="bg-dark/40 p-2 rounded-lg border border-dark-border">
                      <span className="text-text-muted block mb-0.5">Condition</span>
                      <span className="text-gold font-medium">{CONDITIONS[formData.condition]}</span>
                    </div>
                    <div className="bg-dark/40 p-2 rounded-lg border border-dark-border col-span-2">
                      <span className="text-text-muted block mb-0.5">Estimated Value</span>
                      <span className="text-white font-mono font-medium">
                        {formData.estimatedValue ? `${parseFloat(formData.estimatedValue.replace(/,/g, '')).toLocaleString()} ${formData.currency}` : "Not declared"}
                      </span>
                    </div>
                  </div>

                  {scannedCert && (
                    <div className="bg-success/5 border border-success/20 p-2.5 rounded-lg text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-text-secondary">
                        Warranty certificate OCR verified. Serial linked: <strong className="text-success font-mono">{scannedCert.ocr.serial}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* EXCEL EXPORT BUTTON CARD */}
                <div className="w-full mt-4 p-5 rounded-2xl bg-dark-surface border border-gold/30 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Generate Business Invoice & Excel sheet</h4>
                    <p className="text-xs text-text-secondary mt-1 max-w-[280px]">
                      Extract the complete authenticated metadata structures into an Excel-ready CSV sheet.
                    </p>
                  </div>
                  <button
                    onClick={exportToCSV}
                    className="w-full py-3 bg-gold hover:bg-gold-light text-dark font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(201,169,98,0.2)]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Excel Sheet (.CSV)</span>
                  </button>
                </div>

      {/* VOICE ASSISTANT FORM FILLER MODAL */}
      <AnimatePresence>
        {showVoiceRecorder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto"
          >
            <div className="w-full max-w-lg bg-dark-surface border border-dark-border rounded-3xl p-6 relative flex flex-col max-h-[90vh] overflow-hidden">
              
              <button 
                onClick={() => {
                  setShowVoiceRecorder(false);
                  setVoiceStep("idle");
                  setVoiceStructuredPreview(null);
                  setVoiceSelectedPresetId(null);
                }}
                className="absolute top-4 right-4 p-2 bg-dark rounded-full text-text-secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold animate-pulse">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">AI Voice Form Assistant</h2>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest">Dictate & Auto-Structure Data</p>
                </div>
              </div>

              {/* VOICE STEPS */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-6 min-h-[250px] flex flex-col justify-center">
                
                {voiceStep === "idle" && (
                  <div className="text-center py-4 space-y-6">
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={startRealVoiceDictation}
                        className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center mb-3 group hover:border-gold hover:bg-gold/20 transition-all relative shadow-[0_0_25px_rgba(201,169,98,0.25)]"
                      >
                        <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping pointer-events-none" />
                        <Mic className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
                      </button>
                      <h3 className="text-sm font-bold text-white">{lang === 'es' ? 'Iniciar Dictado por Voz Real' : 'Start Real Voice Dictation'}</h3>
                      <p className="text-xs text-text-secondary mt-1 max-w-[300px] mx-auto">
                        {lang === 'es' 
                          ? 'Toque el micrófono y hable libremente. La IA estructurará marca, modelo y valor automáticamente.'
                          : 'Tap microphone and speak freely. AI will parse brand, model, condition, and estimated value.'}
                      </p>

                      {speechError && (
                        <p className="text-xs text-amber-400 mt-2 bg-amber-400/10 p-2 rounded border border-amber-400/20 max-w-xs">
                          {speechError}
                        </p>
                      )}
                    </div>

                    <div className="border-t border-dark-border/60 pt-4 text-left">
                      <p className="text-xs text-gold font-bold uppercase tracking-widest mb-3 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'O seleccione un dictado de prueba multilingüe:' : 'Or select a multi-lingual preset dictation:'}</span>
                      </p>
                      
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {VOICE_PRESETS.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => triggerVoicePreset(p.id)}
                            className="w-full p-3 bg-dark/40 hover:bg-gold/5 hover:border-gold/30 border border-dark-border rounded-xl text-left transition-all flex items-start gap-2.5"
                          >
                            <span className="text-xs font-serif uppercase bg-dark px-2 py-0.5 rounded border border-dark-border text-gold-light mt-0.5">{p.flag}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white truncate">{p.title}</p>
                              <p className="text-[10px] text-text-secondary truncate italic mt-0.5">"{p.speech}"</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {voiceStep === "listening" && (
                  <div className="text-center py-4 space-y-5">
                    {/* Audio Equalizer Visualizer */}
                    <div className="flex items-center justify-center gap-1.5 h-16">
                      {[...Array(16)].map((_, i) => {
                        const barHeight = Math.max(12, Math.min(60, (micVolumeLevel * 0.6) + Math.random() * 24));
                        return (
                          <motion.div 
                            key={i}
                            animate={{ height: [12, barHeight, 12] }}
                            transition={{ repeat: Infinity, duration: 0.25 + (i % 4) * 0.08, ease: "easeInOut" }}
                            className="w-1.5 bg-gradient-to-t from-gold-dark via-gold to-gold-light rounded-full"
                          />
                        );
                      })}
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-xs text-gold-light bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>{lang === 'es' ? 'GRABANDO Y ESCUCHANDO VOZ...' : 'RECORDING & STREAMING SPEECH...'}</span>
                      </div>
                    </div>

                    <div className="bg-dark/80 p-4 rounded-xl border border-dark-border text-left space-y-2">
                      <p className="text-[10px] text-text-muted uppercase font-mono tracking-wider">
                        {lang === 'es' ? 'Transcripción en Vivo:' : 'Live Spoken Transcript:'}
                      </p>
                      <textarea
                        value={voiceSpokenTranscript}
                        onChange={(e) => setVoiceSpokenTranscript(e.target.value)}
                        placeholder={lang === 'es' ? "Hablando..." : "Speaking..."}
                        rows={3}
                        className="w-full bg-transparent text-xs text-white leading-relaxed font-mono focus:outline-none resize-none border-b border-dark-border/40 pb-2"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={processSpokenVoiceToAI}
                        className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-dark font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{lang === 'es' ? 'DETENER Y PROCESAR CON IA' : 'STOP & PROCESS WITH AI'}</span>
                      </button>

                      <button
                        onClick={() => {
                          stopRealVoiceDictation();
                          setVoiceStep("idle");
                        }}
                        className="p-3 bg-dark border border-dark-border text-text-muted hover:text-white rounded-xl"
                        title={lang === 'es' ? 'Cancelar' : 'Cancel'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {(voiceStep === "transcribing" || voiceStep === "structuring") && (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-12 h-12 rounded-full border-2 border-t-gold border-r-transparent border-b-gold border-l-transparent animate-spin mx-auto" />
                    <div>
                      <h3 className="text-sm font-semibold text-white capitalize">{voiceStep}...</h3>
                      <p className="text-xs text-text-secondary mt-1">
                        {voiceStep === "transcribing" 
                          ? "Converting auditory waveforms into textual semantics..."
                          : "Extracting structured JSON parameters using Gemini API..."}
                      </p>
                    </div>
                  </div>
                )}

                {voiceStep === "ready" && voiceStructuredPreview && (
                  <div className="space-y-4">
                    <div className="bg-success/5 border border-success/30 p-3 rounded-xl flex items-center gap-2 text-xs text-success">
                      <Check className="w-4 h-4" />
                      <span>Extracted structured schema successfully via voice parsing!</span>
                    </div>

                    <div className="bg-dark border border-dark-border rounded-xl p-4 space-y-2.5 text-xs">
                      <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest border-b border-dark-border pb-1.5">GEMINI EXTRACTION LOG</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-text-muted block">Brand</span>
                          <span className="text-white font-medium">{voiceStructuredPreview.brand}</span>
                        </div>
                        <div>
                          <span className="text-text-muted block">Model / Version</span>
                          <span className="text-white font-medium">{voiceStructuredPreview.model}</span>
                        </div>
                        <div>
                          <span className="text-text-muted block">Category</span>
                          <span className="text-white font-medium">{voiceStructuredPreview.category}</span>
                        </div>
                        <div>
                          <span className="text-text-muted block">Est. Value</span>
                          <span className="text-gold font-mono font-medium">{voiceStructuredPreview.estimatedValue} {voiceStructuredPreview.currency}</span>
                        </div>
                      </div>

                      <div className="border-t border-dark-border/60 pt-2">
                        <span className="text-text-muted block mb-0.5">Summary / Notes</span>
                        <p className="text-text-secondary text-[11px] leading-relaxed italic">"{voiceStructuredPreview.description}"</p>
                      </div>
                    </div>

                    <button
                      onClick={applyVoiceData}
                      className="w-full py-3 bg-gold hover:bg-gold-light text-dark font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Apply and Fill Form</span>
                    </button>
                  </div>
                )}

              </div>

              {voiceStep !== "idle" && voiceStep !== "ready" && (
                <div className="border-t border-dark-border/60 pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setVoiceStep("idle");
                      setVoiceStructuredPreview(null);
                    }}
                    className="flex-1 py-2.5 bg-dark border border-dark-border text-text-secondary hover:text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Reset & Back
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM CERTIFICATE OCR SCANNER MODAL */}
      <AnimatePresence>
        {isOcrModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto"
          >
            <div className="w-full max-w-lg bg-dark-surface border border-dark-border rounded-3xl p-6 relative flex flex-col max-h-[90vh] overflow-hidden">
              
              <button 
                onClick={() => {
                  setIsOcrModalOpen(false);
                  setOcrScanningState("idle");
                  setOcrActiveCertId(null);
                }}
                className="absolute top-4 right-4 p-2 bg-dark rounded-full text-text-secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">AI Certificate OCR Scanner</h2>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest">Instant structured registry reading</p>
                </div>
              </div>

              {/* OCR MODAL STATES */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-5 min-h-[250px] flex flex-col justify-center">
                
                {ocrScanningState === "idle" && (
                  <div className="space-y-5">
                    
                    {/* File Dropzone Area */}
                    <div className="border-2 border-dashed border-dark-border rounded-2xl bg-dark/40 hover:bg-gold/[0.02] hover:border-gold/40 transition-all p-6 text-center relative group">
                      <input 
                        type="file" 
                        accept="image/*,application/pdf" 
                        onChange={handleCustomCertificateUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-dark flex items-center justify-center mb-3 border border-dark-border group-hover:border-gold/30 transition-all">
                          <Upload className="w-6 h-6 text-text-muted group-hover:text-gold transition-colors" />
                        </div>
                        <h4 className="text-xs font-semibold text-white">Upload Certificate or Guarantee Card</h4>
                        <p className="text-[10px] text-text-secondary mt-1">Drag and drop or click to upload (PDF, PNG, JPG)</p>
                      </div>
                    </div>

                    {/* Pre-designed Luxury Certificates List */}
                    <div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Or scan an official sample documentation:</span>
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {MOCK_CERTIFICATES.map((cert) => (
                          <button
                            key={cert.id}
                            onClick={() => triggerOcrScan(cert.id)}
                            className="p-3 bg-dark/40 hover:bg-gold/5 border border-dark-border hover:border-gold/30 rounded-xl text-left transition-all flex flex-col gap-2 relative group overflow-hidden"
                          >
                            {/* Accent badge */}
                            <span className="absolute top-2 right-2 text-[8px] bg-dark border border-dark-border text-gold px-1 rounded uppercase font-mono">{cert.ocr.brand}</span>
                            
                            <div className="w-8 h-8 rounded bg-dark border border-dark-border flex items-center justify-center text-text-muted group-hover:text-gold transition-colors">
                              <FileText className="w-4 h-4" />
                            </div>
                            
                            <div>
                              <p className="text-[11px] font-semibold text-white truncate max-w-[130px]">{cert.name}</p>
                              <p className="text-[8px] text-text-secondary mt-0.5">Ref: {cert.ocr.model}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {ocrScanningState === "scanning" && (
                  <div className="text-center py-6 space-y-6 relative">
                    
                    {/* Visual Document card under laser scanning */}
                    <div className="w-48 h-32 bg-dark/80 rounded-xl border border-gold/40 mx-auto relative overflow-hidden flex flex-col items-center justify-center p-3">
                      
                      {/* Laser sweeping line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold shadow-[0_0_10px_#c9a962] animate-scan" />
                      
                      <FileText className="w-10 h-10 text-gold-light opacity-60 mb-2" />
                      <span className="text-[10px] text-white font-semibold font-serif">
                        {MOCK_CERTIFICATES.find(c => c.id === ocrActiveCertId)?.name || "Warranty Document"}
                      </span>
                      <span className="text-[8px] text-text-muted font-mono mt-1">READING METADATA REGISTRIES</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gold font-bold uppercase tracking-widest animate-pulse font-mono">{ocrScanStepText}</p>
                      <p className="text-[10px] text-text-secondary">Securing cryptographic parameters via AI multi-angle scan...</p>
                    </div>
                  </div>
                )}

                {ocrScanningState === "completed" && (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto text-success">
                      <Check className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">OCR Parsing Completed</h3>
                      <p className="text-xs text-text-secondary mt-1">Dossier structured and copied to Form Step 2!</p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

                <div className="glass-card w-full mt-4 p-5 space-y-3 text-left border-dark-border">
                  <div className="flex justify-between items-center border-b border-dark-border pb-3">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest">{t('trackingRef')}</span>
                    <span className="font-mono text-gold text-xs">{selectedLibraryItem ? selectedLibraryItem.trackingRef : metadata.deviceId}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dark-border pb-3">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest">{t('initialScore')}</span>
                    <span className="font-mono text-white text-xs">{selectedLibraryItem ? selectedLibraryItem.confidenceScore : (confidenceScore || SIMULATED_RESPONSE.confidence)}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest">{t('status')}</span>
                    <span className="px-2.5 py-0.5 bg-warning/10 border border-warning/30 text-warning text-[10px] rounded-full font-medium">
                      {selectedLibraryItem ? (lang === 'es' ? "Archivado" : "Archived") : t('underReview')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mt-6 w-full">
                  <button 
                    onClick={resetFlow}
                    className="w-full py-3.5 border border-dark-border text-text-secondary hover:text-gold hover:border-gold font-medium rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{t('submitAnother')}</span>
                  </button>

                  {selectedLibraryItem && (
                    <button 
                      onClick={() => setIsLibraryOpen(true)}
                      className="w-full py-3.5 bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-dark font-medium rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <History className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Volver al Inventario' : 'Return to Inventory'}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* BOTTOM NAVIGATION / ACTION BAR */}
        {step < 4 && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] bg-dark/90 backdrop-blur-md border-t border-dark-border p-4 z-50">
            <div className="flex gap-3 items-center">
              {step === 1 ? (
                <>
                  <button 
                    onClick={() => setIsPhotoGuideOpen(true)}
                    className="flex-1 py-4 bg-dark-surface border border-dark-border rounded-xl text-sm font-medium hover:border-gold transition-colors"
                  >
                    {t('photoGuide')}
                  </button>
                  <button 
                    onClick={handleNextStep}
                    className="flex-1 py-4 bg-gold text-dark rounded-xl text-sm font-bold hover:bg-gold-light transition-colors shadow-[0_4px_15px_rgba(201,169,98,0.2)]"
                  >
                    {t('continue')}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex-1 py-4 bg-dark-surface border border-dark-border rounded-xl text-sm font-medium hover:border-gold text-text-secondary hover:text-white flex items-center justify-center gap-1 transition-colors"
                    title={t('back')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t('back')}</span>
                  </button>
                  
                  <button 
                    onClick={resetFlow}
                    className="px-4 py-4 bg-danger/10 hover:bg-danger/20 border border-danger/30 text-danger-light rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                    title={t('cancel')}
                  >
                    <X className="w-4 h-4 text-danger-light" />
                    <span className="hidden sm:inline">{t('cancel')}</span>
                  </button>
                  
                  <button 
                    onClick={handleNextStep}
                    className="flex-[1.5] py-4 bg-gold text-dark rounded-xl text-sm font-bold hover:bg-gold-light transition-colors shadow-[0_4px_15px_rgba(201,169,98,0.2)]"
                  >
                    {step === 3 ? t('submitToPipeline') : t('continue')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* PREMIUM QR CODE SCANNER MODAL */}
      <AnimatePresence>
        {isQrModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto"
          >
            <div className="w-full max-w-lg bg-dark-surface border border-dark-border rounded-3xl p-6 relative flex flex-col max-h-[90vh] overflow-hidden">
              
              <button 
                onClick={() => {
                  setIsQrModalOpen(false);
                  setQrScanningState("idle");
                  setQrActiveTagId(null);
                }}
                className="absolute top-4 right-4 p-2 bg-dark rounded-full text-text-secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">Cryptographic QR Tag Scanner</h2>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest">Scan physical luxury security tags</p>
                </div>
              </div>

              {/* QR SCANNER MODAL STATES */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-5 min-h-[280px] flex flex-col justify-center">
                
                {qrScanningState === "idle" && (
                  <div className="space-y-5">
                    
                    {/* Live Camera Viewfinder */}
                    <div className="relative aspect-[4/3] w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-dark-border bg-dark/80 flex flex-col items-center justify-center p-2 group">
                      
                      {isLiveCameraActive ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-center p-4">
                          <Scan className="w-10 h-10 text-gold/60 mb-2 animate-pulse" />
                          <h4 className="text-xs font-semibold text-white">
                            {lang === 'es' ? 'Escáner de Código QR de Artículos' : 'Place QR Tag Inside the Frame'}
                          </h4>
                          <p className="text-[10px] text-text-secondary mt-1 max-w-[220px]">
                            {lang === 'es' 
                              ? 'Active la cámara para escanear etiquetas de seguridad físicas' 
                              : 'Scan physical hardware credentials off your watch, handbag, or jewelry card'}
                          </p>
                          <button
                            onClick={() => startLiveCamera('environment')}
                            className="mt-3 px-3 py-1.5 bg-gold text-dark font-bold text-[11px] uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-gold-light transition-all shadow-md"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{lang === 'es' ? 'Activar Cámara en Vivo' : 'Activate Live Camera'}</span>
                          </button>
                        </div>
                      )}

                      {/* Scanning brackets */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/60 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/60 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/60 pointer-events-none" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/60 pointer-events-none" />

                      {/* Moving laser scan line */}
                      <div className="scan-line pointer-events-none" />
                    </div>

                    {/* Pre-designed Luxury QR Tags List */}
                    <div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>Or simulate scanning a physical item tag:</span>
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {MOCK_QR_TAGS.map((tag) => (
                          <button
                            key={tag.id}
                            onClick={() => triggerQrScan(tag.id)}
                            className="p-3 bg-dark/40 hover:bg-gold/5 border border-dark-border hover:border-gold/30 rounded-xl text-left transition-all flex flex-col gap-2 relative group overflow-hidden"
                          >
                            <span className="absolute top-2 right-2 text-[8px] bg-dark border border-dark-border text-gold px-1 rounded uppercase font-mono">{tag.brand}</span>
                            
                            <div className="w-8 h-8 rounded bg-dark border border-dark-border flex items-center justify-center text-text-muted group-hover:text-gold transition-colors">
                              <QrCode className="w-4 h-4" />
                            </div>
                            
                            <div>
                              <p className="text-[11px] font-semibold text-white truncate max-w-[130px]">{tag.model}</p>
                              <p className="text-[8px] text-text-secondary mt-0.5">Chip: {tag.id}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Auto-scan Random Tag Button */}
                    <button
                      onClick={() => {
                        const randomTag = MOCK_QR_TAGS[Math.floor(Math.random() * MOCK_QR_TAGS.length)];
                        triggerQrScan(randomTag.id);
                      }}
                      className="w-full py-3 bg-gold hover:bg-gold-light text-dark font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Auto-Scan Random Tag</span>
                    </button>

                  </div>
                )}

                {qrScanningState === "scanning" && (
                  <div className="text-center py-6 space-y-6 relative">
                    
                    {/* Visual QR Card under laser scanning */}
                    <div className="w-44 h-44 bg-dark/80 rounded-2xl border-2 border-gold mx-auto relative overflow-hidden flex flex-col items-center justify-center p-3 shadow-2xl">
                      
                      {/* Laser sweeping line */}
                      <div className="scan-line" />
                      
                      <QrCode className="w-20 h-20 text-gold-light opacity-80 mb-2 animate-pulse" />
                      <span className="text-[9px] text-white font-mono font-bold tracking-wider">
                        {MOCK_QR_TAGS.find(t => t.id === qrActiveTagId)?.id || "TAG_ID"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gold font-bold uppercase tracking-widest animate-pulse font-mono">{qrScanStepText}</p>
                      <p className="text-[10px] text-text-secondary">Resolving photographic signature & matching manufacturer database...</p>
                    </div>
                  </div>
                )}

                {qrScanningState === "completed" && (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto text-success">
                      <Check className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Physical Tag Verified</h3>
                      <p className="text-xs text-text-secondary mt-1">Cryptographic metadata read and imported successfully!</p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHOTO TIPS GUIDE MODAL */}
      <AnimatePresence>
        {isPhotoGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-6"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-full max-w-[600px] bg-dark-elevated rounded-t-3xl sm:rounded-3xl border border-dark-border max-h-[85vh] flex flex-col"
            >
              <div className="p-6 border-b border-dark-border flex justify-between items-center sticky top-0 bg-dark-elevated rounded-t-3xl sm:rounded-3xl">
                <h2 className="font-serif text-2xl font-bold">Photo Tips <span className="text-gold">Guide</span></h2>
                <button onClick={() => setIsPhotoGuideOpen(false)} className="p-2 bg-dark rounded-full text-text-secondary hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                {[
                  { title: "Watch Photography", desc: "Main face-up shot, Dial close-up, Case thickness profile, Case back markings, Bracelet/clasp engravings, Lugs serial data." },
                  { title: "Handbag Photography", desc: "Full upright front perspective, Logo/hardware branding stamps, Interior layout/date codes, High-resolution stitch details, Zippers/clasps/feet structural views, Dust bag/packaging presence." },
                  { title: "Jewelry Photography", desc: "Centered white backdrop arrangement, Internal band/clasp hallmarks, Gemstone macro clarity shots, Scale weight calculations, Certificates." },
                  { title: "Car Photography", desc: "Three-quarter front profiling, Dashboard/door jamb VIN typography, Clean engine bay framing, Interior cabin odometer layout, Rims/caliper structure, Logbooks." },
                  { title: "Art Photography", desc: "Flat non-glare frontal alignment, Macro artist signature details, Verso gallery markings/backboard stamps, Frame detailing, Authenticity declarations, Physical measurement reference." },
                  { title: "Wine/Spirits Photography", desc: "Upright front bottle layout, High-clarity vintage label alignment, Foil capsule top status, Ullage liquid fill line check, Back distributor label, Wooden case or original presentation boxes." },
                  { title: "Universal Guardrails", desc: "Strictly soft natural daylight over raw electronic flashes; neutral noise-free staging surfaces; verified manual focal clarity; maximum smartphone output settings; complete exclusion of artificial beauty filters; 3-angle minimum arrays; wiped lenses.", isAlert: true }
                ].map((tip, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${tip.isAlert ? 'bg-warning/5 border-warning/30' : 'bg-dark-surface border-dark-border'}`}>
                    <h3 className={`font-medium mb-2 ${tip.isAlert ? 'text-warning uppercase tracking-wider text-xs' : 'text-gold'}`}>{tip.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INVENTORY LIBRARY & MATCHMAKING MODAL */}
      <AnimatePresence>
        {isLibraryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/85 backdrop-blur-md flex items-end justify-center sm:items-center sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-full max-w-[650px] bg-dark-elevated rounded-t-3xl sm:rounded-3xl border border-dark-border max-h-[90vh] flex flex-col overflow-hidden shadow-2xl my-auto"
            >
              {/* Header */}
              <div className="p-5 border-b border-dark-border flex justify-between items-center sticky top-0 bg-dark-elevated z-20">
                <div>
                  <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                    <Gem className="w-6 h-6 text-gold animate-pulse" />
                    <span>{lang === 'es' ? 'Mercado &' : 'Luxury'} <span className="text-gold">{lang === 'es' ? 'Coincidencias' : 'Matchmaking Vault'}</span></span>
                  </h2>
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">
                    {lang === 'es' ? 'Historial de publicaciones, perfil demográfico y clientes buscando relojes' : 'Posting history, user demographics & verified buyer matching'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsLibraryOpen(false)} 
                  className="p-2 bg-dark rounded-full text-text-secondary hover:text-white hover:bg-dark-surface transition-all focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="flex border-b border-dark-border bg-dark/60 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setLibraryTab('history')}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                    libraryTab === 'history'
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Historial Publicaciones' : 'Postings History'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-dark border border-dark-border font-mono">
                    {inventory.length}
                  </span>
                </button>

                <button
                  onClick={() => setLibraryTab('matches')}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                    libraryTab === 'matches'
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Clientes Buscando Relojes' : 'Client Watch Requests'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                    {clientRequests.length}
                  </span>
                </button>

                <button
                  onClick={() => setLibraryTab('new_request')}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                    libraryTab === 'new_request'
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Pedir Pieza (ISO)' : 'Post Want-To-Buy'}</span>
                </button>

                <button
                  onClick={() => setLibraryTab('profile')}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                    libraryTab === 'profile'
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Perfil Demográfico' : 'User Demographics'}</span>
                </button>

                <button
                  onClick={() => setLibraryTab('curatedlux_ops')}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                    libraryTab === 'curatedlux_ops'
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>{lang === 'es' ? 'Mesa de Operaciones (Escala)' : 'CuratedLux Ops Desk'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-gold text-dark font-mono font-bold">
                    SCALE
                  </span>
                </button>

                <button
                  onClick={() => setLibraryTab('whatsapp_telegram')}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                    libraryTab === 'whatsapp_telegram'
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  <Watch className="w-4 h-4 text-gold animate-pulse" />
                  <span>{lang === 'es' ? 'WhatsApp / Telegram' : 'WhatsApp / Telegram'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-gold/20 text-gold font-mono font-bold border border-gold/40">
                    FORMAT GUIDE & AI PARSER
                  </span>
                </button>
              </div>

              {/* TAB 1: POSTINGS HISTORY */}
              {libraryTab === 'history' && (
                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                  {/* Status filter buttons */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-text-secondary font-mono uppercase tracking-wider text-[10px]">
                      {lang === 'es' ? 'Filtrar por estado:' : 'Filter Status:'}
                    </span>
                    <div className="flex gap-1">
                      {[
                        { id: 'all', label: lang === 'es' ? 'Todos' : 'All' },
                        { id: 'active_listing', label: lang === 'es' ? 'En Venta' : 'Active Listing' },
                        { id: 'matched_with_buyer', label: lang === 'es' ? 'Con Coincidencia' : 'Matched' },
                        { id: 'appraised_only', label: lang === 'es' ? 'Solo Tasado' : 'Appraised Only' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setPostingFilter(f.id as any)}
                          className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                            postingFilter === f.id
                              ? 'bg-gold text-dark font-bold'
                              : 'bg-dark border border-dark-border text-text-secondary hover:text-white'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {inventory.length === 0 ? (
                    <div className="py-16 text-center space-y-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-dark/50 border border-dark-border flex items-center justify-center text-text-muted">
                        <History className="w-8 h-8 opacity-40" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {lang === 'es' ? 'No se encontraron publicaciones' : 'No postings recorded'}
                        </h3>
                        <p className="text-xs text-text-secondary mt-1.5 max-w-[300px] mx-auto leading-relaxed">
                          {lang === 'es' 
                            ? 'Complete una tasación para publicar sus relojes o artículos de lujo en el historial.' 
                            : 'Appraise and complete a luxury item to store it in your active posting history.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inventory
                        .filter(item => {
                          if (postingFilter === 'all') return true;
                          const status = item.postingStatus || 'active_listing';
                          return status === postingFilter;
                        })
                        .map((item) => {
                          const isCurrent = item.id === selectedLibraryItemId;
                          const currentStatus = item.postingStatus || 'active_listing';
                          
                          // Find highest match score among client requests
                          const matches = clientRequests
                            .map(req => ({ req, match: calculateMatchScore(item, req) }))
                            .filter(m => m.match.score >= 50)
                            .sort((a, b) => b.match.score - a.match.score);

                          const bestMatch = matches[0];

                          return (
                            <div
                              key={item.id}
                              className={`p-4 rounded-xl border text-left transition-all relative group overflow-hidden ${
                                isCurrent
                                  ? 'bg-gold/5 border-gold shadow-[0_0_15px_rgba(201,169,98,0.1)]'
                                  : 'bg-dark-surface border-dark-border hover:border-gold/30'
                              }`}
                            >
                              <div className="flex gap-4 items-start">
                                {/* Thumbnail */}
                                <div className="w-20 h-20 rounded-lg bg-dark border border-dark-border overflow-hidden flex-shrink-0 relative">
                                  {item.imageSrc ? (
                                    <img
                                      src={item.imageSrc}
                                      alt={item.formData.model}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                                      <Gem className="w-6 h-6" />
                                    </div>
                                  )}
                                  
                                  <div className="absolute bottom-0 inset-x-0 bg-dark/90 text-[8px] text-gold font-mono font-bold text-center py-0.5 border-t border-dark-border">
                                    {item.confidenceScore}% Acc
                                  </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h4 className="text-sm font-semibold text-white truncate">
                                        {item.formData.brand} <span className="text-text-secondary font-normal font-serif text-xs">{item.formData.model}</span>
                                      </h4>
                                      <p className="text-[10px] text-text-secondary truncate mt-0.5 font-mono">
                                        Ref ID: {item.trackingRef || item.id} • {item.timestamp}
                                      </p>
                                    </div>

                                    {/* Delete icon */}
                                    <button
                                      onClick={(e) => deleteLibraryItem(item.id, e)}
                                      className="p-1 text-text-muted hover:text-warning hover:bg-warning/10 rounded transition-colors focus:outline-none shrink-0"
                                      title={lang === 'es' ? 'Eliminar publicación' : 'Delete posting'}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  {/* Badges & Status */}
                                  <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-[10px] px-2 py-0.5 bg-dark border border-dark-border text-gold font-mono font-bold rounded">
                                      {item.formData.estimatedValue ? `${item.formData.currency || 'USD'} $${Number(item.formData.estimatedValue).toLocaleString()}` : 'N/A'}
                                    </span>

                                    <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-semibold uppercase ${
                                      currentStatus === 'matched_with_buyer'
                                        ? 'bg-gold/20 text-gold border border-gold/40'
                                        : currentStatus === 'active_listing'
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                    }`}>
                                      {currentStatus === 'matched_with_buyer' ? (lang === 'es' ? '✓ Coincidencia con Comprador' : '✓ Buyer Matched') :
                                       currentStatus === 'active_listing' ? (lang === 'es' ? '● En Venta Mercado' : '● Active Listing') : (lang === 'es' ? '🔒 Solo Bóveda' : '🔒 Appraised Only')}
                                    </span>
                                  </div>

                                  {/* Best Match alert if available */}
                                  {bestMatch && (
                                    <div className="mt-3 p-2 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-between text-[11px]">
                                      <div className="flex items-center gap-1.5">
                                        <BadgeCheck className="w-4 h-4 text-gold shrink-0" />
                                        <span className="text-white font-medium">
                                          {lang === 'es' ? 'Comprador Matcheado:' : 'Matched Buyer:'} <strong className="text-gold">{bestMatch.req.clientName}</strong> ({bestMatch.req.location})
                                        </span>
                                      </div>
                                      <span className="px-2 py-0.5 bg-gold text-dark font-mono font-extrabold rounded text-[10px]">
                                        {bestMatch.match.score}% MATCH
                                      </span>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-dark-border/60">
                                    <button
                                      onClick={() => openExpandedDossier(item)}
                                      className="text-[11px] text-gold hover:underline font-mono flex items-center gap-1 font-semibold"
                                    >
                                      <Maximize2 className="w-3.5 h-3.5 text-gold" />
                                      <span>{lang === 'es' ? 'Ver Expediente Completo' : 'View Full Dossier'}</span>
                                    </button>

                                    <button
                                      onClick={() => {
                                        const nextStatus = currentStatus === 'active_listing' ? 'appraised_only' : 'active_listing';
                                        const updatedInv = inventory.map(invItem => 
                                          invItem.id === item.id ? { ...invItem, postingStatus: nextStatus } : invItem
                                        );
                                        setInventory(updatedInv);
                                        localStorage.setItem("luxury_appraisal_inventory", JSON.stringify(updatedInv));
                                        setPremiumToast({
                                          message: lang === 'es' 
                                            ? `Estado cambiado a ${nextStatus === 'active_listing' ? 'En Venta' : 'Solo Bóveda'}` 
                                            : `Posting status updated to ${nextStatus === 'active_listing' ? 'Active Market' : 'Vault Only'}`,
                                          type: "gold"
                                        });
                                      }}
                                      className="text-[10px] text-text-secondary hover:text-white font-mono bg-dark px-2.5 py-1 rounded border border-dark-border transition-colors"
                                    >
                                      {lang === 'es' ? 'Cambiar Estado' : 'Toggle Status'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CLIENT WATCH REQUESTS & MATCHMAKING */}
              {libraryTab === 'matches' && (
                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                  <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gold shrink-0 animate-pulse" />
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {lang === 'es'
                        ? 'Sistema de Coincidencia de Lujo: Algoritmo que conecta publicaciones de vendedores con compradores verificados de alto nivel.'
                        : 'Luxury Match Engine: Connects verified collector "Want-To-Buy" requests directly with appraised seller inventory.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {clientRequests.map((req) => {
                      // Find best matching inventory item
                      const inventoryMatches = inventory.map(item => ({
                        item,
                        match: calculateMatchScore(item, req)
                      })).sort((a, b) => b.match.score - a.match.score);

                      const topMatch = inventoryMatches[0];

                      return (
                        <div
                          key={req.id}
                          className="p-4 rounded-xl bg-dark-surface border border-dark-border hover:border-gold/40 transition-all space-y-3"
                        >
                          {/* Client Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={req.avatar}
                                alt={req.clientName}
                                className="w-11 h-11 rounded-full object-cover border border-gold/40 shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="text-sm font-semibold text-white">{req.clientName}</h4>
                                  {req.verified && <BadgeCheck className="w-4 h-4 text-gold shrink-0" />}
                                </div>
                                <p className="text-[10px] text-text-secondary font-mono flex items-center gap-2">
                                  <span className="text-gold font-medium">{req.vipTier}</span> • <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {req.location}</span>
                                </p>
                              </div>
                            </div>

                            <span className="px-2.5 py-1 bg-dark border border-gold/30 text-gold text-xs font-mono font-bold rounded">
                              Max ${req.maxBudget.toLocaleString()} {req.currency}
                            </span>
                          </div>

                          {/* Request details */}
                          <div className="p-3 rounded-lg bg-dark/60 border border-dark-border space-y-2">
                            <div className="flex items-center justify-between text-xs font-medium">
                              <span className="text-white flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5 text-gold" />
                                {lang === 'es' ? 'Buscando:' : 'Looking For:'} <strong className="text-gold">{req.lookingForBrand} {req.lookingForModel}</strong>
                              </span>
                              <span className="text-[10px] text-text-muted font-mono uppercase">{req.lookingForCategory}</span>
                            </div>
                            <p className="text-xs text-text-secondary leading-normal italic">
                              "{req.notes}"
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-[10px] text-text-muted pt-1">
                              <span className="px-2 py-0.5 bg-dark border border-dark-border rounded text-emerald-400 font-mono">
                                ⚡ {req.urgency}
                              </span>
                              <span className="px-2 py-0.5 bg-dark border border-dark-border rounded font-mono">
                                🔒 {req.contactPreference}
                              </span>
                            </div>
                          </div>

                          {/* Top Match Result against user inventory */}
                          {topMatch && topMatch.match.score >= 40 ? (
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-emerald-400 font-mono">
                                    {topMatch.match.score}% MATCH EN TU INVENTARIO
                                  </span>
                                </div>
                                <p className="text-[11px] text-text-secondary truncate mt-0.5">
                                  {topMatch.item.formData.brand} {topMatch.item.formData.model} (${Number(topMatch.item.formData.estimatedValue).toLocaleString()})
                                </p>
                              </div>

                              <button
                                onClick={() => {
                                  setPremiumToast({
                                    message: lang === 'es'
                                      ? `Propuesta de coincidencia enviada a la mesa privada de ${req.clientName}`
                                      : `Match offer dispatched to ${req.clientName}'s private concierge desk!`,
                                    type: "gold"
                                  });
                                }}
                                className="px-3 py-1.5 bg-gold text-dark text-xs font-bold rounded-lg hover:bg-gold-light transition-colors shrink-0 flex items-center gap-1 shadow-md"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>{lang === 'es' ? 'Enviar Oferta' : 'Send Match Offer'}</span>
                              </button>
                            </div>
                          ) : (
                            <div className="p-2.5 rounded-lg bg-dark/40 border border-dark-border/80 flex items-center justify-between text-[11px] text-text-secondary">
                              <span>{lang === 'es' ? 'Sin inventario directo de coincidencia alta.' : 'No direct high-score inventory match.'}</span>
                              <button
                                onClick={() => setLibraryTab('new_request')}
                                className="text-gold font-mono hover:underline text-[10px]"
                              >
                                {lang === 'es' ? '+ Agregar requerimiento' : '+ Add criteria'}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: POST WANT-TO-BUY REQUEST */}
              {libraryTab === 'new_request' && (
                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                  <div className="p-3 bg-dark-surface border border-dark-border rounded-xl">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-gold" />
                      <span>{lang === 'es' ? 'Publicar Demanda de Reloj / Artículo de Lujo' : 'Post "In Search Of" Luxury Demand'}</span>
                    </h3>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      {lang === 'es'
                        ? 'Indique qué reloj o pieza de colección busca para que los vendedores y tasadores de la red se pongan en contacto.'
                        : 'Define the exact timepiece or luxury item you want so top sellers & vault appraisers can match with you.'}
                    </p>
                  </div>

                  <form onSubmit={handleCreateClientRequest} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Categoría' : 'Category'}
                        </label>
                        <select
                          value={newReqForm.lookingForCategory}
                          onChange={(e) => setNewReqForm({ ...newReqForm, lookingForCategory: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Watch">Watch / Reloj</option>
                          <option value="Handbag">Handbag / Bolso</option>
                          <option value="Jewelry">Jewelry / Joyería</option>
                          <option value="Fine Art">Fine Art / Arte</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Marca *' : 'Brand *'}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rolex, Patek Philippe"
                          value={newReqForm.lookingForBrand}
                          onChange={(e) => setNewReqForm({ ...newReqForm, lookingForBrand: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Modelo / Ref. *' : 'Model / Reference *'}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Daytona 116500LN"
                          value={newReqForm.lookingForModel}
                          onChange={(e) => setNewReqForm({ ...newReqForm, lookingForModel: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Presupuesto Máx (USD) *' : 'Max Budget (USD) *'}
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 45000"
                          value={newReqForm.maxBudget}
                          onChange={(e) => setNewReqForm({ ...newReqForm, maxBudget: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Urgencia de Compra' : 'Buying Urgency'}
                        </label>
                        <select
                          value={newReqForm.urgency}
                          onChange={(e) => setNewReqForm({ ...newReqForm, urgency: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Immediate Wire Ready">Immediate Wire Ready</option>
                          <option value="Active Escrow Open">Active Escrow Open</option>
                          <option value="30-Day Decision Window">30-Day Decision Window</option>
                          <option value="Portfolio Investment Seeking">Portfolio Investment Seeking</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Canal de Contacto' : 'Contact Channel'}
                        </label>
                        <select
                          value={newReqForm.contactPreference}
                          onChange={(e) => setNewReqForm({ ...newReqForm, contactPreference: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Encrypted Concierge Signal">Encrypted Concierge Signal</option>
                          <option value="Private Escrow Desk">Private Escrow Desk</option>
                          <option value="Verified Email">Verified Email</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                        {lang === 'es' ? 'Notas / Especificaciones (Dial, Caja, Año)' : 'Notes / Dial & Box Requirements'}
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Seeking complete set with original guarantee card & unpolished case."
                        value={newReqForm.notes}
                        onChange={(e) => setNewReqForm({ ...newReqForm, notes: e.target.value })}
                        className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-dark font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition-opacity shadow-lg flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Activar Publicación de Demanda' : 'Publish Want-To-Buy Demand'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: USER DEMOGRAPHICS & PROFILE */}
              {libraryTab === 'profile' && (
                <div className="p-6 overflow-y-auto space-y-5 flex-1">
                  <div className="p-4 bg-dark-surface border border-gold/30 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold font-serif text-lg font-bold">
                        {userProfile.fullName ? userProfile.fullName.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                          {userProfile.fullName}
                          <BadgeCheck className="w-4 h-4 text-gold shrink-0" />
                        </h3>
                        <p className="text-[11px] text-text-secondary font-mono">
                          {userProfile.vipTier} • {userProfile.verificationStatus}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 bg-gold/10 text-gold border border-gold/30 text-[10px] font-mono font-bold uppercase rounded">
                      {userProfile.userRole}
                    </span>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveUserProfile(userProfile);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Nombre Completo' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          value={userProfile.fullName}
                          onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Rol Principal' : 'Primary User Type'}
                        </label>
                        <select
                          value={userProfile.userRole}
                          onChange={(e) => setUserProfile({ ...userProfile, userRole: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        >
                          <option value="seller">Seller / Watch Dealer (Vendedor)</option>
                          <option value="buyer">Collector / Buyer (Comprador)</option>
                          <option value="appraiser">Vault Appraiser (Tasador)</option>
                          <option value="hybrid">Hybrid Investor (Inversionista)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Teléfono' : 'Phone Number'}
                        </label>
                        <input
                          type="text"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          {lang === 'es' ? 'Ubicación / Ciudad' : 'Location / City'}
                        </label>
                        <input
                          type="text"
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                          Nivel VIP
                        </label>
                        <select
                          value={userProfile.vipTier}
                          onChange={(e) => setUserProfile({ ...userProfile, vipTier: e.target.value })}
                          className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Sovereign Circle">Sovereign Circle</option>
                          <option value="Platinum Vault">Platinum Vault</option>
                          <option value="Gold VIP">Gold VIP</option>
                          <option value="Silver Member">Silver Member</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-text-secondary uppercase font-mono tracking-wider block mb-1">
                        {lang === 'es' ? 'Marcas de Interés' : 'Preferred Brands'}
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(userProfile.preferredBrands) ? userProfile.preferredBrands.join(", ") : userProfile.preferredBrands}
                        onChange={(e) => setUserProfile({ ...userProfile, preferredBrands: e.target.value.split(",").map(s => s.trim()) })}
                        className="w-full bg-dark border border-dark-border rounded-lg p-2 text-xs text-white focus:border-gold focus:outline-none"
                        placeholder="e.g. Rolex, Patek Philippe, Audemars Piguet"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gold text-dark font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-light transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Guardar Perfil Demográfico' : 'Save Demographic Profile'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: CURATEDLUX OPS DESK (ANTI-CHAT SCALE ENGINE) */}
              {libraryTab === 'curatedlux_ops' && (
                <div className="p-6 overflow-y-auto space-y-5 flex-1">
                  {/* CuratedLux Operations Header */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-dark-surface via-gold/10 to-dark-surface border border-gold/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-gold shrink-0 animate-pulse" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                          {lang === 'es' ? 'CuratedLux • Mesa de Operaciones y Escala' : 'CuratedLux • Scale Trade Intake & Ops Desk'}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                        100% STRUCTURED
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {lang === 'es'
                        ? 'Resuelve el problema de escalabilidad eliminando chats grupales no estructurados (WhatsApp/Telegram). Todas las piezas y compradores pasan por esquemas estructurados con valoración, verificación y bloqueo de depósito en garantía (Escrow).'
                        : 'Solves platform scale bottlenecks by eliminating unstructured group chat chaos. Captures inventory and client buy requests via strict schema verification, algorithmic matchmaking, and escrow lock protocols.'}
                    </p>
                  </div>

                  {/* Operational Metrics Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 bg-dark border border-dark-border rounded-xl">
                      <div className="text-[10px] text-text-secondary font-mono uppercase">{lang === 'es' ? 'Publicaciones' : 'Active Intake'}</div>
                      <div className="text-lg font-bold text-white font-mono mt-0.5">{inventory.length}</div>
                      <div className="text-[9px] text-emerald-400 font-mono mt-0.5">{lang === 'es' ? 'Esquema Estructurado' : 'Structured Schema'}</div>
                    </div>

                    <div className="p-3 bg-dark border border-dark-border rounded-xl">
                      <div className="text-[10px] text-text-secondary font-mono uppercase">{lang === 'es' ? 'Demandas Comprador' : 'Client Wants'}</div>
                      <div className="text-lg font-bold text-gold font-mono mt-0.5">{clientRequests.length}</div>
                      <div className="text-[9px] text-gold font-mono mt-0.5">{lang === 'es' ? 'KYC Verificado' : 'Verified KYC'}</div>
                    </div>

                    <div className="p-3 bg-dark border border-dark-border rounded-xl">
                      <div className="text-[10px] text-text-secondary font-mono uppercase">{lang === 'es' ? 'Coincidencias High-Match' : 'Matches Ready'}</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                        {inventory.reduce((acc, item) => {
                          const hasMatch = clientRequests.some(req => calculateMatchScore(item, req).score >= 50);
                          return acc + (hasMatch ? 1 : 0);
                        }, 0)}
                      </div>
                      <div className="text-[9px] text-text-secondary font-mono mt-0.5">{lang === 'es' ? 'Algoritmo de Lujo' : 'Algorithmic'}</div>
                    </div>

                    <div className="p-3 bg-dark border border-dark-border rounded-xl">
                      <div className="text-[10px] text-text-secondary font-mono uppercase">{lang === 'es' ? 'Reducción Ruido Chat' : 'Chat Noise Reduction'}</div>
                      <div className="text-lg font-bold text-gold font-mono mt-0.5">100%</div>
                      <div className="text-[9px] text-gold font-mono mt-0.5">{lang === 'es' ? '0 Chat Desordenado' : 'Zero Chat Noise'}</div>
                    </div>
                  </div>

                  {/* Standardized Action Buttons Protocol */}
                  <div className="p-4 bg-dark-surface border border-dark-border rounded-xl space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-gold" />
                      <span>{lang === 'es' ? 'Protocolo de Operación Directa (Sin Texto Libre)' : 'Standardized Action Protocol (No Freeform Chat)'}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => {
                          setPremiumToast({
                            message: lang === 'es' 
                              ? "Solicitud estructurada de video 4K de legitimidad enviada al vendedor"
                              : "Structured 4K provenance video request dispatched to seller vault",
                            type: "gold"
                          });
                        }}
                        className="p-2.5 bg-dark border border-dark-border hover:border-gold/40 rounded-lg text-left text-text-secondary hover:text-white transition-colors flex items-center justify-between"
                      >
                        <span className="font-mono text-[11px]">1. Request Provenance 4K Video</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      </button>

                      <button
                        onClick={() => {
                          setPremiumToast({
                            message: lang === 'es'
                              ? "Depósito en garantía (Escrow) de 10% bloqueado para la transacción"
                              : "10% Escrow deposit locked on Switzerland Vault Desk",
                            type: "gold"
                          });
                        }}
                        className="p-2.5 bg-dark border border-dark-border hover:border-gold/40 rounded-lg text-left text-text-secondary hover:text-white transition-colors flex items-center justify-between"
                      >
                        <span className="font-mono text-[11px]">2. Trigger Vault Escrow Lock</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      </button>

                      <button
                        onClick={() => {
                          setPremiumToast({
                            message: lang === 'es'
                              ? "Token de autenticidad y pasaporte digital emitido"
                              : "Digital Authenticity Passport & QR hash generated",
                            type: "gold"
                          });
                        }}
                        className="p-2.5 bg-dark border border-dark-border hover:border-gold/40 rounded-lg text-left text-text-secondary hover:text-white transition-colors flex items-center justify-between"
                      >
                        <span className="font-mono text-[11px]">3. Issue Passport QR Token</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      </button>

                      <button
                        onClick={() => {
                          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ inventory, clientRequests, userProfile }, null, 2));
                          const downloadAnchor = document.createElement('a');
                          downloadAnchor.setAttribute("href", dataStr);
                          downloadAnchor.setAttribute("download", `curatedlux_structured_manifest_${Date.now()}.json`);
                          document.body.appendChild(downloadAnchor);
                          downloadAnchor.click();
                          downloadAnchor.remove();

                          setPremiumToast({
                            message: lang === 'es'
                              ? "Manifest de datos estructurados descargado para CuratedLux ERP"
                              : "Structured dataset exported for CuratedLux ERP/CRM",
                            type: "gold"
                          });
                        }}
                        className="p-2.5 bg-gold/10 border border-gold/40 rounded-lg text-left text-gold font-bold hover:bg-gold/20 transition-colors flex items-center justify-between"
                      >
                        <span className="font-mono text-[11px]">4. Export Structured JSON Manifest</span>
                        <Download className="w-3.5 h-3.5 text-gold" />
                      </button>
                    </div>
                  </div>

                  {/* Live Operations Queue Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white uppercase font-mono">
                        {lang === 'es' ? 'Cola de Transacciones en Vivo (Pipeline CuratedLux)' : 'Live Pipeline Intake Queue'}
                      </h4>
                      <span className="text-[10px] text-text-secondary font-mono">
                        {inventory.length + clientRequests.length} {lang === 'es' ? 'Expedientes' : 'Dossiers'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {inventory.map((invItem) => (
                        <div
                          key={`ops-inv-${invItem.id}`}
                          className="p-3 bg-dark-surface border border-dark-border rounded-xl flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded bg-dark border border-dark-border overflow-hidden shrink-0">
                              {invItem.imageSrc ? (
                                <img src={invItem.imageSrc} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Gem className="w-5 h-5 text-gold m-auto mt-2" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-white truncate">
                                {invItem.formData.brand} {invItem.formData.model}
                              </div>
                              <div className="text-[10px] text-text-secondary font-mono">
                                Vendedor: {invItem.sellerProfile?.fullName || 'Alexander Vance'} • ${Number(invItem.formData.estimatedValue || 0).toLocaleString()} USD
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Fase 2: Inspeccionado
                            </span>
                            <button
                              onClick={() => {
                                setPremiumToast({
                                  message: `Transacción para ${invItem.formData.brand} ${invItem.formData.model} promovida a Bloqueo Escrow.`,
                                  type: "gold"
                                });
                              }}
                              className="px-2.5 py-1 bg-gold text-dark font-bold rounded hover:bg-gold-light"
                            >
                              Escrow Lock
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: WHATSAPP & TELEGRAM EXTERNAL FORMATTING GUIDE */}
              {libraryTab === 'whatsapp_telegram' && (
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                  
                  {/* Header Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-gold/20 via-dark-surface to-dark-surface border border-gold/40 space-y-2 shadow-lg">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center">
                          <Watch className="w-4 h-4 text-gold animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                            {lang === 'es' ? 'Guía de Publicación en Chats • WhatsApp & Telegram' : 'WhatsApp & Telegram External Posting Guide'}
                          </h3>
                          <p className="text-[11px] text-gold font-mono">
                            {lang === 'es' ? 'Estándar para Grupos de Comercio de Alto Lujo' : 'Standardized Format for High-Luxury Trade Groups'}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-gold/20 text-gold font-mono text-[10px] font-bold border border-gold/40 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-gold" />
                        OFFICIAL TRADE TEMPLATES
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed pt-1">
                      {lang === 'es'
                        ? 'Utiliza estas plantillas estandarizadas cuando vayas a vender un reloj (WTS) o a buscar un reloj (WTB) en grupos de comercio de WhatsApp o Telegram. Mantén un formato estructurado y profesional en tus publicaciones.'
                        : 'Use these standardized templates when publishing a watch for sale (WTS) or looking to source a watch (WTB) in luxury WhatsApp or Telegram trade groups. Ensures clean, professional dealer formatting across all networks.'}
                    </p>
                  </div>

                  {/* QUICK COPY TEMPLATE SNIPPETS BAR */}
                  <div className="p-4 bg-dark border border-gold/30 rounded-2xl space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-gold" />
                        <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                          {lang === 'es' ? 'Plantillas Rápidas para Copiar' : 'Quick Copy Snippet Templates'}
                        </h4>
                      </div>
                      <span className="text-[10px] text-text-muted font-mono">1-Click Clipboard</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Blank WTS Snippet Card */}
                      <div className="p-3 bg-dark-surface rounded-xl border border-dark-border hover:border-gold/40 transition-colors space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gold font-mono flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-gold" />
                            WTS (Want To Sell / Vender)
                          </span>
                          <button
                            onClick={() => {
                              const t = `WTS [BRAND] [MODEL]\nRef: [REFERENCE_NUMBER]\nYear: [YEAR]\nDial: [DIAL_COLOR]\nCondition: [CONDITION]\nIncludes: [BOX_PAPERS]\nPrice: [CURRENCY] [AMOUNT]`;
                              navigator.clipboard?.writeText(t);
                              setPremiumToast({
                                message: lang === 'es' ? "Plantilla WTS copiada al portapapeles" : "WTS Template copied to clipboard!",
                                type: "gold"
                              });
                            }}
                            className="px-2.5 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/40 text-gold text-[10px] font-mono font-bold rounded-lg transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3 text-gold" />
                            <span>{lang === 'es' ? 'Copiar Plantilla' : 'Copy Template'}</span>
                          </button>
                        </div>
                        <div className="p-2 bg-black/60 rounded-lg text-[10px] font-mono text-slate-300 leading-relaxed border border-dark-border">
                          WTS [BRAND] [MODEL]<br/>
                          Ref: [REF_NUM]<br/>
                          Year: [YEAR]<br/>
                          Dial: [DIAL]<br/>
                          Condition: [MINT/UNWORN]<br/>
                          Includes: [BOX_PAPERS]<br/>
                          Price: [CURRENCY] [AMOUNT]
                        </div>
                      </div>

                      {/* Blank WTB Snippet Card */}
                      <div className="p-3 bg-dark-surface rounded-xl border border-dark-border hover:border-gold/40 transition-colors space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                            <Watch className="w-3.5 h-3.5 text-emerald-400" />
                            WTB (Want To Buy / Comprar)
                          </span>
                          <button
                            onClick={() => {
                              const t = `WTB [BRAND] [MODEL]\nRef: [REFERENCE_NUMBER]\nYear: [TARGET_YEAR]\nDial: [PREFERRED_VARIANT]\nCondition: [REQUIRED_CONDITION]\nIncludes: [REQUIRED_INCLUSIONS]\nPrice: [CURRENCY] [TARGET_BUDGET]`;
                              navigator.clipboard?.writeText(t);
                              setPremiumToast({
                                message: lang === 'es' ? "Plantilla WTB copiada al portapapeles" : "WTB Template copied to clipboard!",
                                type: "gold"
                              });
                            }}
                            className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold rounded-lg transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3 text-gold" />
                            <span>{lang === 'es' ? 'Copiar Plantilla' : 'Copy Template'}</span>
                          </button>
                        </div>
                        <div className="p-2 bg-black/60 rounded-lg text-[10px] font-mono text-slate-300 leading-relaxed border border-dark-border">
                          WTB [BRAND] [MODEL]<br/>
                          Ref: [REF_NUM]<br/>
                          Year: [TARGET_YEAR]<br/>
                          Dial: [VARIANT]<br/>
                          Condition: [REQUIRED]<br/>
                          Includes: [BOX_PAPERS]<br/>
                          Price: [CURRENCY] [BUDGET]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 1: HOW TO PUBLISH A WATCH TO SELL (WTS) */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-dark-border pb-2">
                      <div className="flex items-center gap-2">
                        <Watch className="w-4 h-4 text-gold" />
                        <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                          {lang === 'es' ? '1. Cómo Publicar un Reloj en Venta (WTS - Want To Sell)' : '1. How to Publish a Watch for Sale (WTS - Want To Sell)'}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-gold/10 text-gold text-[10px] font-mono font-bold border border-gold/30">
                        FOR SELLERS & DEALERS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Telegram WTS Card */}
                      <div className="bg-[#17212b] border border-[#2b5278] rounded-2xl overflow-hidden flex flex-col shadow-xl">
                        <div className="bg-[#0e1621] px-3.5 py-2.5 border-b border-[#1c2a38] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
                              TG
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white font-sans">Telegram Trade Groups</div>
                              <div className="text-[10px] text-blue-400/80 font-mono">Dark Theme Format • WTS Post</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-gold font-mono bg-gold/10 border border-gold/30 px-2 py-0.5 rounded font-bold">WTS EXAMPLE</span>
                        </div>

                        <div className="p-4 bg-[#0e1621]/60 flex-1 flex flex-col justify-between space-y-3">
                          <div className="bg-[#2b5278] rounded-2xl p-3.5 border border-blue-400/30 text-white shadow-lg space-y-2">
                            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-black">
                              <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                                alt="Rolex Daytona Panda"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-[10px] text-gold font-mono px-2 py-0.5 rounded font-bold border border-gold/40 flex items-center gap-1">
                                <Crown className="w-3 h-3 text-gold" />
                                <span>ROLEX DAYTONA 116500LN</span>
                              </div>
                            </div>

                            <div className="font-mono text-xs leading-relaxed space-y-1 pt-1 text-slate-100">
                              <div className="font-bold text-gold text-sm">WTS Rolex Daytona</div>
                              <div><span className="text-blue-200 font-bold">Ref:</span> 116500LN</div>
                              <div><span className="text-blue-200 font-bold">Year:</span> 2021</div>
                              <div><span className="text-blue-200 font-bold">Dial:</span> White Panda</div>
                              <div><span className="text-blue-200 font-bold">Condition:</span> Mint</div>
                              <div><span className="text-blue-200 font-bold">Includes:</span> Box & Papers</div>
                              <div className="font-bold text-gold pt-1 text-sm"><span className="text-blue-200 font-bold">Price:</span> USD 32,500</div>
                            </div>

                            <div className="flex justify-end items-center gap-1 text-[9px] text-slate-300 font-mono opacity-80 pt-1">
                              <span>10:42 AM</span>
                              <span className="text-blue-300 font-bold">✓✓</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const sampleText = `WTS Rolex Daytona\nRef: 116500LN\nYear: 2021\nDial: White Panda\nCondition: Mint\nIncludes: Box & Papers\nPrice: USD 32,500`;
                              navigator.clipboard?.writeText(sampleText);
                              setPremiumToast({
                                message: lang === 'es' ? "Publicación WTS Telegram copiada al portapapeles" : "Telegram WTS Post copied to clipboard!",
                                type: "gold"
                              });
                            }}
                            className="w-full py-2.5 bg-[#2b5278] hover:bg-blue-600 border border-blue-400/40 rounded-xl text-xs font-mono text-white font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            <Copy className="w-4 h-4 text-gold" />
                            <span>{lang === 'es' ? 'Copiar Publicación Telegram WTS' : 'Copy Telegram WTS Post'}</span>
                          </button>
                        </div>
                      </div>

                      {/* WhatsApp WTS Card */}
                      <div className="bg-[#efeae2] border border-gold/40 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                        <div className="bg-[#075e54] px-3.5 py-2.5 flex items-center justify-between text-white">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-emerald-200 text-xs font-bold font-mono">
                              WA
                            </div>
                            <div>
                              <div className="text-xs font-bold font-sans text-white">WhatsApp Trade Groups</div>
                              <div className="text-[10px] text-emerald-100/80 font-mono">Light Theme Format • WTS Post</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-dark bg-gold font-mono px-2 py-0.5 rounded font-bold border border-gold">WTS EXAMPLE</span>
                        </div>

                        <div className="p-4 bg-[#efeae2] flex-1 flex flex-col justify-between space-y-3">
                          <div className="bg-[#dcf8c6] rounded-2xl p-3.5 border border-emerald-300/60 text-slate-900 shadow-md space-y-2">
                            <div className="relative rounded-xl overflow-hidden border border-slate-300 aspect-[16/9] bg-slate-900">
                              <img
                                src="https://images.unsplash.com/photo-1547996160-012745cc5836?auto=format&fit=crop&w=800&q=80"
                                alt="Patek Philippe Nautilus"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-[10px] text-gold font-mono px-2 py-0.5 rounded font-bold border border-gold/40 flex items-center gap-1">
                                <Watch className="w-3 h-3 text-gold" />
                                <span>PATEK PHILIPPE 5711/1A</span>
                              </div>
                            </div>

                            <div className="font-mono text-xs leading-relaxed space-y-1 pt-1 text-slate-900">
                              <div className="font-bold text-emerald-950 text-sm">WTS Patek Philippe Nautilus</div>
                              <div><span className="text-slate-600 font-bold">Ref:</span> 5711/1A-010</div>
                              <div><span className="text-slate-600 font-bold">Year:</span> 2019</div>
                              <div><span className="text-slate-600 font-bold">Dial:</span> Blue Gradient</div>
                              <div><span className="text-slate-600 font-bold">Condition:</span> Mint</div>
                              <div><span className="text-slate-600 font-bold">Includes:</span> Box & Archive Certificate</div>
                              <div className="font-bold text-emerald-950 pt-1 text-sm"><span className="text-slate-600 font-bold">Price:</span> USD 98,000</div>
                            </div>

                            <div className="flex justify-end items-center gap-1 text-[9px] text-slate-500 font-mono pt-1">
                              <span>11:05 AM</span>
                              <span className="text-sky-500 font-bold">✓✓</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const sampleText = `WTS Patek Philippe Nautilus\nRef: 5711/1A-010\nYear: 2019\nDial: Blue Gradient\nCondition: Mint\nIncludes: Box & Archive Certificate\nPrice: USD 98,000`;
                              navigator.clipboard?.writeText(sampleText);
                              setPremiumToast({
                                message: lang === 'es' ? "Publicación WTS WhatsApp copiada al portapapeles" : "WhatsApp WTS Post copied to clipboard!",
                                type: "gold"
                              });
                            }}
                            className="w-full py-2.5 bg-[#075e54] hover:bg-[#064e46] border border-emerald-600/40 rounded-xl text-xs font-mono text-white font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            <Copy className="w-4 h-4 text-gold" />
                            <span>{lang === 'es' ? 'Copiar Publicación WhatsApp WTS' : 'Copy WhatsApp WTS Post'}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SECTION 2: HOW TO POST WHEN LOOKING FOR A WATCH (WTB) */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between border-b border-dark-border pb-2">
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                          {lang === 'es' ? '2. Cómo Publicar cuando Buscas un Reloj (WTB - Want To Buy / ISO)' : '2. How to Post When Looking for a Watch (WTB - Want To Buy)'}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                        FOR BUYERS & SOURCERS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Telegram WTB Card */}
                      <div className="bg-[#17212b] border border-[#2b5278] rounded-2xl overflow-hidden flex flex-col shadow-xl">
                        <div className="bg-[#0e1621] px-3.5 py-2.5 border-b border-[#1c2a38] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
                              TG
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white font-sans">Telegram Sourcing Desk</div>
                              <div className="text-[10px] text-blue-400/80 font-mono">Dark Theme Format • WTB Request</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">WTB EXAMPLE</span>
                        </div>

                        <div className="p-4 bg-[#0e1621]/60 flex-1 flex flex-col justify-between space-y-3">
                          <div className="bg-[#2b5278] rounded-2xl p-3.5 border border-blue-400/30 text-white shadow-lg space-y-2">
                            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-black">
                              <img
                                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
                                alt="Audemars Piguet Royal Oak"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-[10px] text-gold font-mono px-2 py-0.5 rounded font-bold border border-gold/40 flex items-center gap-1">
                                <Watch className="w-3 h-3 text-gold" />
                                <span>AUDEMARS PIGUET ROYAL OAK</span>
                              </div>
                            </div>

                            <div className="font-mono text-xs leading-relaxed space-y-1 pt-1 text-slate-100">
                              <div className="font-bold text-emerald-300 text-sm">WTB Audemars Piguet Royal Oak</div>
                              <div><span className="text-blue-200 font-bold">Ref:</span> 15500ST.OO.1220ST.01</div>
                              <div><span className="text-blue-200 font-bold">Year:</span> 2020+</div>
                              <div><span className="text-blue-200 font-bold">Dial:</span> Blue Grande Tapisserie</div>
                              <div><span className="text-blue-200 font-bold">Condition:</span> Unworn / Mint</div>
                              <div><span className="text-blue-200 font-bold">Includes:</span> Full Set (Box & Guarantee Card)</div>
                              <div className="font-bold text-gold pt-1 text-sm"><span className="text-blue-200 font-bold">Budget:</span> USD 44,000</div>
                            </div>

                            <div className="flex justify-end items-center gap-1 text-[9px] text-slate-300 font-mono opacity-80 pt-1">
                              <span>11:20 AM</span>
                              <span className="text-blue-300 font-bold">✓✓</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const sampleText = `WTB Audemars Piguet Royal Oak\nRef: 15500ST.OO.1220ST.01\nYear: 2020+\nDial: Blue Grande Tapisserie\nCondition: Unworn / Mint\nIncludes: Full Set (Box & Guarantee Card)\nBudget: USD 44,000`;
                              navigator.clipboard?.writeText(sampleText);
                              setPremiumToast({
                                message: lang === 'es' ? "Solicitud WTB Telegram copiada al portapapeles" : "Telegram WTB Request copied to clipboard!",
                                type: "gold"
                              });
                            }}
                            className="w-full py-2.5 bg-[#2b5278] hover:bg-blue-600 border border-blue-400/40 rounded-xl text-xs font-mono text-white font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            <Copy className="w-4 h-4 text-gold" />
                            <span>{lang === 'es' ? 'Copiar Solicitud Telegram WTB' : 'Copy Telegram WTB Request'}</span>
                          </button>
                        </div>
                      </div>

                      {/* WhatsApp WTB Card */}
                      <div className="bg-[#efeae2] border border-gold/40 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                        <div className="bg-[#075e54] px-3.5 py-2.5 flex items-center justify-between text-white">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-emerald-200 text-xs font-bold font-mono">
                              WA
                            </div>
                            <div>
                              <div className="text-xs font-bold font-sans text-white">WhatsApp Sourcing Groups</div>
                              <div className="text-[10px] text-emerald-100/80 font-mono">Light Theme Format • WTB Request</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-dark bg-gold font-mono px-2 py-0.5 rounded font-bold border border-gold">WTB EXAMPLE</span>
                        </div>

                        <div className="p-4 bg-[#efeae2] flex-1 flex flex-col justify-between space-y-3">
                          <div className="bg-[#dcf8c6] rounded-2xl p-3.5 border border-emerald-300/60 text-slate-900 shadow-md space-y-2">
                            <div className="relative rounded-xl overflow-hidden border border-slate-300 aspect-[16/9] bg-slate-900">
                              <img
                                src="https://images.unsplash.com/photo-1547996160-012745cc5836?auto=format&fit=crop&w=800&q=80"
                                alt="Richard Mille RM35-02"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-[10px] text-gold font-mono px-2 py-0.5 rounded font-bold border border-gold/40 flex items-center gap-1">
                                <Gem className="w-3 h-3 text-gold" />
                                <span>RICHARD MILLE RM35-02</span>
                              </div>
                            </div>

                            <div className="font-mono text-xs leading-relaxed space-y-1 pt-1 text-slate-900">
                              <div className="font-bold text-emerald-950 text-sm">WTB Richard Mille RM35</div>
                              <div><span className="text-slate-600 font-bold">Ref:</span> RM35-02</div>
                              <div><span className="text-slate-600 font-bold">Year:</span> 2020</div>
                              <div><span className="text-slate-600 font-bold">Dial:</span> NTPT Black Carbon</div>
                              <div><span className="text-slate-600 font-bold">Condition:</span> Unworn</div>
                              <div><span className="text-slate-600 font-bold">Includes:</span> Box & Papers</div>
                              <div className="font-bold text-emerald-950 pt-1 text-sm"><span className="text-slate-600 font-bold">Target Budget:</span> HKD 2,400,000</div>
                            </div>

                            <div className="flex justify-end items-center gap-1 text-[9px] text-slate-500 font-mono pt-1">
                              <span>11:45 AM</span>
                              <span className="text-sky-500 font-bold">✓✓</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const sampleText = `WTB Richard Mille RM35\nRef: RM35-02\nYear: 2020\nDial: NTPT Black Carbon\nCondition: Unworn\nIncludes: Box & Papers\nTarget Budget: HKD 2,400,000`;
                              navigator.clipboard?.writeText(sampleText);
                              setPremiumToast({
                                message: lang === 'es' ? "Solicitud WTB WhatsApp copiada al portapapeles" : "WhatsApp WTB Request copied to clipboard!",
                                type: "gold"
                              });
                            }}
                            className="w-full py-2.5 bg-[#075e54] hover:bg-[#064e46] border border-emerald-600/40 rounded-xl text-xs font-mono text-white font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            <Copy className="w-4 h-4 text-gold" />
                            <span>{lang === 'es' ? 'Copiar Solicitud WhatsApp WTB' : 'Copy WhatsApp WTB Request'}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* FIELD KEY / GOLDEN RULES REFERENCE CARD */}
                  <div className="p-4 bg-dark-surface border border-gold/30 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 border-b border-dark-border pb-2">
                      <BadgeCheck className="w-4 h-4 text-gold" />
                      <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                        {lang === 'es' ? 'Reglas de Oro para Publicaciones en Grupos de Comercio' : 'Golden Rules for Trade Group Postings'}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="p-2.5 bg-dark rounded-xl border border-dark-border space-y-1">
                        <span className="text-gold font-bold block text-[11px]">1. Tag de Acción</span>
                        <p className="text-[10px] text-text-secondary leading-snug">
                          Usa <span className="text-gold font-bold">WTS</span> para vender o <span className="text-emerald-400 font-bold">WTB</span> para comprar siempre al inicio.
                        </p>
                      </div>

                      <div className="p-2.5 bg-dark rounded-xl border border-dark-border space-y-1">
                        <span className="text-gold font-bold block text-[11px]">2. Referencia y Año</span>
                        <p className="text-[10px] text-text-secondary leading-snug">
                          Incluye el número de referencia exacto (ej. 116500LN) y el año de producción de la tarjeta.
                        </p>
                      </div>

                      <div className="p-2.5 bg-dark rounded-xl border border-dark-border space-y-1">
                        <span className="text-gold font-bold block text-[11px]">3. Esfera y Set</span>
                        <p className="text-[10px] text-text-secondary leading-snug">
                          Especifica la variante de esfera y la dotación (Box & Papers, Watch Only, Archives).
                        </p>
                      </div>

                      <div className="p-2.5 bg-dark rounded-xl border border-dark-border space-y-1">
                        <span className="text-gold font-bold block text-[11px]">4. Precio y Moneda</span>
                        <p className="text-[10px] text-text-secondary leading-snug">
                          Coloca siempre el código ISO de moneda (USD, HKD, EUR, CHF) junto con el precio neto.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPANDED FULL-SCREEN PRINT-READY DOSSIER VIEW MODAL */}
      <AnimatePresence>
        {isDossierExpanded && expandedDossierItemData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-dark/95 backdrop-blur-2xl flex flex-col overflow-hidden print-dossier-overlay"
          >
            {/* TOOLBAR HEADER (NON-PRINT) */}
            <div className="no-print-toolbar p-4 bg-dark-surface/90 border-b border-dark-border flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDossierExpanded(false)}
                  className="px-3 py-1.5 bg-dark border border-dark-border hover:border-gold/40 rounded-xl text-xs text-text-secondary hover:text-white transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4 text-gold" />
                  <span>{lang === 'es' ? 'Volver' : 'Back'}</span>
                </button>
                <div className="hidden sm:flex items-center gap-2 border-l border-dark-border pl-3">
                  <ShieldCheck className="w-4 h-4 text-gold animate-pulse" />
                  <span className="font-serif text-sm font-bold text-white">
                    {lang === 'es' ? 'Expediente Oficial de Autenticidad' : 'Official Authenticity Dossier'}
                  </span>
                  <span className="text-[10px] text-gold font-mono bg-gold/10 border border-gold/30 px-2 py-0.5 rounded font-bold">
                    {expandedDossierItemData.trackingRef || 'CLX-SECURE'}
                  </span>
                </div>
              </div>

              {/* ACTION CONTROLS */}
              <div className="flex items-center gap-2">
                {/* Export Settings Toggle Button */}
                <button
                  onClick={() => setIsExportSettingsOpen(!isExportSettingsOpen)}
                  className={`px-3 py-1.5 border rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isExportSettingsOpen
                      ? 'bg-gold/20 border-gold text-gold font-bold shadow-sm'
                      : 'bg-dark border-dark-border hover:border-gold/40 text-text-secondary hover:text-white'
                  }`}
                  title="Configure document export & print fields"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
                  <span className="hidden sm:inline">{lang === 'es' ? 'Ajustes de Exportación' : 'Export Settings'}</span>
                </button>

                {/* Print Preview Theme Toggle */}
                <button
                  onClick={() => setDossierPrintTheme(dossierPrintTheme === 'luxury_dark' ? 'paper_white' : 'luxury_dark')}
                  className="px-3 py-1.5 bg-dark border border-dark-border hover:border-gold/40 rounded-xl text-xs text-white transition-all flex items-center gap-1.5 font-mono"
                  title="Toggle theme for print preview"
                >
                  {dossierPrintTheme === 'luxury_dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-gold" />
                      <span className="hidden md:inline">{lang === 'es' ? 'Modo Papel Blanco' : 'Paper White Mode'}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-gold" />
                      <span className="hidden md:inline">{lang === 'es' ? 'Modo Lujo Oscuro' : 'Luxury Dark Mode'}</span>
                    </>
                  )}
                </button>

                {/* CSV Export */}
                <button
                  onClick={exportToCSV}
                  className="hidden sm:flex px-3 py-1.5 bg-dark border border-dark-border hover:border-gold/40 text-text-secondary hover:text-white rounded-xl text-xs items-center gap-1.5 font-mono transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-gold" />
                  <span>CSV</span>
                </button>

                {/* Share URL */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setPremiumToast({
                      message: lang === 'es' 
                        ? '¡Enlace del expediente cryptográfico copiado al portapapeles!' 
                        : 'Cryptographic dossier share link copied to clipboard!',
                      type: 'gold'
                    });
                  }}
                  className="p-2 bg-dark border border-dark-border hover:border-gold/40 text-text-secondary hover:text-white rounded-xl text-xs transition-all"
                  title="Share / Copy Link"
                >
                  <Share2 className="w-3.5 h-3.5 text-gold" />
                </button>

                {/* PRIMARY PRINT / PDF BUTTON */}
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 bg-gradient-to-r from-gold via-gold-light to-gold text-dark font-bold rounded-xl text-xs flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-gold/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Imprimir / PDF' : 'Print / Save PDF'}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsDossierExpanded(false)}
                  className="p-1.5 bg-dark border border-dark-border hover:bg-dark-surface rounded-xl text-text-muted hover:text-white transition-all ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* EXPORT SETTINGS SUB-MENU PANEL (NON-PRINTABLE) */}
            {isExportSettingsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="no-print p-4 bg-dark-surface/95 border-b border-gold/30 backdrop-blur-xl shrink-0 z-40"
              >
                <div className="max-w-4xl mx-auto space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-dark-border">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-gold" />
                      <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                        {lang === 'es' ? 'Ajustes de Exportación e Impresión de Campos' : 'Print / PDF Document Export Field Settings'}
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsExportSettingsOpen(false)}
                      className="text-[11px] text-text-secondary hover:text-white font-mono flex items-center gap-1"
                    >
                      <span>{lang === 'es' ? 'Cerrar Ajustes' : 'Hide Settings'}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs font-mono">
                    {/* Toggle Valuation */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showValuation: !prev.showValuation }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showValuation
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showValuation ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Valuación $' : 'Valuation $'}</span>
                    </button>

                    {/* Toggle Condition */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showCondition: !prev.showCondition }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showCondition
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showCondition ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Condición' : 'Condition'}</span>
                    </button>

                    {/* Toggle AI Breakdown */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showNeuralBreakdown: !prev.showNeuralBreakdown }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showNeuralBreakdown
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showNeuralBreakdown ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Red Neural AI' : 'AI Breakdown'}</span>
                    </button>

                    {/* Toggle Hardware Metadata */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showDeviceMetadata: !prev.showDeviceMetadata }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showDeviceMetadata
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showDeviceMetadata ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Hash Cámara' : 'Camera Hash'}</span>
                    </button>

                    {/* Toggle Warranty Cert OCR */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showWarrantyCert: !prev.showWarrantyCert }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showWarrantyCert
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showWarrantyCert ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Garantía OCR' : 'Warranty Cert'}</span>
                    </button>

                    {/* Toggle QR Stamp */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showQRHash: !prev.showQRHash }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showQRHash
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showQRHash ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Código QR' : 'QR Stamp'}</span>
                    </button>

                    {/* Toggle Appraiser Signature */}
                    <button
                      onClick={() => setDossierExportConfig(prev => ({ ...prev, showSignatureBlock: !prev.showSignatureBlock }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        dossierExportConfig.showSignatureBlock
                          ? 'bg-gold/20 border-gold text-white font-bold'
                          : 'bg-dark/60 border-dark-border text-text-muted opacity-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{dossierExportConfig.showSignatureBlock ? '✓ MOSTRAR' : '✕ OCULTO'}</div>
                      <span className="text-[11px]">{lang === 'es' ? 'Firma Valuador' : 'Appraiser Signature'}</span>
                    </button>
                  </div>

                  {/* Custom Note Input */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                    <span className="text-[11px] font-mono text-gold shrink-0 font-bold">
                      {lang === 'es' ? 'Nota Personalizada del Expediente:' : 'Custom Document Note:'}
                    </span>
                    <input
                      type="text"
                      value={dossierExportConfig.customNotes}
                      onChange={(e) => setDossierExportConfig(prev => ({ ...prev, customNotes: e.target.value }))}
                      placeholder={lang === 'es' ? 'Ej: "Aprobado para seguro Chubb por $18,500 USD. Verificado en Ginebra."' : 'E.g., "Approved for Chubb Insurance $18,500. Inspected in Geneva Vault."'}
                      className="w-full bg-dark border border-dark-border focus:border-gold rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-text-muted font-mono outline-none"
                    />
                    {dossierExportConfig.customNotes && (
                      <button
                        onClick={() => setDossierExportConfig(prev => ({ ...prev, customNotes: '' }))}
                        className="text-[10px] text-text-secondary hover:text-gold font-mono shrink-0 px-2 py-1"
                      >
                        {lang === 'es' ? 'Limpiar' : 'Clear'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCROLLABLE DOSSIER CANVAS */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                className={`print-dossier-card w-full max-w-4xl rounded-3xl border-2 transition-all duration-300 relative overflow-hidden p-6 sm:p-10 shadow-2xl ${
                  dossierPrintTheme === 'paper_white'
                    ? 'bg-white text-slate-900 border-gold shadow-gold/10'
                    : 'bg-dark-surface text-white border-gold/40 shadow-black'
                }`}
              >
                {/* Background Watermark Stamp */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none font-serif text-8xl font-black text-center rotate-[-25deg]">
                  CURATEDLUX VAULT
                </div>

                {/* HEADER CREST & CERTIFICATE BAR */}
                <div className="border-b border-gold/30 pb-6 mb-6 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Brand Emblem */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/50 flex items-center justify-center text-gold shadow-inner shrink-0">
                        <Gem className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold tracking-[0.25em] text-gold uppercase">
                          CURATEDLUX INTERNATIONAL
                        </div>
                        <h1 className="font-serif text-2xl font-bold tracking-tight">
                          {lang === 'es' ? 'Certificado de Valuación y Autenticidad' : 'Valuation & Authenticity Certificate'}
                        </h1>
                        <p className="text-[11px] opacity-70 font-mono">
                          {lang === 'es' ? 'Registro cryptográfico de bóveda • Índice de Ginebra, Suiza' : 'Cryptographically Anchored Vault Record • Geneva Index'}
                        </p>
                      </div>
                    </div>

                    {/* Registration Badges */}
                    <div className="text-left sm:text-right font-mono text-xs space-y-1 shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span>VERIFIED & TIMESTAMPTED</span>
                      </div>
                      <div className="opacity-80 text-[11px]">
                        Ref: <strong className="text-gold font-mono">{expandedDossierItemData.trackingRef || 'CLX-8821'}</strong>
                      </div>
                      <div className="text-[10px] opacity-60">
                        Date: {expandedDossierItemData.timestamp || new Date().toLocaleDateString()}
                      </div>
                    </div>

                  </div>
                </div>

                {/* CUSTOM USER EXPORT NOTE DISPLAY */}
                {dossierExportConfig.customNotes && (
                  <div className={`p-3.5 rounded-2xl border text-xs font-mono mb-6 flex items-start gap-2.5 ${dossierPrintTheme === 'paper_white' ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-gold/10 border-gold/40 text-gold'}`}>
                    <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-80">
                        {lang === 'es' ? 'Nota Oficial del Valuador:' : 'Official Appraiser Note:'}
                      </div>
                      <div className="font-medium italic">"{dossierExportConfig.customNotes}"</div>
                    </div>
                  </div>
                )}

                {/* MAIN ASSET SHOWCASE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-start">
                  
                  {/* Left Column: Photo & Camera Hash */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="aspect-square rounded-2xl border-2 border-gold/40 bg-dark overflow-hidden relative group shadow-xl">
                      {expandedDossierItemData.imageSrc ? (
                        <img
                          src={expandedDossierItemData.imageSrc}
                          alt="Asset"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                          <Gem className="w-16 h-16 text-gold mb-2" />
                          <span className="text-xs font-serif">Official Vault Asset</span>
                        </div>
                      )}

                      {/* Photo Watermark Stamp */}
                      <div className="absolute bottom-2 right-2 bg-dark/90 backdrop-blur-md border border-gold/40 px-2 py-0.5 rounded text-[9px] text-gold font-mono font-bold">
                        PROVENANCE VERIFIED 4K
                      </div>

                      {/* Accuracy Badge */}
                      <div className="absolute top-2 left-2 bg-emerald-500/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md">
                        {expandedDossierItemData.confidenceScore || 98}% Neural Acc
                      </div>
                    </div>

                    {/* Camera & Hardware Scan Metadata */}
                    {dossierExportConfig.showDeviceMetadata && (
                      <div className={`p-3 rounded-xl border text-[10px] font-mono space-y-1 ${dossierPrintTheme === 'paper_white' ? 'bg-slate-100 border-slate-300' : 'bg-dark/60 border-dark-border'}`}>
                        <div className="flex justify-between">
                          <span className="opacity-60">DEVICE HASH:</span>
                          <span className="font-bold text-gold">{expandedDossierItemData.deviceMetadata?.deviceId || 'DEV-SECURE-992'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">GEO-LOCATION:</span>
                          <span>{expandedDossierItemData.deviceMetadata?.location || 'Geneva, Switzerland'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">ENCRYPTION:</span>
                          <span className="text-emerald-400">AES-256 VAULT SEAL</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Key Specifications & Market Valuation */}
                  <div className="md:col-span-7 space-y-5">
                    
                    <div>
                      <div className="text-xs font-mono uppercase text-gold font-bold tracking-widest mb-1 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{expandedDossierItemData.formData?.category || 'Luxury Asset'}</span>
                      </div>
                      <h2 className="font-serif text-3xl font-bold tracking-tight">
                        {expandedDossierItemData.formData?.brand || 'Rolex'}{' '}
                        <span className="opacity-80 font-serif font-normal">{expandedDossierItemData.formData?.model || 'Submariner'}</span>
                      </h2>
                    </div>

                    {/* 2x2 Specs Matrix */}
                    <div className="grid grid-cols-2 gap-3">
                      
                      {dossierExportConfig.showValuation && (
                        <div className={`p-3.5 rounded-2xl border ${dossierPrintTheme === 'paper_white' ? 'bg-slate-50 border-slate-200' : 'bg-dark/40 border-dark-border'}`}>
                          <span className="text-[10px] opacity-60 font-mono uppercase block mb-0.5">Valuación Estimada</span>
                          <div className="text-lg font-bold font-mono text-gold">
                            {expandedDossierItemData.formData?.estimatedValue
                              ? `${expandedDossierItemData.formData?.currency || 'USD'} $${Number(expandedDossierItemData.formData?.estimatedValue).toLocaleString()}`
                              : 'Declarado $0'}
                          </div>
                          <span className="text-[9px] text-emerald-400 font-mono">Referencia de Mercado en Vivo</span>
                        </div>
                      )}

                      {dossierExportConfig.showCondition && (
                        <div className={`p-3.5 rounded-2xl border ${dossierPrintTheme === 'paper_white' ? 'bg-slate-50 border-slate-200' : 'bg-dark/40 border-dark-border'}`}>
                          <span className="text-[10px] opacity-60 font-mono uppercase block mb-0.5">Grado de Condición</span>
                          <div className="text-lg font-bold font-serif">
                            {CONDITIONS[expandedDossierItemData.formData?.condition || 4]}
                          </div>
                          <span className="text-[9px] opacity-70 font-mono">Puntaje { (expandedDossierItemData.formData?.condition || 4) + 1 }/5 Calificación</span>
                        </div>
                      )}

                      <div className={`p-3.5 rounded-2xl border ${dossierPrintTheme === 'paper_white' ? 'bg-slate-50 border-slate-200' : 'bg-dark/40 border-dark-border'}`}>
                        <span className="text-[10px] opacity-60 font-mono uppercase block mb-0.5">Confianza AI Neural</span>
                        <div className="text-lg font-bold font-mono text-emerald-400">
                          {expandedDossierItemData.confidenceScore || 88}%
                        </div>
                        <span className="text-[9px] opacity-70 font-mono">Inspección de Múltiples Ángulos</span>
                      </div>

                      <div className={`p-3.5 rounded-2xl border ${dossierPrintTheme === 'paper_white' ? 'bg-slate-50 border-slate-200' : 'bg-dark/40 border-dark-border'}`}>
                        <span className="text-[10px] opacity-60 font-mono uppercase block mb-0.5">Estado de Escrow</span>
                        <div className="text-sm font-bold text-gold font-mono mt-1">
                          LISTO PARA DEPÓSITO
                        </div>
                        <span className="text-[9px] opacity-70 font-mono">100% Verificado KYC</span>
                      </div>

                    </div>

                    {/* AI Digest / Notes */}
                    <div className={`p-4 rounded-2xl border relative ${dossierPrintTheme === 'paper_white' ? 'bg-amber-50/50 border-amber-200' : 'bg-dark/80 border-gold/30'}`}>
                      <div className="flex items-center gap-1.5 text-xs text-gold font-bold uppercase font-mono mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span>Dictamen de Autenticidad y Observaciones</span>
                      </div>
                      <p className="text-xs leading-relaxed italic opacity-90">
                        "{expandedDossierItemData.formData?.description || 'Pieza inspeccionada mediante redes neuronales ópticas. Coincidencia completa en logotipo, bisel, tipografía y graduación del dial sin discrepancias visuales registradas.'}"
                      </p>
                    </div>

                  </div>

                </div>

                {/* NEURAL AUTHENTICITY SCORE BARS */}
                {dossierExportConfig.showNeuralBreakdown && (
                  <div className={`p-5 rounded-2xl border mb-8 ${dossierPrintTheme === 'paper_white' ? 'bg-slate-50 border-slate-200' : 'bg-dark/40 border-dark-border'}`}>
                    <h3 className="text-xs font-bold font-mono uppercase text-gold mb-3 flex items-center justify-between">
                      <span>Desglose de Inspección Neural por Componentes</span>
                      <span className="text-[10px] font-normal opacity-70">Escaneo Espectral 4K</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="opacity-80">Autenticidad de Marca:</span>
                          <span className="font-bold text-gold">{expandedDossierItemData.confidenceBreakdown?.brand || 92}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-dark/60 overflow-hidden border border-dark-border">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${expandedDossierItemData.confidenceBreakdown?.brand || 92}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="opacity-80">Alineación de Modelo / Referencia:</span>
                          <span className="font-bold text-gold">{expandedDossierItemData.confidenceBreakdown?.model || 88}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-dark/60 overflow-hidden border border-dark-border">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${expandedDossierItemData.confidenceBreakdown?.model || 88}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="opacity-80">Integridad de Materiales y Metales:</span>
                          <span className="font-bold text-gold">{expandedDossierItemData.confidenceBreakdown?.material || 85}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-dark/60 overflow-hidden border border-dark-border">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${expandedDossierItemData.confidenceBreakdown?.material || 85}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="opacity-80">Detección de Anomalías / Réplica:</span>
                          <span className="font-bold text-emerald-400">0% Replicación</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-dark/60 overflow-hidden border border-dark-border">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `95%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* WARRANTY OCR CERTIFICATE LINK IF PRESENT */}
                {dossierExportConfig.showWarrantyCert && expandedDossierItemData.scannedCert && (
                  <div className={`p-4 rounded-2xl border mb-8 flex items-center justify-between gap-4 text-xs ${dossierPrintTheme === 'paper_white' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'}`}>
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold font-serif text-sm">Garantía / Tarjeta de Certificado Vinculada por OCR</div>
                        <div className="font-mono text-[10px] opacity-80">
                          Serial: {expandedDossierItemData.scannedCert.ocr?.serial} • Ref: {expandedDossierItemData.scannedCert.ocr?.model} • Emisor: {expandedDossierItemData.scannedCert.ocr?.brand}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500 text-dark font-mono font-bold rounded text-[10px] uppercase shrink-0">
                      VINCULADO
                    </span>
                  </div>
                )}

                {/* LEGAL SIGNATURE, QR HASH & SECURITY STAMP FOOTER */}
                <div className="border-t-2 border-gold/30 pt-6 mt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* QR Code Hash Stamp */}
                  {dossierExportConfig.showQRHash && (
                    <div className="sm:col-span-3 flex flex-col items-center text-center space-y-1">
                      <div className="p-2 bg-white rounded-xl border-2 border-gold shadow-md">
                        <QrCode className="w-16 h-16 text-slate-900" />
                      </div>
                      <span className="text-[9px] font-mono opacity-70 uppercase tracking-widest mt-1">
                        VERIFICATION QR HASH
                      </span>
                    </div>
                  )}

                  {/* Anti-Tamper Security Disclaimer */}
                  <div className={`${dossierExportConfig.showQRHash ? 'sm:col-span-5' : 'sm:col-span-8'} text-[10px] leading-relaxed opacity-75 font-mono space-y-1`}>
                    <p className="font-bold text-gold uppercase">Sello de Seguridad Anti-Falsificación:</p>
                    <p>
                      Este expediente oficial ha sido firmado cryptográfica y legalmente en la bóveda de CuratedLux International. Cualquier alteración o intento de fraude anula la garantía de depósito en garantía (Escrow) y será notificado a las autoridades.
                    </p>
                  </div>

                  {/* Official Appraiser Signature Block */}
                  {dossierExportConfig.showSignatureBlock && (
                    <div className="sm:col-span-4 text-center sm:text-right space-y-2">
                      <div className="inline-block border-b-2 border-gold/50 pb-1 px-4 min-w-[160px]">
                        <span className="font-serif italic text-lg font-bold text-gold">
                          {expandedDossierItemData.sellerProfile?.fullName || userProfile.fullName || "Alexander Vance"}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase font-mono">Firma del Valuador Principal</div>
                        <div className="text-[9px] opacity-60 font-mono">CuratedLux Switzerland Vault Authority</div>
                      </div>
                    </div>
                  )}

                </div>

              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Canvas for Camera Snap Captures */}
      <canvas ref={cameraCanvasRef} className="hidden" />

    </div>
  );
}

// Custom Icon for Barcode (since Lucide ScanBarcode isn't standard in older versions, making a generic fallback)
function ScanBarcodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 7v10" />
      <path d="M12 7v10" />
      <path d="M16 7v10" />
    </svg>
  );
}


