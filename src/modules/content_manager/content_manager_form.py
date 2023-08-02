from constants import ColumnType
from flask_wtf import FlaskForm
from wtforms import (BooleanField, DateTimeLocalField, FileField, FloatField,
                     IntegerField, PasswordField, StringField, SubmitField)
from wtforms.validators import InputRequired, Length, Optional


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
    
    column_default = StringField(
        'Column Default',
        validators= [
            Optional(),
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
    
    def __init__(self, column_type):
        super().__init__()
        if column_type == ColumnType.BOOLEAN:
            self.column_default = BooleanField(
                'Column Default',
                validators = [
                    InputRequired(),
                ]
            )
        elif column_type == ColumnType.DATE:
            self.column_default = DateTimeLocalField(
                'Column Default',
                validators = [
                    InputRequired(),
                ]
            )
        elif column_type == ColumnType.INTEGER:
            self.column_default = IntegerField(
                'Column Default',
                validators = [
                    InputRequired(),
                ]
            )
        elif column_type == ColumnType.NUMBER:
            self.column_default = FloatField(
                'Column Default',
                validators = [
                    InputRequired(),
                ]
            )
        elif column_type == ColumnType.MEDIA:
            self.column_default = FileField(
                'Column Default',
                validators = [
                    InputRequired(),
                ]
            )