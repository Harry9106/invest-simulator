from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import force_authenticate

from .models import CustomUser


class AccountTests(APITestCase):

    def test_create_account(self):
        request = self.client.post('/api/v1/rest-auth/registration/', {
            'username': 'francisco213422',
            'password1': 'Francisco123',
            'password2': 'Francisco123',
            'email': 'fra123@gmail.com',
            'email2': 'fra123@gmail.com',
            'first_name': 'fanasdasd',
            'last_name': 'asddasdasj',
            'avatar': 1,
            }, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.get().username,
                         'francisco213422')

    def test_login(self):
        self.test_create_account()
        request = self.client.post('/api/v1/rest-auth/login/',
                                   {'username': 'francisco213422',
                                    'password': 'Francisco123'},
                                   format='json')
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        request = self.client.post('/api/v1/rest-auth/login/',
                                   {'username': 'francisco213422',
                                    'password': 'bad_pass'},
                                   format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    def test_profile(self):
        self.test_create_account()
        response = self.client.post('/api/v1/rest-auth/login/',
                                    {'username': 'francisco213422',
                                     'password': 'Francisco123'},
                                    format='json')
        request = self.client.get('/api/v1/users/profile/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data, {
            'email': 'fra123@gmail.com',
            'first_name': 'fanasdasd',
            'last_name': 'asddasdasj',
            'avatar': '1',
            })

    def test_update_user(self):
        self.test_create_account()
        response = self.client.post('/api/v1/rest-auth/login/',
                                    {'username': 'francisco213422',
                                     'password': 'Francisco123'},
                                    format='json')
        request = self.client.post('/api/v1/users/profile/edit/', {
            'original_email': 'fra123@gmail.com',
            'email': 'oo@oo.com',
            'first_name': 'admin',
            'last_name': 'hola',
            'avatar': '2',
            })
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(CustomUser.objects.get().avatar, '2')
        self.assertEqual(CustomUser.objects.get().email, 'oo@oo.com')
        self.assertEqual(CustomUser.objects.get().first_name, 'admin')
        self.assertEqual(CustomUser.objects.get().last_name, 'hola')

    def test_ranking(self):
        self.test_create_account()
        response = self.client.post('/api/v1/rest-auth/login/',
                                    {'username': 'francisco213422',
                                     'password': 'Francisco123'},
                                    format='json')
        request = self.client.get('/api/v1/users/ranking/',)
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_two_equal_users(self):
            request = self.client.post('/api/v1/rest-auth/registration/', {
                'username': 'francisco213422',
                'password1': 'Francisco123',
                'password2': 'Francisco123',
                'email': 'fra123@gmail.com',
                'email2': 'fra123@gmail.com',
                'first_name': 'fanasdasd',
                'last_name': 'asddasdasj',
                'avatar': 1,
            }, format='json')
            self.assertEqual(request.status_code, status.HTTP_201_CREATED)
            self.assertEqual(CustomUser.objects.get().username,
                             'francisco213422')
            request = self.client.post('/api/v1/rest-auth/registration/', {
                'username': 'francisco213422',
                'password1': 'Francisco123',
                'password2': 'Francisco123',
                'email': 'fra123@gmail.com',
                'email2': 'fra123@gmail.com',
                'first_name': 'fanasdasd',
                'last_name': 'asddasdasj',
                'avatar': 1,
            }, format='json')
            self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    def test_bad_create_account(self):
        request = self.client.post('/api/v1/rest-auth/registration/', {
            'username': '',
            'password1': 'Francisco123',
            'password2': 'Francisco123',
            'email': 'fra123@gmail.com',
            'email2': 'fra123@gmail.com',
            'first_name': 'fanasdasd',
            'last_name': 'asddasdasj',
            'avatar': 1,
            }, format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/rest-auth/registration/', {
            'username': 'asdasd',
            'password1': 'Francisco3',
            'password2': 'Francisco123',
            'email': 'fra123@gmail.com',
            'email2': 'fra123@gmail.com',
            'first_name': 'fanasdasd',
            'last_name': 'asddasdasj',
            'avatar': 1,
        }, format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/rest-auth/registration/', {
            'username': 'dasdasdas',
            'password1': 'Francisco123',
            'password2': 'Francisco123',
            'email': 'fra123@gmail.com',
            'email2': 'fra123@gmail.com',
            'first_name': '',
            'last_name': '',
            'avatar': 1,
        }, format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/rest-auth/registration/', {
            'username': 'dasdasdas',
            'password1': 'Francisco123',
            'password2': 'Francisco123',
            'email': 'fra123@gmail.com',
            'email2': 'fra123@gmail.com',
            'first_name': 'sadasd',
            'last_name': 'asdasd',
            'avatar': '',
        }, format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)
