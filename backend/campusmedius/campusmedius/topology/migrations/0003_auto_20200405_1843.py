# -*- coding: utf-8 -*-
# Generated by Django 1.11.28 on 2020-04-05 16:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topology', '0002_auto_20200405_1843'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='relations',
            field=models.ManyToManyField(blank=True, related_name='experiences', to='topology.Relation'),
        ),
        migrations.AlterField(
            model_name='mediation',
            name='relations',
            field=models.ManyToManyField(blank=True, related_name='mediations', to='topology.Relation'),
        ),
    ]
