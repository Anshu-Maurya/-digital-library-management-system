from django.shortcuts import render
from django.db import transaction
from django.utils import timezone

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


def verify_student_password(student, password):
    if check_password(password, student.password):
        return True

    if student.password == password:
        student.password = make_password(password)
        student.save(update_fields=["password", "updated_at"])
        return True

    return False


@api_view(["POST"])
def admin_login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        return Response(
            {
                "success": True,
                "message": "Login successful",
                "username": user.username

            },
            status=status.HTTP_200_OK
        )
    return Response(
        {
            "success": False,
            "message": "Invalid credentials",

        },
        status=status.HTTP_401_UNAUTHORIZED
    ) 
@api_view(["POST"])
def add_category(request):
    name = request.data.get("name")
    category_status = request.data.get("status", "1")
    is_active = True if str(category_status) == "1" else False

    category = Category.objects.create(name=name, is_active=is_active)

    serializer = CategorySerializer(category)
    return Response(
        {
            "success": True,
            "message": "Category has been created",
            "category":serializer.data
        },
         status = status.HTTP_201_CREATED
    )
@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all().order_by("-id")
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

from django.shortcuts import get_object_or_404

@api_view(["PUT"])
def update_category(request,id):
    category = get_object_or_404(Category,id=id)
    name = request.data.get("name")
    category_status = request.data.get("status", "1")
    is_active = True if str(category_status) == "1" else False

    category.name =name
    category.is_active= is_active
    category.save()

    serializer = CategorySerializer(category)
    return Response(
        {
            "success": True,
            "message": "Category has been updated",
            "category":serializer.data
        },
         status = status.HTTP_200_OK)
   
@api_view(["DELETE"])
def delete_category(request,id):
  category =  get_object_or_404(Category,id=id)
  category.delete()
  return Response(
      {
      "success":True,
      "message":"category has deleted"},
      status= status.HTTP_200_OK
  )
# this is author section
@api_view(["POST"])
def add_author(request):
    name = request.data.get("name")
    
    author = Author.objects.create(name=name)

    serializer = AuthorSerializer(author)
    return Response(
        {
            "success": True,
            "message": "Author has been created",
            "author":serializer.data
        },
         status = status.HTTP_201_CREATED
    )
@api_view(['GET'])
def list_author(request):
    author = Author.objects.all().order_by("-id")
    serializer = AuthorSerializer(author, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["PUT"])
def update_author(request,id):
    author = get_object_or_404(Author,id=id)
    name = request.data.get("name")
  
    author.name =name
   
    author.save()

    serializer = AuthorSerializer(author)
    return Response(
        {
            "success": True,
            "message": "Author has been updated",
            "Author":serializer.data
        },
         status = status.HTTP_200_OK)

@api_view(["DELETE"])
def delete_author(request,id):
  author =  get_object_or_404(Author,id=id)
  author.delete()
  return Response(
      {
      "success":True,
      "message":"author has deleted"},
      status= status.HTTP_200_OK
  )
# Book data is going on

