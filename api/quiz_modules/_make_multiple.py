def make_multiple(quiz_function, n):
    return [quiz_function() for _ in range(n)]
