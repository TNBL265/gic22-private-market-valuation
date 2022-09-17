- Start flask server on port `5001` and create SQLite database
```shell
python wsgi.py
```
- Send sample HTTP request:
```shell
curl -X POST http://localhost:5001/instruments \
-H "Content-Type: application/json" \
-d '{"data":{"instrumentName":"instrumentName","instrumentType":"instrumentType","country":"country","sector":"sector","instrumentCurrency":"instrumentCurrency", "isTradeable":"False","notes":"notes"}}'

curl -X GET http://localhost:5001/instruments/1           

curl -X GET http://localhost:5001/instruments

curl -X PUT http://localhost:5001/instruments/1 \
-H "Content-Type: application/json" \
-d '{"data":{"instrumentName":"instrumentName0","instrumentType":"instrumentType0","country":"country0","sector":"sector0","instrumentCurrency":"instrumentCurrency0", "isTradeable":"True","notes":"notes0"}}'

curl -X DELETE http://localhost:5001/instruments/1    
```
