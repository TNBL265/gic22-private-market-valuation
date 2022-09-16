import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from decimal import Decimal

dynamo_table = boto3.resource("dynamodb", endpoint_url="http://localhost:8000")
Transactions_table = dynamo_table.Table("Transactions")


def get_one_transaction(transaction_id: int):
    return Transactions_table.query(
        KeyConditionExpression=Key('UID').eq(transaction_id),
        ProjectionExpression='UID, Quantity, Value',
    )


def get_all_transactions():
    return Transactions_table.scan()


def insert_one_transaction(data_obj):
    data = data_obj['data']
    try:
        Transactions_table.put_item(
            Item={
                'TransactionID': int(data['transaction_id']),
                'Quantity': Decimal(data['quantity']),
                'Value': Decimal(data['value'])
            })
    except ClientError as err:
        print(err.response['Error']['Code'], err.response['Error']['Message'])
        raise
