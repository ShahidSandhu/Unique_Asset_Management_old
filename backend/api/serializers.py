from rest_framework import serializers
from .models import Asset, AssetCategory, AssetVendor, AssetMake, AssetModel, AssetStatus, Employee
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create a new user with the provided data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user



class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'name', 'description', 'value', 'created_at', 'updated_at', 'update_count', 'employee']

    # Custom validation for the value field
    def validate_value(self, value):
        if value < 0:
            raise serializers.ValidationError("Asset value cannot be negative.")
        return value


class EmployeeSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True, read_only=True)  # Display related assets for an employee
    class Meta:
        model = Employee
        fields = ['id', 'given_name', 'last_name', 'email', 'position', 'hire_date', 'updated_at', 'assets']


class AssetSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    vendor = serializers.StringRelatedField()
    make = serializers.StringRelatedField()
    model = serializers.StringRelatedField()
    status = serializers.StringRelatedField()
    employee = serializers.StringRelatedField()

    class Meta:
        model = Asset
        fields = ['id', 'serial_number', 'barcode', 'date_acquired', 'date_disposed', 'name', 'description', 'value', 'category', 'vendor', 'make', 'model', 'status', 'employee', 'created_at', 'updated_at', 'update_count']
