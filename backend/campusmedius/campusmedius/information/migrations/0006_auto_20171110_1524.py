# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-10 15:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('information', '0005_auto_20171110_1523'),
    ]

    operations = [
        migrations.AddField(
            model_name='information',
            name='media_audio',
            field=models.ManyToManyField(to='information.Audio'),
        ),
        migrations.AddField(
            model_name='information',
            name='media_gallery',
            field=models.ManyToManyField(to='information.Gallery'),
        ),
        migrations.AddField(
            model_name='information',
            name='media_image',
            field=models.ManyToManyField(to='information.Image'),
        ),
        migrations.AddField(
            model_name='information',
            name='media_video',
            field=models.ManyToManyField(to='information.Video'),
        ),
    ]
