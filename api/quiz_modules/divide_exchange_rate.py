import psycopg2
import random
import module_db_credentials as mdc #TODO move to credentials folder
from ._currency_codes import codes

def main(n):
    base = 'USD' #TODO parameterize
    codes.remove(base)

    try:
        connection = psycopg2.connect(user=mdc.user,
                                      password=mdc.password,
                                      host=mdc.host,
                                      port=mdc.port,
                                      dbname=mdc.database)
        cursor = connection.cursor()
        cursor.execute("SELECT concat(modifier,' ',plural) FROM currency WHERE id=%s;",
                (base,))
        base_plural = cursor.fetchone()[0]

        sample_set = random.sample(codes, n+10) # Extra 10 in case of rejections
        cursor.execute("""
            SELECT id, rate/(SELECT rate FROM currency WHERE id=%s), concat(modifier,' ',plural)
            FROM currency
            WHERE id = ANY(%s);
        """, (base, sample_set))
        records = cursor.fetchall()
        random.shuffle(records) # Otherwise ordered by code
    except psycopg2.Error as error:
        return error.pgcode + ':' + error.diag.message_primary
    finally:
        try:
            cursor.close()
            connection.close()
        except NameError:
            pass

    question_set = [None] * n
    for i in range(n):
        code, rate, plural = records[i]
        #TODO check parity
        #TODO put higher first, make rate > 1
        amount_to_convert = random.randint(11,99) * 10**(random.randint(3,5))
        answer = amount_to_convert/rate
        question_set[i] = ('How many {} can {:,} {} buy at {:,.2f} {} per {}?'.format(
            base_plural, amount_to_convert, plural, rate, code, base), answer)

    return question_set
