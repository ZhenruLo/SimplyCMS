from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import InputRequired


class ContentManagerForm(FlaskForm):
    table_name = StringField(
        'Content Name',
        validators = [InputRequired(), ]
    )
    
    route_name = PasswordField(
        'Route Name',
        validators = [
            InputRequired(),
        ]
    )
    
    submit = SubmitField('Log In')