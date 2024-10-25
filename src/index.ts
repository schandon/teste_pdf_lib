import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  page.drawText('Olá, este é um teste com pdf-lib!', {
    x: 50,
    y: 300,
    size: 24,
    color: rgb(0, 0, 1),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('teste.pdf', pdfBytes);
}

createPdf()
  .then(() => console.log('PDF criado com sucesso!'))
  .catch((error) => console.error('Erro ao criar PDF:', error));
