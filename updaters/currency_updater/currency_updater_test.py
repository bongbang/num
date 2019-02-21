import pytest
from currency_updater import retrieve_exchange_rates
from currency_updater import insert_exchange_rates

def test_retrieve_exchange_rates_returns_correct_format():
	exchange_rates = retrieve_exchange_rates()

	# Make sure that the call succeeded
	assert exchange_rates is not None
	assert len(exchange_rates) > 0

	# Check that the exchange rates are relative to the EUR
	assert "EUR" in exchange_rates
	assert exchange_rates["EUR"] == 1.0

# TODO: test_insert_exchange_rates_*()