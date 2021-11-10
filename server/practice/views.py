from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .utils import parse
from .models import message_model,users
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

online_users = []

@csrf_exempt
def message(request,name):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        try:
            req_data = parse(body)
        except:
            req_data = eval(body)
        try:
            message_model(username = req_data['username'],message= req_data['message']).save()
            return JsonResponse({"status":'successfully sent the message'})
        except:
            return JsonResponse({"status":'message failed to send'})

    json_data = []
    data = message_model.objects.all()
    for i in data:
        json_data.append({
            'id':i.pk,
            'username':i.username,
            'message':i.message,
            'time':i.time.strftime('%I:%M %p')
        })
    return JsonResponse({'messages':json_data})

@csrf_exempt
def allUsers(request):
    if request.method == 'POST':

        body = request.body.decode('utf-8')
        try:
            req_data = parse(body)
        except:
            req_data = eval(body)

        if req_data['method'] == 'online':
            users(username=req_data['username']).save()

        elif req_data['method'] == 'offline':
            users.objects.filter(username=req_data['username']).delete()

    json_data = []
    data = users.objects.all()
    for i in data:
        json_data.append(i.username)
    return JsonResponse({'all_users':json_data})