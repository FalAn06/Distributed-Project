from utils.db import get_connection

class UserModel:

    @staticmethod
    def get_password_by_email(email):
        conn, cursor = get_connection()
        cursor.execute("SELECT password FROM users WHERE email=?", (email,))
        row = cursor.fetchone()
        return row[0] if row else None

    @staticmethod
    def update_password(email, new_password):
        conn, cursor = get_connection()
        cursor.execute(
            "UPDATE users SET password=? WHERE email=?",
            (new_password, email)
        )
        conn.commit()
