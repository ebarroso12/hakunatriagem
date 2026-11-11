import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as XLSX from 'xlsx';
import {reportModel} from '../src/reports.js';
import {exportReport,reportFileInfo,reportFormats} from '../src/report-exports.js';
const people=[{id:crypto.randomUUID(),name:'Pessoa sintética áé',age:'40',weight:'80',height:'178',flags:[],reviewed:[],sourceFields:[{label:'Origem especial',value:'=1+2',location:'teste!A1'}]},{id:crypto.randomUUID(),name:'',age:'',weight:'70',height:'',flags:[],reviewed:[]}];
const model=()=>reportModel(people,{header:{topNumber:'01782',location:'Local sintético',baseName:'Base sintética'},date:new Date('2026-11-11T12:00:00Z')});
test('Os cinco formatos geram extensão e MIME reais sem exigir campos completos',()=>{
 assert.deepEqual(Object.keys(reportFormats),['xlsx','csv','ods','pdf','html']);
 for(const kind of ['full','missing'])for(const format of Object.keys(reportFormats)){
  const f=exportReport(model(),kind,format);assert.ok(f.name.endsWith('.'+format));assert.ok(f.name.includes('TOP-01782'));assert.equal(f.type,reportFormats[format].type);assert.ok(f.data.byteLength||f.data.length);
  if(['xlsx','ods'].includes(format)){const w=XLSX.read(f.data,{type:'array'});assert.ok(w.SheetNames.includes('Campos faltantes'));assert.ok(JSON.stringify(w).includes('Nome completo'));if(kind==='full'){assert.ok(w.SheetNames.includes('Participantes'));assert.ok(JSON.stringify(w).includes('=1+2'));assert.ok(!Object.values(w.Sheets).some(s=>Object.values(s).some(c=>c?.f)));}}
  if(format==='pdf'){assert.equal(Buffer.from(f.data).subarray(0,5).toString(),'%PDF-');assert.ok(Buffer.from(f.data).includes(Buffer.from('/FontFile2')));}
  if(format==='html'){assert.match(f.data,/TOP 01782/);assert.match(f.data,/Nome não informado/);assert.match(f.data,/Imprimir/);}
  if(format==='csv'){assert.match(f.data,/Pessoa sintética áé/);assert.match(f.data,/Nome não informado/);if(kind==='full')assert.match(f.data,/'=1\+2/);}
 }
 assert.equal(model().summary.records,2);
});
test('Não aceitar extensão inventada nem renomear um HTML como PDF',()=>{
 assert.throws(()=>reportFileInfo(model(),'full','lgnd'),/Formato/);assert.throws(()=>exportReport(model(),'bad','pdf'),/relatório/);
});
test('PDF real preserva nome acentuado, origem longa e fim do relatório em várias páginas',async()=>{
 const {DOMMatrix,ImageData,Path2D}=await import('@napi-rs/canvas');Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
 globalThis.pdfjsWorker=await import('pdfjs-dist/build/pdf.worker.min.mjs');
 const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
 const p={...people[0],sourceFields:[{label:'Campo longo',value:'INÍCIO '+('texto longo sintético '.repeat(75))+' MARCADOR FINAL',location:'teste!Z999'}]};
 const m=reportModel([p,people[1]],{header:{topNumber:'01782',location:'Local sintético',baseName:'Base sintética'}}),f=exportReport(m,'full','pdf');
 const doc=await getDocument({data:new Uint8Array(f.data),useSystemFonts:false}).promise;let text='';assert.ok(doc.numPages>1);
 for(let n=1;n<=doc.numPages;n++){const page=await doc.getPage(n);const t=(await page.getTextContent()).items.map(i=>i.str).join(' ');assert.match(t,/TOP 01782/);text+=t+' ';}
 assert.match(text,/Pessoa sintética áé/);assert.match(text,/Nome não informado/);assert.match(text,/MARCADOR FINAL/);assert.match(text,/teste!Z999/);assert.match(text,/LEIA-ME/);assert.match(text,/Não informado/);await doc.destroy();
});
