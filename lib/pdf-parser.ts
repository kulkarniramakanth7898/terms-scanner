/**
 * Client-side PDF Text Extractor using pdfjs-dist.
 * Converts uploaded PDF array buffers into raw text strings natively in browser.
 */

export async function extractTextFromPDF(file: File): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('PDF parsing is only supported on the client-side.');
  }

  try {
    // Dynamic import of pdfjs-dist to avoid SSR window issues
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configure worker source to match current pdfjs-dist version via CDN or local path
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      const version = pdfjsLib.version || '4.0.379';
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    let fullText = '';
    const numPages = pdfDocument.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`;
    }

    const trimmedText = fullText.trim();
    if (!trimmedText) {
      throw new Error('Could not extract readable text from this PDF. It may be scanned images or protected.');
    }

    return trimmedText;
  } catch (err: any) {
    console.error('Error parsing PDF:', err);
    throw new Error(err.message || 'Failed to parse PDF document.');
  }
}
