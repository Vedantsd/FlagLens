import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
import psycopg2

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
PORT = int(os.environ.get("PORT", 3000))

if not DATABASE_URL:
    print(
        "Warning: DATABASE_URL is not set. Copy .env.example to .env and "
        "fill in your Neon connection string."
    )

app = Flask(__name__, static_folder=".", static_url_path="")


def get_connection():
    return psycopg2.connect(DATABASE_URL, sslmode="require")


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/api/save-result", methods=["POST"])
def save_result():
    data = request.get_json(silent=True) or {}

    user_name = (data.get("userName") or "").strip()
    friend_name = (data.get("friendName") or "").strip()
    score = data.get("score")
    flag_status = data.get("flagStatus")

    if (
        not user_name
        or not friend_name
        or not isinstance(score, (int, float))
        or flag_status not in ("red", "green")
    ):
        return jsonify({"error": "Invalid or missing fields."}), 400

    try:
        conn = get_connection()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO flaglens_results
                        (user_name, friend_name, timestamp, score, flag_status)
                    VALUES (%s, %s, NOW(), %s, %s)
                    """,
                    (user_name, friend_name, score, flag_status),
                )
            conn.commit()
        finally:
            conn.close()
    except Exception as error:  # noqa: BLE001
        print(f"DB insert error: {error}")
        return jsonify({"error": "Failed to save result."}), 500

    return jsonify({"success": True}), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)