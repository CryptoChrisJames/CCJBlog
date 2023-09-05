
use rocket_dyn_templates::Template;

#[get("/admin")]
pub fn login() -> Template {
    let context = "";
    Template::render("login", &context)
}