import json
import os
import secrets
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

from game import GuessTheNumberGame


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")


def _read_json(request_handler: BaseHTTPRequestHandler):
    length = int(request_handler.headers.get("Content-Length", "0"))
    if length <= 0:
        return {}
    data = request_handler.rfile.read(length)
    try:
        return json.loads(data.decode("utf-8"))
    except json.JSONDecodeError:
        return None


class GuessWebHandler(BaseHTTPRequestHandler):
    sessions = {}

    def _send_json(self, obj, status=HTTPStatus.OK):
        data = json.dumps(obj).encode("utf-8")
        self.send_response(int(status))
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _send_file(self, path, content_type):
        with open(path, "rb") as f:
            data = f.read()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _get_or_create_session(self):
        cookie = self.headers.get("Cookie", "")
        session_id = None
        for part in cookie.split(";"):
            part = part.strip()
            if part.startswith("session="):
                session_id = part.split("=", 1)[1]
                break

        if session_id and session_id in self.sessions:
            return session_id

        session_id = secrets.token_urlsafe(16)
        self.sessions[session_id] = GuessTheNumberGame(1, 100)
        return session_id

    def _set_session_cookie(self, session_id):
        # Basic local cookie. For a real deployment add Secure/SameSite/etc.
        self.send_header("Set-Cookie", f"session={session_id}; Path=/; HttpOnly")

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/" or path == "/index.html":
            session_id = self._get_or_create_session()
            file_path = os.path.join(STATIC_DIR, "index.html")
            with open(file_path, "rb") as f:
                data = f.read()
            self.send_response(HTTPStatus.OK)
            self._set_session_cookie(session_id)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            return

        if path == "/static/app.js":
            file_path = os.path.join(STATIC_DIR, "app.js")
            return self._send_file(file_path, "application/javascript; charset=utf-8")

        if path == "/api/state":
            session_id = self._get_or_create_session()
            game = self.sessions[session_id]
            # Need to set cookie if it was missing
            self.send_response(HTTPStatus.OK)
            self._set_session_cookie(session_id)
            payload = {
                "min": game.min_num,
                "max": game.max_num,
                "tries": game.tries,
            }
            data = json.dumps(payload).encode("utf-8")
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Not Found")

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/new":
            body = _read_json(self)
            if body is None:
                return self._send_json({"error": "Invalid JSON"}, HTTPStatus.BAD_REQUEST)

            min_num = body.get("min", 1)
            max_num = body.get("max", 100)

            try:
                min_num = int(min_num)
                max_num = int(max_num)
            except (TypeError, ValueError):
                return self._send_json(
                    {"error": "min/max must be integers"}, HTTPStatus.BAD_REQUEST
                )

            if min_num >= max_num:
                return self._send_json(
                    {"error": "min must be less than max"}, HTTPStatus.BAD_REQUEST
                )

            session_id = self._get_or_create_session()
            self.sessions[session_id] = GuessTheNumberGame(min_num, max_num)
            self.send_response(HTTPStatus.OK)
            self._set_session_cookie(session_id)
            payload = {"ok": True, "min": min_num, "max": max_num, "tries": 0}
            data = json.dumps(payload).encode("utf-8")
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            return

        if path == "/api/guess":
            body = _read_json(self)
            if body is None:
                return self._send_json({"error": "Invalid JSON"}, HTTPStatus.BAD_REQUEST)

            guess = body.get("guess")
            if guess is None:
                return self._send_json({"error": "Missing guess"}, HTTPStatus.BAD_REQUEST)

            session_id = self._get_or_create_session()
            game = self.sessions[session_id]

            try:
                result = game.make_guess(int(guess))
            except (TypeError, ValueError):
                return self._send_json(
                    {"error": "guess must be an integer"}, HTTPStatus.BAD_REQUEST
                )

            self.send_response(HTTPStatus.OK)
            self._set_session_cookie(session_id)
            payload = {
                **result,
                "min": game.min_num,
                "max": game.max_num,
            }
            data = json.dumps(payload).encode("utf-8")
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Not Found")

    def log_message(self, format, *args):
        # Less noisy for local dev
        return


def run(host="127.0.0.1", port=8000):
    os.makedirs(STATIC_DIR, exist_ok=True)
    server = ThreadingHTTPServer((host, int(port)), GuessWebHandler)
    print(f"Guess UI running: http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run()
