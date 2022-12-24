from rest_framework.test import APIClient, APITestCase
from django.urls import reverse
from .models import Calendar, DailyPlan, Meal, User, MealComponent, Recipe, Ingredient, RecipeIngredient, Like, Favorite



#IMPORTANT: RUN THE TEST COMMAND WITH --keepdb! (python3 manage.py test --keepdb)
class ExtractorTestCase(APITestCase):
  
  def setUp(self):
    self.client = APIClient()
    user = User.objects.get(username='rikooo')
    self.client.force_authenticate(user=user)
  
  def test_invalid_url(self):
    response = self.client.post(reverse('extract_recipe'), {'url': 'aaaaaaaa'}, format='json')
    self.assertEqual(response.content, b'{"error": "Invalid URL!"}')
  
  def test_existing_url(self):
    response = self.client.post(reverse('extract_recipe'), {'url': 'https://www.allrecipes.com/recipe/24059/creamy-rice-pudding/'}, format='json')
    self.assertEqual(response.content, b'{"id": 1}')
  
  def test_excessively_long_recipe(self):
    response = self.client.post(reverse('extract_recipe'), {'url': 'https://thewoksoflife.com/chinese-hot-pot-at-home/'}, format='json')
    self.assertEqual(response.content, b'{"error": "Invalid URL!"}')