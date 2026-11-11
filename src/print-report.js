// Documento independente: cabeçalho e todos os registros, sem imprimir a interface.
export async function printReportHTML(html){
 document.getElementById('report-print-frame')?.remove();
 const frame=document.createElement('iframe');frame.id='report-print-frame';frame.title='Relatório pronto para impressão';frame.style.cssText='position:fixed;left:-10000px;top:0;width:1000px;height:800px;border:0';
 const url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}));
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{frame.remove();URL.revokeObjectURL(url);reject(Error('O navegador não abriu a impressão. Salve o PDF ou HTML e imprima pelo leitor.'));},20000);
 frame.onload=async()=>{try{await frame.contentDocument.fonts?.ready;frame.contentWindow.focus();frame.contentWindow.print();clearTimeout(timer);URL.revokeObjectURL(url);resolve();}catch(e){clearTimeout(timer);URL.revokeObjectURL(url);frame.remove();reject(e);}};
 frame.onerror=()=>{clearTimeout(timer);URL.revokeObjectURL(url);frame.remove();reject(Error('Não foi possível abrir a impressão. Salve PDF ou HTML.'));};frame.src=url;document.body.append(frame);});
 // Mantém o documento até a próxima impressão; alguns navegadores imprimem de forma assíncrona.
}
