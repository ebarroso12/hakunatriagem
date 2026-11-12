import {isMissing,participantLabel} from './empty.js';
const folded=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim().replace(/\s+/g,' ');
const collator=new Intl.Collator('pt-BR',{sensitivity:'base',numeric:true});
const rank={black:0,red:1,yellow:2,green:3};
export function locateParticipants(results,{query='',color='',status='',order='name'}={}){
 const search=folded(query);
 return results.filter(({p,r})=>(!search||folded(`${participantLabel(p)} ${p.id} ${p.cpf||''} ${p.phone||''}`).includes(search))&&(!color||r.color===color)&&(!status||(status==='pending'?!r.band:status==='complete'?!!r.band:status==='attention'?r.exclusions.length>0||['red','black'].includes(r.color):false))).sort((a,b)=>{
  if(order==='color'){const difference=(rank[a.r.color]??4)-(rank[b.r.color]??4);if(difference)return difference;}
  const absent=Number(isMissing(a.p.name))-Number(isMissing(b.p.name));
  return absent||collator.compare(participantLabel(a.p),participantLabel(b.p))||collator.compare(a.p.id,b.p.id);
 });
}
