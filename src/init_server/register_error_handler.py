from flask import current_app
from flask_wtf.csrf import CSRFError

from error_handler.httpexception_status_code import ExpiredSession
from error_handler.unauthorized_handler import (csrf_error,
                                                media_type_not_supported,
                                                permission_denied,
                                                refresh_required,
                                                unaunthenticated)


def register_error_handler():
    #self-defined status code (that defined by W3C but not registered in flask yet)
    current_app.register_error_handler(ExpiredSession, refresh_required)
    current_app.register_error_handler(CSRFError, csrf_error)
    
    #flask-registered status code
    current_app.register_error_handler(415, media_type_not_supported)
    current_app.register_error_handler(403, permission_denied)
    current_app.register_error_handler(401, unaunthenticated)