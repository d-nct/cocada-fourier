from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def menu():
    return render_template("index.html")

@app.route("/1")
def page1():
    return render_template("1.html")

@app.route("/2")
def page2():
    return render_template("2.html")

@app.route("/3")
def page3():
    return render_template("3.html")

@app.route("/4")
def page4():
    return render_template("4.html")

@app.route("/relatorio")
def relatorio():
    return render_template("relatorio.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True) # ipv4
    #app.run(host='::', port=5000, debug=True) # ipv6