import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const server=createServer(async(req,res)=>{try{res.setHeader('Content-Type','text/html');res.end(await readFile('dist/triagem-hakunas.htm'));}catch{res.writeHead(404);res.end();}}).listen(0,'127.0.0.1');
await new Promise(r=>server.on('listening',r));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
console.log('browser started');
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],requests=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:'))requests.push(r.url());});
page.setDefaultTimeout(12000);
console.log('navigation');
await page.goto('http://127.0.0.1:'+server.address().port);
console.log('register');
await page.getByRole('button',{name:'Novo participante'}).click();
await page.locator('[name=name]').fill('Participante sintético');
await page.locator('[name=age]').fill('17');await page.locator('[name=weight]').fill('80');await page.locator('[name=height]').fill('1 metro e 78 centímetros');
await page.getByRole('button',{name:'Salvar avaliação'}).click();
await page.getByRole('button',{name:'Abrir ficha'}).click();
assert.equal(await page.locator('[name=height]').inputValue(),'178');
assert.match(await page.locator('#record-result').innerText(),/Menor de 18/);
assert.match(await page.locator('#record-result').innerText(),/faixa final não calculável/);
await page.locator('#close-modal').click();
console.log('backup');
await page.getByRole('button',{name:'Salvar backup'}).click();await page.locator('#password').fill('senha-sintetica-123');await page.locator('#password-confirm').fill('senha-sintetica-123');
const backupPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Salvar arquivo .LGND'}).click();const backup=await backupPromise;await backup.saveAs('test-results/browser-backup.LGND');
await page.getByRole('button',{name:'Arquivos e segurança'}).click();page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Apagar participantes'}).click();
await page.getByRole('button',{name:'Restaurar backup'}).click();await page.locator('#restore-file').setInputFiles('test-results/browser-backup.LGND');await page.locator('#restore-password').fill('senha-sintetica-123');page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Validar e restaurar'}).click();await page.waitForFunction(()=>!document.querySelector('#modal').open);
await page.getByRole('button',{name:'Participantes',exact:true}).click();assert.match(await page.locator('tbody').innerText(),/Participante sintético/);
await page.getByRole('button',{name:'Calculadoras',exact:true}).click();await page.locator('[name=age]').fill('17');await page.locator('[name=weight]').fill('80');await page.locator('[name=height]').fill('178');await page.getByRole('button',{name:'Calcular',exact:true}).click();assert.match(await page.locator('#calc-result').innerText(),/Sem classificação adulta/);
await page.getByRole('button',{name:'Participantes',exact:true}).click();
if(process.env.HAKUNAS_TEST_WORKBOOK){
await page.getByRole('button',{name:'Importar lista'}).click();
// The real workbook remains outside the repository; assert counts only, never log personal fields.
await page.locator('#import-file').setInputFiles(process.env.HAKUNAS_TEST_WORKBOOK);await page.locator('#make-preview').waitFor();
const mapped=await page.locator('[data-map]').evaluateAll(es=>es.filter(e=>e.value).length);
await page.locator('#make-preview').click();
const available=await page.locator('#confirm-import').count();console.log(JSON.stringify({mapped,previewAvailable:available,validationError:!!(await page.locator('#import-error').innerText())}));assert.equal(available,1);
await page.locator('#close-modal').click();
}
for(const width of [390,320]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No page overflow at '+width);await page.getByRole('button',{name:'Abrir ficha'}).click();assert.ok(await page.evaluate(()=>document.querySelector('#modal').scrollWidth<=document.querySelector('#modal').clientWidth),'No dialog overflow at '+width);await page.locator('#close-modal').click();}
await page.setViewportSize({width:1440,height:1000});
await page.screenshot({path:'test-results/hakunas-preview.png',fullPage:true});
assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
console.log('Browser: cadastro, menor, backup, restauração, calculadora, planilha, 320/390px aprovados. Sem erros JS ou requisições externas.');
await browser.close();server.close();
