from importlib import import_module
import json

def make_quiz(event, context):
    n = 5 # TODO parameterize
    requested_module = event['pathParameters']['id'] #TODO clean up names
    status_code = 404 #TODO make individual codes for errors?

    try:
        quiz_module = import_module('quiz_modules.' + requested_module)
        quiz_set = quiz_module.main(n)
        message = [{'question': item[0], 'answer': item[1]} for item in quiz_set]
        status_code = 200
    except ModuleNotFoundError as e:
        message = 'Problem loading "{}" or its dependencies.\n'.format(requested_module) \
                + getattr(e, 'message', repr(e))
                #TODO separate handling for non-existing quiz module vs dependency
    except KeyError:
        message = quiz_set
    except Exception as e:
        message = getattr(e, 'message', repr(e))


    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*', #TODO Make secure
            # 'Access-Control-Allow-Credentials': True
            },
        'body': json.dumps(message) #Needs JSON, otherwise http request fails
    }

    return response
