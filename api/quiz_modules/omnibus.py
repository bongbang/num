from random import randint, random

def add_double_digits():
    """ Add double-digit numbers """
    a = randint(11, 99)
    b = randint(11, 99)
    prompt = '{} + {} = ?'.format(a, b)
    answer = a + b

    return prompt, answer

def multiply_double_digits():
    """ Multiply double-digit numbers """
    a = randint(11, 99)
    b = randint(11, 99)
    prompt = '{} × {} = ?'.format(a, b)
    answer = a * b

    return prompt, answer

def multiply_single_digit_by_double_digit():
    """ Multiply a single-digit number a double number """
    a = randint(2, 9)
    b = randint(12, 99)
    array = [a, b] if random() < 0.5 else [b, a] # shuffle
    prompt = '{} × {} = ?'.format(*array)
    answer = a * b

    return prompt, answer

def convert_f_to_c():
    u""" Convert °F to °C """
    temp_in_f = randint(-20, 120)
    prompt = u'What’s {}°F in °C?'.format(temp_in_f)
    answer = (temp_in_f - 32) * 5/9

    return prompt, answer


# person_count = TimeSpan.query.count() #TODO add filter to make just humans?
# def calculate_age_at_death():
#     """ Calculate age at death """
#     person = TimeSpan.query[randrange(0, person_count)]
#     prompt = u'How old was {} ({}–{}) at time of death?'.format(
#             person.name, person.year_start, person.year_end)
#     answer = person.year_end - person.year_start
#     return prompt, answer

def calculate_gdp_per_capita():
    """ Calculate GDP per capita """
    pass

def divide_large_small():
    """ Divide a large number by a small one """
    pass

# if __name__ == '__main__':
#     from . import db
#     from .models import Skill
#     skills = db.session.query(Skill).all()
#     for skill in skills:
#         print skill.name

