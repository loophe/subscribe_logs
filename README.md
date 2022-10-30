# subscribe_logs
The dYdX balancer flashload related attack analyser

## before hand
+ You should run up [ethtx](https://github.com/EthTx/ethtx)

## first step
+ cd suscribe_logs
+ export https_proxy=<YOUR_HTTPS_PROXY>
+ export FLASK_APP=transaction
+ export FLASK_DEBUG=1
+ flask run

## secend step
+ node listen.js