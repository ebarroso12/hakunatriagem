import {groups} from './default-groups.js';
export const DEFAULT_CRITERIA_ID='hakunas-original-v1';
export const groupLabels={history:'Histórico',meds:'Medicamentos',symptoms:'Sintomas',exclusions:'Exclusões',extra:'Fatores adicionais'};
export const preparationLabels={activity:'Atividade física',walk:'Caminhada 10 km',tetanus:'Vacina antitetânica',prior:'Caminhadas prévias'};
export const preparationValues={activity:['3 ou mais vezes / semana','1–2 vezes / semana','Raramente','Não realiza'],walk:['Sim','Não tentou','Não'],tetanus:['Sim','Não / não sabe'],prior:['Sim','Não']};
const known=new WeakSet(),registries=new WeakSet(),builtinFlags=Object.values(groups).flat().map(([id])=>id);
const freeze=o=>{if(o&&typeof o==='object'&&!Object.isFrozen(o)){for(const v of Object.values(o))freeze(v);Object.freeze(o);}return o;};
const text=(v,max,label)=>{if(typeof v!=='string'||!v.trim()||v.length>max)throw Error(label+' inválido ou ausente.');return v.trim();};
const int=(v,min,max,label)=>{if(!Number.isInteger(v)||v<min||v>max)throw Error(label+' fora dos limites.');return v;};
const keys=(o,allowed,label)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).some(k=>!allowed.includes(k)))throw Error(label+' contém campos inválidos.');};
export function normalizeCriteriaProfile(input){
 if(known.has(input))return input;
 keys(input,['id','revision','name','source','responsible','reason','createdAt','rules','bands'],'Perfil de critérios');
 const id=text(input.id,80,'ID da versão');if(!/^[a-z0-9_-]+$/i.test(id))throw Error('ID da versão inválido.');
 const profile={id,revision:int(input.revision,1,10000,'Revisão'),name:text(input.name,160,'Nome'),source:text(input.source,2000,'Fonte'),responsible:text(input.responsible,200,'Responsável'),reason:text(input.reason,1000,'Motivo'),createdAt:text(input.createdAt,40,'Data'),rules:[],bands:[]};
 if(!/^\d{4}-\d\d-\d\dT/.test(profile.createdAt)||!Number.isFinite(Date.parse(profile.createdAt)))throw Error('Data da versão inválida.');
 if(!Array.isArray(input.rules)||input.rules.length<1||input.rules.length>256)throw Error('Use entre 1 e 256 critérios.');
 const ids=new Set();for(const item of input.rules){
  keys(item,['id','kind','group','label','points','color','exclusion','exclusionLabel','needsReview','active','threshold','field','value','flagIds'],'Critério');
  const r={id:text(item.id,64,'ID do critério'),kind:item.kind,group:item.group,label:text(item.label,200,'Descrição do critério'),points:int(item.points,0,100,'Pontos'),color:item.color,exclusion:item.exclusion,needsReview:item.needsReview,active:item.active};
  if(!/^[a-z][a-zA-Z0-9_-]*$/.test(r.id)||ids.has(r.id))throw Error('ID de critério inválido ou duplicado.');ids.add(r.id);
  if(!['flag','ageAbove','bmiAbove','ageWithFlags','prepValue'].includes(r.kind)||!Object.hasOwn(groupLabels,r.group)||!['none','yellow','red','black'].includes(r.color))throw Error('Tipo, grupo ou cor do critério inválido.');
  if(['exclusion','needsReview','active'].some(k=>typeof r[k]!=='boolean'))throw Error('Estado do critério inválido.');
  if(r.kind==='ageAbove'&&r.color==='black'&&item.threshold<17)throw Error('Preto para 16–17 exige outro critério explícito além da idade.');
  if(item.exclusionLabel!==undefined)r.exclusionLabel=text(item.exclusionLabel,200,'Descrição de exclusão');
  if(['ageAbove','ageWithFlags','bmiAbove'].includes(r.kind)){if(typeof item.threshold!=='number'||!Number.isFinite(item.threshold)||item.threshold<(r.kind==='bmiAbove'?10:16)||item.threshold>(r.kind==='bmiAbove'?100:120))throw Error('Limite de idade/IMC inválido.');r.threshold=item.threshold;}
  if(r.kind==='prepValue'){if(!Object.hasOwn(preparationValues,item.field))throw Error('Campo de preparo inválido.');r.field=item.field;r.value=int(item.value,0,preparationValues[r.field].length-1,'Resposta de preparo');}
  if(r.kind==='ageWithFlags'){if(!Array.isArray(item.flagIds)||!item.flagIds.length||item.flagIds.length>256||new Set(item.flagIds).size!==item.flagIds.length)throw Error('Associação de fatores inválida.');r.flagIds=[...item.flagIds];}
  const conditional=['threshold','field','value','flagIds'];for(const k of conditional)if(item[k]!==undefined&&!Object.hasOwn(r,k))throw Error('Condição incompatível com o tipo do critério.');
  profile.rules.push(r);
 }
 const flags=profile.rules.filter(r=>r.kind==='flag').map(r=>r.id);if(builtinFlags.some(id=>!flags.includes(id)))throw Error('Critérios originais devem ser preservados; desative em vez de excluir.');
 for(const r of profile.rules)if(r.flagIds?.some(id=>!flags.includes(id)))throw Error('Associação aponta para fator desconhecido.');
 const prepKeys=profile.rules.filter(r=>r.kind==='prepValue').map(r=>r.field+':'+r.value);if(new Set(prepKeys).size!==prepKeys.length)throw Error('Resposta de preparo duplicada. Edite o critério existente.');
 if(!Array.isArray(input.bands)||input.bands.length<1||input.bands.length>12)throw Error('Use entre 1 e 12 faixas.');
 let previous=-1;for(const b of input.bands){keys(b,['min','label'],'Faixa');const min=int(b.min,0,100000,'Início da faixa');if(min<=previous||(previous===-1&&min!==0))throw Error('Faixas devem começar em zero e crescer sem sobreposição.');profile.bands.push({min,label:text(b.label,100,'Nome da faixa')});previous=min;}
 freeze(profile);known.add(profile);return profile;
}
const rules=Object.entries(groups).flatMap(([group,items])=>items.map(([id,label,points])=>({id,kind:'flag',group,label,points,color:group==='meds'?'yellow':['htn','heart','dm1','dm2','disease','surgicalLimit'].includes(id)?'red':id==='seizure'?'black':'none',exclusion:group==='exclusions'||['anticoag','fever'].includes(id),...(['anticoag','fever'].includes(id)?{exclusionLabel:id==='anticoag'?'Uso de anticoagulantes':'Enfermidade aguda'}:{}),needsReview:id==='implant',active:true})));
rules.push({id:'bmi_score',kind:'bmiAbove',group:'extra',label:'IMC > 30',threshold:30,points:2,color:'yellow',exclusion:false,needsReview:false,active:true},{id:'bmi_exclusion',kind:'bmiAbove',group:'exclusions',label:'IMC > 40',threshold:40,points:0,color:'none',exclusion:true,needsReview:false,active:true},{id:'age_red',kind:'ageAbove',group:'extra',label:'Idade > 60',threshold:60,points:0,color:'red',exclusion:false,needsReview:false,active:true},{id:'age_disease_black',kind:'ageWithFlags',group:'extra',label:'Idade > 60 associada a doença',threshold:60,flagIds:['disease','htn','heart','dm1','dm2'],points:0,color:'black',exclusion:false,needsReview:false,active:true});
for(const [field,values]of Object.entries(preparationValues))for(let value=0;value<values.length;value++)rules.push({id:`prep_${field}_${value}`,kind:'prepValue',group:'extra',label:preparationLabels[field]+' — '+values[value],field,value,points:value,color:'none',exclusion:field==='walk'&&value===2,...(field==='walk'&&value===2?{exclusionLabel:'Incapacidade de caminhar 10 km'}:{}),needsReview:false,active:true});
export const DEFAULT_CRITERIA=normalizeCriteriaProfile({id:DEFAULT_CRITERIA_ID,revision:1,name:'Hakunas — base original',source:'Manual Hakunas 1.0 (07/12/2025); cores do relatório consolidado de 10/11/2026 e regra operacional etária do responsável.',responsible:'Base incorporada — exige revisão profissional',reason:'Preservação das regras originais; não constitui validação clínica externa.',createdAt:'2026-11-10T00:00:00.000Z',rules,bands:[{min:0,label:'Baixa'},{min:8,label:'Moderada'},{min:16,label:'Alta'},{min:26,label:'Muito alta'}]});
const baseline=JSON.stringify(DEFAULT_CRITERIA);
export function normalizeCriteriaRegistry(input){
 if(input===undefined||input===null)return defaultRegistry();if(registries.has(input))return input;
 keys(input,['active','profiles'],'Catálogo de critérios');if(typeof input.active!=='string'||!Array.isArray(input.profiles)||!input.profiles.length||input.profiles.length>50)throw Error('Catálogo de critérios fora dos limites (até 50 versões).');
 const profiles=input.profiles.map(normalizeCriteriaProfile),ids=new Set(profiles.map(p=>p.id)),revisions=new Set(profiles.map(p=>p.revision));
 if(ids.size!==profiles.length||revisions.size!==profiles.length||!ids.has(input.active))throw Error('Versão ativa ausente ou versões duplicadas.');
 if(JSON.stringify(profiles.find(p=>p.id===DEFAULT_CRITERIA_ID))!==baseline)throw Error('A versão padrão original não pode ser adulterada.');
 const registry=freeze({active:input.active,profiles});registries.add(registry);return registry;
}
let initial;
export function defaultRegistry(){if(!initial){initial=freeze({active:DEFAULT_CRITERIA_ID,profiles:[DEFAULT_CRITERIA]});registries.add(initial);}return initial;}
export function activeCriteria(registry){const r=normalizeCriteriaRegistry(registry);return r.profiles.find(p=>p.id===r.active);}
export function criteriaForRecord(record,registry){const r=normalizeCriteriaRegistry(registry),id=record.criteriaVersion||DEFAULT_CRITERIA_ID,p=r.profiles.find(p=>p.id===id);if(!p)throw Error('Versão de critérios da ficha não encontrada: '+id);return p;}
export function createCriteriaVersion(registry,draft,metadata){const current=normalizeCriteriaRegistry(registry),active=activeCriteria(current);
 if(current.profiles.length>=50)throw Error('Limite de 50 versões. Salve backup antes de iniciar outra sessão.');
 const next=normalizeCriteriaProfile({...draft,...metadata,id:crypto.randomUUID(),revision:Math.max(...current.profiles.map(p=>p.revision))+1,createdAt:new Date().toISOString()});
 if(active.rules.some(r=>!next.rules.some(n=>n.id===r.id&&n.kind===r.kind)))throw Error('Não remova nem altere o tipo dos critérios existentes; desative e adicione outro.');
 return normalizeCriteriaRegistry({active:next.id,profiles:[...current.profiles,next]});
}
export function profileGroups(profile){const p=normalizeCriteriaProfile(profile);return Object.fromEntries(Object.keys(groupLabels).map(group=>[group,p.rules.filter(r=>r.kind==='flag'&&r.group===group).map(r=>[r.id,r.label,r.active?r.points:0])]));}
export function ruleCondition(rule){return rule.kind==='flag'?'Resposta explicitamente assinalada':rule.kind==='bmiAbove'?`IMC adulto > ${rule.threshold}`:rule.kind==='ageAbove'?`Idade > ${rule.threshold}`:rule.kind==='ageWithFlags'?`Idade > ${rule.threshold} e um destes fatores: ${rule.flagIds.join(', ')}`:`${preparationLabels[rule.field]} = ${preparationValues[rule.field][rule.value]}`;}
export function matchingRules(p,profile,bmi,age){const flags=Array.isArray(p.flags)?p.flags:[];return profile.rules.filter(r=>r.active&&(r.kind==='flag'?flags.includes(r.id):r.kind==='bmiAbove'?bmi!==null&&bmi>r.threshold:r.kind==='ageAbove'?Number.isInteger(age)&&age>r.threshold:r.kind==='ageWithFlags'?Number.isInteger(age)&&age>r.threshold&&r.flagIds.some(id=>flags.includes(id)):p[r.field]!==''&&p[r.field]!=null&&+p[r.field]===r.value));}
