import math
import random
import string
from typing import TYPE_CHECKING, Dict, List, Union

from flask import request
from werkzeug.utils import secure_filename

from constants import RequestMethod
from models import (Content, create_table, db, remove_table,
                    update_table_content)

from .content_manager_form import ContentManagerForm

if TYPE_CHECKING:
    from flask_wtf import FlaskForm

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

    try: 
        offset = (int(request.values['page']) - 1) * 20
        all_data = db.session.query(Content.content_uuid, Content.content_name).offset(offset).limit(20)
        dict_list = [data._asdict() for data in all_data]
        
        if dict_list is not None:
            result = True
            msg = 'Table data load success'
            
    except Exception as err:
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

    all_data = db.session.query(Content.content_uuid, Content.content_name, Content.route_name, Content.description, Content.created_timestamp).all()
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
    
    if request.method == RequestMethod.GET:
        msg = 'Fetch database info failed.'
        database = None
        
        selected_content_uuid = request.args.get('content_uuid') 
        
        database_row = Content.fetch_one_filter(Content.content_uuid, selected_content_uuid, Content.content_uuid, Content.content_name, Content.route_name, Content.description, Content.column_attrs)
        if database_row:
            database = database_row._asdict()
            result = True
            
        msg = 'Database info fetched'

        json_data = {
            'result': result,
            'msg': msg,
            'database': database,
        }

    elif request.method == RequestMethod.PUT:
        msg = 'Update database failed.'
        
        content_uuid = request.form.get('content_uuid')
        content_name = request.form.get('content_name')
        route_name = secure_filename(request.form.get('route_name'))
        description = request.form.get('description')

        selected_table_query = db.session.query(Content).filter(Content.content_uuid == content_uuid)
        if selected_table_query.first():
            selected_table_query.update({Content.content_name: content_name, 
                                        Content.route_name: route_name,
                                        Content.description: description,
                                        })
            db.session.commit()
            result = True
            msg = 'Database updated'

        json_data = {
            'result': result,
            'msg': msg,
            'content_uuid': content_uuid,
        }

    return json_data
        
def process_database() -> Dict[str, Union[bool, str, List[str]]]:
    result = False

    if request.method == RequestMethod.GET:
        pass

    elif request.method == RequestMethod.POST:
        msg = 'Create database failed.'
        content_uuid = None
        form: 'FlaskForm' = ContentManagerForm()
        
        if form.validate_on_submit():
            content_name = request.form.get('content_name')
            route_name = secure_filename(request.form.get('route_name'))
            description = request.form.get('description')
            
            check_table_result = __check_special_char(content_name)
            check_route_result = __check_special_char(route_name) 

            if not check_route_result and not check_table_result:
                table_count = db.session.query(Content).filter(Content.content_name==content_name).count()
                route_count = db.session.query(Content).filter(Content.route_name==route_name).count()
                
                if (table_count == 0 and route_count == 0):
                    table_name = __create_table_name()

                    Content.add(content_name=content_name, table_name=table_name, route_name=route_name, description=description)
                    create_table(table_name)

                    content_uuid = db.session.query(Content.content_uuid).filter(Content.content_name==content_name).scalar()
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

    elif request.method == RequestMethod.PUT:
        msg = 'Update database failed'

        content_uuid = request.get_json().get('content_uuid')
        content_row: 'Content' = Content.fetch_one_filter(Content.content_uuid, content_uuid, Content.table_name, Content.column_attrs)

        update_table_content(content_row.table_name, 'test_column_name', 'int_name')
        # for (key, value) in request.form.items():
        #     update_table_content('agp120', value, key)
        
        result = True
        msg = 'Databases updated'

        json_data = {
            'result': result,
            'msg': msg,
        }

    elif request.method == RequestMethod.DELETE:
        msg = 'Delete database failed'
        
        content_uuid = request.get_json().get('content_uuid')
        content: 'Content' = db.session.query(Content).filter(Content.content_uuid == content_uuid).first()
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

def __create_table_name() -> str:
    table_uid = __generate_uid()
    
    all_table_name = Content.fetch_all(Content.table_name)
    if table_uid in all_table_name:
        __create_table_name()
    else:
        return table_uid

def __generate_uid() -> str:
    random_letters = ''.join(random.choice(string.ascii_lowercase) for _ in range(3))
    random_numbers = random.randint(100, 999)
    table_uid = random_letters + str(random_numbers)
    return table_uid

def __check_special_char(string: str) -> bool:
    special_characters = '''!@#$%^&*''()-+?=/,<>'''
    for char in string:
        if char in special_characters:
            print('yes')
    if any(char in special_characters for char in string):
        return True
    return False