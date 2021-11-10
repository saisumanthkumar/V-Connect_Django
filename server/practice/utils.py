def parse(data):
    json = {}
    if '&' not in data:
        item = data.split('=')
        json[str(item[0])] = str(item[1])
    else:
        all_data = data.split('&')
        for i in all_data:
            item = i.split('=')
            json[str(item[0])] = str(item[1]).replace('+',' ')
    return json