@api_view(['GET'])
def list_book(request):
    book = Book.objects.all().order_by("-id")
    serializer = BookSerializer(book, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
def add_book(request):
    try:
        title = request.data.get("title") or request.data.get("titile")
        category = request.data.get("category")
        price = request.data.get("price")
        isbn = request.data.get("isbn")
        quantity = request.data.get("quantity")
        author = request.data.get("author")
        cover_image = request.FILES.get("cover_image") or request.FILES.get("coverimage")

        if not title or not category or not price or not isbn or not quantity or not author:
            return Response(
                {"success": False, "message": "Please provide all required fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        book = Book.objects.create(
            titel=title,
            category_id=category,
            author_id=author,
            isbn=isbn,
            price=price,
            quantity=quantity,
            cover_image=cover_image,
        )

        return Response(
            {
                "success": True,
                "message": "Book added successfully",
                "id": book.id,
            },
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )
@api_view(["PUT"])
def update_book(request, pk):
    try:
        book = get_object_or_404(Book, id=pk)

        # Accept partial updates; only update fields provided.
        title = request.data.get("title") or request.data.get("titile") or request.data.get("titel")
        category = request.data.get("category")
        price = request.data.get("price")
        isbn = request.data.get("isbn")
        quantity = request.data.get("quantity")
        author = request.data.get("author")

        if title is not None:
            book.titel = title
        if category is not None and category != "":
            book.category_id = category
        if author is not None and author != "":
            book.author_id = author
        if price is not None and price != "":
            try:
                book.price = price
            except Exception:
                pass
        if isbn is not None and isbn != "":
            book.isbn = isbn
        if quantity is not None and quantity != "":
            try:
                book.quantity = quantity
            except Exception:
                pass

        # handle file upload if present
        cover = request.FILES.get("cover_image") or request.FILES.get("coverimage")
        if cover:
            book.cover_image = cover

        book.save()
        serializer = BookSerializer(book)
        return Response({"success": True, "message": "Book has been updated", "book": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
# delete the book
@api_view(["DELETE"])
def delete_book(request, pk):
    
        book = Book.objects.get(id=pk)

        book.delete()

        return Response(
            {
                "success": True,
                "message": "Book deleted successfully"
            },
            status=status.HTTP_200_OK
        )
# single update_book implemented above
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
def change_password(request):

    username = request.data.get("username") or request.data.get("user") or request.data.get("name")
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")

    # Check passwords match
    if new_password != confirm_password:
        return Response(
            {
                "success": False,
                "message": "Passwords are not the same"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check password length
    if len(new_password) < 8:
        return Response(
            {
                "success": False,
                "message": "Password should be at least 8 characters"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Find admin user
        user = User.objects.get(
            username=username,
            is_staff=True
        )

        # Check current password
        if not user.check_password(current_password):
            return Response(
                {
                    "success": False,
                    "message": "Current password is incorrect"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Change password
        user.set_password(new_password)
        user.save()

        return Response(
            {
                "success": True,
                "message": "Password changed successfully"
            },
            status=status.HTTP_200_OK
        )

    except User.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Admin user does not exist"
            },
            status=status.HTTP_404_NOT_FOUND
        )
@api_view(['POST'])
def userSignup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    confirm_password = request.data.get("confirm_password")
    mobile = request.data.get("mobile")
    full_name = request.data.get("full_name") or username

    if password != confirm_password:
        return Response({
            "success": False,
            "message": "Passwords do not match"
        }, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSignupSerializer(data={
        "student_id": username,
        "full_name": full_name,
        "email": email,
        "mobile": mobile,
        "password": password,
    })

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Account created successfully",
                "student_id": serializer.data.get("student_id"),
            },
            status=status.HTTP_201_CREATED
        )


    return Response(
        {
            "success": False,
            "errors": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )
  
@api_view(['POST'])
def userLogin(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password :
      return Response(
            {
                "success": False,
                "message": "Email and password are required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Find student using email
        user = Student.objects.get(email=email)

    except Student.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Invalid email or password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not verify_student_password(user, password):
        return Response(
            {
                "success": False,
                "message": "Invalid email or password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(
        {
            "success": True,
            "message": "Login successful",
            "user": {
                "id": user.id,
                "student_id": user.student_id,
                "email": user.email,
                "full_name": user.full_name,
            }
        },
        status=status.HTTP_200_OK
    )
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["GET"])
def user_stats(request):

    student_id = request.query_params.get("student_id")

    if not student_id:
        return Response({
            "success": False,
            "message": "Student ID parameter is missing"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student.objects.get(student_id=student_id)

    except Student.DoesNotExist:
        return Response({
            "success": False,
            "message": "Student not found"
        }, status=status.HTTP_404_NOT_FOUND)

    total_books = Book.objects.count()

    total_issued = IssuedBook.objects.filter(
        student=student
    ).count()

    not_returned = IssuedBook.objects.filter(
        student=student,
        is_return=False
    ).count()

    return Response({
        "success": True,
        "message": "Stats fetched successfully",
        "stats": {
            "total_books": total_books,
            "total_issued": total_issued,
            "not_returned": not_returned
        }
    }, status=status.HTTP_200_OK)
    # DRF request parameter retrieval
    student_id = request.query_params.get("student_id") or request.GET.get("student_id")

    if not student_id:
        return Response({
            "success": False,
            "message": "Student ID parameter is missing"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check whether your Student model uses 'id' or 'student_id'
        student = Student.objects.get(student_id=student_id) # or student_id=student_id
    except Student.DoesNotExist:
        return Response({
            "success": False,
            "message": "Student not found"
        }, status=status.HTTP_404_NOT_FOUND)

    total_books = Book.objects.count()
    total_issued = IssuedBook.objects.filter(student=student).count()
    not_returned = IssuedBook.objects.filter(student=student, is_return=False).count()

    stats = {
        "total_books": total_books,
        "total_issued": total_issued,
        "not_returned": not_returned,
    }

    return Response({
        "success": True,
        "message": "Stats fetched successfully",
        "stats": stats
    }, status=status.HTTP_200_OK)
@api_view(['GET'])
def user_list_books(request):
    books = Book.objects.select_related('author','category').prefetch_related("issued_record").all().order_by("titel")
    serializer =BookListSerializers(books,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def user_profile(request):
    student_id = request.query_params.get("student_id")

    if not student_id:
        return Response({
            "success": False,
            "message": "Student ID parameter is missing"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response({
            "success": False,
            "message": "Student not found"
        }, status=status.HTTP_404_NOT_FOUND)

    return Response({
        "success": True,
        "profile": {
            "id": student.id,
            "student_id": student.student_id,
            "full_name": student.full_name,
            "email": student.email,
            "mobile": student.mobile,
            "is_active": student.is_active,
            "created_at": student.created_at,
        }
    }, status=status.HTTP_200_OK)


@api_view(["POST"])
def user_change_password(request):
    student_id = request.data.get("student_id")
    email = request.data.get("email")
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")

    if not all([student_id or email, current_password, new_password, confirm_password]):
        return Response({
            "success": False,
            "message": "All password fields are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    if new_password != confirm_password:
        return Response({
            "success": False,
            "message": "New password and confirm password do not match"
        }, status=status.HTTP_400_BAD_REQUEST)

    if len(new_password) < 8:
        return Response({
            "success": False,
            "message": "Password should be at least 8 characters"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        if student_id:
            student = Student.objects.get(student_id=student_id)
        else:
            student = Student.objects.get(email=email)
    except Student.DoesNotExist:
        return Response({
            "success": False,
            "message": "Student not found"
        }, status=status.HTTP_404_NOT_FOUND)

    if not verify_student_password(student, current_password):
        return Response({
            "success": False,
            "message": "Current password is incorrect"
        }, status=status.HTTP_400_BAD_REQUEST)

    student.password = make_password(new_password)
    student.save(update_fields=["password", "updated_at"])

    return Response({
        "success": True,
        "message": "Password changed successfully"
    }, status=status.HTTP_200_OK)


@api_view(["POST"])
@transaction.atomic
def issue_book(request):
    student_id = request.data.get("student_id")
    book_id = request.data.get("book_id")

    if not student_id or not book_id:
        return Response({
            "success": False,
            "message": "Student ID and book ID are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student.objects.select_for_update().get(student_id=student_id)
        book = Book.objects.select_for_update().get(id=book_id)
    except Student.DoesNotExist:
        return Response({"success": False, "message": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    except Book.DoesNotExist:
        return Response({"success": False, "message": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    active_issue = IssuedBook.objects.filter(
        student=student,
        book=book,
        is_return=False
    ).exists()
    if active_issue:
        return Response({
            "success": False,
            "message": "You already have this book issued"
        }, status=status.HTTP_400_BAD_REQUEST)

    issued_count = IssuedBook.objects.filter(book=book, is_return=False).count()
    if issued_count >= book.quantity:
        return Response({
            "success": False,
            "message": "This book is not available"
        }, status=status.HTTP_400_BAD_REQUEST)

    issue = IssuedBook.objects.create(student=student, book=book)
    book.is_issued = True
    book.save(update_fields=["is_issued", "updated_at"])

    return Response({
        "success": True,
        "message": "Book issued successfully",
        "issue": {
            "id": issue.id,
            "issued_at": issue.issued_at,
        }
    }, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def user_issued_books(request):
    student_id = request.query_params.get("student_id")
    if not student_id:
        return Response({
            "success": False,
            "message": "Student ID parameter is missing"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response({"success": False, "message": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

    issues = IssuedBook.objects.select_related("book", "book__author", "book__category").filter(
        student=student
    ).order_by("-issued_at")

    data = [{
        "id": issue.id,
        "title": issue.book.titel,
        "author_name": issue.book.author.name,
        "category_name": issue.book.category.name,
        "isbn": issue.book.isbn,
        "issued_at": issue.issued_at,
        "retrun_at": issue.retrun_at,
        "is_return": issue.is_return,
        "fine": issue.fine,
        "remark": issue.remark,
    } for issue in issues]

    return Response({"success": True, "issues": data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@transaction.atomic
def return_issued_book(request):
    student_id = request.data.get("student_id")
    issue_id = request.data.get("issue_id")

    if not student_id or not issue_id:
        return Response({
            "success": False,
            "message": "Student ID and issue ID are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student.objects.get(student_id=student_id)
        issue = IssuedBook.objects.select_for_update().select_related("book").get(
            id=issue_id,
            student=student
        )
    except Student.DoesNotExist:
        return Response({"success": False, "message": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    except IssuedBook.DoesNotExist:
        return Response({"success": False, "message": "Issued book not found"}, status=status.HTTP_404_NOT_FOUND)

    if issue.is_return:
        return Response({
            "success": False,
            "message": "This book has already been returned"
        }, status=status.HTTP_400_BAD_REQUEST)

    issue.is_return = True
    issue.retrun_at = timezone.now()
    issue.save(update_fields=["is_return", "retrun_at", "updated_at"])

    book = issue.book
    active_count = IssuedBook.objects.filter(book=book, is_return=False).count()
    book.is_issued = active_count > 0
    book.save(update_fields=["is_issued", "updated_at"])

    return Response({
        "success": True,
        "message": "Book returned successfully"
    }, status=status.HTTP_200_OK)


@api_view(["GET"])
def admin_issued_books(request):
    issues = IssuedBook.objects.select_related(
        "student", "book", "book__author", "book__category"
    ).order_by("-issued_at")

    data = [{
        "id": issue.id,
        "student_id": issue.student.student_id,
        "student_name": issue.student.full_name,
        "title": issue.book.titel,
        "author_name": issue.book.author.name,
        "category_name": issue.book.category.name,
        "isbn": issue.book.isbn,
        "issued_at": issue.issued_at,
        "retrun_at": issue.retrun_at,
        "is_return": issue.is_return,
    } for issue in issues]

    return Response({"success": True, "issues": data}, status=status.HTTP_200_OK)


@api_view(["GET"])
def admin_students(request):
    students = Student.objects.all().order_by("-created_at")

    data = []
    for student in students:
        total_issued = IssuedBook.objects.filter(student=student).count()
        active_issued = IssuedBook.objects.filter(
            student=student,
            is_return=False
        ).count()

        data.append({
            "id": student.id,
            "student_id": student.student_id,
            "full_name": student.full_name,
            "email": student.email,
            "mobile": student.mobile,
            "is_active": student.is_active,
            "created_at": student.created_at,
            "total_issued": total_issued,
            "active_issued": active_issued,
        })

    return Response({
        "success": True,
        "total_students": len(data),
        "students": data,
    }, status=status.HTTP_200_OK)


@api_view(["POST"])
@transaction.atomic
def admin_return_issued_book(request):
    issue_id = request.data.get("issue_id")
    if not issue_id:
        return Response({
            "success": False,
            "message": "Issue ID is required"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        issue = IssuedBook.objects.select_for_update().select_related("book").get(id=issue_id)
    except IssuedBook.DoesNotExist:
        return Response({"success": False, "message": "Issued book not found"}, status=status.HTTP_404_NOT_FOUND)

    if issue.is_return:
        return Response({
            "success": False,
            "message": "This book has already been returned"
        }, status=status.HTTP_400_BAD_REQUEST)

    issue.is_return = True
    issue.retrun_at = timezone.now()
    issue.save(update_fields=["is_return", "retrun_at", "updated_at"])

    book = issue.book
    active_count = IssuedBook.objects.filter(book=book, is_return=False).count()
    book.is_issued = active_count > 0
    book.save(update_fields=["is_issued", "updated_at"])

    return Response({
        "success": True,
        "message": "Book return completed"
    }, status=status.HTTP_200_OK)
     