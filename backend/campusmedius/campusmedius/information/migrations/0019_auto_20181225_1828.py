# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-12-25 17:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('information', '0018_auto_20181225_1646'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='content_de',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='information',
            name='content_en',
            field=models.TextField(blank=True, null=True),
        ),
    ]
