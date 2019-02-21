import psycopg2
import requests
# TODO: this is a hack, figure out how to do this better
try:
	import credentials
except ImportError:
	from . import credentials


API_ENDPOINT = "http://data.fixer.io/api/latest?access_key={api_key}&base=EUR"

def retrieve_exchange_rates():
	formatted_endpoint = API_ENDPOINT.format(
		api_key=credentials.EXCHANGE_RATE_API["api_key"]
	)
	response = requests.get(formatted_endpoint)

	if response.status_code != 200:
		raise Exception("Unable to connect to the Exchange Rate API!")

	response_content = response.json()
	if not response_content["success"]:
		raise Exception(
			"API encountered an error: {}".format(
				response_content["error"]["info"]
			)
		)

	if response_content["base"] != "EUR":
		raise Exception("Response is not in EUR!")

	print(response_content["rates"])
	return response_content["rates"]


def insert_exchange_rates(exchange_rates):
	connect_args = (
		"host={host} port={port} dbname={dbname} user={user} password={password}"
	).format(**credentials.DATABASE)
	db = psycopg2.connect(connect_args)
	db_cursor = db.cursor()
	for currency in exchange_rates.keys():
		db_cursor.execute(
			"UPDATE Currency SET rate = %s WHERE id = %s;",
			(exchange_rates[currency], currency)
		)

	db.commit()
	db_cursor.close()
	db.close()


def update():
	print("Retrieving exchange rates...")
	exchange_rates = retrieve_exchange_rates()
	print("Retrieved exchange rates: {}".format(exchange_rates))

	print("Inserting exchange rates...".format(exchange_rates))
	insert_exchange_rates(exchange_rates)
	print("Exchange rates inserted.")
