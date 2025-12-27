import { Generated } from "kysely";
import { VariableDeclaration } from "typescript";

export interface UrlTable {
    short_url: string;
    original_url: string;
    visit_count?: number;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
}

export interface Database {
    url: UrlTable;
}
