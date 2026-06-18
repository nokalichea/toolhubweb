const tools = [
  { name: "Image Compressor", category: "Image", panel: "image-compressor", icon: "IMG", description: "Reduce image size with quality control and instant downloads." },
  { name: "Image Resizer", category: "Image", panel: "image-editor", icon: "SIZE", description: "Resize, crop, and convert image formats in one local editor." },
  { name: "Image Cropper", category: "Image", panel: "image-editor", icon: "CROP", description: "Crop images by pixel dimensions and preview before download." },
  { name: "Format Converter", category: "Image", panel: "image-editor", icon: "WEBP", description: "Convert images to JPG, PNG, or WEBP from your browser." },
  { name: "Background Remover", category: "Image", panel: "background-remover", icon: "BG", description: "Remove solid or near-solid image backgrounds locally." },
  { name: "Watermark Image", category: "Image", panel: "image-watermark", icon: "WM", description: "Add text watermarks to images before publishing." },
  { name: "PDF Converter", category: "Documents", panel: "pdf-converter", icon: "PDF", description: "Convert selected images into a clean downloadable PDF." },
  { name: "Merge PDF", category: "Documents", panel: "pdf-suite", icon: "MRG", description: "Combine multiple PDF files into one downloadable document." },
  { name: "Split PDF", category: "Documents", panel: "pdf-suite", icon: "SPL", description: "Extract selected pages from a PDF using page ranges." },
  { name: "Compress PDF", category: "Documents", panel: "pdf-suite", icon: "ZIP", description: "Rebuild a lighter PDF copy when browser compression is supported." },
  { name: "PDF Watermark", category: "Documents", panel: "pdf-suite", icon: "WTR", description: "Add a simple text watermark across PDF pages." },
  { name: "Word to PDF", category: "Documents", panel: "doc-converter", icon: "DOC", description: "Create a clean PDF from pasted document text." },
  { name: "PDF to Word", category: "Documents", panel: "doc-converter", icon: "TXT", description: "Create a Word-compatible document from extracted or pasted text." },
  { name: "QR Code Generator", category: "Developer", panel: "qr-generator", icon: "QR", description: "Create scannable QR codes for links, text, and contact snippets." },
  { name: "Password Generator", category: "Security", panel: "password-generator", icon: "KEY", description: "Generate strong passwords with browser crypto randomness." },
  { name: "Password Checker", category: "Security", panel: "password-checker", icon: "CHK", description: "Check password strength without sending it anywhere." },
  { name: "Hash Generator", category: "Security", panel: "hash-generator", icon: "SHA", description: "Generate SHA-256, SHA-384, and SHA-512 hashes." },
  { name: "JSON Formatter", category: "Developer", panel: "json-formatter", icon: "{ }", description: "Validate, beautify, minify, and copy JSON safely." },
  { name: "Word Counter", category: "Text", panel: "word-counter", icon: "TXT", description: "Track words, characters, and estimated reading time live." },
  { name: "Case Converter", category: "Text", panel: "case-converter", icon: "Aa", description: "Convert text to upper, lower, title, or sentence case." },
  { name: "Text Formatter", category: "Text", panel: "text-formatter", icon: "FMT", description: "Clean spacing, remove empty lines, and sort line lists." },
  { name: "Plagiarism Checker", category: "Text", panel: "plagiarism-checker", icon: "SIM", description: "Compare two passages for basic similarity signals." },
  { name: "Base64 Encoder", category: "Developer", panel: "base64-tool", icon: "64", description: "Encode and decode Base64 strings for web workflows." },
  { name: "URL Encoder", category: "Developer", panel: "url-tool", icon: "%", description: "Encode or decode URL-safe strings instantly." },
  { name: "Code Minifier", category: "Developer", panel: "code-minifier", icon: "MIN", description: "Minify HTML, CSS, and JavaScript for faster pages." },
  { name: "Color Converter", category: "Developer", panel: "color-tool", icon: "RGB", description: "Convert HEX colors to RGB and HSL values." },
  { name: "Timestamp Converter", category: "Developer", panel: "timestamp-tool", icon: "UTC", description: "Convert Unix timestamps into readable local dates." },
  { name: "EMI Calculator", category: "Calculators", panel: "emi-calculator", icon: "EMI", description: "Calculate loan EMI, total interest, and payable amount." },
  { name: "Age Calculator", category: "Calculators", panel: "age-calculator", icon: "AGE", description: "Calculate exact age in years, months, and days." },
  { name: "Ad-Ready Utility Slot", category: "Business", panel: "featured", icon: "$", description: "Reserved layout for monetized tools and premium upgrades." }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let activeCategory = "All";
let selectedPdfImages = [];
let editorImageElement = null;
let bgImageElement = null;
let watermarkImageElement = null;

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderToolCards();
  bindSearch();
  bindDrops();
  bindImageCompressor();
  bindImageEditor();
  bindBackgroundRemover();
  bindWatermarkTool();
  bindPdfConverter();
  bindPdfSuite();
  bindDocConverter();
  bindQrTool();
  bindPasswordTool();
  bindPasswordChecker();
  bindHashGenerator();
  bindJsonTool();
  bindWordCounter();
  bindCaseConverter();
  bindTextFormatter();
  bindSimilarityChecker();
  bindBase64Tool();
  bindUrlTool();
  bindCodeMinifier();
  bindColorTool();
  bindTimestampTool();
  bindCalculators();
});

