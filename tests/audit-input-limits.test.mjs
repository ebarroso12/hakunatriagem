import {test} from 'node:test';import assert from 'node:assert/strict';import {readFile} from '../src/importer.js';
function jsonFile(value){const b=new TextEncoder().encode(JSON.stringify(value));return{name:'limites-sinteticos.json',size:b.length,arrayBuffer:async()=>b.buffer};}
test('JSON também respeita o limite declarado de 200 tabelas/abas',async()=>{await assert.rejects(()=>readFile(jsonFile({blocos:Array.from({length:201},()=>[{Nome:'Sintético',Idade:'40'}])})),/200/);});
test('Limite total de 50.000 linhas também vale para várias tabelas JSON',async()=>{await assert.rejects(()=>readFile(jsonFile({blocos:Array.from({length:6},()=>Array.from({length:9000},()=>({Nome:'X',Idade:'40'})))})),/50.000/);});
