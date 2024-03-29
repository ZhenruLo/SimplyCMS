import math
import random
import string
from typing import TYPE_CHECKING, Dict, List, Union

from celery import shared_task
from flask import abort, current_app, escape, request
from flask_socketio import SocketIO
from sqlalchemy.sql import and_

from async_station import socketio
from constants import ColumnType
from data_class import ColumnDetails
from models import (ColumnInfo, Content, create_table, db,
                    delete_table_content, migrate_database, remove_table,
                    update_table_content, upgrade_database)

from .content_manager_form import (BaseColumnForm, BooleanFieldForm,
                                   ContentManagerForm, DatetimeFieldForm,
                                   IntegerFieldForm, JSONFieldForm,
                                   MediaFieldForm, NumberFieldForm,
                                   TextFieldForm, UpdateContentForm)

URLS = {
    'content-tab': '/content-manager',
    'content-type-tab': '/content-manager/content-type',
    'information-tab': '/content-manager/information',
    'history-tab': '/content-manager/history',
}


@socketio.on('connection', namespace='/database-content')
def test(message):
    current_app.logger.info(message['connection_confirmation'])


def fetch_state():
    result = False
    msg = 'Fail to fetch page state'

    current_query = [[k, v] for k, v in request.args.items()]
    current_tab = escape(request.args.get('path_name'))

    if current_tab:
        if current_tab in URLS.values():
            current_tab = __get_key_from_value(URLS, current_tab)
        else:
            current_tab = ''

        result = True
        msg = 'Page state fetched'

    json_data = {
        'result': result,
        'current_tab': current_tab,
        'current_query': current_query,
        'msg': msg,
    }

    return json_data


def fetch_urls():
    json_data = {
        'result': True,
        'urls': URLS,
        'msg': 'Page url fetched'
    }

    return json_data


def reroute_page(path):
    path = escape(path)
    query = [[escape(k), escape(v)] for k, v in request.args.items()]

    if path == '' or path == 'content':
        title = 'Content Manager - Content Menu'
        content = 'content-tab'
    elif path == 'content-type':
        title = 'Content Manager - Content type'
        content = 'content-type-tab'
    elif path == 'information':
        title = 'Content Manager - Info'
        content = 'information-tab'
    elif path == 'history':
        title = 'Content Manager - History'
        content = 'history-tab'
    else:
        abort(404)

    json_data = {
        'url': request.path,
        'title': title,
        'content': content,
        'query': query,
    }

    return json_data


def count_table_info() -> Dict[str, Union[bool, str]]:
    result = False
    msg = 'Fail to count content table info'
    max_page = 0

    count = db.session.query(Content).count()

    if count is not None:
        max_page = math.ceil(count/20)
        result = True
        msg = 'Table count load success'

    json_data = {
        'result': result,
        'msg': msg,
        'data': count,
        'max_page': max_page,
    }

    return json_data


def fetch_table_title() -> Dict[str, Union[bool, str]]:
    result = False
    msg = 'Fail to fetch content table title'
    dict_list = None

    page = int(escape(request.values.get('page')))

    if page > 0:
        offset = (page - 1) * 20
        all_data = db.session.query(
            Content.content_uuid, Content.content_name).offset(offset).limit(20)
        dict_list = [data._asdict() for data in all_data]

        if dict_list is not None:
            result = True
            msg = 'Table data load success'

    elif page == 0:
        result = True
        msg = 'Table data load success'
        dict_list = []

    else:
        msg = 'Invalid page value'

    json_data = {
        'result': result,
        'msg': msg,
        'data': dict_list,
    }

    return json_data


def fetch_table_data() -> Dict[str, Union[bool, str]]:
    result = False
    msg = 'Fail to fetch content table data'
    dict_list = None

    all_data = db.session.query(Content.content_uuid, Content.content_name,
                                Content.route_name, Content.description, Content.created_timestamp).all()
    dict_list = [data._asdict() for data in all_data]

    if dict_list is not None:
        result = True
        msg = 'Table data load success'

    json_data = {
        'result': result,
        'msg': msg,
        'data': dict_list,
    }

    return json_data


