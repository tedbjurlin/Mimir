use std::{fs, io, path::Path};

use tauri::{command, Manager, Runtime, Window};
use tauri_plugin_fs::FsExt;

use crate::link::check_md_links;

#[command]
pub async fn open_file(file_name: &str) -> Result<(), io::Error> {
    let path = Path::new(file_name);
    match path.extension() {
        Some(x) if x == "md" => {
            let file = open_md_file(path).await?;
        }
        Some(_) => {}
        None => {}
    }
    Ok(())
}

async fn open_md_file(path: &Path) -> Result<String, io::Error> {
    let file = fs::read_to_string(path)?;

    check_md_links(file.clone());

    Ok(file)
}

#[command]
pub fn allow_file<R: Runtime>(path: &str, window: Window<R>) -> Result<(), tauri_plugin_fs::Error> {
    println!("{:?}", window.path().app_config_dir());
    let tauri_scope = window.state::<tauri::scope::Scopes>();

    if let Some(s) = window.try_fs_scope() {
        s.allow_file(&path)?;
    }
    tauri_scope.allow_file(&path)?;

    Ok(())
}
