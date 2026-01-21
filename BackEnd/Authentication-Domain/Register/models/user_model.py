from utils.db import get_connection

class UserModel:
    @staticmethod
    def find_user(email, password=None):
        conn, cursor = get_connection()
        if password:
            cursor.execute("SELECT id FROM users WHERE email=? AND password=?", (email, password))
        else:
            cursor.execute("SELECT id FROM users WHERE email=?", (email,))
        return cursor.fetchone()

    @staticmethod
    def create_user(email, password):
        conn, cursor = get_connection()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
