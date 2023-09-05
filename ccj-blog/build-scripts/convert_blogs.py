import markdown
import os
import blog_scripts.data

def convert_blogs_to_html(blogs, db, table_name):
    for blog in blogs:
        cur = db.cursor()
        cur.execute("SELECT * FROM " + table_name + " WHERE name=? LIMIT 1", (blog,))
        row = cur.fetchone()
        if row is None:
            print("Blog " + blog + " not found in database")
            continue
        else:
            print("Blog " + blog + " has been converted to HTML.")

#Get the DB directory
db_dir = os.path.join(os.path.dirname(__file__), '../db')

#Create the database
db = blog_scripts.data.get_db(os.path.join(os.path.dirname(__file__), '../db/blogs.db'))
blog_scripts.data.create_table(blog_scripts.data.create_life_table, db)
blog_scripts.data.create_table(blog_scripts.data.create_ent_table, db)
blog_scripts.data.create_table(blog_scripts.data.create_tech_table, db)

#Get the blogs directory
life_dir = os.path.join(os.path.dirname(__file__), '../blogs/life')
ent_dir = os.path.join(os.path.dirname(__file__), '../blogs/ent')
tech_dir = os.path.join(os.path.dirname(__file__), '../blogs/tech')


life_blogs = []
ent_blogs = []
tech_blogs = []

for filename in os.listdir(life_dir):
    life_blogs.append(filename)

for filename in os.listdir(ent_dir):
    ent_blogs.append(filename)

for filename in os.listdir(tech_dir):
    tech_blogs.append(filename)

convert_blogs_to_html(life_blogs, db, "life")

