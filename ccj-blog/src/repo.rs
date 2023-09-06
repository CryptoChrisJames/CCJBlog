use rusqlite::Connection;

use crate::domain::User;

pub fn getDb() -> Connection {
    return Connection::open("./db/ccj-blog.db").unwrap();
}

pub struct UserRepo {
    pub user: User,
}

impl UserRepo {
    pub fn create(&self) -> bool {
        let db = getDb();
        let mut stmt = db.prepare("INSERT INTO admin (username, password) VALUES (?, ?)").unwrap();
        let result = stmt.execute(&[&self.user.username, &self.user.password]);
        return match result {
            Ok(_) => true,
            Err(_) => false,
        }
    }
}