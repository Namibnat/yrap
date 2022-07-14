from uuid import uuid4

from flask.cli import FlaskGroup

from app import app
from app.models import db, Project, Action, WeeklyReviewDay, User

cli = FlaskGroup(app)


def gen_key():
    return str(uuid4()).replace('-', '&')


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    print('all created')
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    admin = User(username="admin", password="admin", email="admin@yrap.not", weekly_review_day="Monday", is_admin=True)
    db.session.add(admin)
    db.session.commit()
    other_user = User(username="other", password="other", email="notadmin@yrap.not", weekly_review_day="Tuesday")
    db.session.add(other_user)
    db.session.commit()
    # get user id
    user_id = User.query.filter_by(username="admin").first().id
    data = [
        {'key': gen_key(), 'title': 'First Project',
         'slug': 'first_project', 'done_when': '2023-01-01', 'user': user_id},
        {'key': gen_key(), 'title': 'Another', 'slug': 'anther_project', 'user': user_id},
        {'key': gen_key(), 'title': 'Go to buy stuff', 'slug': 'go_shop', 'user': user_id},
    ]
    for value in data:
        value['down_when'] = f"'{value['title']}' will be done when... it's finished"
        db.session.add(
            Project(key=value['key'], title=value['title'], slug=value['slug'],
                    done_when=value['down_when'], user=value['user']))
    db.session.commit()
    # get project id
    project_id = Project.query.filter_by(title="First Project").first().id
    another_action = [
        {'key': gen_key(), 'description': 'Buy milk',
         'date_added': '2020-01-01', 'done': False, 'this_week': True},
    ]
    for value in another_action:
        db.session.add(
            Action(project_id=project_id, key=value['key'], description=value['description'],
                   date_added=value['date_added'], done=value['done'], this_week=value['this_week']))
    db.session.commit()


if __name__ == '__main__':
    cli()
