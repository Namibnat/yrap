"""YRAP Base Flask App

Do: 
Use the virtualenv
set FLASK_APP=app/app.py
flask run -h 127.0.0.1 -p 5555
"""

from uuid import uuid4
from flask import Flask, jsonify

app = Flask(__name__)


def gen_key():
    return str(uuid4()).replace('-', '&')


@app.route('/', methods=['GET'])
def home():
    return jsonify(hello="world")


@app.route('/projects/', methods=['GET'])
def projects():
    data = [
        {'id': 1, 'key': gen_key(), 'title': 'Project', 'slug': 'project'},
        {'id': 2, 'key': gen_key(), 'title': 'Do donkey', 'slug': 'do_donkey'},
        {'id': 3, 'key': gen_key(), 'title': 'Go to buy stuff', 'slug': 'go_shop'},
    ]
    response = jsonify(projects=data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
