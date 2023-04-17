from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import InputRequired, Length


class LoginForm(FlaskForm):
    USERNAME = StringField(
        "Username",
        validators = [InputRequired(), ]
    )
    
    PASSWORD = PasswordField(
        "Password",
        validators = [
            InputRequired(), 
            Length(min=8),
        ]
    )
    
    SUBMIT = SubmitField("Log In")