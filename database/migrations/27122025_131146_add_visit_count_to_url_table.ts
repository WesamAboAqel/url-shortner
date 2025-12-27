import { Kysely } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
    await db.schema
        .alterTable("url")
        .addColumn("visit_count", "integer", (col) => col.defaultTo(0))
        .execute();
};

export const down = async (db: Kysely<any>): Promise<void> => {
    await db.schema.alterTable("url").dropColumn("visit_count").execute();
};
