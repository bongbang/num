import json

def get_quiz(event, context):

    result = {'message': 'Making {} quiz...'.format(event['pathParameters']['id'])}

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(result)
    }

    return response
