import {z} from "zod";
import {CATEGORIES} from "../../../lib/types";
import {database,identity,json,failure,body,ApiError} from "../../../lib/server";
const schema=z.object({displayName:z.string().trim().min(2).max(50),interests:z.array(z.enum(CATEGORIES)).max(6),skill:z.string().trim().max(160)});
export async function POST(request:Request){try{const user=await identity(request);const p=schema.safeParse(await body(request));if(!p.success)throw new ApiError(400,"Revisa tu nombre y tus intereses.");await database().prepare("INSERT INTO profiles(user_id,display_name,interests,skill) VALUES (?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET display_name=excluded.display_name,interests=excluded.interests,skill=excluded.skill").bind(user.userId,p.data.displayName,JSON.stringify(p.data.interests),p.data.skill).run();return json({ok:true});}catch(e){return failure(e);}}
export async function DELETE(request:Request){try{
 const user=await identity(request),db=database();
 // D1 batch is transactional: remove dependent rows before the hosted records.
 await db.batch([
  db.prepare("DELETE FROM bookings WHERE user_id=? OR ronda_id IN (SELECT id FROM rondas WHERE owner_id=?)").bind(user.userId,user.userId),
  db.prepare("DELETE FROM favorites WHERE user_id=? OR ronda_id IN (SELECT id FROM rondas WHERE owner_id=?)").bind(user.userId,user.userId),
  db.prepare("DELETE FROM reports WHERE user_id=? OR ronda_id IN (SELECT id FROM rondas WHERE owner_id=?)").bind(user.userId,user.userId),
  db.prepare("DELETE FROM rondas WHERE owner_id=?").bind(user.userId),
  db.prepare("DELETE FROM profiles WHERE user_id=?").bind(user.userId),
 ]);return json({ok:true});
}catch(e){return failure(e);}}
