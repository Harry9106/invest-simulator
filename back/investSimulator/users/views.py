from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from .serializers import UserProfileSerializer
from .utils import getRankingList, setUsersRank

from rest_auth.registration.views import RegisterView


class CustomRegisterView(RegisterView):
    def create(self, request, *args, **kwargs):
        """
        Metodo que crea un usuario y setea su atributo rank.
        """
        response = super().create(request, *args, **kwargs)
        setUsersRank()
        return response


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def current_user_profile(request):
    """
    Metodo que devuelve los datos del usuario actual.
    """
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def edit_user_profile(request):
    """
    Metodo que actualiza los datos de un usuario.
    """
    serializer = UserProfileSerializer(request.user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def ranking(request):
    """
    Metodo que devuelve el ranking de usuarios.
    """
    rank = getRankingList()
    return Response(rank, status=status.HTTP_200_OK)
