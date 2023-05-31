from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField, BooleanField
from wtforms.validators import InputRequired, Optional


class LoginForm(FlaskForm):
    username = StringField(
        'Username',
        validators = [InputRequired(), ]
    )
    
    password = PasswordField(
        'Password',
        validators = [
            InputRequired(),
        ]
    )
    
    remember = BooleanField(
        'Remember',
        validators = [
            Optional(),
        ]
    )
    
    submit = SubmitField('Log In')