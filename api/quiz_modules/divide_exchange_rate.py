import psycopg2
from . import module_db_credentials as mdc

def main():
    try:
        connection = psycopg2.connect(user = mdc.user,
                                      password = mdc.password,
                                      host = mdc.host,
                                      port = mdc.port,
                                      database = mdc.database)
        cursor = connection.cursor()
        # Print PostgreSQL Connection properties
        # print ( connection.get_dsn_parameters(),"\n")
        # Print PostgreSQL version
        cursor.execute("SELECT version();")
        record = cursor.fetchone()
        x = 'OK'
    except (Exception, psycopg2.Error) as error :
        x = 'error'
    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        return x
