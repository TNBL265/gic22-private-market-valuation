import boto3
from boto3.dynamodb.conditions import Key

dynamo_table = boto3.resource("dynamodb", region_name="", aws_access_key_id="", aws_secret_access_key="")
Transactions_table = dynamo_table.Table("Transactions")


def get_transaction(transaction_id: int):
    return Transactions_table.query(
        KeyConditionExpression=Key('uid').eq(transaction_id),
        ProjectionExpression='uid, quantity, value',
    )
