# Invest Simulator

Proyecto Invest Simulator desarrollado para la materia Ingenieria del Software.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Python 3.6.6
Django 2.1.2
nodejs 10.4
npm 6.x
```

### Installing

A step by step series of examples that tell you how to get a development env running

#### Install

```
virtualenv env

source env/bin/activate

pip3 install django

pip3 install djangorestframework

pip3 install django-allauth

pip3 install django-rest-auth

pip3 install django-cors-headers

pip install django-crontab

```
#### To run the Mock

```
You have to be in 'mock/mockserver' directory

python manage.py makemigrations

python manage.py makemigrations asset

python manage.py makemigrations historialasset

python manage.py migrate

python manage.py createsuperuser

```
#### To run the server

```
You have to be in 'back/investSimulator' directory

python manage.py makemigrations

python manage.py makemigrations users

python manage.py makemigrations asset

python manage.py makemigrations investments

python manage.py migrate

python manage.py createsuperuser

```

##### Sqlite3 command

Install sqlite3 on linux and run the next command to load asset data:

```
cat asset-data.sql | sqlite3 db.sqlite3
```

##### Run django server

```
python manage.py runserver

```

#### To run the client

```
Open new terminal in 'frontend' directory.

npm install react-scripts

npm install react-datetime-picker

npm install react-easy-chart

npm start
```
#### To run the tests

```
You have to be in 'back/investSimulator' directory

You have to have running the mock

python manage.py makemigrations

python manage.py makemigrations users

python manage.py makemigrations asset

python manage.py makemigrations investments

python manage.py migrate

python manage.py test

```
#### To see the coverage

```
You have to be in 'back/investSimulator' directory

pip install coverage

coverage run --source='.' manage.py test

you can see the report in two ways :
    
    1. coverage report -m
    (to see the report in terminal)
    
    2. coverage html
    (to see the report pretty, you find the report in htmlcov/ )

```
