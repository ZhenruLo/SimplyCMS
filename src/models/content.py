from typing import Dict, Union

from sqlalchemy import func

from .base_db_model import Base, db


class Content(Base, db.Model):
    __tablename__ = 'content'

    id = db.Column(db.Integer, primary_key = True)
    table_name = db.Column(db.Text)
    route_name = db.Column(db.Text, unique=True)
    description = db.Column(db.Text)
    column_attrs = db.Column(db.JSON)
    content_uuid = db.Column(db.Text, server_default=func.random(), unique=True)
    created_timestamp = db.Column(db.DateTime, server_default=func.current_timestamp())
    
    def __init__(self, table_name: 'str', route_name: 'str', description: 'str', column_attrs: Union[Dict[str, Dict[str, bool]], None]=None):
        self.table_name = table_name
        self.route_name = route_name
        self.description = description
        self.column_attrs = column_attrs