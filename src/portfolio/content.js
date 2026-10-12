export const profile = {
  name: "Archit Kumar",
  email: "architk5856@gmail.com",
  location: "Bengaluru, India",
  github: "https://github.com/Archit-k20",
  linkedin: "https://www.linkedin.com/in/archit-k20",
  title: "Archit Kumar — AI & Software Engineer",
  description:
    "AI systems, agentic workflows, and reliable backend engineering. Explore Archit Kumar’s projects, coding-agent evaluation work, and experience.",
};

export const resumes = [
  {
    id: "ai",
    title: "AI / GenAI Engineering",
    description: "GenAI, retrieval, machine learning and agent evaluation.",
    file: "/resume/Archit_Kumar_GenAI_Resume.pdf",
    metadata: "PDF · 1 page",
  },
  {
    id: "sde",
    title: "Software Engineering",
    description:
      "Backend services, APIs, databases and full-stack development.",
    file: "/resume/Archit_Kumar_SDE_Resume.pdf",
    metadata: "PDF · 1 page",
  },
];

export const experience = [
  {
    company: "Xelron.ai",
    role: "SDE Intern",
    specialty: "Agent Evaluation & Benchmark Engineering",
    date: "MAY 2026 — OCT 2026",
    type: "REMOTE",
    intro: "Building the tests that put coding agents to the test.",
    bullets: [
      "Authored and validated repository-level engineering benchmarks: task specifications, deterministic behavioral tests, Dockerized environments, reference solutions, and anti-cheat safeguards.",
      "Promoted to Team Lead within two months. Led technical reviews, analyzed agent-failure trajectories, and calibrated task difficulty for a 10-member authoring team.",
      "Built realistic input datasets and weighted scoring rubrics; independently verified submissions with CI checks, containerized harnesses, and repeated evaluation runs.",
    ],
    stats: [
      { value: "87%", label: "approval across 4 workstreams" },
      { value: "10", label: "members in the team I led" },
    ],
  },
  {
    company: "IBM",
    role: "GenAI Intern",
    specialty: "WatsonX Training Program",
    date: "MAY — JUL 2025",
    type: "REMOTE",
    intro: "From foundation models to grounded conversations.",
    bullets: [
      "Implemented retrieval-augmented generation pipelines using WatsonX foundation models for document Q&A and summarization.",
      "Built an IBM Watson Assistant chatbot with structured prompts and conversational flows for classification, summarization, and code generation.",
    ],
    stats: [],
  },
];

export const independent = {
  heading: "Independent benchmark engineering",
  intro:
    "Separate contract engagements, focused on making software-engineering evaluations hard, reproducible, and meaningful.",
  approval: { approved: 120, submitted: 122 },
  terminal:
    "Authored terminal-based tasks that require repository-level reasoning, reference implementations, deterministic tests, and isolated verification. Iterated on submissions using evaluation feedback.",
  analysis:
    "Developed a Go static-analysis benchmark covering object-sensitive analysis and control flow across branches, loops, aliases, and multiple return paths, with adversarial validation.",
};

