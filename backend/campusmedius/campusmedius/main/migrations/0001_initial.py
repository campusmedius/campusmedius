# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-01-03 19:32
from __future__ import unicode_literals

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_de', models.TextField()),
                ('title_en', models.TextField()),
                ('abstract_de', tinymce.models.HTMLField(blank=True, null=True)),
                ('abstract_en', tinymce.models.HTMLField(blank=True, null=True)),
                ('content_de', tinymce.models.HTMLField(blank=True, null=True)),
                ('content_en', tinymce.models.HTMLField(blank=True, null=True)),
            ],
        ),
    ]