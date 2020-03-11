from .models import CustomUser


def setUsersRank():
    """
    Metodo que setea el atributo rank de todos los usuarios.
    """

    rank = list(CustomUser.objects.all())

    rank.sort(key=lambda user: user.wallet_quote(), reverse=True)

    for user in rank:
        user.rank = rank.index(user) + 1
        user.save()


def getRankingList():
    """
    Metodo que devuelve una lista con el ranking de usuarios.
    """

    res = []
    setUsersRank()
    rank = list(CustomUser.objects.all())
    rank.sort(key=lambda user: user.rank, reverse=False)
    for user in rank:
        res.append({"rank": user.rank, "username": user.username,
                    "total": user.wallet_quote()})
    return res
