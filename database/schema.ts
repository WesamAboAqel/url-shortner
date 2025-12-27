import { Generated } from "kysely";
import { VariableDeclaration } from "typescript";

export interface UrlTable {
    short_url: string;
    original_url: string;
}

export interface Database {
    url: UrlTable;
}
