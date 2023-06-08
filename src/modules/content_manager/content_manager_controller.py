import math
from typing import Dict, List, Union

from flask import request
from models import (Content, create_table, db, get_tables_information,
                    update_table_content)


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

def fetch_table_info() -> Dict[str, Union[bool, str]]:
    result = False
    msg = 'Fail to fetch content table info'
    dict_list = None

    try: 
        offset = (int(request.values['page']) - 1) * 20
        all_data = db.session.query(Content.content_uuid, Content.table_name).offset(offset).limit(20)
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

    all_data = db.session.query(Content.content_uuid, Content.id, Content.table_name, Content.route_name, Content.created_timestamp).all()
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

def process_database() -> Dict[str, Union[bool, str, List[str]]]:
    result = False

    if request.method == 'GET':
        msg = 'Fetch databases failed.'
        databases = None
        
        databases = get_tables_information()

        result = True
        msg = 'Databases fetched'

        json_data = {
            'result': result,
            'msg': msg,
            'databases': list(databases.keys()),
        }

    elif request.method == 'POST':
        msg = 'Create database failed.'

        table_name = request.form.get('content_name')
        check_result = __check_special_char(table_name)
        if not check_result:
            create_table(table_name)

            result = True
            msg = 'Databases created'
        else:
            msg = 'Database contain special characters'
            
        json_data = {
            'result': result,
            'msg': msg,
        }

    elif request.method == 'PUT':
        msg = 'Update database failed'

        for column in request.form:
            update_table_content('test', column)
        
        result = True
        msg = 'Databases updated'

        json_data = {
            'result': result,
            'msg': msg,
        }

    return json_data

def __check_special_char(string: str) -> bool:
    special_characters = '''!@#$%^&*''()-+?=/,<>'''
    for char in string:
        if char in special_characters:
            print('yes')
    if any(char in special_characters for char in string):
        return True
    return False