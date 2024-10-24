from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView
from .views import EmployeeListCreate, EmployeeDetail, AssetListCreate, AssetDetail

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    # Asset URLs
    path('assets/', AssetListCreate.as_view(), name='asset-list-create'),
    path('assets/<uuid:pk>/', AssetDetail.as_view(), name='asset-detail'),
    # Employee URLs
    path('employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    path('employees/<uuid:pk>/', EmployeeDetail.as_view(), name='employee-detail'),
]

