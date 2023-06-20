from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import InputRequired, Length


class ContentManagerForm(FlaskForm):
    content_name = StringField(
        'Content Name',
        validators = [InputRequired(), ]
    )
    
    route_name = PasswordField(
        'Route Name',
        validators = [
            InputRequired(),
        ]
    )

    description = StringField(
        'Description',
        validators = [InputRequired(), 
                      Length(max=500),
                      ]
    )
    
    submit = SubmitField('Log In')