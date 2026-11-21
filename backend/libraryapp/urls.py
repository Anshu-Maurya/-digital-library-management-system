from django.urls import path

from .views import *

urlpatterns = [
    path("admin/login/", admin_login_api),
    path("categories/add/", add_category),
    path("categories/", list_categories),
 
    path("update_category/<int:id>/",update_category),
    path("delete_category/<int:id>/",delete_category),
    # author section
    path("author/add/", add_author),
    path("author/", list_author),
    path("update_author/<int:id>/",update_author),
    path("delete_author/<int:id>/",delete_author),
    path("book/add/",add_book),
    path("book/",list_book),
    path("update_book/<int:pk>/",update_book),
    path("delete_book/<int:pk>/",delete_book),
    path("admin/change-password/",change_password),
    path("user/signup/",userSignup),
    path("user/login/",userLogin),
    path("user/stats/", user_stats),
    path("user/books/",user_list_books),
    path("user/profile/", user_profile),
    path("user/change-password/", user_change_password),
    path("user/issue-book/", issue_book),
    path("user/issued-books/", user_issued_books),
    path("user/return-book/", return_issued_book),
    path("admin/issued-books/", admin_issued_books),
    path("admin/students/", admin_students),
    path("admin/return-book/", admin_return_issued_book),

]
   
