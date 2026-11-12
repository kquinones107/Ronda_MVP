import { integer, sqliteTable, text, primaryKey, index } from "drizzle-orm/sqlite-core";
export const rondas = sqliteTable("rondas", {
 id:text("id").primaryKey(),ownerId:text("owner_id").notNull(),hostName:text("host_name").notNull(),
 title:text("title").notNull(),description:text("description").notNull(),outcome:text("outcome").notNull(),
 category:text("category").notNull(),mode:text("mode").notNull(),city:text("city").notNull(),location:text("location").notNull(),
 startsAt:text("starts_at").notNull(),duration:integer("duration").notNull(),capacity:integer("capacity").notNull(),
 status:text("status").notNull().default("live"),createdAt:text("created_at").notNull(),
},t=>[index("rondas_discovery_idx").on(t.status,t.city,t.startsAt),index("rondas_owner_idx").on(t.ownerId,t.createdAt)]);
export const bookings=sqliteTable("bookings",{userId:text("user_id").notNull(),rondaId:text("ronda_id").notNull(),createdAt:text("created_at").notNull()},t=>[primaryKey({columns:[t.userId,t.rondaId]}),index("bookings_ronda_idx").on(t.rondaId)]);
export const favorites=sqliteTable("favorites",{userId:text("user_id").notNull(),rondaId:text("ronda_id").notNull()},t=>[primaryKey({columns:[t.userId,t.rondaId]})]);
export const profiles=sqliteTable("profiles",{userId:text("user_id").primaryKey(),displayName:text("display_name").notNull(),interests:text("interests").notNull(),skill:text("skill").notNull().default("")});
export const reports=sqliteTable("reports",{id:text("id").primaryKey(),userId:text("user_id").notNull(),rondaId:text("ronda_id").notNull(),reason:text("reason").notNull(),createdAt:text("created_at").notNull()});
