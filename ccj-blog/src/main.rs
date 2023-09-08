#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use rocket::fs::FileServer;
use rocket_dyn_templates::Template;

mod home;
mod admin;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/static", FileServer::from("static"))
        .mount("/", routes![home::index, admin::admin, admin::login])
        .register("/admin", catchers![admin::not_found, admin::server_issue, admin::unauthorized])
        .attach(Template::fairing())
}