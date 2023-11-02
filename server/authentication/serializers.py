from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from django.utils import timezone
from ecommerceapp.models import Customer

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        #hide from displaying
        extra_kwargs = {
            'password': {'write_only': True}
        }

    #Hash Password
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        if instance is not None:
            Customer.objects.create(user=instance)
        return instance