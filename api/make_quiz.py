import json
from modules import omnibus as modules

def make_quiz(event, context):
    n = 5 # TODO parameterize

    try:
        module = getattr(modules, event['pathParameters']['id'])
        status_code = 200
        temp_list = list(zip(*[module() for i in range(n)]))
        message = {'questions': temp_list[0], 'answers': temp_list[1]}
    except KeyError:
        status_code = 404
        message = 'Module doesn''t exist'

    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            # 'Access-Control-Allow-Credentials': True
            },
        'body': json.dumps(message)
    }

    return response
