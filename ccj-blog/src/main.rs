#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use rocket::fs::FileServer;
use rocket_dyn_templates::Template;

#[get("/")]
fn index() -> Template {
    let context: std::collections::HashMap<&str, Vec<i32>> = 
        [("numbers", vec![777, 888, 999])].iter().cloned().collect();
    Template::render("index", &context)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/static", FileServer::from("static"))
        .mount("/", routes![index])
        .attach(Template::fairing())
}