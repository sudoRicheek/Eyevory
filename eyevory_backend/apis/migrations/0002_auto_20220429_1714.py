# Generated by Django 3.2.13 on 2022-04-29 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='granted_nodes',
            field=models.ManyToManyField(related_name='grants', to='apis.Node'),
        ),
        migrations.AddField(
            model_name='profile',
            name='requested_nodes',
            field=models.ManyToManyField(related_name='requets', to='apis.Node'),
        ),
    ]
