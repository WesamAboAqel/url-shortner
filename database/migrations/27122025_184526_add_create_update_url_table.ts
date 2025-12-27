import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
    await db.schema
        .alterTable("url")
        .addColumn("created_at", "timestamptz", (col) =>
            col.defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamptz", (col) =>
            col.defaultTo(sql`now()`)
        )
        .execute();
};

export const down = async (db: Kysely<any>): Promise<void> => {
    await db.schema
        .alterTable("url")
        .dropColumn("created_at")
        .dropColumn("updated_at")
        .execute();
};
