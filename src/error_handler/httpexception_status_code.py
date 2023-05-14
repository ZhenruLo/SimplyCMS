import werkzeug


class InvalidToken(werkzeug.exceptions.HTTPException):
    code = 507
    description = "Invalid Token"

class ExpiredSession(werkzeug.exceptions.HTTPException):
    code = 440
    description = "Session Expired"