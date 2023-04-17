from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import InputRequired


class LoginForm(FlaskForm):
    USERNAME = StringField(
        "Username",
        validators = [InputRequired(), ]
    )
    
    PASSWORD = PasswordField(
        "Password",
        validators = [
            InputRequired(),
        ]
    )
    
    SUBMIT = SubmitField("Log In")