def process_database_content() -> Dict[str, Union[bool, str, List[str]]]:
    result = False

    if request.method == 'GET':
        msg = 'Fetch database failed.'
        fields = []

        content_uuid = escape(request.args.get('content_uuid'))
        selected_table: 'Content' = Content.fetch_one_filter(
            Content.content_uuid, content_uuid, Content)

        if selected_table:
            orm_fields = selected_table.content_fields
            fields = [{
                ColumnInfo.column_name.key: orm_field.column_name,
                ColumnInfo.column_type.key: orm_field.column_type,
                ColumnInfo.column_uuid.key: orm_field.column_uuid,
            } for orm_field in orm_fields if orm_field.removed == False]

            result = True
            msg = 'Database fetched'

        json_data = {
            'result': result,
            'msg': msg,
            'fields': fields,
        }

    if request.method == 'POST':
        msg = 'Update database failed'

        raw_column_type = request.form.get('column_type')
        if raw_column_type == ColumnType.TEXT:
            form: 'TextFieldForm' = TextFieldForm()
        elif raw_column_type == ColumnType.NUMBER:
            form: 'NumberFieldForm' = NumberFieldForm()
        elif raw_column_type == ColumnType.INTEGER:
            form: 'IntegerFieldForm' = IntegerFieldForm()
        elif raw_column_type == ColumnType.DATETIME:
            form: 'DatetimeFieldForm' = DatetimeFieldForm()
        elif raw_column_type == ColumnType.BOOLEAN:
            form: 'BooleanFieldForm' = BooleanFieldForm()
        elif raw_column_type == ColumnType.JSON:
            form: 'JSONFieldForm' = JSONFieldForm()
        elif raw_column_type == ColumnType.MEDIA:
            form: 'MediaFieldForm' = MediaFieldForm()
        else:
            form: 'BaseColumnForm' = BaseColumnForm()

        if form.validate_on_submit():
            content_uuid = escape(form.content_uuid.data)
            content_row: 'Content' = Content.fetch_one_filter(
                Content.content_uuid, content_uuid, Content)

            column_name = escape(form.column_name.data)
            if __check_column_name(column_name, content_row.content_fields):
                msg = 'Duplicate column name, please choose another column name'
            elif __column_name_is_digits(column_name):
                msg = 'Column display name cannot be formed by just digits/start with a digit.'
            else:
                column_type = escape(form.column_type.data)
                column_default = escape(form.column_default.data)
                column_unique = escape(form.column_unique.data)
                column_nullable = escape(form.column_nullable.data)
                column_private = escape(form.column_private.data)

                column_inst = ColumnDetails(column_type, column_name,
                                            column_default, column_unique, column_nullable, column_private)

                new_column = ColumnInfo(column_inst.column_name, column_inst.column_type, column_inst.column_unique,
                                        column_inst.column_nullable, column_inst.column_private, column_inst.column_default)
                content_row.content_fields.append(new_column)

                update_table_content(content_row.table_name, column_inst)

                if content_row:
                    Content.update(Content.content_uuid, content_uuid, {
                                   Content.update_required: True}, Content)
                db.session.commit()

                result = True
                msg = 'Databases updated'

        json_data = {
            'result': result,
            'msg': msg,
            'content_uuid': content_uuid,
        }

    elif request.method == 'DELETE':
        msg = 'Delete database content failed'

        data = request.get_json()
        column_uuid = escape(data.get('column_uuid'))
        column_info: 'ColumnInfo' = db.session.query(ColumnInfo).filter(
            ColumnInfo.column_uuid == column_uuid).first()
        content: 'Content' = db.session.query(Content).filter(
            Content.id == column_info.content_id).first()

        if column_info and content:
            delete_table_content(content.table_name, column_info.column_name)
            Content.update(Content.content_uuid, content.content_uuid, {
                            Content.update_required: True}, Content)
            ColumnInfo.update(ColumnInfo.column_uuid, column_uuid, {
                              ColumnInfo.update_required: True, ColumnInfo.removed: True}, ColumnInfo)
            result = True
            msg = 'Database content deleted'
            
        json_data = {
            'result': result,
            'msg': msg,
            'content_uuid': content.content_uuid,
        }
    return json_data


