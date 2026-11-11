// Destinos controlados pelo usuário; nunca faz upload nem escolhe pasta silenciosamente.
export function validateSaveName(name,extension){
 if(typeof name!=='string'||!name.trim())throw Error('Nome de arquivo inválido.');
 if(!name.toLowerCase().endsWith('.'+extension)){
  if(/\.[a-z0-9]+$/i.test(name))throw Error(`Escolha um nome com extensão .${extension}. O conteúdo não será renomeado como outro formato.`);
  return name+'.'+extension;
 }
 return name;
}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
export async function saveExport(info,produce,destination='choose',env={}){
 const picker=env.picker??globalThis.showSaveFilePicker?.bind(globalThis),share=env.share??globalThis.navigator?.share?.bind(globalThis.navigator),canShare=env.canShare??globalThis.navigator?.canShare?.bind(globalThis.navigator),FileClass=env.File??globalThis.File;
 const extension=info.extension||info.name.split('.').pop().toLowerCase(),mime=info.type.split(';')[0];let handle;
 if(destination==='choose'&&typeof picker==='function'){
  try{handle=await picker({suggestedName:info.name,excludeAcceptAllOption:true,types:[{description:`Relatório ${extension.toUpperCase()}`,accept:{[mime]:['.'+extension]}}]});if(validateSaveName(handle.name,extension)!==handle.name)throw Error(`Inclua a extensão .${extension} no nome escolhido.`);}catch(e){if(e.name==='AbortError')return{method:'cancelled'};throw e;}
 }
 if(!['choose','download','share'].includes(destination))throw Error('Destino de arquivo inválido.');
 const data=await produce(),blob=data instanceof Blob?data:new Blob([data],{type:info.type});
 if(handle){let writer;try{writer=await handle.createWritable();await writer.write(blob);await writer.close();}catch(e){try{await writer?.abort();}catch{}throw e;}return{method:'picker',name:handle.name};}
 if(destination==='share'){
  if(!FileClass||!share||!canShare)throw Error('Compartilhar arquivos não está disponível neste navegador. Use Baixar e depois envie o arquivo pelo aplicativo Drive.');
  const file=new FileClass([blob],info.name,{type:mime});if(!canShare({files:[file]}))throw Error('Este navegador não permite compartilhar este formato. Baixe e envie pelo aplicativo Drive.');
  try{await share({files:[file],title:'Triagem Hakunas'});}catch(e){if(e.name==='AbortError')return{method:'cancelled'};throw e;}return{method:'share',name:info.name};
 }
 (env.download||downloadBlob)(blob,info.name);return{method:'download',name:info.name};
}
