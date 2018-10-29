import { success, failure } from './libs/response';

export default function makeQuiz(event, context, callback) {
  const moduleId = event.pathParameters.id;
  if (false) {
    callback(null, success({ message: 'Hello, World' }));
  } else {
    callback(null, failure({ status: false, error: 'Item not found.' }));
  }
}
