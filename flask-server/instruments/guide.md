- Start flask server on port `5004` and create SQLite database
```shell
python wsgi.py
```
- Send sample HTTP request:
  - `POST`: to Create
  ```shell
  curl -X POST http://localhost:5004/rds/instruments \
  -H "Content-Type: application/json" \
  -d '{"data":{"date":"2018-01-08 00:00:00","value":"10.0","quantity":"20.0"}}' 
  ```
  - `GET`: to Read
  ```shell
  curl -X GET http://localhost:5004/rds/instruments?date=2018-01-08+00%3A00%3A00
  ```