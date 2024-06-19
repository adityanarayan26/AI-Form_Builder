import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const JsonForms = pgTable('JsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    theme: varchar('theme'),
    GradientBG: varchar('GradientBG'),
    Style: varchar('Style'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull()
});

export const UserResponses = pgTable('UserResponses', {
    id: serial('id').primaryKey(),
    responses: text('responses').notNull(),
    createdBy: varchar('createdBy').default('anonymous'),
    createdAt: varchar('createdAt').notNull(),
    FormRef: integer('FormRef').references(()=>JsonForms.id)
})