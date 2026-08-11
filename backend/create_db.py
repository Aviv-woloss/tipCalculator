import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


conn = psycopg2.connect(
    dbname='postgres', 
    user='postgres', 
    password='5342', 
    host='localhost', 
    port='5432'
)

conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cursor = conn.cursor()

try:
    cursor.execute('CREATE DATABASE tip_calculator;')
    print(" Database 'tip_calculator' created successfully!")
except psycopg2.errors.DuplicateDatabase:
    print(" Database 'tip_calculator' already exists.")
finally:
    cursor.close()
    conn.close()