from typing import TYPE_CHECKING

from flask_migrate import migrate, stamp, upgrade
from sqlalchemy import Column, Integer, Table

from constants import Directory
from migrate_engine import migrate_app

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

    Table(tablename,
          db.metadata,
          extend_existing=True,
          ).append_column(column)


def delete_table_content(tablename: str, column_details: 'ColumnDetails'):
    column = column_details.sqlalchemy_column

    Table(tablename, 
          db.metadata,
         )._columns.remove(column)


def migrate_database():
    migrate(Directory.GLOBAL_MIGRATE_DIR.as_posix())


def upgrade_database(tablename: str):
    upgrade(Directory.GLOBAL_MIGRATE_DIR.as_posix())


def get_all_tables_information():
    tables = db.metadata.tables
    return tables
