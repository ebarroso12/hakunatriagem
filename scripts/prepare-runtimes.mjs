import {readFile,writeFile} from 'node:fs/promises';
const [pdfWorker,ocrCore,ocrWorker,por,eng]=await Promise.all([
 readFile('node_modules/pdfjs-dist/build/pdf.worker.min.mjs','utf8'),
 readFile('node_modules/tesseract.js-core/tesseract-core-lstm.wasm.js','utf8'),
 readFile('node_modules/tesseract.js/dist/worker.min.js','utf8'),
 readFile('node_modules/@tesseract.js-data/por/4.0.0_best_int/por.traineddata.gz'),
 readFile('node_modules/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz')]);
const ocrPrefix='const embeddedLanguages='+JSON.stringify({por:por.toString('base64'),eng:eng.toString('base64')})+';self.fetch=async function(url){const key=String(url).match(/^embedded:\\/([a-z]+)\\.traineddata\\.gz$/)?.[1];if(!key||!embeddedLanguages[key])throw Error("Requisição externa bloqueada no OCR offline");const value=atob(embeddedLanguages[key]);return new Response(Uint8Array.from(value,c=>c.charCodeAt(0)),{status:200});};\n';
await writeFile('src/generated-runtimes.js','export const pdfWorkerSource='+JSON.stringify(pdfWorker)+';\nexport const ocrWorkerSource='+JSON.stringify(ocrPrefix+ocrCore+'\n'+ocrWorker)+';\n');

const [topFont,topFontLicense]=await Promise.all([readFile('src/assets/Anton-Regular.ttf'),readFile('src/assets/Anton-OFL.txt','utf8')]);
await writeFile('src/generated-header-assets.js','export const headerFontData='+JSON.stringify('data:font/ttf;base64,'+topFont.toString('base64'))+';\nexport const headerFontLicense='+JSON.stringify(topFontLicense)+';\n');
