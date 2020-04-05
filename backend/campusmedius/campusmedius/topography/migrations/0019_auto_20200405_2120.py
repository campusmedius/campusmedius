# -*- coding: utf-8 -*-
# Generated by Django 1.11.28 on 2020-04-05 19:20
from __future__ import unicode_literals

from django.db import migrations
import taggit_autosuggest.managers


class Migration(migrations.Migration):

    dependencies = [
        ('topography', '0018_event_keywords'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='keywords',
            field=taggit_autosuggest.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]