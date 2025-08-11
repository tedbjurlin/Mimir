use tauri_plugin_sql::{Migration, MigrationKind};

pub const CREATE_DOCUMENTS_TABLE: Migration = Migration {
    version: 1,
    description: "create initial documents table",
    sql: include_str!("../migrations/0001_create_documents_table.sql"),
    kind: MigrationKind::Up,
};

pub const CREATE_LINKS_TABLE: Migration = Migration {
    version: 2,
    description: "create initial links table",
    sql: include_str!("../migrations/0002_create_links_table.sql"),
    kind: MigrationKind::Up,
};
