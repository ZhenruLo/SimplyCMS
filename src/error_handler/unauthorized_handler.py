from flask import current_app, redirect, url_for


def permission_denied(e):
    
    current_app.logger.error(f"403 Permission Denied error")
    return "Permission denied as the session expired, please re-login", 403

def csrf_error(e):
    
    current_app.logger.error(f"400 Token invalid error, Bad Request")
    return "Token invalid as the session expired, please re-login", 400

def refresh_required(e):
    
    current_app.logger.error(f"440 HTTP session expired error")
    return e.description, 440

def unaunthenticated(e):
    
    current_app.logger.error(f"401 Unauthorised error")
    return redirect(url_for("login_bp.login"), 301)

def media_type_not_supported(e):
    
    current_app.logger.error(f"415 Media type not allow error")
    return e.description, 415