export const projects = [
  {
    slug: "genai-assistant",
    number: "01",
    name: "TRACE — Agentic AI Workspace",
    shortName: "AI with its work in view.",
    category: "APPLIED AI / FULL-STACK ENGINEERING",
    summary:
      "Research, documents, code and media in one deployed workspace—with sources, processing stages and available checks beside the result.",
    image: "/images/trace-collection.webp",
    heroImage: "/images/trace-intro.webp",
    heroImageAlt:
      "TRACE introduction with its glass navigation and Explore TRACE action",
    imageWidth: 1440,
    imageHeight: 940,
    imageAlt:
      "TRACE collection showing a Research sample and its source evidence inspector",
    imageCaption:
      "The current TRACE collection. This is a bundled synthetic example, not a live AI result or a measure of model quality.",
    tags: ["Next.js", "TypeScript", "FastAPI", "FAISS + BM25", "Docker"],
    focus: "retrieval",
    accent: "mint",
    repo: "https://github.com/Archit-k20/Agentic-Workflows-GenAI-",
    demo: "https://trace-agentic-workspace.vercel.app/",
    demoLabel: "Open TRACE",
    fact: "15 tools / 3 workspaces",
    role: "Interface, Python API, retrieval, provider routing and deployment",
    editorialTitle: "Fifteen tools.\nOne clear workspace.",
    highlights: [
      { value: "15 tools", label: "Summarizer · Generator · Assistant" },
      { value: "3 modes", label: "Free · server-local · own OpenAI key" },
      { value: "24 hours", label: "Maximum temporary session retention" },
    ],
    gallery: [
      {
        id: "collection",
        label: "Collection",
        image: "/images/trace-collection.webp",
        imageWidth: 1440,
        imageHeight: 940,
        imageAlt:
          "TRACE collection with a Research example and opened source details",
        caption:
          "The collection lets visitors inspect a Research example and its source before using a tool. Bundled synthetic example; no live AI request.",
      },
      {
        id: "intro",
        label: "Introduction",
        image: "/images/trace-intro.webp",
        imageWidth: 1440,
        imageHeight: 940,
        imageAlt:
          "TRACE introduction in dark mode with glass navigation and Explore TRACE action",
        caption:
          "The current product introduction, with original SVG atmosphere, theme controls and a visible animation pause control.",
      },
      {
        id: "research",
        label: "Research & evidence",
        image: "/images/trace-research.webp",
        imageWidth: 1440,
        imageHeight: 940,
        imageAlt:
          "TRACE Research Agent sample report alongside its pinned evidence inspector",
        caption:
          "The Research workspace keeps the report and source inspector together. The report is a labelled synthetic fixture, not generated output from a live request.",
      },
      {
        id: "code",
        label: "Code & checks",
        image: "/images/trace-code.webp",
        imageWidth: 1440,
        imageHeight: 1207,
        imageAlt:
          "TRACE Code Copilot sample showing Python code and individual AST and bytecode checks",
        caption:
          "Code Copilot separates code from individual diagnostics. The displayed checks are synthetic examples; syntax checks do not establish correctness or security.",
      },
    ],
    workspaces: [
      {
        name: "Summarizer",
        description: "Make sense of the input.",
        tools: "Text · YouTube · articles · PDF/DOCX · image OCR",
      },
      {
        name: "Generator",
        description: "Give an idea its first form.",
        tools: "Images · speech · captions · code · content packages",
      },
      {
        name: "Assistant",
        description: "Investigate, retrieve and decide.",
        tools:
          "Research · document intelligence · document Q&A · article Q&A · support triage",
      },
    ],
    architectureNotes: [
      {
        title: "Two hosting layers, deliberately",
        text: "Next.js runs on Vercel. FastAPI, private Ollama inference and persistent volumes run on a Google Compute Engine VM, where native utilities and long-running CPU work can live.",
      },
      {
        title: "Temporary, session-owned storage",
        text: "SQLite tracks hashed session-token metadata; private files hold uploads, generated media and retrieval contexts. Ownership checks and expiry bound access to a maximum of 24 hours.",
      },
    ],
    evidenceLinks: [
      {
        label: "Architecture notes",
        url: "https://github.com/Archit-k20/Agentic-Workflows-GenAI-/blob/main/docs/architecture.md",
      },
      {
        label: "Verification record",
        url: "https://github.com/Archit-k20/Agentic-Workflows-GenAI-/blob/main/docs/verification.md",
      },
      {
        label: "Model evaluation evidence",
        url: "https://github.com/Archit-k20/Agentic-Workflows-GenAI-/blob/main/docs/evaluation/README.md",
      },
    ],
    scenarios: [
      {
        id: "grounded",
        label: "Grounded answer",
        stages: [
          "Document input",
          "Extract & embed",
          "FAISS + BM25",
          "Answer + source chunks",
        ],
        note: "Free/local document Q&A combines BGE semantic retrieval and BM25 keyword search using reciprocal-rank fusion. The returned chunks expose the evidence used; retrieval and citations do not certify every generated claim.",
      },
      {
        id: "uncertain",
        label: "Low confidence",
        stages: [
          "Support request",
          "Assess confidence",
          "Low confidence",
          "Escalate",
        ],
        note: "Support triage combines request classification and supplied support sources to propose an answer or escalation with a next step. Model confidence is not calibrated certainty; source conflicts and policy boundaries still require judgement.",
      },
      {
        id: "repair",
        label: "Invalid code",
        stages: [
          "Generate code",
          "Available check fails",
          "One repair pass",
          "Check again",
        ],
        note: "Python AST/bytecode checks and available native syntax/compilation checks can trigger one repair attempt. Generated programs are never executed. Missing isolation or toolchains are reported as unavailable, not as passed checks.",
      },
      {
        id: "fallback",
        label: "Hosted capacity",
        stages: [
          "Free text request",
          "Hosted stage unavailable",
          "Server-local fallback",
          "Disclose engine + warnings",
        ],
        note: "An unfinished free text stage may continue on the server’s pinned Ollama model; later text stages stay local for that run. This can be much slower. Image fallback follows a separate, narrower capacity-rejection policy.",
      },
    ],
    problem:
      "Moving between separate AI tools fragments the work—and a polished answer can hide weak sources or missing checks. I wanted a single place to move from a document, question or rough idea to an output whose evidence and limits can be inspected.",
    contribution:
      "I evolved the original Streamlit application into TRACE: a Next.js and TypeScript interface, a typed FastAPI service, fifteen tool contracts, hybrid retrieval and provider routing. I connected hosted and server-local inference, temporary storage, isolated code checks and a two-layer deployment, while keeping live drafts separate from read-only examples.",
    architecture: [
      {
        title: "Interface",
        detail: "Next.js · typed inputs · in-memory drafts",
      },
      {
        title: "API & retrieval",
        detail: "FastAPI · OCR · BGE / FAISS / BM25",
      },
      { title: "Execution", detail: "Cloudflare · Ollama · optional OpenAI" },
      {
        title: "Inspectable result",
        detail: "Workflow events · sources · checks · warnings",
      },
    ],
    decisions: [
      {
        title: "Put the evidence beside the answer",
        text: "Free/local Q&A fuses FAISS semantic matches with BM25 keyword search and returns the actual source chunks. The interface exposes evidence, observed stages and available checks alongside the result.",
      },
      {
        title: "Stream observed work, preserve partial results",
        text: "Request-bound workflow events report extraction, retrieval, review, warnings and completion through FastAPI. The UI preserves useful partial output and diagnostics without inventing progress percentages or replaying interrupted requests.",
      },
      {
        title: "Make fallback a visible decision",
        text: "Hosted text can continue on a pinned server-local model, with the engine change disclosed. Image requests use a separate Cloudflare-to-private-Hugging-Face fallback only for explicit capacity rejection; ambiguous failures require a deliberate retry.",
      },
      {
        title: "Keep exploration separate from execution",
        text: "Read-only examples never consume generation quota or overwrite a live draft. Tool inputs, files and results stay in tab-scoped memory. Typed contracts generated from OpenAPI keep the frontend and Python API aligned.",
      },
    ],
    reliability: [
      "Bounded syntax/compilation checks and one repair pass; generated programs are not executed.",
      "Session ownership, exact allowed origins, Turnstile and fair-use controls bound public execution.",
      "URL fetching validates public destinations and redirects; uploaded pickle indexes are not deserialized.",
      "Failures, missing narration and unavailable checks remain visible alongside partial results. No automatic request replay.",
    ],
    result:
      "Shipped a public frontend and Python backend with fifteen tools, three execution modes and five interactive examples. The repository records 28 passing frontend tests, type checks, builds and native backend CI coverage. These verify defined behaviors; the documented model evaluation still leaves full current-profile quality acceptance open.",
    limitations:
      "Free access needs no visitor key but uses shared provider capacity. Server-local inference is slower and does not mean offline or on-device execution. Sources can be unavailable; generated claims still need review. Syntax checks do not prove functional correctness or security. The backend uses a single VM funded by trial credits; permanent history, autonomous web search and multi-instance storage are not implemented.",
  },
  {
    slug: "climate-risk",
    number: "02",
    name: "ClimateRisk Observatory",
    shortName: "Satellite inputs. Traceable results.",
    category: "COMPUTER VISION / ML SYSTEMS",
    summary:
      "A satellite-analysis workspace with explicit demo data, queued processing and saved report provenance. Real inference is gated on verified model artifacts and training metadata.",
    image: "/images/observatory-overview.webp",
    imageWidth: 1280,
    imageHeight: 1273,
    imageAlt:
      "ClimateRisk Observatory overview with a terrain illustration, sample risk distribution and recent sample analyses",
    imageCaption:
      "The new Observatory overview, captured in demo mode. Totals and risk indices describe sample records, not live inference or measured climate outcomes.",
    tags: ["React", "FastAPI", "PyTorch", "Celery / Redis", "PostgreSQL"],
    focus: "storage",
    accent: "blue",
    repo: "https://github.com/Archit-k20/Climate-Observatory",
    demo: null,
    demoLabel: "Explore the demo",
    fact: "Queued analysis / saved provenance",
    role: "React interface, asynchronous API, persisted results & ML integration",
    editorialTitle: "Satellite inputs.\nTraceable results.",
    highlights: [
      {
        value: "2 explicit modes",
        label: "Demo workspace · connected backend",
      },
      { value: "3-model ensemble", label: "ResNet18 · ViT · XGBoost" },
      {
        value: "Saved provenance",
        label: "Votes · version · original narrative",
      },
    ],
    galleryHeading: "A CLOSER LOOK / THE DEMO INTERFACE",
    galleryBackground: "#101815",
    galleryProvenance:
      "Screenshots from the project README · 11 October 2026 · All screens use labelled sample data. No successful real-model inference is shown.",
    gallery: [
      {
        id: "overview",
        label: "Overview",
        image: "/images/observatory-overview.webp",
        imageWidth: 1280,
        imageHeight: 1273,
        imageAlt:
          "ClimateRisk Observatory dark overview with an abstract terrain study and sample analysis metrics",
        caption:
          "The Observatory overview combines a terrain study with recent analyses and risk distribution. All six records and their totals are illustrative samples.",
      },
      {
        id: "upload",
        label: "Upload & analyze",
        image: "/images/observatory-upload.webp",
        imageWidth: 1280,
        imageHeight: 992,
        imageAlt:
          "ClimateRisk image upload screen with a visible demonstration-mode notice and local image preview area",
        caption:
          "Demo uploads provide a local image preview and a link to an existing sample report. They do not analyze the selected image; that requires the connected backend and verified models.",
      },
      {
        id: "map",
        label: "Risk map",
        image: "/images/observatory-map.webp",
        imageWidth: 1280,
        imageHeight: 1205,
        imageAlt:
          "ClimateRisk illustrative risk map with location filters, risk legend and map attribution",
        caption:
          "An exploratory map with filters, markers and a risk legend. Locations are illustrative and are not a live geographic climate feed.",
      },
      {
        id: "simulator",
        label: "Simulator",
        image: "/images/observatory-simulator.webp",
        imageWidth: 1280,
        imageHeight: 1316,
        imageAlt:
          "ClimateRisk scenario simulator with adjustable conditions, a crop-yield chart and risk matrix",
        caption:
          "Scenario controls connect to a crop-yield chart and risk matrix. The formulas are heuristic demonstrations, not validated agricultural forecasts.",
      },
      {
        id: "reports",
        label: "Report archive",
        image: "/images/observatory-reports.webp",
        imageWidth: 1280,
        imageHeight: 1224,
        imageAlt:
          "ClimateRisk report archive with search, risk filters and clearly labelled sample reports",
        caption:
          "The report archive supports search, filtering and sorting. This capture shows sample records; connected mode reads the original persisted analyses.",
      },
      {
        id: "detail",
        label: "Saved report",
        image: "/images/observatory-detail.webp",
        imageWidth: 1280,
        imageHeight: 1224,
        imageAlt:
          "ClimateRisk sample report with heuristic index, record provenance, original narrative and PDF export",
        caption:
          "A sample report exposes its source, missing location and original narrative alongside PDF export. The sample index is not a measured assessment; no model was run for this record.",
      },
    ],
    scenarios: [
      {
        id: "analysis",
        label: "Connected analysis",
        stages: [
          "Validate & reserve",
          "Queue / verify models",
          "Classify & commit",
          "Poll or receive event",
        ],
        note: "The documented connected path requires verified model artifacts and training metadata. FastAPI reserves an analysis, Celery runs it, and PostgreSQL commits the result before completion is announced. Polling still works if the socket connection drops. This is an explanation, not a live inference run.",
      },
      {
        id: "model-unavailable",
        label: "Model unavailable",
        stages: [
          "Worker starts",
          "Metadata gate fails",
          "Record the failure",
          "Show no invented score",
        ],
        note: "Missing metadata, a checksum mismatch or an incompatible checkpoint makes inference unavailable. The failure is recorded and visible; connected mode never substitutes sample data. The archived training metadata remains unverified in the current repository.",
      },
      {
        id: "report-fallback",
        label: "Narrative fallback",
        stages: [
          "Classification available",
          "Gemini unavailable",
          "Labelled template",
          "Save text & reason",
        ],
        note: "After a valid classification, absent Gemini configuration or failed generation selects a structured template. The exact narrative, source and fallback reason are stored together, so reopening or exporting a report preserves its history instead of generating a new explanation.",
      },
    ],
    problem:
      "An image-to-dashboard demo can blur together model output, illustrative data and environmental interpretation. Users need to see what actually ran, whether a background job finished, and where a report came from—even when models or external services are unavailable.",
    contribution:
      "I reworked my original climate-risk project into ClimateRisk Observatory: a React/TypeScript interface backed by FastAPI, Celery, Redis and PostgreSQL. I connected upload validation, an explicit analysis lifecycle, ensemble compatibility checks and a persistent report archive, while keeping the demo workspace separate from connected processing.",
    architecture: [
      { title: "Validate & queue", detail: "FastAPI · Celery / Redis" },
      {
        title: "Verify & classify",
        detail: "Metadata gate · 3-model ensemble",
      },
      { title: "Persist one record", detail: "PostgreSQL · votes · narrative" },
      {
        title: "Read & update",
        detail: "React · polling · Socket.IO after commit",
      },
    ],
    architectureNotes: [
      {
        title: "One lifecycle, multiple delivery paths",
        text: "Queued and synchronous paths share the same analysis service. States are queued, running, completed, inconclusive or failed. The worker commits before emitting a Redis-backed completion event; polling reads the same stored record.",
      },
      {
        title: "Compatibility before inference",
        text: "ResNet18 and ViT share a 224 × 224 RGB transform. XGBoost uses seven features extracted at 64 × 64. The runtime checks artifact hashes, label order and preprocessing metadata before loading. Recovering genuine training metadata remains an outstanding prerequisite.",
      },
      {
        title: "Agreement is not confidence",
        text: "Two matching model votes select a land-cover class; three different votes remain inconclusive without a risk index. Low, Medium and High map to fixed heuristic indices of 22, 55 and 82. Vote agreement is shown separately and is not calibrated probability.",
      },
    ],
    decisions: [
      {
        title: "Persist before announcing success",
        text: "A PostgreSQL commit is the boundary for completion. Repeated requests for the same uploaded image reuse its analysis record, and stale workers cannot overwrite a later retry. The dashboard and archive read the same result.",
      },
      {
        title: "Keep demo and connected behavior explicit",
        text: "Demo mode uses deterministic sample records and makes no API or Socket.IO requests. Connected mode keeps genuine empty and failed states. Selecting a new image clears the previous result and prevents late requests from painting stale output.",
      },
      {
        title: "Preserve the original interpretation",
        text: "Optional Gemini narration falls back to a labelled template. Text, source and fallback reason are saved with the model votes and version. Opening a report or exporting its PDF reads that original narrative rather than regenerating it.",
      },
      {
        title: "Preserve history without filling gaps",
        text: "An additive migration retains the older image and risk rows. The archive presents the latest historical record per image, with missing location or narrative left explicit. Legacy records are excluded from new-analysis dashboard metrics.",
      },
    ],
    reliability: [
      "JPEG/PNG content validation and a 5 MiB upload limit before processing.",
      "Locked per-image reservation, task identity checks and retry reuse protect persisted analysis state.",
      "Missing model metadata and incompatible artifacts fail explicitly; disagreement produces no risk index.",
      "Queue and database failures never report successful completion. Socket delivery can fail without losing a committed result.",
      "A polling timeout offers a fresh status check; it does not claim that the background worker stopped.",
    ],
    result:
      "The rework delivers an explorable demo interface and a connected workflow with validated uploads, durable analysis records, saved narrative provenance and explicit failure paths. Repository regression tests cover upload boundaries, retries, persistence failures, voting and mode separation. Successful workflow tests use a stub predictor and do not validate the archived models’ accuracy.",
    limitations:
      "Real-model inference remains unavailable until genuine training metadata and artifact compatibility are verified. No new accuracy benchmark or scientific calibration is established. Risk indices and simulator formulas are heuristic; map locations are illustrative. The pgvector similarity endpoint is retained, but embeddings are not populated by this rework. A frontend demo does not include a hosted API, database or worker.",
    evidence: [
      {
        label: "Architecture & runtime modes",
        href: "https://github.com/Archit-k20/Climate-Observatory#how-it-works",
      },
      {
        label: "Model verification & limits",
        href: "https://github.com/Archit-k20/Climate-Observatory/blob/main/docs/model-artifacts.md",
      },
      {
        label: "Workflow regression tests",
        href: "https://github.com/Archit-k20/Climate-Observatory/blob/main/backend/tests/test_workflow.py",
      },
    ],
  },
  {
    slug: "ai-doctor",
    number: "03",
    name: "The Shape of Health",
    shortName: "From report text to reviewed evidence.",
    category: "EXPLAINABLE ML / DOCUMENT INTELLIGENCE",
    summary:
      "An educational health workspace connecting symptom exploration, source-traceable report findings and reviewable summaries—with explicit boundaries around model inputs and optional AI.",
    image: "/images/health-home.webp",
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt:
      "The Shape of Health homepage with separate entry points for symptom exploration and report review",
    imageCaption:
      "The new public homepage. An educational application for exploring information, not a diagnostic or treatment service.",
    galleryHeading: "A CLOSER LOOK / THE HEALTH WORKSPACE",
    galleryBackground: "#f4f8f6",
    galleryProvenance:
      "Screenshots from the updated repository · 12 October 2026 · Workspace results and report text use fictional examples only. They do not demonstrate clinical accuracy.",
    gallery: [
      {
        id: "home",
        label: "Introduction",
        image: "/images/health-home.webp",
        imageWidth: 1280,
        imageHeight: 720,
        imageAlt:
          "The Shape of Health homepage offering symptom exploration and medical-report review",
        caption:
          "The public homepage presents two starting points—symptoms and reports—with educational-use and session-privacy information available before entering the workspace.",
      },
      {
        id: "symptoms",
        label: "Symptom workspace",
        image: "/images/health-symptoms.webp",
        imageWidth: 1280,
        imageHeight: 720,
        imageAlt:
          "Fictional cold-like walkthrough with six selected symptoms and precomputed ranked dataset matches",
        caption:
          "A bundled fictional walkthrough places selected symptoms beside precomputed matches. Rankings describe associations in the project dataset, not a person’s probability of having a condition.",
      },
      {
        id: "report-review",
        label: "Report review",
        image: "/images/health-report-review.webp",
        imageWidth: 1280,
        imageHeight: 720,
        imageAlt:
          "Fictional doctor note with its source transcript and unchecked confirmation controls for fatigue and cough",
        caption:
          "A prepared fictional note demonstrates source evidence and explicit confirmation. Extracted mentions are never automatically selected as current symptoms.",
      },
    ],
    tags: ["React / TypeScript", "FastAPI", "scikit-learn", "SHAP", "Tesseract"],
    focus: "evaluation",
    accent: "amber",
    repo: "https://github.com/Archit-k20/AI-Powered-Health-Prediction-Web-App",
    demo: "https://the-shape-of-health.vercel.app/",
    demoLabel: "Open the workspace",
    fact: "Extract · review · confirm",
    role: "Full-stack implementation, model evaluation & document processing",
    editorialTitle: "From report text\nto reviewed evidence.",
    scenarios: [
      {
        id: "report-confirmation",
        label: "Review a report",
        stages: [
          "Extract text & source evidence",
          "Separate mentions by context",
          "Confirm supported current symptoms",
          "Assess only validated inputs",
        ],
        note: "In the fictional note, cough and fatigue need explicit confirmation. Denied shortness of breath, historical migraine and hypothetical nausea remain context. The API rejects unconfirmed report-derived inputs; lab values and diagnoses do not become inferred symptoms.",
      },
      {
        id: "service-unavailable",
        label: "Live tools unavailable",
        stages: [
          "Request a live assessment",
          "Backend or model unavailable",
          "Show an explicit failure state",
          "Offer a fictional walkthrough",
        ],
        note: "A failed live request does not produce an invented result. Bundled examples remain separately labelled and available without the backend; the visitor can explore those examples or retry the live tool.",
      },
      {
        id: "prepared-explanation",
        label: "Optional AI fallback",
        stages: [
          "Select an allowlisted fictional case",
          "Optional provider unavailable",
          "Return a prepared explanation",
          "Label its mode & sources",
        ],
        note: "Gemini accepts only predefined fictional case IDs. Missing credentials, quota errors, invalid output or unrecognised source IDs fall back to a prepared explanation. Visitor symptoms, report uploads and free text never enter this optional AI path.",
      },
    ],
    problem:
      "Report text mixes current symptoms with history, negation, family context and uncertain statements. Treating every extracted mention as a model input creates misleading results. I wanted a workspace where users can inspect the evidence, correct findings and decide which supported symptoms are current before an assessment runs.",
    contribution:
      "I reworked my earlier AI Doctor project into The Shape of Health: a React/TypeScript workspace, a containerised FastAPI service, a reproducible Random Forest evaluation pipeline and a source-aware report reader. I connected explicit input confirmation, per-match SHAP explanations, educational source links and browser-generated PDF summaries, with the frontend on Vercel and API on Cloud Run.",
    architecture: [
      { title: "Select or extract", detail: "React · PDF text · local OCR" },
      {
        title: "Review & confirm",
        detail: "Source evidence · context · Pydantic",
      },
      { title: "Rank & explain", detail: "Random Forest · SHAP · catalog" },
      {
        title: "Keep a summary",
        detail: "Reviewed findings · browser PDF export",
      },
    ],
    architectureNotes: [
      {
        title: "Two input paths, one confirmation boundary",
        text: "Visitors select supported symptoms directly or review document findings first. Positioned PDF text and local Tesseract OCR retain page references, quotes and extraction methods. Report-derived symptoms require explicit current-symptom confirmation before the FastAPI assessment endpoint accepts them.",
      },
      {
        title: "A versioned contract from API to interface",
        text: "Pydantic schemas generate OpenAPI TypeScript types. The backend bundles its model and catalog, with no database or startup downloads. Startup checks model and registry hashes, dependency versions, feature order and class mapping before enabling assessments.",
      },
      {
        title: "Separate live inputs from optional generation",
        text: "Reports go directly from the frontend to Cloud Run for transient processing. The optional Gemini endpoint accepts only an allowlisted fictional case ID and rejects request bodies and query parameters. No visitor health input is forwarded to that provider.",
      },
    ],
    decisions: [
      {
        title: "An extracted mention is not a model input",
        text: "Report findings retain their source and context. Only supported symptoms explicitly confirmed as current enter an assessment; lab values, diagnoses and historical mentions stay separate. The API enforces the same boundary as the interface.",
      },
      {
        title: "Deduplicate before evaluating",
        text: "The training pipeline uses all 17 symptom columns and removes identical patterns before splitting. The 4,920 rows become 304 unique patterns: 243 for training and 61 for holdout evaluation. Dataset labels are targets only, and cross-validation stays within the training partition.",
      },
      {
        title: "Explain the class that was actually ranked",
        text: "Each of the three highest-ranked matches uses its corresponding class’s SHAP contributions. Attributed educational sources describe the condition separately; they do not validate the classifier or convert its rankings into personal risk estimates.",
      },
      {
        title: "Keep review and export in the browser",
        text: "The interface keeps originals, extracted transcripts, corrections and confirmation provenance available for review. Lazy-loaded PDF.js supports document inspection; jsPDF produces a paginated summary. No account or saved health-history database is required.",
      },
    ],
    reliability: [
      "Content-based file validation, a 10 MB upload limit, ten-page PDF limit and 20-megapixel image limit bound extraction work.",
      "A bounded extraction queue, processing deadlines, disconnect cancellation and request quotas expose actionable failure states.",
      "Unconfirmed, unsupported or insufficient symptom inputs are rejected before assessment. Missing values remain missing.",
      "Health inputs stay in session memory with transient backend processing; application errors omit submitted health content.",
      "Bundled fictional examples work without the backend. Optional AI explanations validate source IDs and fall back to labelled prepared text.",
    ],
    result:
      "A deployed educational workspace with report evidence, explicit confirmation, ranked dataset matches and downloadable summaries. The repository reports 100% accuracy for both Random Forest and logistic regression on 61 internal holdout patterns. That small, highly repetitive dataset has undocumented clinical provenance; these scores are not evidence of performance on patients. Regression coverage addresses software behavior rather than clinical extraction quality.",
    limitations:
      "Not clinically validated: it cannot diagnose, recommend treatment, assess urgency or estimate personal disease risk. Unselected symptoms are encoded as absent; age, duration, BMI and lab values are not model features. Rule-based extraction can miss unfamiliar wording, poor scans and complex tables; empty extraction does not mean normal results. Cloud Run can cold-start. The public demo uses prepared fictional explanations, with Gemini currently unconfigured.",
    evidenceLinks: [
      {
        label: "Model evaluation & limits",
        url: "https://github.com/Archit-k20/AI-Powered-Health-Prediction-Web-App/blob/main/docs/EVALUATION.md",
      },
      {
        label: "Testing & reproducibility",
        url: "https://github.com/Archit-k20/AI-Powered-Health-Prediction-Web-App/blob/main/docs/TESTING.md",
      },
      {
        label: "Report-confirmation tests",
        url: "https://github.com/Archit-k20/AI-Powered-Health-Prediction-Web-App/blob/main/backend/tests/test_report_review.py",
      },
    ],
  },
];

