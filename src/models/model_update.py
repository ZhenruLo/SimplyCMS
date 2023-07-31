from constants import ColumnType, Directory
from flask_migrate import migrate, upgrade
from sqlalchemy import Boolean, Column, Integer, Numeric, String, Table, Text

from .base_db_model import db


def create_table(tablename: str) -> bool:
    Table(tablename, 
          db.metadata,
          Column('id', Integer, primary_key=True),
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def remove_table(tablename: str):
    selected_table = db.metadata.tables.get(tablename)
    if selected_table is not None:
        selected_table.drop(db.engine)
        __refresh_metadata()

def update_table_content(tablename: str, column_name: str, column_type: str):
    if column_type == ColumnType.NUMERIC:
        column_attr = Numeric
    elif column_type == ColumnType.STRING:
        column_attr = String(255)
    elif column_type == ColumnType.TEXT:
        column_attr = Text
    elif column_type == ColumnType.BOOLEAN:
        column_attr = Boolean
        
    Table(tablename, 
          db.metadata, 
          Column(column_name, column_attr),
          extend_existing=True,
          )
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())

def get_all_tables_information():
    tables = db.metadata.tables
    return tables

def __refresh_metadata():
    db.metadata.clear()
    db.metadata.reflect(db.engine)