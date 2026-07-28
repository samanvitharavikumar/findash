from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def transaction_list(request):

    if request.method == "POST":

        serializer = TransactionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    transactions = Transaction.objects.filter(user=request.user)

    serializer = TransactionSerializer(
        transactions,
        many=True
    )

    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_transaction(request, id):

    try:
        transaction = Transaction.objects.get(
            id=id,
            user=request.user
        )

    except Transaction.DoesNotExist:
        return Response(status=404)

    transaction.delete()

    return Response(status=204)
@api_view(["PUT"])
def update_transaction(request, id):

    try:
        transaction = Transaction.objects.get(id=id)

    except Transaction.DoesNotExist:
        return Response(
            {"error": "Transaction not found"},
            status=404
        )

    serializer = TransactionSerializer(
        transaction,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)
@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=201
        )

    return Response(serializer.errors, status=400)