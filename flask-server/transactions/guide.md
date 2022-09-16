- Install [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) locally and set up [AWS CLi](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)
- Start flask server on port `5003`
```shell
python wsgi.py
```
- Create table and list
```shell
aws dynamodb create-table \
    --table-name Transactions \
    --attribute-definitions \
        AttributeName=TransactionID,AttributeType=N \
    --key-schema \
        AttributeName=TransactionID,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=10 \
    --table-class STANDARD \
   --endpoint-url http://localhost:8000

aws dynamodb list-tables \
    --endpoint-url http://localhost:8000
```
- Send sample HTTP request:
  - `POST`: to Create
  ```shell
  curl -X POST http://localhost:5003/dynamo/transactions \
  -H "Content-Type: application/json" \
  -d '{"data":{"transaction_id":"0","quantity":"100.0","value":"2.0"}}'  
  ```
  - `GET`: to Read
  ```shell
  curl -X GET http://localhost:5003/dynamo/transactions?transaction_id=0
  ```
- Delete table
```shell
aws dynamodb delete-table \
    --table-name Transactions \
    --endpoint-url http://localhost:8000
```