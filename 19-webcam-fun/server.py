def app(environ, start_response):
  path = environ.get("PATH_INFO")
  print(path)
  if (path == "/favicon.ico"):
    data = "Nope"
    start_response("200 OK", [("Content-Type", "text/plain"), ("Content-Length", str(len(data)))])
  elif (path == "/"):
    f = open("index.html")
    data = f.read()
    f.close()
    start_response("200 OK", [("Content-Type", "text/html"), ("Content-Length", str(len(data)))])
  elif (path == "/style.css"):
    f = open("style.css")
    data = f.read()
    f.close()
    start_response("200 OK", [("Content-Type", "text/css"), ("Content-Length", str(len(data)))])
  elif (path == "/scripts.js"):
    f = open("scripts.js")
    data = f.read()
    f.close()
    start_response("200 OK", [("Content-Type", "text/javascript"), ("Content-Length", str(len(data)))])

  return iter([data])
