
use rocket::{Error, http::Status};
use rocket_dyn_templates::Template;
use bcrypt::{DEFAULT_COST, hash, verify};
use crate::domain::User;
use crate::repo::UserRepo;

#[get("/admin")]
pub fn login() -> Template {
    let context = "";
    Template::render("login", &context)
}

#[get("/admin/create/<username>/<password>")]
pub fn create(username: &str, password: &str) -> Status {
    let hashed = hash(password, DEFAULT_COST).unwrap();
    let newUser = User::new(username, &hashed);
    let userRepo = UserRepo { user: newUser };
    let result = userRepo.create();
    if result {
        return Status::Created;
    }
    Status::InternalServerError
}