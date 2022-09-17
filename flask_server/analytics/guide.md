- Start flask server on port `5001` and create SQLite database
```shell
python wsgi.py
```
- Send sample HTTP request:
```shell
curl -X GET http://localhost:5000/analytics/investments/2/total-market-values?start=20200917&end=20221217      

curl -X GET http://localhost:5000/analytics/investments/pnl?date=20220430

curl -X GET http://localhost:5000/analytics/investments/2/pnl?start=20200917&end=20221217      
```
