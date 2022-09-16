from . import rds_app

if __name__ == '__main__':
    rds_app.run(host='0.0.0.0', port=5001, debug=False)
