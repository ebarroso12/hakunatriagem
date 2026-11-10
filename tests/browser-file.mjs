// Regressão do HTM real, com dados sintéticos. Não publica nem acessa rede.
import {chromium} from '@playwright/test';
import * as XLSX from 'xlsx';
import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},offline:true});
const page=await context.newPage(),errors=[],external=[];
page.setDefaultTimeout(12000);
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
try{
  await page.goto(pathToFileURL(resolve('dist/triagem-hakunas.htm')).href,{waitUntil:'domcontentloaded',timeout:15000});
  await page.locator('#new').click();
  for(const [key,value]of Object.entries({name:'Menor sintético',age:'17',weight:'80',height:'1,78'}))await page.locator(`[name=${key}]`).fill(value);
  await page.getByRole('button',{name:'Salvar avaliação',exact:true}).click();
  await page.locator('[data-edit]').click();
  assert.equal(await page.locator('[name=height]').inputValue(),'178');
  assert.equal(await page.locator('#record-result .pill.red').count(),1);
  assert.match(await page.locator('#record-result').innerText(),/faixa final não calculável/);
  // A chamada do botão é observada; a exportação PDF é do Chromium headless,
  // não uma comprovação de impressora ou do diálogo nativo de impressão.
  await page.evaluate(()=>{window.print=()=>{window.__printRequested=true;};});
  await page.locator('#print-record').click();
  assert.ok(await page.evaluate(()=>window.__printRequested));
  await page.emulateMedia({media:'print'});
  const pdf=await page.pdf({path:'test-results/menor-sintetico.pdf',format:'A4'});
  assert.equal(pdf.subarray(0,4).toString(),'%PDF');
  await page.emulateMedia({media:'screen'});
  await page.evaluate(()=>dispatchEvent(new Event('afterprint')));
  await page.locator('#close-modal').click();
  await page.setViewportSize({width:320,height:844});
  await page.locator('#import').click();
  const ws=XLSX.utils.aoa_to_sheet([['Nome','CPF','Telefone','Idade'],['Teste numérico sintético',52998224725,11987654321,40]]),wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Teste');
  await page.locator('#import-file').setInputFiles({name:'automatico.xlsx',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',buffer:XLSX.write(wb,{type:'buffer',bookType:'xlsx'})});
  await page.locator('#confirm-import').waitFor();
  assert.match(await page.locator('.import-summary').innerText(),/2 campo\(s\) de CPF\/telefone/);
  assert.equal(await page.locator('.import-warnings').count(),0);
  assert.ok(await page.locator('#modal').evaluate(e=>e.scrollWidth<=e.clientWidth),'Modal sem corte horizontal em 320px');
  assert.ok(await page.locator('#import-preview').evaluate(e=>e.scrollWidth<=e.clientWidth),'Prévia sem corte horizontal em 320px');
  await page.locator('#confirm-source-review').check();await page.locator('#confirm-import').click();
  await page.locator('#import').click();
  await page.locator('#import-file').setInputFiles({name:'sinteticos.csv',mimeType:'text/csv',buffer:Buffer.from('Título sintético;;;;\n;;;;\n;;Pessoa;Anos;Estatura\n;;Adulto sintético;40;1.80')});
  await page.locator('#manual-mode').click();
  await page.locator('#header-row').fill('3');await page.locator('#header-row').dispatchEvent('change');
  await page.locator('[data-map="2"]').selectOption('name');
  await page.locator('[data-map="3"]').selectOption('age');
  await page.locator('[data-map="4"]').selectOption('height');
  await page.locator('#make-preview').click();
  await page.locator('#confirm-source-review').check();
  await page.locator('#confirm-import').click();
  assert.equal(await page.locator('[data-edit]').count(),3);
  await page.locator('#import').click();
  await page.locator('#import-file').setInputFiles({name:'invalido.csv',mimeType:'text/csv',buffer:Buffer.from('Nome;Idade\nAdulto sintético;40\nIdade inválida sintética;15')});
  await page.locator('#make-preview').click();
  assert.match(await page.locator('#import-error').innerText(),/Idade/);
  assert.equal(await page.locator('#confirm-import').count(),0);
  await page.locator('#close-modal').click();
  assert.equal(await page.locator('[data-edit]').count(),3);
  await page.locator('#backup').click();
  await page.locator('#password').fill('senha-sintetica-123');await page.locator('#password-confirm').fill('senha-sintetica-123');
  const ready=page.waitForEvent('download');await page.locator('#backup-form button').click();
  const backup=await ready;await backup.saveAs('test-results/file-sintetico.LGND');
  const envelope=JSON.parse(await readFile('test-results/file-sintetico.LGND','utf8'));assert.equal(envelope.format,'LGND');
  await page.getByRole('button',{name:'Arquivos e segurança',exact:true}).click();
  page.once('dialog',d=>d.accept());await page.locator('#clear').click();
  await page.locator('#restore').click();await page.locator('#restore-file').setInputFiles('test-results/file-sintetico.LGND');await page.locator('#restore-password').fill('senha-sintetica-123');
  page.once('dialog',d=>d.accept());await page.locator('#restore-form button').click();await page.waitForFunction(()=>!document.querySelector('#modal').open);
  await page.getByRole('button',{name:'Participantes',exact:true}).click();assert.equal(await page.locator('[data-edit]').count(),3);
  for(const width of [390,320]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  await page.screenshot({path:'test-results/file-mobile-sintetico.png',fullPage:true});
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('E2E file:// aprovado: cadastro, menor vermelho, CPF/telefone e prévia automática móvel offline, mapeamento, importação atômica, chamada de impressão/PDF headless, backup/restore e viewport 390/320. Somente dados sintéticos.');
}catch(e){console.error('E2E file:// NÃO CONCLUÍDO: '+e.message);process.exitCode=1;}
finally{await context.close();await browser.close();}
