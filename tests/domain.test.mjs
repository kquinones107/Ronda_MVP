import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,unlinkSync} from 'node:fs';
import ts from 'typescript';
import {DatabaseSync} from 'node:sqlite';
const modulePath=new URL('./domain.compiled.mjs',import.meta.url);
const src=readFileSync(new URL('../lib/domain.ts',import.meta.url),'utf8');
writeFileSync(modulePath,ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText.replace('"./types"','"../lib/types.ts"'));
const {filterRondas,rondaSchema,BOOK_REAL_SQL}=await import(modulePath.href);unlinkSync(modulePath);
const items=[{title:'Fotografía con celular',description:'Práctica de luz',outcome:'Cinco fotos',category:'Creatividad',city:'Medellín',mode:'Presencial'},{title:'Inglés cotidiano',description:'Conversación',outcome:'Pedir un café',category:'Idiomas',city:'Bogotá',mode:'En línea'}];
test('la búsqueda ignora acentos y mayúsculas',()=>assert.equal(filterRondas(items,'FOTOGRAFIA','Todo','Todas','Todas').length,1));
test('se combinan categoría, modalidad y ciudad',()=>assert.equal(filterRondas(items,'','Creatividad','Bogotá','Presencial').length,0));
test('los encuentros en línea aparecen desde otra ciudad',()=>assert.equal(filterRondas(items,'','Idiomas','Medellín','En línea').length,1));
const valid={title:'Mi primera fotografía con celular',description:'Aprenderemos sobre luz y composición con ejercicios sencillos para principiantes.',outcome:'Te llevas cinco fotos y una guía práctica.',hostName:'Ana',category:'Creatividad',mode:'Presencial',city:'Medellín',location:'Biblioteca pública en Laureles',startsAt:new Date(Date.now()+86400000).toISOString(),duration:60,capacity:6};
test('el formulario acepta una convocatoria completa',()=>assert.equal(rondaSchema.safeParse(valid).success,true));
test('rechaza fechas pasadas y cupos fuera del máximo',()=>{assert.equal(rondaSchema.safeParse({...valid,startsAt:'2020-01-01T00:00:00.000Z'}).success,false);assert.equal(rondaSchema.safeParse({...valid,capacity:200}).success,false);});
test('rechaza categorías arbitrarias y descripciones insuficientes',()=>{assert.equal(rondaSchema.safeParse({...valid,category:'Inversiones'}).success,false);assert.equal(rondaSchema.safeParse({...valid,description:'hola'}).success,false);});
function setup(){const db=new DatabaseSync(':memory:');db.exec(readFileSync(new URL('../drizzle/0000_third_timeslip.sql',import.meta.url),'utf8'));db.prepare("INSERT INTO rondas(id,owner_id,host_name,title,description,outcome,category,mode,city,location,starts_at,duration,capacity,status,created_at) VALUES ('r1','host','Anfitrión','Una ronda de prueba','Una descripción','Resultado','Creatividad','Presencial','Medellín','Biblioteca',?,60,2,'live',?)").run(valid.startsAt,new Date().toISOString());return db;}
function book(db,user){const now=new Date().toISOString();return db.prepare(BOOK_REAL_SQL).run(user,now,'r1',user,now).changes;}
test('el último cupo no permite sobreinscripción y los reintentos no duplican',()=>{const db=setup();assert.equal(book(db,'a'),1);assert.equal(book(db,'a'),0);assert.equal(book(db,'b'),1);assert.equal(book(db,'c'),0);assert.equal(db.prepare('SELECT COUNT(*) AS n FROM bookings').get().n,2);db.close();});
test('el anfitrión no puede reservarse su propia ronda',()=>{const db=setup();assert.equal(book(db,'host'),0);db.close();});
test('cancelar o agotar la fecha impide inscripciones',()=>{const db=setup();db.exec("UPDATE rondas SET status='cancelled'");assert.equal(book(db,'a'),0);db.exec("UPDATE rondas SET status='live', starts_at='2020-01-01T00:00:00.000Z'");assert.equal(book(db,'a'),0);db.close();});
test('liberar un cupo permite otra inscripción',()=>{const db=setup();book(db,'a');book(db,'b');db.exec("DELETE FROM bookings WHERE user_id='a'");assert.equal(book(db,'c'),1);db.close();});
