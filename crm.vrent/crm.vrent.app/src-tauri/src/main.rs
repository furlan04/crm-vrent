// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use dotenv::dotenv;
use std::env;
use tauri::command;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
/*#[tauri::command]
fn get_Agenti() -> Result<(), Error> {
    let url = "mysql://avnadmin:AVNS_qS8iPI12x5Dv_AKDmhC@crm-vrent-db-crm-vrent-db.l.aivencloud.com:18410/defaultdb?ssl-mode=REQUIRED";
    let opts = Opts::from_url(url)?;
    let pool = Pool::new(opts)?;

    let mut conn = pool.get_conn()?;

    let selected_rows = conn
    .query_map("SELECT * FROM Agente"
    , | Nome | {
        Agenti { Nome }
    });
    
    Ok(selected_rows);
}*/
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
