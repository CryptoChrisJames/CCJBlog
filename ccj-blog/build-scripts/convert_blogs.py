import markdown
import os
import blog_scripts.data

def convert_blog(blog, table_name, blog_title):
    blog_file = os.path.join(os.path.dirname(__file__), '../blogs/' + table_name + '/' + blog)
    with open(blog_file, 'r') as f:
        blog_text = f.read()
    blog_html = markdown.markdown(blog_text)
    converted_blog = os.path.join(os.path.dirname(__file__), '../static/content/' 
                                    + table_name + '/' 
                                    + blog_title + '.html')
    absolute_converted_blog = os.path.abspath(converted_blog)
    with open(absolute_converted_blog, 'w') as f:
        f.write(blog_html)
    return converted_blog

    # #Insert the blog into the database
    # db = blog_scripts.data.get_db(os.path.join(os.path.dirname(__file__), '../db/blogs.db'))
    # cur = db.cursor()
    # cur.execute("INSERT INTO " + table_name + " (name, html) VALUES (?, ?)", (blog, blog_html))
    # db.commit()

def convert_blogs_to_html(blogs, db, table_name):
    for blog in blogs:
        cur = db.cursor()
        cur.execute("SELECT * FROM " + table_name + " WHERE name=? LIMIT 1", (blog,))
        row = cur.fetchone()
        if row is None:
            print("Converting blog " + blog + " to HTML...")
            blog_title = blog.split('.')[0] + "." + blog.split('.')[1]
            converted_blog = convert_blog(blog, table_name, blog_title)
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

