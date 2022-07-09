"""YRAP Base Flask App

TODO: Add logging
"""

import re
from uuid import uuid4
from .main import (app, jsonify, make_response, request)
from .models import db, Action, Project
from .helper import HTTP
import flask_cors as cors

cors = cors.CORS(app, resources={r"/api/*": {"origins": "*"}})


def gen_key():
    return uuid4().hex


def response_helper(payload, http_status):
    response = make_response(payload, http_status)
    response.headers['Content-Type'] = 'application/json'
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def error_helper(payload):
    return response_helper(payload, HTTP.h500)


def get_helper(payload):
    return response_helper(payload, HTTP.h200)


@app.route('/', methods=['GET'])
def home():
    """Test if the backend is running."""
    return get_helper(jsonify(test="alive"))


def clean_slug(slug):
    regex = re.compile(r'\W+')
    return regex.sub('_', slug)


@app.route('/api/projects/add/', methods=['POST'])
def add_project():
    """Create a new project"""
    data = {}
    try:
        data = request.json
    except Exception as error:
        error_helper(
            jsonify(error=f"Error creating project: error -> {error}"))
    if not data:
        error_helper(
            jsonify(error=f"Error creating project: error -> No data received"))
    data["key"] = gen_key()
    try:
        new_project = Project(
            *[data['key'], data['title'], clean_slug(data['slug']), data['done_when']])
        db.session.add(new_project)
        db.session.commit()
    except Exception as error:
        error_helper(
            jsonify(error=f"Error creating project: error -> {error}"))
    return response_helper(jsonify(post="success, data added"), HTTP.h201)


@app.route("/api/projects/detail/<project_slug>/action/<action_id>/", methods=["PATCH", "DELETE"])
def update_project_action(project_slug, action_id):
    """PATCH & DELETE for project actions"""
    project = Project.query.filter_by(slug=project_slug).first()
    action = Action.query.filter_by(
        project=project.id, id=action_id).first()
    if request.method == "PATCH":
        try:
            data = request.json
        except Exception as error:
            return error_helper(jsonify(error=f"Error patching action: error: {error}"))
        try:
            action.description = data.get('description', action.description)
            action.done = data.get('done', action.done)
            db.session.merge(action)
            db.session.commit()
        except Exception as error:
            return error_helper(jsonify(error=f"Error patching action: error: {error}"))
        return response_helper(jsonify(post="success, data updated"), HTTP.h200)
    if request.method == "DELETE":
        try:
            db.session.delete(action)
            db.session.commit()
        except Exception as error:
            return error_helper(jsonify(error=f"Error patching action: error: {error}"))
        return response_helper(jsonify(post="success, action deleted"), HTTP.h200)


@app.route("/api/projects/detail/<project_slug>/action/", methods=["POST"])
def add_project_action(project_slug):
    """Add an action to a project"""
    try:
        data = request.json
    except Exception as error:
        return error_helper(jsonify(error=f"Error creating action: error -> {error}"))
    data["key"] = gen_key()
    try:
        project = Project.query.filter_by(slug=project_slug).first()
        new_action = Action(
            project.id, *[data['key'], data['description'], data['date_added']])
        db.session.add(new_action)
        db.session.commit()
    except Exception as error:
        return error_helper(jsonify(error=f"Error creating action: error -> {error}"))
    return response_helper(jsonify(post="success, data added"), HTTP.h201)


@app.route('/api/projects/detail/<project_slug>/', methods=['GET'])
def project_detail(project_slug):
    """Get a project by slug"""
    try:
        project = Project.query.filter_by(slug=project_slug).first()
        project_return = {'id': project.id, 'key': project.key,
                          'title': project.title, 'slug': project.slug, 'done_when': project.done_when}
    except Exception as error:
        return error_helper(jsonify(error=f"Error fetching project: error -> {error}"))
    try:
        actions = Action.query.filter_by(project=project.id)
        project_return['actions'] = (
            [{'id': action.id, 'description': action.description, 'key': action.key,
              'date_added': action.date_added, 'done': action.done} for action in actions])
    except Exception as error:
        return error_helper(jsonify(error=f"Error fetching actions: error -> {error}"))
    return get_helper(jsonify(project_return))


@app.route('/api/projects/', methods=['GET'])
def projects():
    """Get all projects"""
    try:
        data = Project.query.all()
    except Exception as error:
        return error_helper(jsonify(error=f"Error fetching projects: error -> {error}"))
    return get_helper(jsonify(
        [{'id': i.id, 'key': i.key, 'title': i.title, 'slug': i.slug, 'done_when': i.done_when} for i in data]))
