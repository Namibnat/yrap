from .main import db


class Project(db.Model):
    """Database Model for Projects"""
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(128), unique=True, nullable=False)
    title = db.Column(db.String(128), unique=True, nullable=False)
    done_when = db.Column(db.Text, unique=True, nullable=False)
    slug = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, key, title, slug, done_when):
        self.key = key
        self.title = title
        self.slug = slug
        self.done_when = done_when


class Action(db.Model):
    """Database Model for Project Actions"""
    __tablename__ = 'actions'
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(128), unique=True, nullable=False)
    project = db.Column(db.Integer, db.ForeignKey(
        'projects.id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date_added = db.Column(db.String(255), nullable=False)
    done = db.Column(db.Boolean, nullable=False, default=False)
    this_week = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, project_id, key, description, date_added, done=False, this_week=False):
        self.project = project_id
        self.key = key
        self.description = description
        self.date_added = date_added
        self.done = done
        self.this_week = this_week