def process_database() -> Dict[str, Union[bool, str, List[str]]]:
    result = False

    if request.method == 'GET':
        msg = 'Fetch database info failed.'
        database = None

        selected_content_uuid = escape(request.args.get('content_uuid'))

        database_row = Content.fetch_one_filter(Content.content_uuid, selected_content_uuid,
                                                Content.content_uuid, Content.content_name, Content.route_name, Content.description, Content.update_required)
        if database_row:
            database = database_row._asdict()
            result = True

        msg = 'Database info fetched'

        json_data = {
            'result': result,
            'msg': msg,
            'database': database,
        }

    if request.method == 'POST':
        msg = 'Create database failed.'
        content_uuid = None
        form: 'ContentManagerForm' = ContentManagerForm()

        if form.validate_on_submit():
            content_name = escape(form.content_name.data)
            route_name = escape(form.route_name.data)
            description = escape(form.description.data)

            check_route_result = __check_special_char(route_name, True)

            if not check_route_result:
                table_count = db.session.query(Content).filter(
                    Content.content_name == content_name).count()
                route_count = db.session.query(Content).filter(
                    Content.route_name == route_name).count()

                if (table_count == 0 and route_count == 0):
                    table_name = __create_table_name()

                    Content.add(content_name=content_name, table_name=table_name,
                                route_name=route_name, description=description)
                    create_table(table_name)

                    content_uuid = db.session.query(Content.content_uuid).filter(
                        Content.content_name == content_name).scalar()
                    result = True
                    msg = 'Databases created'
                else:
                    msg = 'Duplicate display name, please enter another value.' if route_count == 0 else 'Duplicate route name, please enter another value.'
            else:
                msg = 'Database contain special characters'

        json_data = {
            'result': result,
            'msg': msg,
            'content_uuid': content_uuid,
        }

    elif request.method == 'PUT':
        msg = 'Update database failed.'

        form: 'UpdateContentForm' = UpdateContentForm()

        if form.validate_on_submit():
            content_uuid = escape(form.content_uuid.data)
            content_name = escape(form.content_name.data)
            route_name = escape(form.route_name.data)
            description = escape(form.description.data)

            selected_table_query = db.session.query(Content).filter(
                Content.content_uuid == content_uuid)
            if selected_table_query.first():
                selected_table_query.update({
                    Content.content_name: content_name,
                    Content.route_name: route_name,
                    Content.description: description,
                })
                db.session.commit()
                result = True
                msg = 'Database updated'
        else:
            msg = 'Form validation failed'

        json_data = {
            'result': result,
            'msg': msg,
            'content_uuid': content_uuid,
        }

    elif request.method == 'DELETE':
        msg = 'Delete database failed'

        content_uuid = escape(request.get_json().get('content_uuid'))
        content: 'Content' = db.session.query(Content).filter(
            Content.content_uuid == content_uuid).first()
        if content:
            remove_table(content.table_name)
            Content.delete(content)

            msg = 'Database deleted'
            result = True

        json_data = {
            'result': result,
            'msg': msg,
        }

    return json_data


