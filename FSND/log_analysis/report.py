#!/usr/bin/env python3

import psycopg2

''' Initialise the database name and the queries '''
DBNAME = "news"

popular_articles_query = """SELECT title,count(*) AS views
                            FROM articles,log
                            WHERE path LIKE '%'||slug AND status='200 OK'
                            GROUP BY title
                            ORDER BY views DESC LIMIT 3;"""

popular_authors_query = """SELECT name,count(*) AS views
                           FROM authors,articles,log
                           WHERE articles.author = authors.id
                           AND path LIKE '%'||slug
                           AND status ='200 OK'
                           GROUP BY name
                           ORDER BY views DESC;"""

err_query = """SELECT *
               FROM
               (SELECT t1.day,
               round(((cast(err_reqs AS numeric)/cast(reqs AS numeric))*100),1)
                AS errperc
                FROM
                (SELECT count(*) AS reqs,date(time) AS day
                 FROM log GROUP BY day) AS t1
                JOIN
                (SELECT count(*) AS err_reqs,date(time) AS day
                 FROM log WHERE status LIKE '404%' GROUP BY day) AS t2
                ON t1.day = t2.day) AS err_table
                WHERE errperc > 1.0;"""


''' Connect to the database. '''
db = psycopg2.connect(database=DBNAME)
c = db.cursor()

''' Execute the queries and print the results in required format. '''
c.execute(popular_articles_query)
articles = c.fetchall()
print("\n1. What are the most popular three articles of all time?")
for i in range(len(articles)):
    for j in range(len(articles[i])-1):
        print('*', articles[i][j], '--', articles[i][j+1], end=' views')
    print()


c.execute(popular_authors_query)
authors = c.fetchall()
print("\n2. Who are the most popular article authors of all time?")
for i in range(len(authors)):
    for j in range(len(authors[i])-1):
        print('*', authors[i][j], '--', authors[i][j+1], end=' views')
    print()


c.execute(err_query)
err = c.fetchall()
print("\n3. On which days did more than 1% of requests lead to errors?")
for i in range(len(err)):
    print('*', err[i][0].strftime("%d, %B %Y"), '-', err[i][1], end='% errors')
print()

''' Close the database connection. '''
db.close()
