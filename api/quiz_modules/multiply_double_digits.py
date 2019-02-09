""" Quiz double-digit multiplication """
from random import randint
from ._make_multiple import make_multiple

def multiply_double_digits():
    a = randint(11, 99)
    b = randint(11, 99)
    prompt = '{} × {} = ?'.format(a, b)
    answer = a * b

    return prompt, answer

def main(n):
    return make_multiple(multiply_double_digits, n)
