# Generated by Django 4.2 on 2023-06-20 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0007_remove_product_category_productcategory_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category_products', to='ecommerceapp.subcategory'),
        ),
    ]
