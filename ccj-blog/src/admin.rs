
use rocket::{Error, http::Status};
use rocket_dyn_templates::Template;
use rocket::response::Result;
use bcrypt::{DEFAULT_COST, hash, verify};
use rocket::form::Form;
use crate::domain::User;
use crate::repo::UserRepo;

#[derive(FromForm)]
struct Login {
    username: String,
    password: String,
}

#[post("/admin/login", data = "<login>")]
pub fn login(login: Form<Login>) -> Result<Template, Status> {
    let loginInfo = login.into_inner();
    let pwHash = hash(loginInfo.password, DEFAULT_COST).unwrap();
    let user = User::new(&loginInfo.username, &pwHash);
    let userRepo = UserRepo { user: user };
    let foundUser: Result<User, Error> = userRepo.get();
    match foundUser {
        Ok(user) => {
            let result = verify(&user.password, &pwHash);
            match result {
                Ok(valid) => {
                    if valid {
                        let context = user;
                        return Ok(Template::render("admin/dashboard", &context));
                    }
                    return Err(Status::Unauthorized);
                },
                Err(e) => {
                    println!("{:?}", e);
                    return Err(Status::InternalServerError);
                },
            }
        },
        Err(e) => {
            println!("{:?}", e);
            return Status::InternalServerError;
        },
    }
}

#[get("/admin")]
pub fn admin() -> Template {
    let context = "";
    Template::render("admin", &context)
}

// #[get("/admin/create/<username>/<password>")]
// pub fn create(username: &str, password: &str) -> Status {
//     let hashed = hash(password, DEFAULT_COST).unwrap();
//     let newUser = User::new(username, &hashed);
//     let userRepo = UserRepo { user: newUser };
//     let result = userRepo.create();
//     if result {
//         return Status::Created;
//     }
//     Status::InternalServerError
// }