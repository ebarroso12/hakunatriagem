// Absorve somente o ruído IEEE-754 no limite; não arredonda a medida clínica.
export function compareMeasurement(value,limit){const delta=value-limit,tolerance=4*Number.EPSILON*Math.max(1,Math.abs(value),Math.abs(limit));return Math.abs(delta)<=tolerance?0:delta<0?-1:1;}
