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

  return iter([data])
