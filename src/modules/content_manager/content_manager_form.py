from flask_wtf import FlaskForm
from wtforms import (BooleanField, DateTimeLocalField, FileField, FloatField,
                     IntegerField, PasswordField, StringField, SubmitField)
from wtforms.validators import InputRequired, Length, Optional

from constants import ColumnType


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
    
    column_name = StringField(
        'Display Name',
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
            Optional(),
        ]
    )
    
    column_nullable = BooleanField(
        'Required',
        validators = [
            Optional(),
        ]
    )
    
    column_private = BooleanField(
        'Private',
        validators = [
            Optional(),
        ]
    )

class TextFieldForm(BaseColumnForm):
    column_default = StringField(
        'Column Default',
        validators = [
            Optional(),
        ]
    )

class IntegerFieldForm(BaseColumnForm):
    column_default = IntegerField(
        'Column Default',
        validators = [
            Optional(),
        ]
    )

class BooleanFieldForm(BaseColumnForm):
    column_default = BooleanField(
        'Column Default',
        validators = [
            Optional(),
        ]
    )

class DatetimeFieldForm(BaseColumnForm):
    column_default = DateTimeLocalField(
        'Column Default',
        validators = [
            Optional(),
        ],
        format='%Y-%m-%dT%H:%M',
    )

class NumberFieldForm(BaseColumnForm):
    column_default = FloatField(
        'Column Default',
        validators = [
            Optional(),
        ]
    )

class MediaFieldForm(BaseColumnForm):
    column_default = FileField(
        'Column Default',
        validators = [
            Optional(),
        ]
    )

class JSONFieldForm(BaseColumnForm):
    column_default = StringField(
        'Column Default',
        validators = [
            Optional(),
        ]
    )