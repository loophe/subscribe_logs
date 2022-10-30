# subscribe_logs
The dYdX balancer flashload related attack analyser

## first step
+ cd suscribe_logs
+ export http_proxy=127.0.0.1:1081
+ export https_proxy=127.0.0.1:1081
+ export FLASK_APP=transaction
+ export FLASK_DEBUG=1
+ flask run

## secend step
+ node listen.js