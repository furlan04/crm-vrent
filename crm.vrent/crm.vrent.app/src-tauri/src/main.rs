// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use dotenv::dotenv;
use std::env;
use tauri::command;

#[command]
fn get_env_var(name: &str) -> Option<String> {
    dotenv().ok(); // Carica le variabili dal file `.env`
    env::var(name).ok() // Ritorna la variabile richiesta
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_env_var])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
