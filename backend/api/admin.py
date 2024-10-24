from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import AssetCategory, AssetVendor, AssetMake, AssetModel, AssetStatus, Department, Employee, Asset

admin.site.register(AssetCategory)
admin.site.register(AssetVendor)
admin.site.register(AssetMake)
admin.site.register(AssetModel)
admin.site.register(AssetStatus)
admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(Asset)
