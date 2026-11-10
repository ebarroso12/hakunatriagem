// Verificações locais de estrutura. Não consultam cadastro/operadora nem atestam identidade.
const ddds=new Set('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' '));
export function cpfChecksum(digits){if(!/^\d{11}$/.test(digits)||/^(\d)\1{10}$/.test(digits))return false;for(let length=9;length<=10;length++){let sum=0;for(let i=0;i<length;i++)sum+=Number(digits[i])*(length+1-i);const mod=sum%11,check=mod<2?0:11-mod;if(Number(digits[length])!==check)return false;}return true;}
export function inspectIdentifier(key,input,meta={}){let value=String(input??'').trim();const name=key==='cpf'?'CPF':'Telefone';const review=warning=>({value,verified:false,warning:`${name}: ${warning}`});const raw=meta.rawValue;
 if(meta.numeric&&raw!==undefined&&(!Number.isSafeInteger(raw)||raw<0))return review('valor numérico sem precisão inteira garantida ou inválido; confira o arquivo original.');
 if(meta.numeric&&raw!==undefined&&/^[+]?\d+(?:[.,]\d+)?[eE][+-]?\d+$/.test(value))value=String(raw);
 // Sem metadado, a notação científica pode ter arredondamento; não expandir por suposição.
 if(/[eE]/.test(value))return review('notação científica sem valor inteiro exato disponível; confira o original.');
 if(key==='cpf'){
  if(!/^[\d.\-\s]+$/.test(value))return review('caracteres não reconhecidos; confira o original.');const digits=value.replace(/\D/g,'');
  if(digits.length!==11)return review(`${digits.length} dígitos; são necessários 11. Nenhum zero ou dígito foi acrescentado; confira o original.`);
  if(meta.numeric&&raw!==undefined&&digits.replace(/^0+/,'')!==String(raw).replace(/^0+/,''))return review('a exibição e o número armazenado divergem; confira o original.');
  if(!cpfChecksum(digits))return review('dígitos verificadores inválidos ou sequência repetida; confira o original.');
  return {value,verified:true,warning:null};
 }
 if(!/^\+?[\d\s().-]+$/.test(value))return review('caracteres não reconhecidos; confira o original.');let digits=value.replace(/\D/g,'');
 if(value.startsWith('+')){
  if(!/^[1-9]\d{7,14}$/.test(digits))return review('formato internacional incompleto ou inválido; confira código do país e número.');
  if(!digits.startsWith('55'))return {value,verified:true,warning:null};digits=digits.slice(2);
 }else if((digits.length===12||digits.length===13)&&digits.startsWith('55'))digits=digits.slice(2);
 if(![10,11].includes(digits.length))return review(`${digits.length} dígitos sem formato brasileiro completo com DDD; confira o original. Nenhum DDD ou dígito foi acrescentado.`);
 if(!ddds.has(digits.slice(0,2)))return review('DDD não reconhecido; confira o original.');const local=digits.slice(2);
 if(/^(\d)\1+$/.test(local)||(digits.length===11?!/^9\d{8}$/.test(local):!/^\d{8}$/.test(local)))return review('formato local incompleto ou suspeito; confira o original.');
 return {value,verified:true,warning:null};
}
export function sourceCellMetadata(sheet,row,col){let n=col+1,address='';while(n){address=String.fromCharCode(65+(n-1)%26)+address;n=Math.floor((n-1)/26);}address+=row+1;const meta=sheet.cellMeta?.[address]||{};return {...meta,numeric:sheet.numericCellSet?.has(address)??sheet.numericCells?.includes(address)??false};}
export function warningGroups(warnings){const groups=new Map();for(const warning of warnings){const m=warning.match(/^(.+![A-Z]+\d+):\s*(.*)$/),reason=m?m[2]:warning,origin=m?.[1];let group=groups.get(reason);if(!group){group={reason,count:0,locations:[]};groups.set(reason,group);}group.count++;if(origin&&group.locations.length<5)group.locations.push(origin);}return [...groups.values()];}
