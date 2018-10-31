import json
from modules import omnibus as modules

def make_quiz(event, context):
    n = 5 # TODO parameterize

    try:
        module = getattr(modules, event['pathParameters']['id'])
        status_code = 200
        message = [module() for i in range(n)]
    except KeyError:
        status_code = 404
        message = 'Module doesn''t exist'

    response = {
        'statusCode': status_code,
        'body': json.dumps({'message': message})
    }

    return response
