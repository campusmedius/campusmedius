# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-17 14:25
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('topography', '0011_event_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='lat',
        ),
        migrations.RemoveField(
            model_name='event',
            name='lng',
        ),
    ]