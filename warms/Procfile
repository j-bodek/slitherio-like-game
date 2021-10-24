# release: python manage.py migrate 
web: daphne warms.asgi:application --port $PORT --bind 0.0.0.0 -v2
chatworker: python manage.py runworker --settings=warms.settings -v2