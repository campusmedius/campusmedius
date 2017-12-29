# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-10 15:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('information', '0007_auto_20171110_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='media_audio',
            field=models.ManyToManyField(blank=True, to='information.Audio'),
        ),
        migrations.AlterField(
            model_name='information',
            name='media_gallery',
            field=models.ManyToManyField(blank=True, to='information.Gallery'),
        ),
        migrations.AlterField(
            model_name='information',
            name='media_image',
            field=models.ManyToManyField(blank=True, to='information.Image'),
        ),
        migrations.AlterField(
            model_name='information',
            name='media_video',
            field=models.ManyToManyField(blank=True, to='information.Video'),
        ),
    ]
