from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import Asset, Employee
from .serializers import AssetSerializer, EmployeeSerializer


class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This will call the create method from the serializer
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics



# List all assets or create a new one
class AssetListCreate(generics.ListCreateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

# Retrieve, update, or delete a single asset
class AssetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

# Employee Views
class EmployeeListCreate(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


from rest_framework import viewsets
from .models import AssetCategory, AssetVendor, AssetMake, AssetModel, AssetStatus, Department, Employee, Asset
from .serializers import (
    AssetCategorySerializer,
    AssetVendorSerializer,
    AssetMakeSerializer,
    AssetModelSerializer,
    AssetStatusSerializer,
    DepartmentSerializer,
    EmployeeSerializer,
    AssetSerializer
)

class AssetCategoryViewSet(viewsets.ModelViewSet):
    queryset = AssetCategory.objects.all()
    serializer_class = AssetCategorySerializer

class AssetVendorViewSet(viewsets.ModelViewSet):
    queryset = AssetVendor.objects.all()
    serializer_class = AssetVendorSerializer

class AssetMakeViewSet(viewsets.ModelViewSet):
    queryset = AssetMake.objects.all()
    serializer_class = AssetMakeSerializer

class AssetModelViewSet(viewsets.ModelViewSet):
    queryset = AssetModel.objects.all()
    serializer_class = AssetModelSerializer

class AssetStatusViewSet(viewsets.ModelViewSet):
    queryset = AssetStatus.objects.all()
    serializer_class = AssetStatusSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer



def index(request):
    return render(request, 'index.html')

