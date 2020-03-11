from rest_framework import status
from rest_framework.test import APITestCase
from asset.models import Asset


class InvestmentsTests(APITestCase):

    def setUp(self):
        user = self.client.post('/api/v1/rest-auth/registration/', {
            'username': 'admin',
            'password1': 'Administrador',
            'password2': 'Administrador',
            'email': 'admin@gmail.com',
            'email2': 'admin@gmail.com',
            'first_name': 'Nombre',
            'last_name': 'Apellido',
            'avatar': 1,
            }, format='json')
        asset = Asset.objects.create(name='dolar', type='CURRENCY',
                                     buy=10.00, sell=15.00)

    def test_create_investment(self):
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 10.00,
            'type': 'BUY',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 1.00,
            'type': 'SELL',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)

    def test_invalid_create(self):
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 2,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 10.00,
            'type': 'BUY',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 'a',
            'old_sell': 47.03,
            'amount': 10.00,
            'type': 'BUY',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 'a',
            'amount': 10.00,
            'type': 'BUY',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 'a',
            'type': 'BUY',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 10.00,
            'type': 'BUYYY',
            'user': 1,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 10.00,
            'type': 'BUY',
            'user': 2,
            'visible': True,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/users/wallet/', {
            'asset': 1,
            'old_buy': 37.03,
            'old_sell': 47.03,
            'amount': 10.00,
            'type': 'BUY',
            'user': 1,
            'visible': 3,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_get_wallet(self):
        self.test_create_investment()
        request = self.client.get('/api/v1/users/wallet/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_get_transaction(self):
        self.test_create_investment()
        request = self.client.get('/api/v1/users/transaction/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_post_transaction(self):
        self.test_create_investment()
        request = self.client.post('/api/v1/users/transaction/',
                                   {'pk': 1}, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_204_NO_CONTENT)

    def test_get_public(self):
        self.test_create_investment()
        request = self.client.get('/api/v1/users/public/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)
