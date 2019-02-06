import json
from importlib import import_module
# from modules import omnibus as modules # Works w/o "." b/c directory treated as module?

def make_quiz(event, context):
    n = 5 # TODO parameterize

    try:
        module = import_module('modules.' + event['pathParameters']['id'])
        # module = getattr(modules, event['pathParameters']['id'])
        status_code = 200
        temp_list = list(zip(*[module.main() for i in range(n)]))
        message = {'questions': temp_list[0], 'answers': temp_list[1]}
    except KeyError:
        status_code = 404
        message = 'Module doesn''t exist'

    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*', #TODO Make secure
            # 'Access-Control-Allow-Credentials': True
            },
        'body': json.dumps(message)
    }

    return response