def save_database_status() -> Dict[str, Union[bool, str]]:
    result = False
    msg = 'Update failed'

    if request.method == 'POST':
        data = request.get_json()
        content_uuid = escape(data.get('content_uuid'))

        content: 'Content' = db.session.query(Content).filter(
            Content.content_uuid == content_uuid).first()
        if content.pending:
            msg = 'Updating database, please wait.'
        elif content and content.update_required:
            Content.update(Content.content_uuid, content_uuid, {
                Content.pending: True}, Content)
            db.session.query(ColumnInfo).filter(ColumnInfo.content_id == content.id).update({
                ColumnInfo.pending: True,
            })
            db.session.commit()
            migrate_database()
            # ----------------------------------------------------------------------------change this----------------------------------------------------------------------------
            # upgrade_database(content.table_name)
            # db.session.query(ColumnInfo).filter(and_(ColumnInfo.content_id == content.id,
            #                                         ColumnInfo.update_required == True)).update({ColumnInfo.update_required: False})
            # db.session.query(Content).filter(Content.content_uuid == content_uuid).update(
            #     {Content.update_required: False})
            # db.session.commit()

            # result = True
            # msg = 'Databases updated'
            # ----------------------------------------------------------------------------change this----------------------------------------------------------------------------
            task = migrate_database_task.apply_async(
                args=[content_uuid, ])
            if task is not None:
                result = True
                msg = 'Updating the database content.'
        else:
            msg = 'Database is already up to date'

    json_data = {
        'result': result,
        'msg': msg
    }

    return json_data


@shared_task(name="database_content")
def migrate_database_task(content_uuid: str):
    result = False
    local_socketio = SocketIO(
        logger=True, engineio_logger=True, message_queue='redis://localhost:6379/0')

    content: 'Content' = Content.fetch_one_filter(
        Content.content_uuid, content_uuid, Content)
    try:
        upgrade_database(content.table_name)
        result = True
    except Exception as err:
        current_app.logger.error(err)

    db.session.query(ColumnInfo).filter(and_(ColumnInfo.content_id == content.id,
                                             ColumnInfo.update_required == True)).update({
                                                 ColumnInfo.update_required: False,
                                                 ColumnInfo.pending: False,
                                             })
    db.session.query(Content).filter(Content.content_uuid == content.content_uuid).update(
        {Content.update_required: False})
    db.session.commit()

    db.session.query(ColumnInfo).filter(ColumnInfo.removed ==
                                        True).delete(synchronize_session='fetch')
    db.session.commit()

    Content.update(Content.content_uuid, content_uuid, {
        Content.pending: False}, Content)
    msg = 'Databases updated'
    current_app.logger.info(
        f'Celery task: Update database content successful with msg: {msg}')
    local_socketio.emit('response', {
                        'msg': msg, 'result': result}, namespace='/database-content')


def __delete_column_process(column_uuid: 'ColumnInfo'):
    column = ColumnInfo.fetch_one_filter(
        ColumnInfo.column_uuid, column_uuid, Content)
    ColumnInfo.delete(column)


def __create_table_name() -> str:
    table_uid = __generate_uid()

    all_table_name = Content.fetch_all(Content.table_name)
    if table_uid in all_table_name:
        __create_table_name()
    else:
        return table_uid


def __check_column_name(column_name: str, content_columns: List['Content']) -> bool:
    for column in content_columns:
        if column_name == column.column_name:
            return True
    return False


def __column_name_is_digits(column_name: str) -> bool:
    if isinstance(column_name, int):
        return True
    else:
        try:
            int(column_name)
        except ValueError:
            return False
    return True


def __generate_uid() -> str:
    random_letters = ''.join(random.choice(
        string.ascii_lowercase) for _ in range(3))
    random_numbers = random.randint(100, 999)
    table_uid = random_letters + str(random_numbers)
    return table_uid


def __check_special_char(string: str, allow_hyphen: bool = False) -> bool:
    if allow_hyphen:
        special_characters = '''!@#$%^&*''()+?=/,<>'''
    else:
        special_characters = '''!@#$%^&*''()-+?=/,<>'''
    if any(char in special_characters for char in string):
        return True
    return False


def __get_key_from_value(dictionary, value):
    keys = [k for k, v in dictionary.items() if v == value]
    if keys:
        return keys[0]
    return None
