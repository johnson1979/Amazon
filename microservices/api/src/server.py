from src import app
from flask import Flask,render_template,request,redirect
import requests
import json



@app.route("/")
@app.route("/home")
def home():
        # This is the url to which the query is made
    url = "https://data.acidify29.hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "product",
            "columns": [
                "*"
            ]
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)



    return(resp.content)


@app.route("/signup",methods=['GET','POST'])
def signup():




    if request.method=="POST":
        uname=request.form["uname"]
        email=request.form["email"]
        phone=request.form["phone"]
        password=request.form["password"]

        # This is the url to which the query is made
        url = "https://auth.acidify29.hasura-app.io/v1/signup"

        # This is the json payload for the query
        requestPayload = {
            "provider": "username",
            "data": {
                "username": uname,
                "password": password
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
        data=json.loads(resp.content.decode("UTF-8"))
        hasura_id=data['hasura_id']
        token=data['auth_token']
        # This is the url to which the query is made
        url = "https://data.acidify29.hasura-app.io/v1/query"

        # This is the json payload for the query
        requestPayload = {
            "type": "insert",
            "args": {
                "table": "customer",
                "objects": [
                    {
                        "hasura_id": hasura_id,
                        "name": uname,
												"phone": phone,
                        "email": email

                    }
                ]
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
        data=json.loads(resp.content.decode("UTF-8"))
    return uname

@app.route("/login" ,methods=["GET","POST"])
def login():

    if request.method=="POST":
        uname=request.form["uname"]
        password=request.form["password"]
        # This is the url to which the query is made
        url = "https://auth.acidify29.hasura-app.io/v1/login"

        # This is the json payload for the query
        requestPayload = {
            "provider": "username",
            "data": {
                "username": uname,
                "password": password
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)



    return (resp.content)

@app.route('/userinfo/<int:hasura_id>')
def userinfo(hasura_id):
    # This is the url to which the query is made
    url = "https://data.acidify29.hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "customer",
            "columns": [
                "name",
                "email",
                "phone"
            ],
            "where": {
                "hasura_id": {
                    "$eq": hasura_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    return (resp.content)


@app.route("/logout/<string:token>")
def logout(token):
        # This is the url to which the query is made
    url = "https://auth.acidify29.hasura-app.io/v1/user/logout"

    # This is the json payload for the query
    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, headers=headers)


    return(resp.content)

@app.route("/addtocart/<int:hasura_id>/<int:prod_id>")
def addtocart(hasura_id,prod_id):
    # This is the url to which the query is made
    url = "https://data.acidify29.hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "cart",
            "columns": [
                "prod_id"
            ],
            "where": {
                "hasura_id": {
                    "$eq": hasura_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    pdata=json.loads(resp.content.decode("UTF-8"))
    plist=[]
    status=False
    for p in pdata:
        plist.append(p['prod_id'])


    for i in plist:
        if prod_id is i:
            status=True


    if(status is False):
        # This is the url to which the query is made
        url = "https://data.acidify29.hasura-app.io/v1/query"

        # This is the json payload for the query
        requestPayload = {
            "type": "insert",
            "args": {
                "table": "cart",
                "objects": [
                    {
                        "prod_id": prod_id,
                        "hasura_id": hasura_id
                    }
                ]
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
        return (resp.content)
    else:
        return "sorry!item already added to cart"



@app.route("/cartitems/<int:hasura_id>")
def cartitems(hasura_id):
    # This is the url to which the query is made
    url = "https://data.acidify29.hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "cart",
            "columns": [
                "prod_id"
            ],
            "where": {
                "hasura_id": {
                    "$eq": hasura_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
    data=json.loads(resp.content.decode("UTF-8"))
    l=[]
    pid=None
    for id in data:
        pid=id['prod_id']
        l.append(pid)

    # This is the url to which the query is made
    url = "https://data.acidify29.hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "product",
            "columns": [
                "name",
                "price",
                "discount",
                "owner"
            ],
            "where": {
                "id": {
                    "$in": l


                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
    data=json.loads(resp.content.decode("UTF-8"))
    total_price=0
    for p in data:
        total_price+=int(p['price'])


    return(resp.content)




