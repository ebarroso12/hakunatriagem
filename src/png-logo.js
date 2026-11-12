import {Unzlib} from 'fflate';
// Apenas PNG normalizado pelo canvas (8 bits, RGB/RGBA, não entrelaçado).
const crcTable=Uint32Array.from({length:256},(_,i)=>{let n=i;for(let b=0;b<8;b++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
const crc32=bytes=>{let crc=0xffffffff;for(const b of bytes)crc=crcTable[(crc^b)&255]^(crc>>>8);return(crc^0xffffffff)>>>0;};
const fail=()=>{throw Error('Emblema PNG corrompido ou não normalizado. Selecione a imagem novamente pelo aplicativo.');};
export function inspectPNG(bytes){
 if(bytes.length<57||![137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b))fail();
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),parts=[];let width=0,height=0,channels=0,position=8,ended=false,idatLength=0;
 while(position<bytes.length){
  if(position+12>bytes.length)fail();const length=view.getUint32(position),end=position+12+length;if(end>bytes.length)fail();
  const type=String.fromCharCode(...bytes.subarray(position+4,position+8));if(crc32(bytes.subarray(position+4,position+8+length))!==view.getUint32(position+8+length))fail();
  if(position===8){if(type!=='IHDR'||length!==13)fail();width=view.getUint32(position+8);height=view.getUint32(position+12);const depth=bytes[position+16],color=bytes[position+17];channels=color===6?4:color===2?3:0;if(!width||!height||width>1024||height>1024||depth!==8||!channels||bytes[position+18]||bytes[position+19]||bytes[position+20])fail();}
  else if(type==='IHDR')fail();
  if(type==='IDAT'){parts.push(bytes.subarray(position+8,position+8+length));idatLength+=length;}
  if(type==='IEND'){if(length!==0||end!==bytes.length)fail();ended=true;}
  if(ended&&end!==bytes.length)fail();position=end;
 }
 if(!ended||idatLength<6)fail();
 const compressed=new Uint8Array(idatLength);let offset=0;for(const part of parts){compressed.set(part,offset);offset+=part.length;}
 const stride=width*channels+1,expected=stride*height,decoded=new Uint8Array(expected);let count=0,finished=false;
 try{const decoder=new Unzlib((chunk,final)=>{if(count+chunk.length>expected)fail();decoded.set(chunk,count);count+=chunk.length;finished=final;});for(let i=0;i<compressed.length;i+=512)decoder.push(compressed.subarray(i,i+512),i+512>=compressed.length);}catch{fail();}
 if(!finished||count!==expected)fail();for(let i=0;i<decoded.length;i+=stride)if(decoded[i]>4)fail();
 let a=1,b=0;for(const value of decoded){a=(a+value)%65521;b=(b+a)%65521;}const adler=((b<<16)|a)>>>0,last=new DataView(compressed.buffer).getUint32(compressed.length-4);if(adler!==last)fail();
 return{width,height};
}
