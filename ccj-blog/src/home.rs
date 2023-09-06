
use rocket_dyn_templates::Template;

#[get("/")]
pub fn index() -> Template {
    let context = "";
    Template::render("index", &context)
}