// Ausência explícita não equivale a resposta negativa, zero ou valor normal.
export function isMissing(value){if(value===null||value===undefined)return true;if(typeof value!=='string')return false;const text=value.trim();return !text||/^(?:n\/a|n\/d|não informado|nao informado|não preenchido|nao preenchido|sem informação|sem informacao|não disponível|nao disponivel|[-—–]+)$/i.test(text);}
export function participantLabel(p){return !isMissing(p.name)?p.name:`Nome não informado · registro ${String(p.id||'sem ID').slice(0,8)}`;}
