import { PDFDocument, StandardFonts, rgb } from 'pdf-lib.js';
import { download } from 'download.js';

// async function createPdf() {
//   const pdfDoc = await PDFDocument.create()
//   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

//   const page = pdfDoc.addPage()
//   const { width, height } = page.getSize()
//   const fontSize = 30
//   page.drawText('Creating PDFs in JavaScript is awesome!', {
//     x: 50,
//     y: height - 4 * fontSize,
//     size: fontSize,
//     font: timesRomanFont,
//     color: rgb(0, 0.53, 0.71),
//   })

//   const pdfBytes = await pdfDoc.save()
// }

export async function createPdf() {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

          // Trigger the browser to download the PDF document
    download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
  }
 
// createPdf();
//     async function createPdf() {
//       const pdfDoc = await PDFLib.PDFDocument.create();
//       const page = pdfDoc.addPage([350, 400]);
//       page.moveTo(110, 300);
//       page.drawText('Hello World!');
//       const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
//       document.getElementById('pdf').src = pdfDataUri;
//     }