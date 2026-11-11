import {test} from 'node:test';import assert from 'node:assert/strict';
import {printReportHTML} from '../src/print-report.js';
test('Impressão offline não acessa conteúdo da janela opaca e autentica mensagem por origem da janela/token',async()=>{
 const original={document:globalThis.document,window:globalThis.window,URL:globalThis.URL};let listener,removed=false,revoked=false,blob,frame;
 const childWindow={};const parent={addEventListener:(type,f)=>{listener=f;},removeEventListener:(type,f)=>{assert.equal(f,listener);removed=true;}};
 globalThis.window=parent;globalThis.URL={createObjectURL:b=>{blob=b;return'blob:null/sintetico';},revokeObjectURL:()=>{revoked=true;}};
 globalThis.document={getElementById:()=>null,createElement:()=>{frame={style:{},contentWindow:childWindow,remove(){}};Object.defineProperty(frame,'contentDocument',{get(){throw Error('Acesso proibido à janela opaca');}});return frame;},body:{append:()=>{queueMicrotask(async()=>{
   if(frame.onload){await frame.onload();return;}
   const html=await blob.text();assert.match(html,/window.print\(\)/);assert.match(html,/document.fonts/);const token=JSON.parse(html.match(/const token=("[^"]+")/)[1]);
   listener({source:childWindow,data:{type:'hakunas-print',token:'incorreto',status:'requested'}});assert.equal(removed,false);
   listener({source:{},data:{type:'hakunas-print',token,status:'requested'}});assert.equal(removed,false);
   listener({source:childWindow,data:{type:'hakunas-print',token,status:'requested'}});
 });}}};
 try{await printReportHTML('<html><body><h1>Relatório sintético</h1></body></html>');assert.equal(removed,true);assert.equal(revoked,true);}finally{Object.assign(globalThis,original);}
});
