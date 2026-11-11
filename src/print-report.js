// O documento de impressão vive em origem opaca em file://; ele próprio imprime.
// A página não lê contentDocument/contentWindow.document de outro contexto.
export async function printReportHTML(html){
 document.getElementById('report-print-frame')?.remove();
 const frame=document.createElement('iframe');frame.id='report-print-frame';frame.title='Relatório pronto para impressão';frame.style.cssText='position:fixed;left:-10000px;top:0;width:1000px;height:800px;border:0';
 const token=crypto.randomUUID();
 const script=`<script>const token=${JSON.stringify(token)};window.addEventListener('load',async()=>{try{await document.fonts?.ready;window.focus();window.print();parent.postMessage({type:'hakunas-print',token,status:'requested'},'*');}catch(e){parent.postMessage({type:'hakunas-print',token,status:'error'},'*');}},{once:true});<\/script>`;
 const printable=html.replace('</body>',script+'</body>'),url=URL.createObjectURL(new Blob([printable],{type:'text/html;charset=utf-8'}));
 await new Promise((resolve,reject)=>{
  const cleanup=()=>{clearTimeout(timer);window.removeEventListener('message',message);URL.revokeObjectURL(url);};
  const message=event=>{
   // Origem null não identifica o remetente; exigir referência da janela e token único.
   if(event.source!==frame.contentWindow||event.data?.type!=='hakunas-print'||event.data.token!==token)return;
   if(event.data.status==='requested'){cleanup();resolve();}
   else if(event.data.status==='error'){cleanup();frame.remove();reject(Error('O navegador não abriu a impressão. Salve o PDF ou HTML e imprima pelo leitor.'));}
  };
  const timer=setTimeout(()=>{cleanup();frame.remove();reject(Error('O navegador não confirmou a solicitação de impressão. Salve o PDF ou HTML e imprima pelo leitor.'));},120000);
  window.addEventListener('message',message);
  frame.onerror=()=>{cleanup();frame.remove();reject(Error('Não foi possível abrir a impressão. Salve PDF ou HTML.'));};frame.src=url;document.body.append(frame);
 });
 // Mantém o documento até a próxima impressão: alguns navegadores imprimem assincronamente.
}
