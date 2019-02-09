import json
from importlib import import_module
# from modules import omnibus as modules # Works w/o "." b/c directory treated as module?

def make_quiz(event, context):
    n = 5 # TODO parameterize

    try:
        quiz_module = import_module('quiz_modules.' + event['pathParameters']['id'])
        status_code = 200
        message = [{'question': item[0], 'answer': item[1]} for item in quiz_module.main(n)]

    except KeyError:
        status_code = 404
        message = 'Module doesn''t exist'

        # print(message)
    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*', #TODO Make secure
            # 'Access-Control-Allow-Credentials': True
            },
        'body': json.dumps(message)
    }

    return response
