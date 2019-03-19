import pytest
from mocks.cloudwatch import MockCloudWatch
import make_quiz


mock_cloudwatch = MockCloudWatch()
make_quiz.cloud_watch = mock_cloudwatch

def test_metric_increments_per_quizname():
    make_quiz.make_quiz(
        {'pathParameters': {'id': 'multiply_double_digits'}},
        None
    )
    assert mock_cloudwatch.metric_values['QuizzesRequested'][
        'multiply_double_digits'
    ] == 1

def test_metric_increments_error_value_on_invalid_name():
    make_quiz.make_quiz(
        {'pathParameters': {'id': ' quiz_does_not_exist'}},
        None
    )
    assert mock_cloudwatch.metric_values['QuizzesRequested'][
        make_quiz.QUIZ_NOT_FOUND_METRIC_VALUE
    ] == 1
