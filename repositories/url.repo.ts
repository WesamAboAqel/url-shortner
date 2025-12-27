import db from "../services/db.js";
import { UrlTable } from "../database/schema.js";

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
        .selectFrom("url")
        .selectAll()
        .where("short_url", "=", short_url)
        .executeTakeFirstOrThrow();
};
