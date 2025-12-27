import db from "../services/db.js";
import { Database, UrlTable } from "../database/schema.js";
import { Kysely, Transaction } from "kysely";
import { enable } from "colors/index.js";

type Executor = Kysely<Database> | Transaction<Database>;

export const exec = (trx?: Executor) => trx ?? db;

type newUrl = {
    short_url: string;
    original_url: string;
};

// @param      information
// @returns    url - urlTable
// @notes      creates a new shortening link
export const insertUrl = async (data: newUrl) => {
    return await db
        .insertInto("url")
        .values({
            short_url: data.short_url,
            original_url: data.original_url,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
};

// @param      short_url : string
// @returns    url : urlTable
// @notes      sends the full url for a short url
export const getUrl = async (short_url: string) => {
    return await db
        .updateTable("url")
        .set((eb) => ({ visit_count: eb("visit_count", "+", 1) }))
        .where("short_url", "=", short_url)
        .returningAll()
        .executeTakeFirstOrThrow();
};

// @param      data - UrlTable
// @returns    UrlTable
// @notes      updates an old short url to match a new original_url
export const changeOriginalUrl = async (data: newUrl) => {
    // console.log(data);
    return await db
        .updateTable("url")
        .set({
            original_url: data.original_url,
            updated_at: new Date(),
        })
        .where("short_url", "=", data.short_url)
        .returningAll()
        .executeTakeFirstOrThrow();
};

// @param      short_url
// @returns    nothing
// @notes      deletes url by taking short_url
export const removeUrl = async (short_url: string) => {
    return await db
        .deleteFrom("url")
        .where("short_url", "=", short_url)
        .executeTakeFirstOrThrow();
};
