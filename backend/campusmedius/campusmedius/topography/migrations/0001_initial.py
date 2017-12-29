# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-08 16:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('timeline_row', models.IntegerField()),
                ('lng', models.FloatField()),
                ('lat', models.FloatField()),
            ],
        ),
    ]
