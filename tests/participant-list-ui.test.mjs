import{test}from'node:test';import assert from'node:assert/strict';import{readFile}from'node:fs/promises';import{webcrypto}from'node:crypto';import{JSDOM,VirtualConsole}from'jsdom';
test('UI offline localiza pelo nome e pelas quatro cores combinadas, abre ficha e reflete nova avaliação',async()=>{
 const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));const dom=new JSDOM(await readFile('dist/triagem-hakunas-offline.html','utf8'),{url:'file:///offline.html',runScripts:'outside-only',virtualConsole:vc}),w=dom.window,$=s=>w.document.querySelector(s);
 try{Object.defineProperty(w,'crypto',{value:webcrypto});w.TextEncoder=TextEncoder;w.TextDecoder=TextDecoder;w.Blob=Blob;w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};w.fetch=async()=>{throw Error('Rede proibida');};w.eval(w.document.scripts[0].textContent);
 for(const [name,flag]of [['Álvaro sintético',''],['Bruna sintética','bpmed'],['Carlos sintético','htn'],['Dora sintética','seizure']]){$('#new').click();for(const [k,v]of Object.entries({name,age:'40',weight:'80',height:'178'}))$('[name='+k+']').value=v;if(flag)$('[name=flag][value='+flag+']').checked=true;$('#record-form').dispatchEvent(new w.Event('submit',{cancelable:true}));}
 assert.ok($('#color-filter'));assert.ok($('#list-order'));assert.match(w.document.body.textContent,/Lista de localização/);
 const visible=()=>[...w.document.querySelectorAll('[data-edit]')].map(b=>b.closest('tr').textContent);
 assert.equal(visible().length,4);
 for(const [color,name]of [['green','Álvaro'],['yellow','Bruna'],['red','Carlos'],['black','Dora']]){$('#color-filter').value=color;$('#color-filter').dispatchEvent(new w.Event('change'));assert.equal(visible().length,1);assert.ok(visible()[0].includes(name));}
 $('#color-filter').value='red';$('#color-filter').dispatchEvent(new w.Event('change'));$('#search').value='Dora';$('#search').dispatchEvent(new w.Event('input'));assert.equal(visible().length,0);
 $('#clear-list-filters').click();$('#search').value='ALVARO';$('#search').dispatchEvent(new w.Event('input'));assert.equal(visible().length,1);assert.ok(visible()[0].includes('Álvaro'));
 $('#clear-list-filters').click();$('#list-order').value='color';$('#list-order').dispatchEvent(new w.Event('change'));assert.ok(visible()[0].includes('Dora'));
 $('#color-filter').value='red';$('#color-filter').dispatchEvent(new w.Event('change'));$('[data-edit]').click();$('[name=flag][value=htn]').checked=false;$('#record-form').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(visible().length,0);$('#color-filter').value='green';$('#color-filter').dispatchEvent(new w.Event('change'));assert.equal(visible().length,2);assert.deepEqual(errors,[]);
 }finally{w.close();}
});
