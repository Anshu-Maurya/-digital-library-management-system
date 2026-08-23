from django.contrib import admin
from .models import  Student,Book,IssuedBook,Author,Category

admin.site.register( Student)
admin.site.register(Book)
admin.site.register(IssuedBook)
admin.site.register(Author)
admin.site.register(Category)