use rocket::http::Status;
use rocket_dyn_templates::{Template, context};
use bcrypt::verify;
use rocket::form::Form;
use rusqlite::Connection;
use jsonwebtoken::{encode, Header, EncodingKey};
use serde_derive::{Serialize, Deserialize};

static SECRET: &[u8] = b"9fc1ba86-bc6a-4c57-be2c-e5beee07590c";

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,  // Subject (often a user ID or username)
    // You can add more claims here, e.g., roles, permissions, etc.
}


#[derive(FromForm)]
struct LoginInfo {
    username: String,
    password: String,
}

enum UserResult {
    User(String, String),
    NotFound(String),
}

#[catch(401)]
pub fn unauthorized() -> String {
    "Unauthorized".into()
}

#[catch(404)]
pub fn not_found() -> String {
    "User Not Found".into()
}

#[catch(500)]
pub fn server_issue() -> String {
    "Server Issue".into()
}

#[post("/admin/login", data = "<login>")]
pub fn login(login: Form<LoginInfo>) -> Result<Template, Status> {
    let loginInfo = login.into_inner();
    if authenticate(&loginInfo.username, &loginInfo.password) {
        let context = context! {
            username: &loginInfo.username,
        };
        return Ok(Template::render("admin/dashboard", &context));
    } else {
        Err(rocket::http::Status::Unauthorized)
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

fn getDb() -> Connection {
    return Connection::open("./db/ccj-blog.db").unwrap();
}

fn authenticate(authUsername: &String, authPassword: &String) -> bool {
    let existing_user: UserResult = get_user(authUsername);
    match existing_user {
        UserResult::User(username, hash) => {
            match verify(&authPassword, &hash) {
                Ok(valid) => valid,
                Err(e) => {
                    println!("{:?}", e);
                    return false;
                },
            }
        },
        UserResult::NotFound(e) => {
            println!("{:?}", e);
            return false;
        },
    }
}

fn get_user(username: &String) -> UserResult {
    let db = getDb();
    let stmt = &mut db.prepare("SELECT username, password FROM admin WHERE username=?").unwrap();
    let existing_user = match stmt.query_row(&[&username], |row| {
        Ok((row.get(0)?, row.get(1)?))
    }) {
        Ok(user) => {
            return UserResult::User(user.0, user.1);
        },
        Err(rusqlite::Error::QueryReturnedNoRows) => UserResult::NotFound("User not found".into()),
        Err(e) => UserResult::NotFound(e.to_string()),  // Treat other errors as "not found"
    };
    existing_user
}

// pub fn create(&self) -> bool {
//     let db = getDb();
//     let mut stmt = db.prepare("INSERT INTO admin (username, password) VALUES (?, ?)").unwrap();
//     let result = stmt.execute(&[&self.user.username, &self.user.password]);
//     return match result {
//         Ok(_) => true,
//         Err(_) => false,
//     }
// }