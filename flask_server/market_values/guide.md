- Start flask server on port `5002` and create SQLite database
```shell
python wsgi.py
```
- Send sample HTTP request:
```shell
curl -X POST http://localhost:5000/market-values/1 \
-H "Content-Type: application/json" \
-d '{"data":{"marketValues":[{"value": 500000000,"date": "2022-01-01"},{"value": 600000000,"date": "2022-02-01"}]}}'

curl -X GET http://localhost:5000/market-values/1           

curl -X PUT http://localhost:5000/market-values/1 \
-H "Content-Type: application/json" \
-d '{"data":{"marketValues":[{"value": 500000000,"date": "2022-01-01"},{"value": 600000000,"date": "2022-02-01"}]}}'
```
