from django.db import models
# Create your models here.

class message_model(models.Model):
    username = models.CharField(max_length=40)
    message = models.TextField(max_length=500)
    time = models.TimeField(auto_now_add=True)

    def __str__(self) :
        return self.username

class users(models.Model):
    username = models.CharField(max_length=40)

    def __str__(self):
        return self.username