
from sqlalchemy import desc
from .main import db


class Project(db.Model):
    """Database Model for Projects"""
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(128), unique=True, nullable=False)
    title = db.Column(db.String(128), unique=True, nullable=False)
    slug = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, key, title, slug):
        self.key = key
        self.title = title
        self.slug = slug


class Action(db.Model):
    """Database Model for Project Actions"""
    __tablename__ = 'actions'
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(128), unique=True, nullable=False)
    project = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def __init__(self, project_id, key, description):
        self.project = project_id
        self.key = key
        self.description = description
