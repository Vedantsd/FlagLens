import os
from functools import wraps

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request, send_from_directory
import psycopg2
import psycopg2.extras

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
ADMIN_PORT = int(os.environ.get("ADMIN_PORT", 5050))
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")

if not DATABASE_URL:
    print(
        "Warning: DATABASE_URL is not set. Copy .env.example to .env and "
        "fill in your Neon connection string."
    )

if not ADMIN_PASSWORD:
    print(
        "Warning: ADMIN_PASSWORD is not set in .env. The admin dashboard "
        "will reject all logins until you set one."
    )

app = Flask(__name__, static_folder=".", static_url_path="")


def get_connection():
    return psycopg2.connect(DATABASE_URL, sslmode="require")


def check_auth(username, password):
    return bool(ADMIN_PASSWORD) and username == ADMIN_USERNAME and password == ADMIN_PASSWORD


def authenticate():
    return Response(
        "Admin credentials required.",
        401,
        {"WWW-Authenticate": 'Basic realm="FlagLens Admin"'},
    )


def requires_auth(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return view(*args, **kwargs)

    return wrapped


@app.route("/")
@requires_auth
def index():
    return send_from_directory(".", "admin.html")


@app.route("/api/admin/results")
@requires_auth
def get_results():
    try:
        conn = get_connection()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    """
                    SELECT id, user_name, friend_name, timestamp, score, flag_status
                    FROM flaglens_results
                    ORDER BY timestamp DESC
                    """
                )
                rows = cur.fetchall()
        finally:
            conn.close()
    except Exception as error:  
        print(f"DB fetch error: {error}")
        return jsonify({"error": "Failed to fetch results."}), 500

    results = [
        {
            "id": row["id"],
            "userName": row["user_name"],
            "friendName": row["friend_name"],
            "timestamp": row["timestamp"].isoformat() if row["timestamp"] else None,
            "score": float(row["score"]),
            "flagStatus": row["flag_status"],
        }
        for row in rows
    ]

    return jsonify({"results": results})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=ADMIN_PORT, debug=True)