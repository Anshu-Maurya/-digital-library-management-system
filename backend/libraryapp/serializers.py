from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','created_at','updated_at','is_active']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name",read_only = True)
    category_name= serializers.CharField(source="category.name",read_only = True)
    title = serializers.CharField(source="titel", read_only=True)
    class Meta:
        model = Book
        fields ="__all__"
class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "student_id", "mobile", "email", "password", "full_name"]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

class BookListSerializers(serializers.ModelSerializer):
    title = serializers.CharField(source="titel", read_only=True)
    author_name = serializers.CharField(source ="author.name",read_only = True) 
    category_name = serializers.CharField(source="category.name",read_only=True)
    available_quantity = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author_name',
            'category_name',
            'isbn',
            'price',
            'quantity',
            'available_quantity',
            'is_available',
            'cover_image',
            'created_at',
            'updated_at',
        ]
    def get_available_quantity(self, obj):
            issued_count = obj.issued_record.filter(is_return=False).count()
            available = obj.quantity - issued_count
            return available if available >= 0 else 0

    def get_is_available(self, obj):
            return self.get_available_quantity(obj) > 0
        
