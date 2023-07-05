from sqlalchemy import func

from .base_db_model import Base, db


class ColumnInfo(Base, db.Model):
    __tablename__ = 'column_info'

    id = db.Column(db.Integer, primary_key = True)
    column_name = db.Column(db.Text)
    column_type = db.Column(db.Text)
    column_unique = db.Column(db.Boolean)
    column_nullable = db.Column(db.Boolean)
    column_default = db.Column(db.Text)
    column_order = db.Column(db.Integer)
    column_uuid = db.Column(db.Text, server_default=func.random(), unique=True)
    created_timestamp = db.Column(db.DateTime, server_default=func.current_timestamp())
    
    def __init__(self, column_name: str, column_type: str, column_unique: bool, column_nullable: bool, column_default: str, column_order: int):
        self.column_name = column_name
        self.column_type = column_type
        self.column_unique = column_unique
        self.column_nullable = column_nullable
        self.column_default = column_default
        self.column_order = column_order