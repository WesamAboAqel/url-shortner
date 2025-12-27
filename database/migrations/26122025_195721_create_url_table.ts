import { Kysely } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
    await db.schema
        .createTable("url")
        .addColumn("short_url", "varchar(8)", (col) =>
            col.unique().primaryKey()
        )
        .addColumn("original_url", "varchar")
        .execute();
};

export const down = async (db: Kysely<any>): Promise<void> => {
    await db.schema.dropTable("url").execute();
};
