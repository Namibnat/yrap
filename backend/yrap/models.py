from django.db import models


class Project(models.Model):
    """The parent project for projects

    Contains:
        - project_name
        - done_when
        - created
        - updated
        - status (which is a choice field of created, started, deleted, completed, someday)
    """
    # Build choices for status
    choices_names = ['created', 'started', 'deleted', 'completed', 'someday']
    choices_shortcuts = ['CR', 'ST', 'DE', 'CO', 'SO']
    CHOICES = list(zip(choices_shortcuts, choices_names))
    # fields
    project_name = models.CharField(max_length=250)
    done_when = models.TextField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    status = models.CharField(
        max_length=2,
        choices=CHOICES,
        default='CR'
    )

    def __str__(self):
        return self.project_name
