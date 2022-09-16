from . import dynamo_app

if __name__ == '__main__':
    dynamo_app.run(host='0.0.0.0', port=5002, debug=False)
