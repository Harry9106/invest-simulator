from rest_framework import status
from rest_framework.test import APITestCase


class AccountTests(APITestCase):

    def test_asset_list(self):
        response = self.client.post('/api/v1/rest-auth/registration/', {
            'username': 'francisco213422',
            'password1': 'Francisco123',
            'password2': 'Francisco123',
            'email': 'fra123@gmail.com',
            'email2': 'fra123@gmail.com',
            'first_name': 'fanasdasd',
            'last_name': 'asddasdasj',
            'avatar': 1,
        }, format='json')
        response = self.client.post('/api/v1/rest-auth/login/',
                                    {'username': 'francisco213422',
                                     'password': 'Francisco123'},
                                    format='json')
        request = self.client.get('/api/v1/assets/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)
