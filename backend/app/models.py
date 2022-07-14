from .main import datetime, db


class Project(db.Model):
    """Database Model for Projects"""
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('users.id'))
    key = db.Column(db.String(128), unique=True, nullable=False)
    title = db.Column(db.String(128), unique=True, nullable=False)
    done_when = db.Column(db.Text, unique=True, nullable=False)
    slug = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, key, title, slug, done_when, user):
        self.key = key
        self.title = title
        self.slug = slug
        self.done_when = done_when
        self.user = user


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


class WeeklyReviewDay(db.Model):
    """The day of the week in which the user does their weekly review"""
    __tablename__ = 'weekly_review_days'
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(10), nullable=False)

    def __init__(self, user_id, day):
        self.user_id = user_id
        self.day = day


class User(db.Model):
    """Database Model for Users"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    weekly_review_day = db.Column(db.String(10), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    registered_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, username, password, email, weekly_review_day, is_admin=False):
        self.username = username
        self.password = password
        self.email = email
        self.weekly_review_day = weekly_review_day
        self.is_admin = is_admin
        self.registered_on = datetime.datetime.now()
