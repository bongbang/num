""" Quiz double-digit multiplication """
from random import randint

def main():
    a = randint(11, 99)
    b = randint(11, 99)
    prompt = '{} × {} = ?'.format(a, b)
    answer = a * b

    return prompt, answer
