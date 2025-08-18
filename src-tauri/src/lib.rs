use tauri::{command, Manager, Runtime, Window};
use tauri_plugin_fs::FsExt;

mod migrations;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        migrations::CREATE_DOCUMENTS_TABLE,
        migrations::CREATE_LINKS_TABLE,
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:test.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![allow_file])
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[command]
fn allow_file<R: Runtime>(path: &str, window: Window<R>) -> Result<(), tauri_plugin_fs::Error> {
    println!("{:?}", window.path().app_config_dir());
    let tauri_scope = window.state::<tauri::scope::Scopes>();

    if let Some(s) = window.try_fs_scope() {
        s.allow_file(&path)?;
    }
    tauri_scope.allow_file(&path)?;

    Ok(())
}
