"""YRAP Base Flask App

TODO: Add logging
"""

import re

import flask_cors as cors
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from .helper import (app, jsonify, HTTP, Helpers, request)
from .models import db, Action, Project, User

cors = cors.CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def home():
    """Test if the backend is running."""
    return Helpers.get_helper(jsonify(test="alive"))


@app.errorhandler(404)
def not_found(error):
    return Helpers.error_helper(jsonify(error="Not found"), HTTP.h404)


def clean_slug(slug):
    regex = re.compile(r'\W+')
    return regex.sub('_', slug)


@app.route('/api/projects/add/', methods=['POST'])
@jwt_required()
def add_project():
    """Create a new project"""

    data = {}
    try:
        data = request.json
    except Exception as error:
        Helpers.error_helper(
            jsonify(error=f"Error creating project: error -> {error}"), HTTP.h400)
    if not data:
        Helpers.error_helper(
            jsonify(error=f"Error creating project: error -> No data received"), HTTP.h400)
    data["key"] = Helpers.gen_key()
    try:
        new_project = Project(
            *[data['key'], data['title'], clean_slug(data['slug']),
              data['done_when']], data['user'])
        db.session.add(new_project)
        db.session.commit()
    except Exception as error:
        Helpers.error_helper(
            jsonify(error=f"Error creating project: error -> {error}"), HTTP.h400)
    return Helpers.response_helper(jsonify(post="success, data added"), HTTP.h201)


@app.route("/api/projects/detail/<project_slug>/action/<action_id>/", methods=["PATCH", "DELETE"])
@jwt_required()
def update_project_action(project_slug, action_id):
    """PATCH & DELETE for project actions"""
    project = Project.query.filter_by(slug=project_slug).first()
    action = Action.query.filter_by(
        project=project.id, id=action_id).first()
    if request.method == "PATCH":
        try:
            data = request.json
        except Exception as error:
            return Helpers.error_helper(jsonify(error=f"Error patching action: error: {error}"), HTTP.h400)
        try:
            action.description = data.get('description', action.description)
            action.done = data.get('done', action.done)
            action.this_week = data.get('this_week', action.this_week)
            db.session.merge(action)
            db.session.commit()
        except Exception as error:
            return Helpers.error_helper(jsonify(error=f"Error patching action: error: {error}"), HTTP.h400)
        return Helpers.response_helper(jsonify(post="success, data updated"), HTTP.h200)
    if request.method == "DELETE":
        try:
            db.session.delete(action)
            db.session.commit()
        except Exception as error:
            return Helpers.error_helper(jsonify(error=f"Error patching action: error: {error}"), HTTP.h400)
        return Helpers.response_helper(jsonify(post="success, action deleted"), HTTP.h200)


@app.route("/api/projects/detail/<project_slug>/action/", methods=["POST"])
@jwt_required()
def add_project_action(project_slug):
    """Add an action to a project"""
    try:
        data = request.json
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error creating action: error -> {error}"), HTTP.h400)
    data["key"] = Helpers.gen_key()
    try:
        project = Project.query.filter_by(slug=project_slug).first()
        new_action = Action(
            project.id, *[data['key'], data['description'], data['date_added']])
        db.session.add(new_action)
        db.session.commit()
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error creating action: error -> {error}"), HTTP.h400)
    return Helpers.response_helper(jsonify(post="success, data added"), HTTP.h201)


@app.route('/api/projects/detail/<project_slug>/', methods=['GET'])
@jwt_required()
def project_detail(project_slug):
    """Get a project by slug"""
    try:
        project = Project.query.filter_by(slug=project_slug).first()
        project_return = {'id': project.id, 'key': project.key,
                          'title': project.title, 'slug': project.slug,
                          'done_when': project.done_when}
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error fetching project: error -> {error}"), HTTP.h400)
    try:
        actions = Action.query.filter_by(project=project.id)
        project_return['actions'] = (
            [{'id': action.id, 'description': action.description, 'key': action.key,
              'date_added': action.date_added, 'done': action.done,
              'this_week': action.this_week} for action in actions])
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error fetching actions: error -> {error}"), HTTP.h400)
    return Helpers.get_helper(jsonify(project_return))


@app.route('/api/projects/', methods=['GET'])
@jwt_required()
def projects():
    """Get all projects"""
    try:
        data = Project.query.all()
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error fetching projects: error -> {error}"), HTTP.h400)
    return Helpers.get_helper(jsonify(
        [{'id': i.id, 'key': i.key, 'title': i.title, 'slug': i.slug, 'done_when': i.done_when} for i in data]))


@app.route('/api/login/', methods=['POST'])
def login():
    """Login with flask_jwt_extended"""
    data = {}
    try:
        data = request.json
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error logging in: error -> {error}"), HTTP.h400)
    if not data:
        return Helpers.error_helper(jsonify(error="Error logging in: error -> No data received"), HTTP.h400)
    try:
        user = User.query.filter_by(email=data['email']).first()
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error logging in: error -> {error}"), HTTP.h400)
    if not user:
        return Helpers.error_helper(jsonify(error="Error logging in: error -> User not found"), HTTP.h401)
    if not user.check_password(data['password']):
        return Helpers.error_helper(jsonify(error="Error logging in: error -> Wrong password"), HTTP.h401)
    try:
        access_token = create_access_token(identity=user.email)
        refresh_token = create_refresh_token(identity=user.email)
    except Exception as error:
        return Helpers.error_helper(jsonify(error=f"Error logging in: error -> {error}"), HTTP.h400)
    return Helpers.get_helper(jsonify(access_token=access_token, refresh_token=refresh_token))


@app.route('/api/logout/', methods=['GET'])
@jwt_required()
def logout():
    """Logout"""
    return Helpers.response_helper(jsonify(logout="success"), HTTP.h200)