export const supportingProjects = [
  {
    id: "inventory",
    name: "Inventory Reservation System",
    label: "BACKEND ENGINEERING",
    eyebrow: "JAVA / TRANSACTIONS / FAILURE FLOWS",
    editorialTitle: ["The last item", "can only sell"],
    editorialAccent: "once.",
    description:
      "A Spring Boot backend and React dashboard for reserving stock, confirming orders, and releasing reservations without overselling. A focus on transactional invariants and failed order flows.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Kafka"],
    image: "/images/inventory-console.webp",
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt:
      "Inventory Reservation System backend demo console with stock totals, product inventory and a create-product form",
    imageCaption:
      "Updated backend demo console. Sample stock and reservation totals illustrate the interface, not customer usage.",
    repo: "https://github.com/Archit-k20/Inventory-Reservation-System",
  },
  {
    id: "crm",
    name: "CRM Analytics Dashboard",
    label: "DATA ENGINEERING",
    eyebrow: "PYTHON / SQL / SALES ANALYTICS",
    editorialTitle: ["From raw records", "to a clearer"],
    editorialAccent: "pipeline.",
    description:
      "A sales-lifecycle dashboard for inspecting leads, pipeline value, and conversion performance with filters and visual reports.",
    tags: ["Python", "Streamlit", "MySQL", "SQLAlchemy"],
    image: "/images/crm.webp",
    imageWidth: 1800,
    imageHeight: 974,
    imageAlt:
      "CRM dashboard with owner, date and source filters, pipeline KPIs and conversion charts",
    imageCaption:
      "Sales analytics interface with filters and conversion reporting. The figures shown are sample data, not customer results.",
    repo: "https://github.com/Archit-k20/CRM-Dashboard",
  },
];
export const skills = [
  {
    id: "01",
    title: "Agentic AI & evaluation",
    intro: "Build the workflow. Verify the result.",
    items: [
      "LangChain",
      "RAG",
      "FAISS",
      "LLM evaluation",
      "Benchmark engineering",
      "Agent trajectory analysis",
      "Prompt engineering",
    ],
  },
  {
    id: "02",
    title: "Machine learning & vision",
    intro: "From raw inputs to interpretable signals.",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "Vision Transformers",
      "ResNet",
      "Hugging Face",
      "OCR",
    ],
  },
  {
    id: "03",
    title: "Backend & infrastructure",
    intro: "The systems that make the model useful.",
    items: [
      "Python",
      "Java",
      "C++",
      "SQL",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Linux",
      "Git",
      "React",
    ],
  },
];

export const education = {
  degree: "B.Tech · Computer Science",
  institution: "Vellore Institute of Technology",
  graduation: "May 2026",
  gpa: "8.45",
  leadership:
    "Led a 15-member AI/ML Club team, organizing 20+ events for 500+ students.",
};
