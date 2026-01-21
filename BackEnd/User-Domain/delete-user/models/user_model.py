from utils.db import get_connection

class UserModel:

    @staticmethod
    def delete_by_email(email):
        conn, cursor = get_connection()
        cursor.execute("DELETE FROM users WHERE email=?", (email,))
        conn.commit()
