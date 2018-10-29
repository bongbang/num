import { success, failure } from './libs/response';

export default function(event, context, callback) {
  if (false) {
    callback(null, success({ message: 'Hello, World' }));
  } else {
    callback(null, failure({ status: false, error: 'Item not found.' }));
  }
}
