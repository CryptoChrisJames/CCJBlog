import sqlite3
from sqlite3 import Error

create_life_table = """
CREATE TABLE IF NOT EXISTS life (
	id integer PRIMARY KEY,
	name text NOT NULL,
	md_file text,
	html_file text
);
"""

create_ent_table = """
CREATE TABLE IF NOT EXISTS ent (
	id integer PRIMARY KEY,
	name text NOT NULL,
	md_file text,
	html_file text
);
"""

create_tech_table = """
CREATE TABLE IF NOT EXISTS tech (
	id integer PRIMARY KEY,
	name text NOT NULL,
	md_file text,
	html_file text
);
"""

def get_db(db_file):
    try:
        conn = None
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

def create_table(create_table_sql, db):
    try:
        c = db.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)