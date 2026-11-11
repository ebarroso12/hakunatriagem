import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import {fields,groups,csvCell} from './core.js';
import {fullReportHTML,missingWorkbook} from './reports.js';
import {isMissing,participantLabel} from './empty.js';
import {eventHeaderCSS,eventHeaderHTML,sharedLogoCSS,eventFileTag} from './event-header.js';
import {headerFontData,headerFontLicense} from './generated-header-assets.js';
import {pdfFontData,pdfFontLicense} from './generated-pdf-assets.js';
export const reportFormats={
 xlsx:{label:'Excel (.xlsx)',type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
 csv:{label:'CSV (.csv)',type:'text/csv;charset=utf-8'},
 ods:{label:'LibreOffice / OpenDocument (.ods)',type:'application/vnd.oasis.opendocument.spreadsheet'},
 pdf:{label:'PDF (.pdf)',type:'application/pdf'},
 html:{label:'Página / relatório (.html)',type:'text/html;charset=utf-8'}
};
const sectionNames={history:'Histórico médico',meds:'Medicamentos',symptoms:'Sintomas',exclusions:'Exclusões',extra:'Fatores adicionais'};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shown=v=>isMissing(v)?'Não informado':String(v);
const prepLabels={activity:['Atividade física',['3 ou mais vezes por semana','1–2 vezes por semana','Raramente','Não realiza']],walk:['Caminha 10 km sem fadiga excessiva?',['Sim','Não tentou','Não']],tetanus:['Vacina antitetânica vigente?',['Sim','Não / não sabe']],prior:['Caminhadas longas prévias?',['Sim','Não']]};
export function reportFileInfo(model,kind,format){
 if(!['full','missing'].includes(kind))throw Error('Tipo de relatório inválido.');
 if(!reportFormats[format])throw Error('Formato de arquivo não suportado.');
 const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo',dateStyle:'short',timeStyle:'medium'}).format(model.date).replaceAll(' ','-').replaceAll(':','');
 return{name:`Triagem-Hakunas-${eventFileTag(model.header)}-${kind==='full'?'relatorio-completo':'dados-faltantes'}-${date}.${format}`,type:reportFormats[format].type,extension:format};
}
export function exportSheets(model,kind){
 const missing=XLSX.read(missingWorkbook(model),{type:'array'}),sheets=missing.SheetNames.map(name=>({name,rows:XLSX.utils.sheet_to_json(missing.Sheets[name],{header:1,defval:''})}));
 if(kind==='missing')return sheets;
 const people=[['ID','Participante',...fields.map(([,l])=>l),...Object.values(prepLabels).map(([l])=>l),'Responsável e CRM','Atestado/exames','Score interno','Faixa interna','IMC adulto','Cor provisória','Motivos de cor','Exclusões','Pendências','Avisos de importação','Avisos conferidos']];
 const factors=[['ID','Participante','Seção','Fator','Estado']],components=[['ID','Participante','Componente','Pontos']],origins=[['ID','Participante','Campo original','Valor original','Origem']];
 for(const {p,result:r}of model.entries){const label=participantLabel(p),prefix=[p.id,label];
  people.push([...prefix,...fields.map(([k])=>shown(p[k])),...Object.entries(prepLabels).map(([k,[,values]])=>isMissing(p[k])?'Não informado':values[+p[k]]??'Não reconhecido'),shown(p.reviewer),p.certificate?'Conferido':'Conferência não registrada',String(r.score),r.band||'Parcial — faixa final não calculável',r.bmi===null?'Não calculável ou não aplicável':r.bmi.toFixed(2),r.color,r.reasons.join(' | '),r.exclusions.join(' | ')||'Nenhum critério explícito registrado',r.pending.join(' | '),p.importWarnings?.join(' | ')||'Nenhum aviso registrado',p.importReviewed?'Sim':'Não registrado']);
  for(const [section,items]of Object.entries(groups))for(const [id,label]of items)factors.push([...prefix,sectionNames[section],label,p.flags?.includes(id)?'Assinalado explicitamente':p.reviewed?.includes(section)?'Não assinalado na seção revisada':'Não confirmado — seção não revisada']);
  for(const c of r.components)components.push([...prefix,c.label,String(c.points)]);
  for(const f of p.sourceFields||[])origins.push([...prefix,f.label,shown(f.value),f.location]);
 }
 return [sheets.find(s=>s.name==='Resumo'),{name:'Participantes',rows:people},{name:'Fatores',rows:factors},{name:'Componentes',rows:components},{name:'Origens',rows:origins},...sheets.filter(s=>s.name!=='Resumo')];
}
function workbook(sheets,format){const wb=XLSX.utils.book_new();for(const {name,rows}of sheets){const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=rows[0].map(()=>({wch:30}));XLSX.utils.book_append_sheet(wb,ws,name);}return XLSX.write(wb,{type:'array',bookType:format,compression:true});}
function csv(model,sheets){
 const rows=[['Número do TOP','Local','Nome da base','Conjunto','Linha do conjunto','ID do registro','Participante','Campo','Valor']];
 for(const {name,rows:table}of sheets)for(let i=1;i<table.length;i++)for(let c=0;c<table[0].length;c++)rows.push([model.header.topNumber||'Não informado',model.header.location||'Não informado',model.header.baseName||'Não informado',name,String(i),/^(ID|ID do registro)$/.test(table[0][0])?shown(table[i][0]):'',/^(ID|ID do registro)$/.test(table[0][0])?shown(table[i][1]):'',table[0][c],shown(table[i][c])]);
 return '\ufeff'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
}
export function missingReportHTML(model){const sheets=exportSheets(model,'missing');return`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; base-uri 'none'; object-src 'none'"><title>Dados faltantes — Triagem Hakunas</title><style>${eventHeaderCSS}${sharedLogoCSS(model.header)}body{font:13px system-ui;margin:24px;color:#24392b}table{width:100%;border-collapse:collapse;table-layout:fixed;margin:16px 0}th,td{border:1px solid #bbb;padding:6px;overflow-wrap:anywhere;text-align:left}button{padding:12px}@media print{button{display:none}thead{display:table-header-group}tr{break-inside:avoid}body{margin:0;font-size:9px}}</style></head><body>${eventHeaderHTML(model.header,{sharedLogos:true})}<button onclick="window.print()">Imprimir / salvar PDF</button><h1>Dados faltantes por participante</h1><p>${model.summary.records} registro(s). Campos não preenchidos apenas geram alertas e não impedem a exportação. Não informado não significa não, zero ou normal.</p>${sheets.map(({name,rows})=>`<h2>${esc(name)}</h2><table><thead><tr>${rows[0].map(v=>`<th>${esc(v)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr>${rows[0].map((_,i)=>`<td>${esc(r[i])}</td>`).join('')}</tr>`).join('')}</tbody></table>`).join('')}</body></html>`;}
function pdf(model,kind,sheets){
 const doc=new jsPDF({compress:true,putOnlyUsedFonts:true});
 doc.addFileToVFS('NotoSans-Regular.ttf',pdfFontData);doc.addFont('NotoSans-Regular.ttf','NotoSans','normal');
 doc.addFileToVFS('Anton-Regular.ttf',headerFontData.split(',')[1]);doc.addFont('Anton-Regular.ttf','Anton','normal');
 doc.setProperties({title:kind==='full'?'Relatório completo — Triagem Hakunas':'Dados faltantes — Triagem Hakunas',subject:`TOP ${model.header.topNumber||'Não informado'}\nFontes e licenças:\n${pdfFontLicense}\n${headerFontLicense}`,keywords:'Triagem provisória; não é diagnóstico'});
 // Licença do tipo incorporado permanece incluída no pacote fonte e nos metadados PDF.
 doc.setProperties({creator:'Triagem Hakunas — fonte Noto Sans SIL OFL 1.1',author:'Triagem Hakunas'});doc.setFont('NotoSans');
 const h=model.header;let y=62,page=0;
 function line(text,size=9){doc.setFont('NotoSans');doc.setFontSize(size);const lines=doc.splitTextToSize(String(text),182);for(const value of lines){if(y>279){doc.addPage();header();}doc.text(value,14,y);y+=size*.45+1;}y+=1;}
 function header(){page++;doc.setDrawColor(90);doc.line(14,51,196,51);const art=(data,x,bg,label)=>{if(data){doc.setFillColor(bg==='dark'?25:255);doc.rect(x,12,26,26,'F');const props=doc.getImageProperties(data),scale=Math.min(24/props.width,24/props.height),w=props.width*scale,ht=props.height*scale;doc.addImage(data,'PNG',x+13-w/2,25-ht/2,w,ht,undefined,'FAST');}else{doc.setFont('NotoSans');doc.setFontSize(6);doc.text(label+' não informado',x+13,25,{align:'center',maxWidth:26});}};
 art(h.baseLogo,14,h.baseLogoBackground,'Emblema da base');art(h.legendLogo,170,h.legendLogoBackground,'Logo Legendários');
 doc.setFont('Anton');doc.setFontSize(27);doc.text('TOP '+(h.topNumber||'—'),105,22,{align:'center'});doc.setFontSize(11);doc.text(doc.splitTextToSize(h.baseName||'Nome da base não informado',112),105,40,{align:'center'});doc.setFont('NotoSans');doc.setFontSize(7);doc.text(doc.splitTextToSize(h.location||'Local não informado',112),105,29,{align:'center'});
 y=59;
 }
 header();line(kind==='full'?'RELATÓRIO COMPLETO':'DADOS FALTANTES POR PARTICIPANTE',14);line('Operação: '+model.event);line('Registros: '+model.summary.records+' | Campos não informados: '+model.summary.missingFields);line('Triagem provisória: não é diagnóstico nem liberação para esforço. Campos não preenchidos geram alertas, sem impedir a exportação.');
 // Linhas longas são quebradas entre páginas, sem cortar campos/participantes.
 for(const {name,rows}of sheets){line(name.toUpperCase(),12);for(let i=1;i<rows.length;i++){line(name+' — registro/linha '+i,10);for(let c=0;c<rows[0].length;c++)line(rows[0][c]+': '+shown(rows[i][c]));}}
 const total=doc.getNumberOfPages();for(let i=1;i<=total;i++){doc.setPage(i);doc.setFont('NotoSans');doc.setFontSize(7);doc.text(`Triagem Hakunas | Página ${i} de ${total}`,105,291,{align:'center'});}
 return doc.output('arraybuffer');
}
export function exportReport(model,kind,format){const info=reportFileInfo(model,kind,format);let data;
 if(format==='html')data=kind==='full'?fullReportHTML(model):missingReportHTML(model);
 else {const sheets=exportSheets(model,kind);data=['xlsx','ods'].includes(format)?workbook(sheets,format):format==='csv'?csv(model,sheets):pdf(model,kind,sheets);}
 return{...info,data};
}
