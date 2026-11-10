import {test} from 'node:test';
import assert from 'node:assert/strict';
import {height,validate,evaluate,csvCell,validateBackup,groups} from '../src/core.js';
import {parseRows,mapping} from '../src/importer.js';
import {encrypt,decrypt} from '../src/vault.js';
const base=()=>({id:crypto.randomUUID(),name:'Pessoa sintética',age:'40',weight:'80',height:'180',flags:[],reviewed:Object.keys(groups),activity:'0',walk:'0',tetanus:'0',prior:'0',certificate:true,reviewer:'Responsável CRM 0000'});
for(const value of ['1,78','1.78','178','178 cm','1,78 m','1 m 78 cm','1 metro e 78 centímetros'])test('Altura: '+value,()=>assert.equal(height(value),178));
for(const value of ['banana','0','260','1 ft','178 kg','178 m','1.78 cm'])test('Rejeita altura: '+value,()=>assert.throws(()=>height(value)));
test('Faixa exige revisão completa',()=>{let p=base();assert.equal(evaluate(p).band,'Baixa');for(const group of Object.keys(groups)){p=base();p.reviewed=p.reviewed.filter(g=>g!==group);assert.equal(evaluate(p).band,null);}p=base();p.certificate=false;assert.equal(evaluate(p).band,null);p=base();p.reviewer='';assert.equal(evaluate(p).band,null);});
for(const age of ['16','17'])test('Menor: preserva dado sem IMC/faixa adulta '+age,()=>{let p={...base(),age,flags:['htn']};validate(p);let r=evaluate(p);assert.equal(r.bmi,null);assert.equal(r.band,null);assert.equal(r.color,'red');});
test('Score e exclusões independentes',()=>{let p={...base(),flags:['anticoag']};let r=evaluate(p);assert.equal(r.score,3);assert.ok(r.exclusions.includes('Uso de anticoagulantes'));});
test('IMC estritamente >30 pontua e >40 exclui',()=>{let p={...base(),weight:'130',height:'170'};let r=evaluate(p);assert.equal(r.score,2);assert.ok(r.exclusions.includes('IMC > 40'));});
test('Preparação soma corretamente',()=>assert.equal(evaluate({...base(),activity:'3',walk:'2',tetanus:'1',prior:'1'}).score,7));
test('Faixas 8,16,26',()=>{let flags=['htn','chol','heart','insulin'];assert.equal(evaluate({...base(),flags}).band,'Moderada');flags.push('dm1','syncope');assert.equal(evaluate({...base(),flags}).band,'Alta');flags.push('effort','chest','dmmed');assert.equal(evaluate({...base(),flags}).band,'Muito alta');});
test('CSV neutraliza fórmulas e escapa aspas',()=>{assert.equal(csvCell('=1+1'),'"\'=1+1"');assert.equal(csvCell('a"b'),'"a""b"');});
test('Importa colunas reais sem inferir diagnósticos',()=>{let headers=['Nome','Idade','Altura','COND.FIS','Faz uso de medicamento','SG','Alergia ','Doença ou condição','PROB. DE SAÚDE','DIETA ESPECIAL','INFORMAÇÃO MEDICA IMPORTANTE'];let m=mapping(headers);assert.equal(m.filter(Boolean).length,11);let r=parseRows([headers,['Sintético','17','1 metro e 78 centímetros','boa','não','O+','não','não','não','não','hipertensão']],0,m);assert.equal(r.participants.length,1);assert.equal(r.participants[0].height,'178');assert.deepEqual(r.participants[0].flags,[]);assert.deepEqual(r.participants[0].reviewed,[]);assert.equal(r.warnings.length,1);});
test('Importação atômica rejeita linha inválida',()=>assert.throws(()=>parseRows([['Nome','Idade'],['A','30'],['B','15']],0,['name','age'])));
test('Mapeamento repetido rejeitado',()=>assert.throws(()=>parseRows([['Nome','Nome'],['A','B']],0,['name','name'])));
test('Backup roundtrip, senha errada e adulteração',async()=>{let data={schema:2,participants:[base()]},cipher=await encrypt(data,'senha-sintetica-123');assert.deepEqual(await decrypt(cipher,'senha-sintetica-123'),data);await assert.rejects(()=>decrypt(cipher,'senha-incorreta-123'));let env=JSON.parse(cipher);env.data=env.data.slice(0,-8)+'AAAAAAAA';await assert.rejects(()=>decrypt(JSON.stringify(env),'senha-sintetica-123'));});
test('Backup valida IDs, faixas e limite textual',()=>{let p=base();assert.equal(validateBackup({schema:2,participants:[p]}).length,1);assert.throws(()=>validateBackup({schema:2,participants:[p,p]}));assert.throws(()=>validateBackup({schema:2,participants:[{...p,age:'10'}]}));assert.throws(()=>validate({...p,notes:'x'.repeat(2001)}));});

test('Restore rejeita ID com HTML e tipos indevidos',()=>{assert.throws(()=>validate({...base(),id:'\" onclick=alert(1)'}));assert.throws(()=>validate({...base(),certificate:'true'}));assert.throws(()=>validate({...base(),reviewer:123}));});

test('Valores intermediários inválidos não exibem faixa final',()=>{for(const patch of[{age:'40.5'},{weight:'abc'},{height:'999'},{weight:'500'}])assert.equal(evaluate({...base(),...patch}).band,null);});
