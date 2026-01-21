import pyodbc

def get_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 18 for SQL Server};'
        'SERVER=52.206.122.1,1433;'
        'DATABASE=auth_db;'
        'UID=sa;'
        'PWD=Password123!;'
        'Encrypt=yes;'
        'TrustServerCertificate=yes;'
    )
    return conn, conn.cursor()
