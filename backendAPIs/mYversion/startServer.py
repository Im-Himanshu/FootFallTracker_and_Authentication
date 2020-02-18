import config
from gymsAPIs import gyms_apis  # all the apis class need to be imported here..
from gymMembersAPIs import gymMember_apis
from footfallAPIs import footFall_apis
app = config.app

app.register_blueprint(
    gyms_apis
)  # can give a common prefix to all as (account_api, url_prefix='/accounts');
app.register_blueprint(gymMember_apis)
app.register_blueprint(footFall_apis)


#jsut a demo for testign service if the url is up or not
@app.route("/")
def hello():
    return "Hello World!"


if __name__ == '__main__':
    app.run(debug=True)
