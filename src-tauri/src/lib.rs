use include_dir::{include_dir, Dir};

static FRONTEND: Dir = include_dir!("../src");

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default();

    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    {
        builder = builder.plugin(tauri_plugin_window_state::Builder::default().build());
        builder = builder.plugin(tauri_plugin_updater::Builder::default().build());
    }

    builder
        .register_uri_scheme_protocol("tqo", |_ctx, request| {
            let path = request.uri().path();
            let path = path.trim_start_matches('/');
            let path = if path.is_empty() { "index.html" } else { path };

            if let Some(file) = FRONTEND.get_file(path) {
                let data = file.contents();
                let ext = path.rsplit('.').next().unwrap_or("").to_lowercase();
                let mime = match ext.as_str() {
                    "html" | "htm" => "text/html",
                    "js" | "mjs"   => "application/javascript",
                    "css"          => "text/css",
                    "png"          => "image/png",
                    "jpg" | "jpeg" => "image/jpeg",
                    "gif"          => "image/gif",
                    "svg"          => "image/svg+xml",
                    "json"         => "application/json",
                    "wasm"         => "application/wasm",
                    "ico"          => "image/x-icon",
                    _              => "application/octet-stream",
                };
                http::Response::builder()
                    .header("Content-Type", mime)
                    .body(data.to_vec())
                    .unwrap()
            } else {
                http::Response::builder()
                    .status(404)
                    .body(Vec::new())
                    .unwrap()
            }
        })
        .setup(|app| {
            let builder = tauri::WebviewWindowBuilder::new(
                app.handle(),
                "main",
                tauri::WebviewUrl::External(
                    "tqo://app.tardquest.online"
                        .parse()
                        .expect("invalid tqo URL"),
                ),
            )
            .title("TARDQUEST Online II: A Realm Unborn")
            .inner_size(960.0, 720.0)
            .min_inner_size(640.0, 480.0)
            .resizable(true);

            #[cfg(desktop)]
            let builder = builder.decorations(false);

            let _webview_window = builder.visible(true).build()?;

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
