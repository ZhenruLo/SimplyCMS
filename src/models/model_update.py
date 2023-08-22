from typing import TYPE_CHECKING

from constants import Directory
from flask_migrate import migrate, upgrade
from sqlalchemy import Column, Integer, Table

from .base_db_model import db

if TYPE_CHECKING:
    from data_class import ColumnDetails

def create_table(tablename: str) -> bool:
    created_table = Table(tablename, 
          db.metadata,
          Column('id', Integer, primary_key=True),
          )
    created_table.create(bind=db.engine)

def remove_table(tablename: str):
    selected_table = db.metadata.tables.get(tablename)
    if selected_table is not None:
        db.metadata.remove(selected_table)
        selected_table.drop(db.engine)

def update_table_content(tablename: str, column_details: 'ColumnDetails'):
    column = column_details.sqlalchemy_column
    print("Column yes")
    test = Table(tablename, 
          db.metadata,
          column,
          extend_existing=True,
          )
    print("Define table")
    print(test)
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    print("migrate table")
    print(test)
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())
    print("update table")

def get_all_tables_information():
    tables = db.metadata.tables
    return tables