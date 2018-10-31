import json
from modules import omnibus as modules

def make_quiz(event, context):
    n = 5 # TODO parameterize

    try:
        module = getattr(modules, event['pathParameters']['id'])
        message = [module() for i in range(n)]
    except KeyError:
        status_code = 404
        message = 'Module doesn''t exist'

    result = {'message': message}

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(result)
    }

    return response
