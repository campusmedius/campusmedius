# -*- coding: utf-8 -*-
# Generated by Django 1.11.28 on 2020-04-06 17:13
from __future__ import unicode_literals

from django.db import migrations
import taggit_autosuggest.managers


class Migration(migrations.Migration):

    dependencies = [
        ('topology', '0009_auto_20200406_1850'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mediator',
            name='keywords',
            field=taggit_autosuggest.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='main.CampusmediusTaggedItemBase', to='main.CampusmediusTag', verbose_name='keywords'),
        ),
    ]
