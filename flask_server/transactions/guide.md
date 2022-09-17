- Start flask server on port `5002` and create SQLite database
```shell
python wsgi.py
```
- Send sample HTTP request:
```shell
curl -X POST http://localhost:5000/transactions \
-H "Content-Type: application/json" \
-d '{"data":{"instrumentId":"2","quantity":"10","transactionAmount":"-500000","transactionType":"BUY","transactionDate":"2022-02-01"}}'

curl -X GET http://localhost:5000/transactions/1           

curl -X GET http://localhost:5000/transactions

curl -X DELETE http://localhost:5000/transactions/1    

curl -X GET http://localhost:5000/transactions/instruments/2
```
