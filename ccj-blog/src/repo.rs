use rusqlite::Connection;

use crate::domain::User;

pub fn getDb() -> Connection {
    return Connection::open("./db/ccj-blog.db").unwrap();
}

pub struct UserRepo {
    pub user: User,
}

impl UserRepo {
    pub fn get(&self) -> Result<User, rusqlite::Error> {
        let db = getDb();
        let mut stmt = &db.prepare("SELECT * FROM admin WHERE username=?").unwrap();
        let existing_user: Result<User, rusqlite::Error> = stmt.query_row(&[&self.user.username], |row| {
            // Extract values from the row here
            println!("{:?}", row);
            Ok(User {
                username: row.get(0)?,
                password: row.get(1)?,
            })
        });
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
}