function renderFilters() {
  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];
  const wrap = $("#categoryFilters");
  if (!wrap) return;
  wrap.innerHTML = categories.map((category) => (
    `<button class="chip${category === activeCategory ? " active" : ""}" data-category="${category}">${category}</button>`
  )).join("");
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.category;
      renderFilters();
      renderToolCards();
    });
  });
}

function renderToolCards() {
  const grid = $("#tool-grid");
  if (!grid) return;
  const search = ($("#toolSearch")?.value || "").trim().toLowerCase();
  const filtered = tools.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const haystack = `${tool.name} ${tool.category} ${tool.description}`.toLowerCase();
    return matchesCategory && haystack.includes(search);
  });

  grid.innerHTML = filtered.map((tool) => `
    <a class="tool-card" href="#${tool.panel}" data-tool-card="${tool.panel}">
      <span class="tool-icon">${tool.icon}</span>
      <div>
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
      </div>
    </a>
  `).join("") || `<div class="tool-card"><h3>No tools found</h3><p>Try a broader search term.</p></div>`;
}

function bindSearch() {
  $("#toolSearch")?.addEventListener("input", renderToolCards);
}

function bindDrops() {
  $$(".drop-zone").forEach((zone) => {
    ["dragenter", "dragover"].forEach((eventName) => {
      zone.addEventListener(eventName, (event) => {
        event.preventDefault();
        zone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      zone.addEventListener(eventName, () => zone.classList.remove("dragover"));
    });
  });
}

function bindImageCompressor() {
  const input = $("#imageInput");
  const quality = $("#qualityRange");
  const qualityValue = $("#qualityValue");
  if (!input || !quality) return;

  quality.addEventListener("input", () => {
    qualityValue.textContent = `${quality.value}%`;
  });

  input.addEventListener("change", () => processImages(input.files));
  $("#imageDrop")?.addEventListener("drop", (event) => {
    event.preventDefault();
    processImages(event.dataTransfer.files);
  });
}

async function processImages(files) {
  const imageFiles = Array.from(files || []).filter((file) => file.type.startsWith("image/"));
  const results = $("#imageResults");
  const progress = $("#imageProgress");
  if (!results || !progress) return;
  results.innerHTML = "";
  progress.style.width = "0%";

  if (!imageFiles.length) {
    results.innerHTML = `<div class="status-line">Choose at least one image file.</div>`;
    return;
  }

  for (let index = 0; index < imageFiles.length; index += 1) {
    const file = imageFiles[index];
    try {
      const compressed = await compressImage(file, Number($("#qualityRange").value) / 100);
      const saved = Math.max(0, Math.round((1 - compressed.blob.size / file.size) * 100));
      const url = URL.createObjectURL(compressed.blob);
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <img src="${url}" alt="Compressed preview of ${escapeHtml(file.name)}">
        <strong>${escapeHtml(file.name)}</strong>
        <span>${formatBytes(file.size)} to ${formatBytes(compressed.blob.size)} (${saved}% smaller)</span>
        <a class="button primary" href="${url}" download="${safeFileName(file.name, "compressed", "jpg")}">Download</a>
      `;
      results.appendChild(card);
    } catch (error) {
      results.insertAdjacentHTML("beforeend", `<div class="result-card"><strong>${escapeHtml(file.name)}</strong><span>Could not compress this file.</span></div>`);
    }
    progress.style.width = `${Math.round(((index + 1) / imageFiles.length) * 100)}%`;
  }
}

function compressImage(file, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const maxSide = 2400;
        const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));
        canvas.getContext("2d", { alpha: false }).drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) reject(new Error("Compression failed"));
          resolve({ blob, width: canvas.width, height: canvas.height });
        }, "image/jpeg", quality);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindImageEditor() {
  const input = $("#editorImage");
  if (!input) return;
  input.addEventListener("change", () => loadImageFile(input.files?.[0], (img) => {
    editorImageElement = img;
    $("#resizeWidth").value = img.width;
    $("#resizeHeight").value = img.height;
    $("#cropW").value = img.width;
    $("#cropH").value = img.height;
    renderEditedImage();
  }, $("#editorStatus")));
  $("#editorDrop")?.addEventListener("drop", (event) => {
    event.preventDefault();
    loadImageFile(event.dataTransfer.files?.[0], (img) => {
      editorImageElement = img;
      $("#resizeWidth").value = img.width;
      $("#resizeHeight").value = img.height;
      $("#cropW").value = img.width;
      $("#cropH").value = img.height;
      renderEditedImage();
    }, $("#editorStatus"));
  });
  $("#applyImageEditBtn")?.addEventListener("click", renderEditedImage);
  $("#downloadEditedImageBtn")?.addEventListener("click", () => downloadCanvas($("#editorCanvas"), "toolhub-edited-image", $("#imageFormat").value));
}

function renderEditedImage() {
  const status = $("#editorStatus");
  if (!editorImageElement) {
    status.textContent = "Upload an image first.";
    return;
  }
  const canvas = $("#editorCanvas");
  const ctx = canvas.getContext("2d");
  const sx = clampNumber(Number($("#cropX").value) || 0, 0, editorImageElement.width - 1);
  const sy = clampNumber(Number($("#cropY").value) || 0, 0, editorImageElement.height - 1);
  const sw = clampNumber(Number($("#cropW").value) || editorImageElement.width, 1, editorImageElement.width - sx);
  const sh = clampNumber(Number($("#cropH").value) || editorImageElement.height, 1, editorImageElement.height - sy);
  const width = Math.max(1, Number($("#resizeWidth").value) || sw);
  const height = Math.max(1, Number($("#resizeHeight").value) || sh);
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(editorImageElement, sx, sy, sw, sh, 0, 0, width, height);
  status.textContent = `Preview ready at ${width} x ${height}px.`;
}

function bindBackgroundRemover() {
  const input = $("#bgImage");
  if (!input) return;
  input.addEventListener("change", () => loadImageFile(input.files?.[0], (img) => {
    bgImageElement = img;
    drawImageToCanvas(img, $("#bgCanvas"));
    $("#bgStatus").textContent = "Image loaded. Adjust color and tolerance if needed.";
  }, $("#bgStatus")));
  $("#removeBgBtn")?.addEventListener("click", () => {
    const status = $("#bgStatus");
    if (!bgImageElement) {
      status.textContent = "Upload an image first.";
      return;
    }
    const canvas = $("#bgCanvas");
    drawImageToCanvas(bgImageElement, canvas);
    const ctx = canvas.getContext("2d");
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const target = hexToRgb($("#bgColor").value);
    const tolerance = Number($("#bgTolerance").value) || 38;
    for (let i = 0; i < image.data.length; i += 4) {
      const distance = Math.hypot(image.data[i] - target.r, image.data[i + 1] - target.g, image.data[i + 2] - target.b);
      if (distance <= tolerance) image.data[i + 3] = 0;
    }
    ctx.putImageData(image, 0, 0);
    downloadCanvas(canvas, "toolhub-background-removed", "image/png");
    status.textContent = "Background removed and PNG downloaded.";
  });
}

function bindWatermarkTool() {
  const input = $("#watermarkImage");
  if (!input) return;
  input.addEventListener("change", () => loadImageFile(input.files?.[0], (img) => {
    watermarkImageElement = img;
    renderWatermark();
  }, $("#watermarkStatus")));
  $("#applyWatermarkBtn")?.addEventListener("click", renderWatermark);
  $("#downloadWatermarkBtn")?.addEventListener("click", () => downloadCanvas($("#watermarkCanvas"), "toolhub-watermarked", "image/jpeg"));
}

function renderWatermark() {
  const status = $("#watermarkStatus");
  if (!watermarkImageElement) {
    status.textContent = "Choose an image first.";
    return;
  }
  const canvas = $("#watermarkCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = watermarkImageElement.width;
  canvas.height = watermarkImageElement.height;
  ctx.drawImage(watermarkImageElement, 0, 0);
  const text = $("#watermarkText").value.trim() || "ToolHub";
  const fontSize = Math.max(20, Math.round(canvas.width / 18));
  ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`;
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = "rgba(255,255,255,0.84)";
  ctx.strokeStyle = "rgba(18,24,38,0.55)";
  ctx.lineWidth = Math.max(2, Math.round(fontSize / 12));
  ctx.strokeText(text, canvas.width - fontSize, canvas.height - fontSize);
  ctx.fillText(text, canvas.width - fontSize, canvas.height - fontSize);
  status.textContent = "Watermark preview ready.";
}

function loadImageFile(file, onload, status) {
  if (!file || !file.type.startsWith("image/")) {
    status.textContent = "Choose a valid image file.";
    return;
  }
  const reader = new FileReader();
  reader.onerror = () => status.textContent = "Could not read that image.";
  reader.onload = () => {
    const img = new Image();
    img.onerror = () => status.textContent = "Could not load that image.";
    img.onload = () => onload(img);
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function drawImageToCanvas(img, canvas) {
  const maxSide = 1800;
  const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
  canvas.width = Math.max(1, Math.round(img.width * ratio));
  canvas.height = Math.max(1, Math.round(img.height * ratio));
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
}

function downloadCanvas(canvas, name, mimeType) {
  if (!canvas || canvas.width <= 1 || canvas.height <= 1) return;
  const ext = mimeType.includes("png") ? "png" : mimeType.includes("webp") ? "webp" : "jpg";
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${name}.${ext}`);
  }, mimeType, Number($("#editorQuality")?.value || 82) / 100);
}

function bindPdfConverter() {
  const input = $("#pdfImages");
  const status = $("#pdfStatus");
  if (!input || !status) return;

  input.addEventListener("change", () => {
    selectedPdfImages = Array.from(input.files || []).filter((file) => file.type.startsWith("image/"));
    status.textContent = selectedPdfImages.length ? `${selectedPdfImages.length} image(s) ready.` : "No images selected.";
  });

  $("#pdfDrop")?.addEventListener("drop", (event) => {
    event.preventDefault();
    selectedPdfImages = Array.from(event.dataTransfer.files || []).filter((file) => file.type.startsWith("image/"));
    status.textContent = selectedPdfImages.length ? `${selectedPdfImages.length} image(s) ready.` : "Drop image files to continue.";
  });

  $("#createPdfBtn")?.addEventListener("click", async () => {
    if (!selectedPdfImages.length) {
      status.textContent = "Choose image files first.";
      return;
    }
    status.textContent = "Creating PDF...";
    try {
      const pdfBlob = await imagesToPdf(selectedPdfImages);
      downloadBlob(pdfBlob, "toolhub-images.pdf");
      status.textContent = `PDF created from ${selectedPdfImages.length} image(s).`;
    } catch (error) {
      status.textContent = "PDF creation failed. Try smaller images or fewer files.";
    }
  });
}

function bindPdfSuite() {
  $("#mergePdfBtn")?.addEventListener("click", mergePdfs);
  $("#splitPdfBtn")?.addEventListener("click", splitPdf);
  $("#compressPdfBtn")?.addEventListener("click", compressPdf);
  $("#watermarkPdfBtn")?.addEventListener("click", watermarkPdf);
  $("#pdfFiles")?.addEventListener("change", () => {
    const count = $("#pdfFiles").files.length;
    $("#pdfSuiteStatus").textContent = count ? `${count} PDF file(s) selected.` : "Choose PDF files to continue.";
  });
}

async function ensurePdfLib() {
  if (window.PDFLib) return window.PDFLib;
  await loadScript("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js");
  return window.PDFLib;
}

async function mergePdfs() {
  const files = Array.from($("#pdfFiles")?.files || []);
  const status = $("#pdfSuiteStatus");
  if (!files.length) {
    status.textContent = "Choose at least one PDF file.";
    return;
  }
  try {
    status.textContent = "Merging PDFs...";
    const { PDFDocument } = await ensurePdfLib();
    const merged = await PDFDocument.create();
    for (const file of files) {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const pages = await merged.copyPages(src, src.getPageIndices());
      pages.forEach((page) => merged.addPage(page));
    }
    downloadBlob(new Blob([await merged.save()], { type: "application/pdf" }), "toolhub-merged.pdf");
    status.textContent = "Merged PDF downloaded.";
  } catch (error) {
    status.textContent = "Could not merge these PDFs. Encrypted PDFs may not be supported.";
  }
}

async function splitPdf() {
  const file = $("#pdfFiles")?.files?.[0];
  const status = $("#pdfSuiteStatus");
  if (!file) {
    status.textContent = "Choose a PDF file first.";
    return;
  }
  try {
    status.textContent = "Splitting PDF...";
    const { PDFDocument } = await ensurePdfLib();
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pagesToCopy = parsePageRange($("#pdfRange").value, source.getPageCount());
    if (!pagesToCopy.length) {
      status.textContent = "Enter a valid range such as 1-3,5.";
      return;
    }
    const out = await PDFDocument.create();
    const pages = await out.copyPages(source, pagesToCopy);
    pages.forEach((page) => out.addPage(page));
    downloadBlob(new Blob([await out.save()], { type: "application/pdf" }), "toolhub-split.pdf");
    status.textContent = "Selected pages downloaded.";
  } catch (error) {
    status.textContent = "Could not split this PDF.";
  }
}

async function compressPdf() {
  const file = $("#pdfFiles")?.files?.[0];
  const status = $("#pdfSuiteStatus");
  if (!file) {
    status.textContent = "Choose a PDF file first.";
    return;
  }
  try {
    status.textContent = "Rebuilding PDF...";
    const { PDFDocument } = await ensurePdfLib();
    const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const out = await PDFDocument.create();
    const pages = await out.copyPages(source, source.getPageIndices());
    pages.forEach((page) => out.addPage(page));
    downloadBlob(new Blob([await out.save({ useObjectStreams: true })], { type: "application/pdf" }), "toolhub-compressed.pdf");
    status.textContent = "Optimized copy downloaded. Image-heavy PDFs may need server-side compression for larger savings.";
  } catch (error) {
    status.textContent = "Could not compress this PDF in the browser.";
  }
}

async function watermarkPdf() {
  const file = $("#pdfFiles")?.files?.[0];
  const text = $("#pdfWatermarkText").value.trim();
  const status = $("#pdfSuiteStatus");
  if (!file || !text) {
    status.textContent = "Choose a PDF and enter watermark text.";
    return;
  }
  try {
    status.textContent = "Adding watermark...";
    const { PDFDocument, rgb, degrees } = await ensurePdfLib();
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    pdf.getPages().forEach((page) => {
      const { width, height } = page.getSize();
      page.drawText(text, {
        x: width * 0.18,
        y: height * 0.48,
        size: Math.max(24, width / 13),
        rotate: degrees(-32),
        color: rgb(0.55, 0.6, 0.68),
        opacity: 0.24
      });
    });
    downloadBlob(new Blob([await pdf.save()], { type: "application/pdf" }), "toolhub-watermarked.pdf");
    status.textContent = "Watermarked PDF downloaded.";
  } catch (error) {
    status.textContent = "Could not watermark this PDF.";
  }
}

function bindDocConverter() {
  $("#textToPdfBtn")?.addEventListener("click", () => {
    const text = $("#docText").value.trim();
    if (!text) {
      $("#docStatus").textContent = "Paste document text first.";
      return;
    }
    const blob = textToSimplePdf(text);
    downloadBlob(blob, "toolhub-document.pdf");
    $("#docStatus").textContent = "PDF downloaded.";
  });
  $("#textToWordBtn")?.addEventListener("click", () => {
    const text = $("#docText").value.trim();
    if (!text) {
      $("#docStatus").textContent = "Paste document text first.";
      return;
    }
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>ToolHub Document</title></head><body><pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre></body></html>`;
    downloadBlob(new Blob([html], { type: "application/msword" }), "toolhub-document.doc");
    $("#docStatus").textContent = "Word-compatible document downloaded.";
  });
}

async function imagesToPdf(files) {
  const pages = [];
  for (const file of files) {
    const compressed = await compressImage(file, 0.86);
    const bytes = new Uint8Array(await compressed.blob.arrayBuffer());
    pages.push({ bytes, width: compressed.width, height: compressed.height });
  }
  return buildImagePdf(pages);
}

function buildImagePdf(pages) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const add = (part) => {
    const bytes = typeof part === "string" ? encoder.encode(part) : part;
    chunks.push(bytes);
    length += bytes.length;
  };
  const objectCount = 2 + pages.length * 3;

  add("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const writeObject = (id, bodyParts) => {
    offsets[id] = length;
    add(`${id} 0 obj\n`);
    bodyParts.forEach(add);
    add("\nendobj\n");
  };

  writeObject(1, [`<< /Type /Catalog /Pages 2 0 R >>`]);
  const pageRefs = pages.map((_, index) => `${3 + index * 3} 0 R`).join(" ");
  writeObject(2, [`<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>`]);

  pages.forEach((page, index) => {
    const pageId = 3 + index * 3;
    const imageId = pageId + 1;
    const contentId = pageId + 2;
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 36;
    const scale = Math.min((pageWidth - margin * 2) / page.width, (pageHeight - margin * 2) / page.height);
    const drawWidth = page.width * scale;
    const drawHeight = page.height * scale;
    const x = (pageWidth - drawWidth) / 2;
    const y = (pageHeight - drawHeight) / 2;
    const stream = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im${index} Do\nQ\n`;

    writeObject(pageId, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im${index} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`]);
    writeObject(imageId, [
      `<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.bytes.length} >>\nstream\n`,
      page.bytes,
      `\nendstream`
    ]);
    writeObject(contentId, [`<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}endstream`]);
  });

  const xrefOffset = length;
  add(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
  for (let id = 1; id <= objectCount; id += 1) {
    add(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  }
  add(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

function bindQrTool() {
  const text = $("#qrText");
  const preview = $("#qrPreview");
  const status = $("#qrStatus");
  const download = $("#downloadQrBtn");
  if (!text || !preview || !status || !download) return;

  const generate = () => {
    const value = text.value.trim();
    if (!value) {
      status.textContent = "Enter text or a URL first.";
      preview.removeAttribute("src");
      download.removeAttribute("href");
      return;
    }
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=18&data=${encodeURIComponent(value)}`;
    preview.src = url;
    download.href = url;
    status.textContent = "Generating QR code...";
  };
  preview.addEventListener("load", () => {
    status.textContent = "QR code generated.";
  });
  preview.addEventListener("error", () => {
    status.textContent = "QR preview could not load. Check your connection and try again.";
  });
  $("#generateQrBtn")?.addEventListener("click", generate);
  text.addEventListener("input", debounce(generate, 450));
}

function bindPasswordTool() {
  const length = $("#passwordLength");
  const output = $("#passwordOutput");
  if (!length || !output) return;
  const updateLength = () => $("#passwordLengthValue").textContent = length.value;
  length.addEventListener("input", updateLength);
  updateLength();

  $("#generatePasswordBtn")?.addEventListener("click", () => {
    const pools = [
      "abcdefghijklmnopqrstuvwxyz",
      $("#useUpper").checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      $("#useNumbers").checked ? "0123456789" : "",
      $("#useSymbols").checked ? "!@#$%^&*_-+=?." : ""
    ].filter(Boolean);
    const chars = pools.join("");
    if (!chars) {
      $("#passwordStatus").textContent = "Keep at least one character type selected.";
      return;
    }
    output.value = randomString(Number(length.value), chars, pools);
    const strength = Math.min(100, Math.round((Number(length.value) / 32) * 70 + pools.length * 8));
    $("#strengthBar").style.width = `${strength}%`;
    $("#passwordStatus").textContent = strength > 75 ? "Strong password generated." : "Good password generated.";
  });

  $("#copyPasswordBtn")?.addEventListener("click", () => copyText(output.value, $("#passwordStatus"), "Password copied."));
  $("#generatePasswordBtn")?.click();
}

function bindPasswordChecker() {
  const input = $("#passwordCheckInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const score = scorePassword(input.value);
    $("#checkStrengthBar").style.width = `${score.percent}%`;
    $("#passwordCheckOutput").textContent = score.message;
  });
}

function scorePassword(value) {
  if (!value) return { percent: 0, message: "No password entered." };
  let points = Math.min(40, value.length * 3);
  if (/[a-z]/.test(value)) points += 10;
  if (/[A-Z]/.test(value)) points += 12;
  if (/\d/.test(value)) points += 12;
  if (/[^A-Za-z0-9]/.test(value)) points += 16;
  if (value.length >= 16) points += 10;
  if (/(.)\1{2,}/.test(value)) points -= 15;
  if (/password|1234|qwerty|admin|welcome/i.test(value)) points -= 25;
  const percent = clampNumber(points, 0, 100);
  const label = percent >= 85 ? "Excellent" : percent >= 65 ? "Strong" : percent >= 45 ? "Moderate" : "Weak";
  return { percent, message: `${label}: ${percent}/100. Use long, unique passwords with mixed character types.` };
}

function bindHashGenerator() {
  const run = async (algorithm) => {
    const text = $("#hashInput").value;
    if (!text) {
      $("#hashOutput").textContent = "Enter text to hash.";
      return;
    }
    const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text));
    $("#hashOutput").textContent = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };
  $("#sha256Btn")?.addEventListener("click", () => run("SHA-256"));
  $("#sha384Btn")?.addEventListener("click", () => run("SHA-384"));
  $("#sha512Btn")?.addEventListener("click", () => run("SHA-512"));
}

function randomString(length, chars, requiredPools) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  const pass = Array.from(bytes, (value) => chars[value % chars.length]);
  requiredPools.forEach((pool, index) => {
    pass[index % pass.length] = pool[bytes[index] % pool.length];
  });
  return pass.sort(() => crypto.getRandomValues(new Uint32Array(1))[0] > 2147483647 ? 1 : -1).join("");
}

function bindJsonTool() {
  const input = $("#jsonInput");
  const output = $("#jsonOutput");
  if (!input || !output) return;
  const transform = (spaces) => {
    try {
      output.textContent = JSON.stringify(JSON.parse(input.value), null, spaces);
    } catch (error) {
      output.textContent = `Invalid JSON: ${error.message}`;
    }
  };
  $("#formatJsonBtn")?.addEventListener("click", () => transform(2));
  $("#minifyJsonBtn")?.addEventListener("click", () => transform(0));
  $("#copyJsonBtn")?.addEventListener("click", () => copyText(output.textContent, $("#jsonStatus"), "Copied JSON output."));
}

function bindWordCounter() {
  const input = $("#wordInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const text = input.value.trim();
    const words = text ? text.split(/\s+/).filter(Boolean) : [];
    $("#wordCount").textContent = words.length;
    $("#charCount").textContent = input.value.length;
    $("#readTime").textContent = words.length ? `${Math.max(1, Math.ceil(words.length / 225))}m` : "0m";
  });
}

function bindCaseConverter() {
  $$("[data-case]").forEach((button) => {
    button.addEventListener("click", () => {
      const text = $("#caseInput").value;
      const mode = button.dataset.case;
      const converted = mode === "upper" ? text.toUpperCase()
        : mode === "lower" ? text.toLowerCase()
        : mode === "title" ? text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
        : text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
      $("#caseOutput").value = converted;
    });
  });
}

function bindTextFormatter() {
  const input = $("#formatTextInput");
  const output = $("#formatTextOutput");
  if (!input || !output) return;
  $("#cleanTextBtn")?.addEventListener("click", () => {
    output.value = input.value.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  });
  $("#removeLinesBtn")?.addEventListener("click", () => {
    output.value = input.value.split(/\r?\n/).filter((line) => line.trim()).join("\n");
  });
  $("#sortLinesBtn")?.addEventListener("click", () => {
    output.value = input.value.split(/\r?\n/).filter((line) => line.trim()).sort((a, b) => a.localeCompare(b)).join("\n");
  });
}

function bindSimilarityChecker() {
  $("#checkSimilarityBtn")?.addEventListener("click", () => {
    const a = tokenize($("#plagiarismA").value);
    const b = tokenize($("#plagiarismB").value);
    if (!a.size || !b.size) {
      $("#plagiarismOutput").textContent = "Enter both texts to compare.";
      return;
    }
    const common = [...a].filter((word) => b.has(word)).length;
    const union = new Set([...a, ...b]).size;
    const score = Math.round((common / union) * 100);
    $("#plagiarismOutput").textContent = `Basic similarity: ${score}%. This is a local comparison tool, not a full internet plagiarism scan.`;
  });
}

function bindBase64Tool() {
  const input = $("#base64Input");
  const output = $("#base64Output");
  if (!input || !output) return;
  $("#encodeBase64Btn")?.addEventListener("click", () => {
    output.value = btoa(unescape(encodeURIComponent(input.value)));
  });
  $("#decodeBase64Btn")?.addEventListener("click", () => {
    try {
      output.value = decodeURIComponent(escape(atob(input.value.trim())));
    } catch (error) {
      output.value = "Invalid Base64 input.";
    }
  });
}

function bindUrlTool() {
  const input = $("#urlInput");
  const output = $("#urlOutput");
  if (!input || !output) return;
  $("#encodeUrlBtn")?.addEventListener("click", () => output.value = encodeURIComponent(input.value));
  $("#decodeUrlBtn")?.addEventListener("click", () => {
    try {
      output.value = decodeURIComponent(input.value);
    } catch (error) {
      output.value = "Invalid encoded URL input.";
    }
  });
}

function bindCodeMinifier() {
  $("#minifyCodeBtn")?.addEventListener("click", () => {
    const type = $("#minifyType").value;
    const input = $("#minifyInput").value;
    let output = input;
    if (type === "html") {
      output = input.replace(/<!--[\s\S]*?-->/g, "").replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
    } else if (type === "css") {
      output = input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*([{}:;,>])\s*/g, "$1").replace(/\s{2,}/g, " ").trim();
    } else {
      output = input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").replace(/\s*([{}();,:=+\-*/<>])\s*/g, "$1").replace(/\s{2,}/g, " ").trim();
    }
    $("#minifyOutput").textContent = output || "Paste code to minify.";
  });
}

function bindColorTool() {
  const picker = $("#colorPicker");
  const hexInput = $("#hexInput");
  if (!picker || !hexInput) return;
  const update = (hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    picker.value = normalized;
    hexInput.value = normalized;
    const rgb = hexToRgb(normalized);
    $("#rgbValue").textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    $("#hslValue").textContent = rgbToHsl(rgb.r, rgb.g, rgb.b);
  };
  picker.addEventListener("input", () => update(picker.value));
  hexInput.addEventListener("input", () => update(hexInput.value));
  update(picker.value);
}

function bindTimestampTool() {
  const input = $("#timestampInput");
  const output = $("#timestampOutput");
  if (!input || !output) return;
  const convert = () => {
    const seconds = Number(input.value);
    if (!Number.isFinite(seconds)) {
      output.textContent = "Enter a valid Unix timestamp.";
      return;
    }
    const date = new Date(seconds * 1000);
    output.textContent = `${date.toLocaleString()} | UTC ${date.toISOString()}`;
  };
  $("#timestampNowBtn")?.addEventListener("click", () => {
    input.value = Math.floor(Date.now() / 1000);
    convert();
  });
  $("#convertTimestampBtn")?.addEventListener("click", convert);
}

function bindCalculators() {
  $("#calculateEmiBtn")?.addEventListener("click", () => {
    const principal = Number($("#emiPrincipal").value);
    const annualRate = Number($("#emiRate").value);
    const months = Number($("#emiMonths").value);
    if (principal <= 0 || annualRate < 0 || months <= 0) {
      $("#emiOutput").textContent = "Enter loan amount, interest rate, and tenure.";
      return;
    }
    const monthlyRate = annualRate / 12 / 100;
    const emi = monthlyRate === 0 ? principal / months : principal * monthlyRate * ((1 + monthlyRate) ** months) / (((1 + monthlyRate) ** months) - 1);
    const total = emi * months;
    $("#emiOutput").textContent = `Monthly EMI: ${formatMoney(emi)} | Interest: ${formatMoney(total - principal)} | Total: ${formatMoney(total)}`;
  });
  $("#calculateAgeBtn")?.addEventListener("click", () => {
    const value = $("#birthDate").value;
    if (!value) {
      $("#ageOutput").textContent = "Select your date of birth.";
      return;
    }
    const birth = new Date(`${value}T00:00:00`);
    const today = new Date();
    if (birth > today) {
      $("#ageOutput").textContent = "Birth date cannot be in the future.";
      return;
    }
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const totalDays = Math.floor((today - birth) / 86400000);
    $("#ageOutput").textContent = `${years} years, ${months} months, ${days} days old (${totalDays.toLocaleString()} days total).`;
  });
}

function copyText(text, statusTarget, successMessage) {
  if (!text) {
    if ("textContent" in statusTarget) statusTarget.textContent = "Nothing to copy yet.";
    return;
  }
  const done = () => {
    if ("textContent" in statusTarget) statusTarget.textContent = successMessage;
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    return;
  }
  fallbackCopy(text, done);
}

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
    done();
  } finally {
    area.remove();
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function textToSimplePdf(text) {
  const lines = [];
  text.split(/\r?\n/).forEach((line) => {
    const chunks = line.match(/.{1,86}(\s|$)|.{1,86}/g) || [""];
    chunks.forEach((chunk) => lines.push(chunk.trimEnd()));
  });
  const pages = [];
  for (let i = 0; i < lines.length; i += 42) pages.push(lines.slice(i, i + 42));
  if (!pages.length) pages.push([""]);

  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const add = (part) => {
    const bytes = encoder.encode(part);
    chunks.push(bytes);
    length += bytes.length;
  };
  const pageCount = pages.length;
  const objectCount = 2 + pageCount * 2 + 1;
  const fontId = objectCount;
  add("%PDF-1.4\n");
  const object = (id, body) => {
    offsets[id] = length;
    add(`${id} 0 obj\n${body}\nendobj\n`);
  };
  object(1, "<< /Type /Catalog /Pages 2 0 R >>");
  const refs = pages.map((_, i) => `${3 + i * 2} 0 R`).join(" ");
  object(2, `<< /Type /Pages /Kids [${refs}] /Count ${pageCount} >>`);
  pages.forEach((pageLines, index) => {
    const pageId = 3 + index * 2;
    const contentId = pageId + 1;
    const stream = `BT\n/F1 11 Tf\n50 790 Td\n14 TL\n${pageLines.map((line) => `(${pdfEscape(line)}) Tj T*`).join("\n")}\nET`;
    object(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    object(contentId, `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`);
  });
  object(fontId, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const xref = length;
  add(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
  for (let id = 1; id <= objectCount; id += 1) add(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  add(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

function pdfEscape(value) {
  return value.replace(/[\\()]/g, "\\$&").replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");
}

function parsePageRange(value, max) {
  const input = value.trim() || `1-${max}`;
  const pages = new Set();
  input.split(",").forEach((part) => {
    const [startRaw, endRaw] = part.split("-").map((n) => Number(n.trim()));
    const start = clampNumber(startRaw || 0, 1, max);
    const end = clampNumber(endRaw || start, 1, max);
    for (let page = Math.min(start, end); page <= Math.max(start, end); page += 1) pages.add(page - 1);
  });
  return [...pages].sort((a, b) => a - b);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function formatMoney(value) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function safeFileName(name, suffix, ext) {
  const base = name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "") || "toolhub";
  return `${base}-${suffix}.${ext}`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function normalizeHex(value) {
  const raw = value.trim().replace("#", "");
  if (/^[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw.split("").map((char) => char + char).join("")}`.toLowerCase();
  }
  if (/^[0-9a-f]{6}$/i.test(raw)) return `#${raw}`.toLowerCase();
  return null;
}

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function tokenize(text) {
  return new Set(text.toLowerCase().match(/[a-z0-9]+/g) || []);
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / d + 2;
    if (max === b) h = (r - g) / d + 4;
    h /= 6;
  }
  return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
