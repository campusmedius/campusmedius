# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-12-04 19:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('information', '0015_auto_20181128_0000'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='stream_id',
            field=models.CharField(default='c47c9323f8628c10527cdd9748173e5acc4d8c9c', help_text="For example: 'c47c9323f8628c10527cdd9748173e5acc4d8c9c'", max_length=32),
            preserve_default=False,
        ),
    ]
