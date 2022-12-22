from rest_framework.test import APIClient, APITestCase
from django.urls import reverse
from .models import Calendar, DailyPlan, Meal, User, MealComponent, Recipe, Ingredient, RecipeIngredient, Like, Favorite

class ExtractorTestCase(APITestCase):
  def test_invalid_url(self):
    client = APIClient()
    user = User.objects.create(username='rikooo')
    client.force_authenticate(user=user)
    response = client.post(reverse('extract_recipe'), {'url': 'aaaaaaaa'}, format='json')
    self.assertEqual(response.content, b'{"error": "Invalid URL!"}')
  