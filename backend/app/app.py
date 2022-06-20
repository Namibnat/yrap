"""YRAP Base Flask App

Do: 
Use the virtualenv
set FLASK_APP=app/app.py
flask run -h 127.0.0.1 -p 5555
"""

from uuid import uuid4
from .main import app, jsonify
from .models import Project


def gen_key():
    return str(uuid4()).replace('-', '&')


@app.route('/', methods=['GET'])
def home():
    return jsonify(test="alive")

# @app.route('/', methods=['POST'])
# def add_project():



@app.route('/projects/', methods=['GET'])
def projects():
    data = Project.query.all()
    response = jsonify(projects=[{'id': i.id, 'key': i.key, 'title': i.title, 'slug': i.slug} for i in data])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
