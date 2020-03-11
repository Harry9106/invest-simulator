from rest_framework import status
from rest_framework.test import APITestCase

from .utils import check_alarms
from asset.models import Asset
from .models import Alarm


class AlarmsTests(APITestCase):

    def setUp(self):
        """
        Setup donde se definen objetos necesarios para los test.
        """
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

    def test_create_alarm(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'HIGH',
            'threshold': 14.00,
            'user': 1,
            'status': True,
            }, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)

    def test_invalid_create_alarm(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'high',   # Invalid type of alarm
            'threshold': 20.00,
            'user': 1,
            'status': False,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'HIGH',
            'threshold': 'a',   # Invalid threshold
            'user': 1,
            'status': False,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'HIGH',
            'threshold': 20.00,
            'user': 2,          # Invalid user
            'status': False,
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'HIGH',
            'threshold': 20.00,
            'user': 1,
            'status': 3,        # Invalid status
            }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'HIGH',
            'threshold': 0,     # Invalid threshold
            'user': 1,
            'status': False,
        }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'sell',
            'alarm_type': 'HIGH',
            'threshold': 20,
            'user': 1,
            'status': False,
        }, format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_delete_alarm(self):
        self.test_create_alarm()
        request = self.client.post('/api/v1/alarms/list/', {'pk': 1},
                                   format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_200_OK)
        request = self.client.post('/api/v1/alarms/list/', {'pk': 10},
                                   format='json')
        self.assertEqual(request.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_get_list_alarms(self):
        """
        Para ejecutar este test se necesita tener el server de la bolsa activo
        """

        self.test_create_alarm()
        request = self.client.get('/api/v1/alarms/list/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_check_alarm_sell_high_t(self):
        self.test_create_alarm()
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, False)

    def test_check_alarm_sell_high_f(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'HIGH',
            'threshold': 16.00,
            'user': 1,
            'status': False,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, True)

    def test_check_alarm_sell_low_t(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'LOW',
            'threshold': 16.00,
            'user': 1,
            'status': True,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, False)

    def test_check_alarm_sell_low_f(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'SELL',
            'alarm_type': 'LOW',
            'threshold': 14.00,
            'user': 1,
            'status': False,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, True)

    def test_check_alarm_buy_low_t(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'BUY',
            'alarm_type': 'LOW',
            'threshold': 16.00,
            'user': 1,
            'status': True,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, False)

    def test_check_alarm_buy_low_f(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'BUY',
            'alarm_type': 'LOW',
            'threshold': 10.00,
            'user': 1,
            'status': False,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, True)

    def test_check_alarm_buy_high_t(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'BUY',
            'alarm_type': 'HIGH',
            'threshold': 9.00,
            'user': 1,
            'status': True,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, False)

    def test_check_alarm_buy_high_f(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'BUY',
            'alarm_type': 'HIGH',
            'threshold': 10.00,
            'user': 1,
            'status': False,
        }, format='json')
        alarm = Alarm.objects.get(pk=1)
        alarm.check_alarm()
        self.assertEqual(alarm.status, True)

    def test_utils_check_alarms(self):
        request = self.client.post('/api/v1/alarms/alarm/', {
            'asset': 1,
            'alarm_price': 'BUY',
            'alarm_type': 'HIGH',
            'threshold': 9.00,
            'user': 1,
            'status': True,
        }, format='json')
        check_alarms()
        alarm = Alarm.objects.get(pk=1)
        self.assertEqual(alarm.status, False)
