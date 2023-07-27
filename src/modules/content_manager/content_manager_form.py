from flask_wtf import FlaskForm
from wtforms import BooleanField, PasswordField, StringField, SubmitField, IntegerField
from wtforms.validators import InputRequired, Length


class ContentManagerForm(FlaskForm):
    content_name = StringField(
        'Display Name',
        validators = [
            InputRequired(), 
        ]
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

class UpdateContentForm(ContentManagerForm):
    content_uuid = StringField(
        'Content UUID',
        validators = [
            InputRequired(),
        ]
    )
    
class BaseColumnForm(FlaskForm):
    content_uuid = StringField(
        'Content UUID',
        validators = [
            InputRequired(),
        ]
    )
    
    column_type = StringField(
        'Column Type',
        validators = [
            InputRequired(), 
        ]
    )
    
    column_unique = BooleanField(
        'Unique',
        validators = [
            InputRequired(), 
        ]
    )
    
    column_nullable = BooleanField(
        'Required',
        validators = [
            InputRequired(), 
        ]
    )
    
    column_private = BooleanField(
        'Private',
        validators = [
            InputRequired(), 
        ]
    )
    
    column_order = IntegerField(
        'Order',
        validators = [
            InputRequired(), 
        ]
    )
    
class TextColumnForm(BaseColumnForm):
    column_name = StringField(
        'Display Name',
        validators = [
            InputRequired(), 
        ]
    )