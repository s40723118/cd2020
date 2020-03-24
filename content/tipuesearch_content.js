var tipuesearch = {"pages": [{'title': 'About', 'text': 'Course Title: Collaborative Product Design and\xa0 Practice (short name: CD) \n Repository:  https://github.com/s40723118/cd2020 \n', 'tags': '', 'url': 'About.html'}, {'title': 'Grouping', 'text': '亂數分組: \n Base upon the Dart + Python random grouping system and the\xa0 https://github.com/mdecourse/wcms-scrum1 \xa0( https://wcms-scrum1.herokuapp.com/gear_index ), we may be able to create more collaborative product design service. \n Flask Python programs can be deployed at Heroku or self install Ubuntu server. (\xa0 https://mdecp2018.github.io/finalproject-bgx/content/Heroku%20%E8%A8%AD%E5%AE%9A.html )\xa0 \n https://mde.tw/cd2020/downloads/2020spring_cd_2a_list.txt \xa0was taken from\xa0 https://osa.nfu.edu.tw/ \xa0on Feb. 19, 2020. \n The most updated list:\xa0 http://s1.mde.nfu.edu.tw:8000/?semester=1082&courseno=0767 \xa0 \n semester: 1082 \n courseno for 2a:\xa0 0767 \n courseno for 2b: 0780 \n Under https protocol use port 7443, for http use port 8000. \n 學員名單 URL:      \n \n Dart source code for random grouping \n evenGrouping.dart: \n import \'dart:html\';\n \n  InputElement studListUrl = querySelector("#studListUrl");\n  String studUrl;\n  // 將 Label 改為 Textarea, 避免產生過程結果嵌入所在頁面\n  TextAreaElement output = querySelector("#output");\n \nmain() {\n  querySelector("#submit").onClick.listen((e) => grouping());\n}\n \ngrouping() {\n  output.innerHtml = "";\n \n  if (studListUrl.value != "") {\n    studUrl = studListUrl.value;\n  } else {\n    studUrl = \'https://mde.tw/group/downloads/2019fall_cp_1a_list.txt\';\n  }\n \n  // 組序由 1 開始\n  int gth = 1;\n  // 迴圈序號變數\n  int i;\n  int j;\n  int total;\n  int inc;\n  // 每組學員暫存數列\n  var gpList = [];\n  // 全班分組數列\n  var group = [];\n  // 各組人數數列\n  var numList = [];\n  var courseTitle = \'cd2020\';\n \n  HttpRequest.getString(studUrl).then((String resp) {\n    // 利用 trim() 去除字串最後的跳行符號, 之後再利用 split() 根據 \\n 轉為數列\n    var studList = resp.trim().split("\\n");\n    // 數列利用 shuffle() 方法以隨機方法弄亂順序\n    studList.shuffle();\n    total = studList.length;\n    output.text += "全班總計" + total.toString() + " 人\\n";\n    numList = getNumList(studList.length);\n    inc = 0;\n    for (i in numList){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth 有 " + i.toString() + " 人: \\n";\n      gpList = [];\n      for (j = 0; j < i; j++){\n        output.text += studList[j+inc] + "\\n";\n        // 在各分組數列中加入將對應的學員學號\n        gpList.add(studList[j+inc]);\n      }\n      gth = gth + 1;\n      inc = inc + j;\n        //output.text += studList[j] + "\\n";\n        // 逐步將各組暫存的分組數列加入全班分組數列中\n      gpList.sort();\n      group.add(gpList);\n    }\n    // 列出全班分組數列\n    output.text += group.toString() + "\\n";\n    // 列出已經排序後的分組名單\n    output.text += \'=\' * 25 + "\\n";\n    output.text += \'以下為排序後的各組成員名單: \\n\';\n    gth = 1;\n    /*\n    404231\n    s4052\n    4062\n    s4072\n    4082\n    5072\n    5083\n    */\n    // 先列出純文字以 \\n 跳行組員資料\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth \\n";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n        output.text += group[i][j] + "\\n";\n      }\n      gth = gth + 1;\n    }\n    \n    gth = 1;\n    // 最後列出超文件以 <br\\> 跳行組員資料, 包含倉儲與網站\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'\\n\' + \'=\' * 30 + "<br \\>";\n      output.text += "group $gth <br \\>";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n          if (group[i][j].startsWith(\'4052\') || group[i][j].startsWith(\'4072\')) {\n              output.text += "Repository: <a href=\'https://github.com/s" + \n                                      group[i][j] + "/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a>" + " | Site: <a href=\'https://s" + group[i][j] + \n                                      ".github.io/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a><br \\>";\n          }\n          else {\n              output.text += "Repository: <a href=\'https://github.com/" + \n                                      group[i][j] + "/" + courseTitle +"\'>" + group[i][j] + \n                                      "</a>" + " | Site: <a href=\'https://" + group[i][j] + \n                                      ".github.io/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a><br \\>";\n          }\n      }\n      gth = gth + 1;\n    }\n  });\n}\n \nList getNumList(int total){\n  // total student number\n  // int total = 65;\n  // initial each group expect to be "eachGrp" number of people\n  int eachGrp = 10;\n  // may divide into "grpNum" number of group\n  int grpNum = total ~/ eachGrp;\n  // vacant list\n  var splits = [];\n  // find remainder when total number divid into "grpNum" number of group\n  int remainder = total % grpNum;\n  // number of people in one group by calculation\n  int calGrp = total ~/ grpNum;\n \n  for (int i = 0; i < grpNum; i++) {\n    splits.add(calGrp);\n  }\n  //print(splits);\n \n  for (int i = 0; i < remainder; i++) {\n    splits[i] += 1;\n  }\n  //print(splits);\n  return splits;\n } \n index.html: \n <h1>亂數分組:</h1>\n學員名單 URL: <input type="text" id="studListUrl" size="50" value="https://mde.tw/wcm2020/downloads/2020spring_wcm_1a_list.txt"><br />\n<input type="submit" value="開始分組" id="submit"><br />\n<textarea id="output" cols="80" rows="10"></textarea> \n style.css: \n body {\n  color: white;\n  font-size: 20px;\n}\n\ninput, select, textarea {\nfont-size: 100%;\n} \n get_student.py \n from flask import Flask, request \nfrom flask_cors import CORS\n\nimport requests\nimport bs4\nimport ssl\n\n\'\'\'\nhttps://s1.mde.nfu.edu.tw:7443/?semester=1082&courseno=0767\ncd\n2a 1082/0767\n2b 1082/0780\n\n2a 1072/0777\n2b 1072/0790\n2a 1062/0788\n2a 1062/0802\n\nwcm\n1082/0744\n\n1072/0754\n1062/0765\n\nwcmj\n1082/2418\n\'\'\'\n\napp = Flask(__name__)\nCORS(app)\n\n@app.route(\'/studlist\')\n@app.route(\'/\')\ndef studlist():\n    semester = request.args.get(\'semester\')\n    courseno = request.args.get(\'courseno\')\n    if semester == None:\n        semester = \'1082\'\n    if courseno == None:\n        courseno = \'0744\'\n    \n    url = \'https://osa.nfu.edu.tw/query/studlist_ajax.php\'\n    post_var = {\'pselyr\': semester, \'pseqno\': courseno}\n\n    result = requests.post(url, data = post_var)\n\n    soup = bs4.BeautifulSoup(result.content, \'lxml\')\n    table = soup.find(\'table\', {\'class\': \'tbcls\'})\n    data = []\n    rows = table.find_all(\'tr\')\n    for row in rows:\n        cols = row.find_all(\'td\')\n        cols = [ele.text.strip() for ele in cols]\n        data.append([ele for ele in cols if ele]) # Get rid of empty values\n    output = ""\n    for i in data[2:]:\n        #print(i[0])\n        output +=i[0] + "\\n"\n    return output\n    #return  str(pselyr) + " + " +str(pseqno)\n\n# 即使在近端仍希望以 https 模式下執行\ncontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)\ncontext.load_cert_chain(\'localhost.crt\', \'localhost.key\')\n\n# 取 flaskapp.py 中的 uwsgi 變數設定\nuwsgi = False\nif uwsgi:\n    # 表示程式在雲端執行\n    application = app\nelse:\n    # 表示在近端執行, 以 python3 wsgi.py 執行\n    app.run(host=\'127.0.0.1\', port=5443, debug=True, ssl_context=context)\n \n nginx sites-available/default settings: \n server {\n    listen 8000;\n    server_name s1.mde.nfu.edu.tw;\n    charset utf-8;\n    \n    listen 7443 ssl;\n \n    location /static {\n        alias /home/kmol2019/course_studlist/static/;\n    }\n \n    location / {\n        include uwsgi_params;\n        uwsgi_pass  127.0.0.1:8087;\n    }\n    \n    ssl_certificate /etc/stunnel/localhost.crt;\n    ssl_certificate_key /etc/stunnel/localhost.key;\n    ssl_session_timeout 5m;\n    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;\n    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";\n    ssl_prefer_server_ciphers on;\n    try_files $uri $uri/ =404;\n} \n uwsgi7.ini \n [uwsgi]\nsocket = 127.0.0.1:8087\nuid = kmol2019\ngid = kmol2019\nplugins-dir = /usr/lib/uwsgi/plugins/\nplugin = python3\nmaster = true\nlogto = /var/log/uwsgi/emperor.log\nlogfile-chown = kmol2019:kmol2019\nprocesses = 4\nthreads = 2\nchdir = /home/kmol2019/course_studlist\nwsgi-file = /home/kmol2019/course_studlist/get_student.py \n /etc/systemd/system/cmsimfly.service \n', 'tags': '', 'url': 'Grouping.html'}, {'title': 'Grading', 'text': 'Grading percentage: \n Self-evaluation (30%) \n Peer Review (30%) \n Teacher Grading (40%) \n Grading content: \n Attendance, Github commits, website and blog maintenance, and note taking (40%) \n Assignment 1 presentation (Youtube and Reveal.js) (10%) \n Assignment 2 presentation (Youtube and Reveal.js) (10%) \n Assignment 3 presentation (Youtube and Reveal.js) (10%) \n Final Project (Youtube, Reveal.js and pdf report) (30%) \n \n', 'tags': '', 'url': 'Grading.html'}, {'title': 'KMOL2020', 'text': 'Create Portable Programming System for\xa0Windows 10: \n PortableGit:\xa0 https://git-scm.com/download/win \n MSYS2:\xa0 https://www.msys2.org/ \n Python 3.8.1:\xa0 https://www.python.org/downloads/ \n CMSiMDE:\xa0 https://github.com/mdecourse/cmsimde \n Flask:\xa0 https://github.com/pallets/flask \n lxml:\xa0 https://github.com/lxml/lxml \n bs4:\xa0 https://pypi.org/project/beautifulsoup4/ \n markdown:\xa0 https://github.com/Python-Markdown/markdown \n flask-cors:\xa0 https://github.com/corydolphin/flask-cors \n Pelican:\xa0 https://github.com/getpelican/pelican \n Reveal.js:\xa0 https://github.com/hakimel/reveal.js/ \n Leo Editor:\xa0 https://github.com/leo-editor/leo-editor \n SciTE:\xa0 https://www.scintilla.org/SciTEDownload.html \n Tiny C Compiler:\xa0 https://github.com/TinyCC/tinycc \n Fossil SCM:\xa0 https://www.fossil-scm.org/ \n Jupyterlab:\xa0 https://github.com/jupyterlab/jupyterlab \n Flutter:\xa0 https://github.com/flutter/flutter \n Visual Studio Code:\xa0 https://github.com/microsoft/vscode \n', 'tags': '', 'url': 'KMOL2020.html'}, {'title': 'Python', 'text': 'Create a Portable Python: \n Install Python 3.8.1 without pip \n PYTHONPATH \n get-pip.py \n start.bat \n @echo off\nset Disk=y\nsubst %Disk%: "data"\n\n%Disk%:\n\nset HomePath=%Disk%:\\home_mdecourse\nset HomeDrive=%Disk%:\\home_mdecourse\nset Home=%Disk%:\\home_mdecourse\nset USERPROFILE=%Disk%:\\home_mdecourse\n\nREM 將系統 Python 程式的 io 設為 utf-8\nset PYTHONIOENCODING="utf-8"\n\nset PYTHONPATH=%Disk%:\\py38\\DLLs;%Disk%:\\py38\\Lib;%Disk%:\\py38\\Lib\\site-packages;\nset PYTHONHOME=%Disk%:\\py38\n\nREM for flutter\nset java_home=%Disk%:\\java\\jdk8u222-b10\nset ANDROID_SDK_home=%Disk%:\\home_mdecourse\nset GRADLE_USER_home=%Disk%:\\home_mdecourse\nset ANDROID_SDK_ROOT=%Disk%:\\android\\sdk\nset ANDROID_Home=%Disk%:\\android\\sdk\\tools\n\nREM for putty\nset GIT_HOME=%CDisk%:\\portablegit\\bin\\\nset GIT_SSH=%Disk%:\\putty\\plink.exe\n\nset path_python=%Disk%:\\py38;%Disk%:\\py38\\Scripts;\nset path_msys2=%Disk%:\\msys64\\mingw64\\bin;\nREM coreutils is for compiling fossil scm\nset path_coreutils=%Disk%:\\coreutils-5.3.0\\bin;%Disk%:\\depends22_x64;\nset path_tcc=%Disk%:\\tcc;\nset path_cmake=%Disk%:\\cmake-3.10.1-win64-x64\\bin;\nset path_nodejs=%Disk%:\\nodejs;%Disk%:\\nodejs\\appdata\\roaming\\npm;\nset path_git=%Disk%:\\portablegit\\bin;\nset path_xming=%Disk%:\\Xming;\nset path_latex=%Disk%:\\Pandoc;%Disk%:\\TinyTeX\\bin\\win32;\nset path_flutter=%Disk%:\\java\\jdk8u222-b10\\bin;%Disk%:\\flutter\\bin;%Disk%:\\Android\\sdk;%Disk%:\\Android\\sdk\\tools;%Disk%:\\Android\\sdk\\tools\\bin;%Disk%:\\Android\\sdk\\platform-tools;%Disk%:\\flutter\\bin\\cache\\dart-sdk\\bin;%Disk%:\\vscode;\nset path_putty=%Disk%:\\putty;\n\npath=%Disk%:;%path_python%;%path_msys2%;%path_tcc%;%path_git%;%path_cmake%;%path_coreutils%;%path_flutter%;%path_putty%;%path_latex%;%path%;\n\nstart /MIN cmd.exe\nstart /MIN cmd.exe\nstart /MIN cmd.exe\nstart /MIN cmd.exe\n\nstart /MIN %Disk%:\\kmolScite\\SciTE.exe\nstart /MIN %Disk%:\\kmolScite\\SciTE.exe\n\nExit \n', 'tags': '', 'url': 'Python.html'}, {'title': 'Microcontroller', 'text': 'Login to your gm email and download\xa0 \n 2019_ArduinoApplied.pdf \n and\xa0 \n 2018_BeginningRoboticsWithRaspberry.pdf \n Arduino Simulator \n https://www.sites.google.com/site/unoardusim/ \n PIC Simulator Labortory \n https://github.com/lcgamboa/picsimlab \n https://lcgamboa.github.io/ \n https://mplabxpress.microchip.com/mplabcloud/ide \n Login to your gm account and  download all Microchip related tools . \n Rasberry Pi \n https://github.com/gavinlyonsrepo/RpiMotorLib \n Python-exemplary \n http://www.python-exemplary.com/ \n', 'tags': '', 'url': 'Microcontroller.html'}, {'title': 'MSYS2', 'text': 'https://www.msys2.org/ \n Y:\\py38\\Lib\\distutils\\distutils.cfg \n [build]\ncompiler=mingw32\n\n[build_ext]\ncompiler=mingw32 \n Reference \n https://github.com/KmolYuan/pyslvs/blob/master/platform/set_pycompiler.bat \n', 'tags': '', 'url': 'MSYS2.html'}, {'title': 'Pyslvs-UI', 'text': 'Compile and install python_solvespace library \n Pyslvs-UI requires  https://github.com/mdecourse/solvespace \xa0python_solvespace pyd\xa0dynamic library of the python branch. \n git clone --recurse-submodules  https://github.com/mdecourse/solvespace.git \xa0 \n cd solvespace \n git checkout python \n cd cython \n python setup.py install \n Compile and install Pyslvs-UI \n git clone --recurse-submodules  https://github.com/mdecourse/pyslvs-UI.git \n cd pyslvs-UI \n python -m pip install -r requirements.txt \n mingw32-make install \n \n', 'tags': '', 'url': 'Pyslvs-UI.html'}, {'title': 'Topics', 'text': '\n The products of the twenty - first century should be a sustainable service, designed to provide users with a quality of life experience. \n 二十一世紀的產品應該是一種永續服務, 旨在為用戶提供優質的生活體驗. \n KMOLab \n \n Topic 0: From Digital\xa0to Industrial + Engineering Product Design Collaboration \n Login to your gm email account and download \n DigitalProductCollaboration.pdf \n IndustrialAndEngineeringProductDesignCollaboration.pdf \n Can we create an english-english vocabulary collection service? \n https://www.autoitscript.com/forum/files/file/419-dictionary_bigdb/ \n Topic 1: Mechanical Design Process \n Login to your gm email account and download  MechanicalDesignProcess.pdf . \n (Can we build online tools to facilitate these processes?) \n Successful Design \n Building the\xa0Design \n Structural Considerations \n Materials and\xa0Processes \n Topic 2: Mechatronic System Design \n Login to your gm email account and download  MSModelingAndTFApproaches.pdf . \n (Can we build online tools to facilitate these processes?) \n Mechatronic Systems \n Mathematical Modeling \n Transfer Function Approaches \n Login to your gm email account and download  MechatronicDesignCases.pdf . \n DC Motor Velocity and Position Control \n Balancing Robot Control \n Magnetic Levitation System \n Topic 3: Mechatronic Future and Challenges \n Login to your gm email account and download  MechaFutureAndChallenges.pdf . \n Mechatronic Futures \n Mechatronics Disrupted \n Challenges in Mechatronics \n Login to your gm email account and download  MechaEducFutureNeed.pdf . \n Education to meet future need \n Login to your gm email account and  download all reference files . \n', 'tags': '', 'url': 'Topics.html'}, {'title': 'Mechanical Design', 'text': 'Frontend - backend and design process \n Frontend Dart: \n // 因為要使用超文件表單, 因此導入 html 程式庫\nimport "dart:html";\n\n// 每一個 Dart 程式都從 main() 開始執行\nmain() {\n  // 透過表單, 取得使用者輸入的溫度值, 語法為數字加上 C 或 F\n  InputElement tempInput = querySelector("#temp");\n  querySelector("#submit").onClick.listen((e) => pyconvert(tempInput.value));\n}\n\npyconvert(String data) {\n  // 準備將轉換結果顯示在 output Label 區\n  LabelElement output = querySelector("#output");\n  // 將 data 送到遠端 python flask 程式區\n  request(data);\n} // pyconvert\n\nrequest(String asset) {\n  var response = document.querySelector(\'#response\');\n  var url = \'http://localhost:5000/${asset}\';\n\n  HttpRequest.getString(url, onProgress: (_) => response.text = \'Loading ...\')\n      .then((resp) => response.setInnerHtml(\'<pre>${resp}</pre>\'))\n      .catchError((error) => response.text = \'ERROR !!!: ${error.toString()}\');\n}\n\n/* 以下為 Python Flask 伺服器端的程式碼, 可以接受 Dart 前端送來的字串, 進行溫度轉換運算後, 將結果傳回\nimport flask\n# 導入 flask_cors 模組中的 CORS\n# 目的在讓伺服器可以被遠端的 Dart 程式跨網域擷取資料\nfrom flask_cors import CORS\n\napp = flask.Flask(__name__)\n# 讓應用程式啟動後, 可以跨網域被截取資料\nCORS(app, support_credentials=False)\nglobal data\n\n@app.route(\'/\', methods =[\'POST\', \'GET\'])\ndef root():\n    if flask.request.method == \'POST\': \n        data = flask.request.form[\'data\'] \n        print(data)\n        resp = {"data": data}\n        output = flask.json.dumps(data)\n    else:\n        # 將 Python 中的 dictionary 資料透過 json 格式送出後\n        # 讓遠端的 Dart 程式可以擷取\n        data = {"a": 1, "b": data+"yen", "c": "字串"}\n        output = flask.json.dumps(data)\n    return output\n    \n@app.route(\'/<name>\', methods=[\'POST\', \'GET\'])\ndef convert(name):\n    #name[-1] 為字串最後一個字元\n    # name[:-1] 則為數字\n    if name[-1] is "F" or name[-1] is "f":\n        # 表示要將華氏溫度轉為攝氏\n        return FtoC(name[:-1])\n    else:\n        return CtoF(name[:-1])\n    \n#celsius = 5/9 ( fahrenheit − 32)\n#定義一個 celsius 轉 fahrenheit  函式\ndef CtoF(c):\n    return "攝氏" + c + "度=華氏" + str(round(int(c)*9/5 + 32, 2)) + "度"\n\n#定義一個 celsius 轉 fahrenheit  函式\ndef FtoC(f):\n    return "華氏" + f + "度=攝氏" + str(round((int(f) - 32)*5/9, 2)) + "度"\n\n\nif __name__ == \'__main__\':\n    # 內建的 Flask Web 啟動埠號為 5000\n    app.run()\n*/ \n Backend Python: \n import flask\n# 導入 flask_cors 模組中的 CORS\n# 目的在讓伺服器可以被遠端的 Dart 程式跨網域擷取資料\nfrom flask_cors import CORS\n \napp = flask.Flask(__name__)\n# 讓應用程式啟動後, 可以跨網域被截取資料\nCORS(app, support_credentials=False)\nglobal data\n \n@app.route(\'/\', methods =[\'POST\', \'GET\'])\ndef root():\n    if flask.request.method == \'POST\': \n        data = flask.request.form[\'data\'] \n        print(data)\n        resp = {"data": data}\n        output = flask.json.dumps(data)\n    else:\n        # 將 Python 中的 dictionary 資料透過 json 格式送出後\n        # 讓遠端的 Dart 程式可以擷取\n        data = {"a": 1, "b": data+"yen", "c": "字串"}\n        output = flask.json.dumps(data)\n    return output\n     \n@app.route(\'/<name>\', methods=[\'POST\', \'GET\'])\ndef convert(name):\n    #name[-1] 為字串最後一個字元\n    # name[:-1] 則為數字\n    if name[-1] is "F" or name[-1] is "f":\n        # 表示要將華氏溫度轉為攝氏\n        return FtoC(name[:-1])\n    else:\n        return CtoF(name[:-1])\n     \n#celsius = 5/9 ( fahrenheit − 32)\n#定義一個 celsius 轉 fahrenheit  函式\ndef CtoF(c):\n    return "攝氏" + c + "度=華氏" + str(round(int(c)*9/5 + 32, 2)) + "度"\n \n#定義一個 celsius 轉 fahrenheit  函式\ndef FtoC(f):\n    return "華氏" + f + "度=攝氏" + str(round((int(f) - 32)*5/9, 2)) + "度"\n \n \nif __name__ == \'__main__\':\n    # 內建的 Flask Web 啟動埠號為 5000\n    app.run() \n What can these programs do to the mechanical design process? \n Flutter  mobile frontend and Python backend? \n Learning Python? \n Login to gm account and download \n 2019_ABeginnersGuideToPython3Programming.pdf \n and \n 2019_AdvancedGuideToPython3Programming.pdf \n Learning Dart and Flutter? \n Login to gm account and download\xa0 \n 2020_ QuickStartGuideToDartProgramming.pdf \n and \n 2019_BeginningAppDevelopmentWithFlutter.pdf \n Flutter  mobile frontend, Python backend and  CoppeliaSim  through  remote API ? \n Flutter  mobile frontend,  Cython  backend and  Solvespace  through  Python Geometric Constranin Solver ? \n Learning C++? \n Login to gm account and download  2018_Book_BeginningC17.pdf . \n Also check into  MSYS2  for reference. \n Where can we save the data during a web/mobile frontend and backend based design process? \n Login to gm account and download \n 2019_BuildingRESTAPIsWithFlask.pdf \xa0 \n and \n 2010_TheDefinitiveGuideToSQLite.pdf \n Also check into\xa0 https://github.com/chiamingyen/pygrouf ,\xa0 https://github.com/mdecourse/wcms-scrum1 \xa0and\xa0 https://wcms-scrum1.herokuapp.com/gear_index \xa0for reference. \n Recall application of  Pro/Weblink \n Take  Pro/Weblink  as an example. Javascript is used as the frontend working with a local host Pro/Engineer under the trusted Internet Explorer environment to enable programmable 3d mechanical Part and Assembly processes. \n Download  2002_ProEweblinkUserGuide.pdf \n', 'tags': '', 'url': 'Mechanical Design.html'}, {'title': 'Topic1Author', 'text': 'Login to your gm account and download  2019_DesigningElectronicProductEnclosures.pdf \xa0(where the topic1 material taken from) \n Author’s Credentials \n By listing some of the corporations where I have worked, this should provide some background on where my experience comes from. \n Lincoln Electric Company \n I started in the drafting room running blue prints in 1964. By taking night school classes in drafting, I soon was given the chance to apprentice as a tool and die designer where I got experience in the basic skills of designing jigs and fixtures. Lincoln Electric is "world famous" for their profit sharing program and work ethic. (I would later teach beginning drafting at Chabot College, California, in 1980). \n Lawrence Livermore National Laboratory \n My first job after getting my master’s degree in mechanical engineering (from the University of Arizona, 1977) was in the Material Fabrication Group. Our mission to design and build a lathe capable of 0.000001 inch accuracy provided great experience. Additional experience in the design of experiments for laboratory programs proved invaluable for future work. \n Intel Corporation \n This is my first experience with the design of computer housings for "silicon valley." Intel was just expanding beyond chips and printed circuit board products, and they had plans to get into building computer systems. I’m on the cover of "Intel News" shown trying to measure fan noise of a prototype "tower computer" in 1982. I was very fortunate to experience the tremendous work ethic in the culture at Intel. \n Sytek Corporation \n This is my first design position where I had the responsibility of taking my own design thru all the stages of prototyping, tooling, testing, and manufacturing delivery. We installed our first CAD systems (CADAM) in 1986. \n This is the first company where I assumed some management responsibility and thus saw a more complete picture of where (mechanical) product design fits into a larger picture of the entire product delivery process. \n Trimble Navigation Limited \n This is my first designer position where I designed and documented with a CAD system (AutoCAD). \n My work here spanned nearly 25 years from 1988 thru 2013. We installed our first 3D CAD system (ProEngineer) in 1992. Trimble’s products (portable GPS instruments) are intended to work in outdoor environments, and their customers need these products to function under adverse conditions (shock, vibration, temperature extremes, rain). \n I spent my early years in the Marine Division, moved on to the Survey Division, and became manager of a Mechanical Engineering Group in 1995. While manager, I was responsible for budgeting, resourcing, prioritization, design, and documentation. I also served as (overall) project manager on a number of projects and thus experienced how the "mechanical piece" fits into the overall design of products.   All of the above corporations had different accepted working processes for overall product design and different corporate cultures to operate in. It’s hoped that most of the words written here serve as a valuable contribution to the reader’s design process regardless of the corporate cultures they are in. The above work resume certainly spans a history of both how computers came to be used in the design process and how the industries evolved in their design processes. The design tools and products made for the marketplace will continue to evolve in the future, but we will still need basic mechanical design fundamentals to positively affect the overall product design process. \n', 'tags': '', 'url': 'Topic1Author.html'}, {'title': 'Assignments', 'text': "Assignment 1: \n Due March 25, 2020  for class 2a and  March 26, 2020  for class 2b. \n 1. Describe how\xa0to\xa0do an efficient random grouping for this\xa0course or do the roll calling randomly? \n 2. Describe how to prepare a portable Python programming system for Windows 10 64bit system to allow one the maintain  CMSiMDE  website,  Pelican blog  and  Reveal.js  presentation on  Github ? \n 3. What do you need to know from\xa0 http://www.coppeliarobotics.com/helpFiles/index.html \xa0to implement a four-wheeled robot? \n Assignment 2: \n Due April 22, 2020  for class 2a and  April 23, 2020  for class 2b. \n 1.\xa0According to the material of Topic 0 and Topic 1, can you describe specifically what the mechanical design team need to do for accomplishing Assignment 1's\xa0 four wheeled robot. \n 2. What do you need to know from\xa0 https://cyberbotics.com/doc/guide/index   \xa0to implement a four-wheeled robot? \n W9: Midterm presentation \n Assignment 3: \n Due  May 27, 2020  for class 2a and  May 28, 2020  for class 2b. \n According to the reading of Topic 2 and Topic 3, propose a Mechatronic project by using  CoppeliaSim  or  Webots  and  Onshape . \n Final project: \n Due June 24, 2020. \n Realize\xa0your Mechatronic project and conclude with a presentation video and pdf report. \n", 'tags': '', 'url': 'Assignments.html'}, {'title': 'Reference', 'text': '', 'tags': '', 'url': 'Reference.html'}, {'title': 'Dart', 'text': 'https://flutter.dev/docs/reference/tutorials \n https://www.raywenderlich.com/4529993-getting-started-with-flutter \n https://www.raywenderlich.com/flutter/ \n https://github.com/SpinlockLabs/github.dart \n https://book.flutterchina.club/ \n https://github.com/CarGuo/gsy_flutter_book \n https://www.youtube.com/playlist?list=PLV2Iw811jLpWdAHToUqTuWYhYbjVfwS80 \n https://flutterbyexample.com/ \n', 'tags': '', 'url': 'Dart.html'}, {'title': 'SQLite', 'text': 'Build iOS Database Apps with Swift and SQLite (2016) \n https://link.springer.com/book/10.1007/978-1-4842-2232-4 \n Introducing SQLite for Mobile Developers (2015) \n https://link.springer.com/book/10.1007/978-1-4842-1766-5 \n The Definitive Guide to SQLite (2010) \n https://link.springer.com/book/10.1007/978-1-4302-3226-1 \n SQLite3 and C: \n Compiled with  MSYS2 \xa0and  SQLite3 : \n gcc sqlite_ex.c -lsqlite3 -o sqlite_ex.exe \n sqlite_ex.c query vocabulary from\xa0 https://github.com/mdecourse/lookupdict/blob/master/webster_vocabulary.sqlite \n sqlite_ex.c source code: \n #include <sqlite3.h>\n#include <stdio.h>\n\nint callback(void *, int, char **, char **);\n\nint main(void) {\n    \n    sqlite3 *db;\n    char *err_msg = 0;\n    \n    int rc = sqlite3_open("webster_vocabulary.sqlite", &db);\n    \n    if (rc != SQLITE_OK) {\n        \n        fprintf(stderr, "Cannot open database: %s\\n", \n                sqlite3_errmsg(db));\n        sqlite3_close(db);\n        \n        return 1;\n    }\n    \n    char *sql = "SELECT * FROM word where word=\'ABORT\'";\n        \n    rc = sqlite3_exec(db, sql, callback, 0, &err_msg);\n    \n    if (rc != SQLITE_OK ) {\n        \n        fprintf(stderr, "Failed to select data\\n");\n        fprintf(stderr, "SQL error: %s\\n", err_msg);\n\n        sqlite3_free(err_msg);\n        sqlite3_close(db);\n        \n        return 1;\n    } \n    \n    sqlite3_close(db);\n    \n    return 0;\n}\n\nint callback(void *NotUsed, int argc, char **argv, \n                    char **azColName) {\n    \n    NotUsed = 0;\n    \n    for (int i = 0; i < argc; i++) {\n\n        printf("%s = %s\\n", azColName[i], argv[i] ? argv[i] : "NULL");\n    }\n    \n    printf("\\n");\n    \n    return 0;\n} \n SQLite3 and Python: \n https://github.com/mdecourse/wcms-scrum1 \n SQLite3 and Dart: \n dart:ffi only for mobile and desktop \n from\xa0 https://www.sqlite.org/download.html \xa0download\xa0C source code as an amalgamation \n use  MSYS2 : \n gcc -shared sqlite3.c -o sqlite3.dll \n to get sqlite3.dll \n use git\xa0sparse-checkout from\xa0 https://github.com/dart-lang/sdk \xa0get \n https://github.com/dart-lang/sdk/tree/master/samples/ffi/sqlite \n cd y:\\tmp mkdir dart_sqlite cd dart_sqlite git init git config core.sparsecheckout true git remote add -f origin https://github.com/dart-lang/sdk.git echo samples/ffi/sqlite >> .git/info/sparse-checkout git pull origin master \n cd y:\\tmp\\ samples\\ffi\\sqlite \n pub get \n copy sqlite3.dll and  webster_vocabulary.sqlite  into\xa0y:\\tmp\\ samples\\ffi\\sqlite\\example \n use SciTE to execute main.dart: \n import "../lib/sqlite.dart";\n\nvoid main() {\n  Database d = Database("webster_vocabulary.sqlite");\n\n  Result result = d.query("select * from word where word=\'ABORT\';");\n  for (Row r in result) {\n    //String name = r.readColumnByIndex(1);\n    String word = r.readColumn("word");\n    String defn = r.readColumn("defn");\n    //print("$name $word $defn");\n    print("單字:$word 解說: $defn");\n  }\n  d.close();\n}\n \n package:js  is for web \n https://github.com/simolus3/moor/blob/master/moor/lib/src/web/sql_js.dart \n References: \n https://pub.dev/packages/f_orm_m8_sqlite \n \n \n', 'tags': '', 'url': 'SQLite.html'}, {'title': 'Fossil SCM', 'text': 'https://www.fossil-scm.org/ \n', 'tags': '', 'url': 'Fossil SCM.html'}, {'title': 'Jupyterlab', 'text': 'https://github.com/jupyterlab/jupyterlab \n', 'tags': '', 'url': 'Jupyterlab.html'}, {'title': 'AI', 'text': 'https://artint.info/2e/html/ArtInt2e.html \n https://github.com/SullyChen/Autopilot-TensorFlow \n https://towardsdatascience.com/how-a-high-school-junior-made-a-self-driving-car-705fa9b6e860 \n https://github.com/UvinduW/RCAutopilot \n', 'tags': '', 'url': 'AI.html'}, {'title': '每週進度', 'text': '', 'tags': '', 'url': '每週進度.html'}, {'title': 'w3', 'text': '', 'tags': '', 'url': 'w3.html'}, {'title': '了解四輪機器人', 'text': '翻譯 \n 路徑位置和長度計算方法 (Path position and length calculation methods) \n 沿著路徑對象，可以定義固有位置。該位置（也稱為路徑位置）與路徑對象的位置不同。雖然路徑對象的位置是路徑對象原點的位置（在選擇路徑時顯示為白色線框立方體），但是路徑位置或固有路徑位置是沿路徑的位置值 \n 路徑的 Bezier 點可以是不同的，也可以是重合的：想像一個焊接機器人，其末端執行器是焊接設備的尖端；在兩個連續的 Bezier 點之間，末端執行器可以： \n 在不改變方向的情況下執行平移（即沿著直線）（兩個 Bezier 點是不同的，但方向相同）。 \n 執行平移並更改方向（兩個 Bezier 點是不同的，並且方向不同）。 \n 在不改變位置的情況下執行旋轉（即更改方向）（兩個 Bezier 點重合但方向不同）。 \n 此外，在某些情況下，我們希望焊炬遵循預定的路徑，在某個特定位置暫停（例如，處理較大的焊接點），然後沿該路徑繼續前進。為了正確處理上述 3 種情況和特殊的暫停情況，重要的是能夠唯一地識別沿路徑（即路徑位置 * ）的任何位置 * （廣義上的位置）以及路徑長度 * （從更廣泛的意義上講是長度）。為此，用戶可以選擇幾種位置計算方法： \xa0 \n 路徑位置 * 被描述為沿路徑的累積線性變化。路徑長度 * 由下式給出： \n 路徑位置 * 被描述為沿路徑的累積角度 ** 變化。路徑長度 * 由下式給出： \n 路徑位置 * 被描述為沿路徑的累積（線性變化 + 角度 ** 變化）。路徑長度 * 由下式給出： \n 路徑位置 * 被描述為沿路徑的累積最大值（線性變化，角度 ** 變化）。路徑長度 * 由下式給出： \n 路徑位置 * 被描述為沿路徑的累積（線性變化，如果不為零，否則為角度 ** ）。路徑長度 * 由下式給出： \n 路徑位置 * 被描述為沿路徑的累積（角度 ** 變化，如果不為零，否則為線性變化）。路徑長度 * 由下式給出： \n 路徑位置 * 被描述為沿路徑的（線性變化，角度 ** 變化）的累積歐幾里德距離。路徑長度 * 由下式給出： \n 其中Δ l 和Δα分別是兩個連續的 Bezier 點之間的線性和角度變化。角度 ** 變化是規則角度變化乘以角度係數 c 。  c 稱為角度到線性的轉換係數，並且可以將角度值和線性值組合在一起。這意味著沿路徑的位置 * 或路徑長度 * 始終以線性單位（例如米）給出，而與上面選擇的位置計算方法無關。 \n \xa0 默認情況下，紅色標記的項為零。該術語可以看作是 Bezier 點（或路徑控制點）的虛擬距離或第四坐標（即每個 Bezier 點將由方向和位置（ x ， y ， z ， w ）定義，其中 w 是第四坐標）。這對於沿路徑歸檔暫停點很有用。是兩個連續的 Bezier 點之間的虛擬距離變化。  d 是虛擬距離變化的比例因子（例如，如果 d 加倍，則所有暫停點的暫停持續時間將是兩倍）。為簡化起見，在以下內容中我們將不再提及該術語並將其設為零。 \n 以下示例闡明了位置和長度計算概念： \n \n \n \n \n 要歸檔沿路徑的特定點處的運動暫停，請執行以下操作：創建3個相同的路徑控制點（位置和方向完全重合），並為中間控制點指定一個虛擬距離值，該值不得為零。在下面的示例中，在3個重合點的虛擬距離為2（在第一和中間重合控制點之間為1，在中間和第三重合控制點之間為1）。如果某個對像以每秒1米的速度沿路徑行進，則它將在重合的控制點處記錄2秒的暫停 \n \n \n 沿路徑運動 (Movement along a Path) \n 當前固有路徑位置在路徑上顯示為紅色球形（如果啟用了路徑位置顯示）。在模擬過程中，可以隨時使用 sim.setPathPosition 來控制球沿路徑的位置。確保了解如何計算路徑位置或路徑長度。 \n 要實際使對象沿路徑移動，首先需要將對象附加到虛擬對象，然後分配虛擬對像以遵循路徑位置（帶有可選的偏移量）。 \n 導入和導出路徑 (Importing and exporting paths) \n 路徑導入 / 導出功能可在 CSV 文件（逗號分隔值）上運行，該 CSV 文件可以用簡單的文本編輯器創建或讀取，但也可以輕鬆地導入 / 導出到 Microsoft Excel 等應用程序中。 \n 導入路徑 \n CoppeliaSim 的導入功能（ [ 菜單欄 -> 文件 -> 導入 -> CSV 的路徑 ...] ）逐行讀取值，其中每行對應一個控制點。每行應採用以下格式設置： \xa0 \n x ， y ， z ， alpha ， beta ， gamma ， relativeVelocity ， BezierPointCount ， interpolationFactor1 ， interpolationFactor2 ， \n virtualDistance ， auxiliaryFlags ， auxiliaryChannel1 ， auxiliaryChannel2 ， auxiliaryChannel3 ， auxiliaryChannel4 \n 其中內容相對應的意思： \n \xa0 （ x ， y ， z ）表示控制點在 METERS 中的位置 \n （α，β，γ）表示控制點的方向，以度數表示為歐拉角。默認值為（ 0,0,0 ）。 \n 相對速度已棄用。設為 1.0 \n BezierPointCount 是控制點所需的 Bezier 點數。默認值為 1 。 \n InterpolationFactor1 和 InterpolationFactor2 是在路徑控制點和 Bezier 點部分中描述的插值因子。默認值為 0.5 \n VirtualDistance ：虛擬距離值，添加到該控制點位置的路徑長度上，另請參見路徑位置或路徑長度計算方法。默認值為 0.0 \n 輔助標誌：可以用於各種目的的標誌，可以通過 sim.getDataOnPath 函數進行查詢。默認值為 0 。 \n 輔助通道 1-4 ：可以用於各種目的的值，可以通過 sim.getDataOnPath 函數進行查詢。默認值為 0.0 \n 除了前三個值（控制點位置坐標）外，所有其他值都可以省略，在這種情況下，將應用默認值。 \n 導出路徑 \n 通過選擇路徑，然後單擊 [ 菜單欄 -> 文件 -> 導出 -> 選定路徑為 CSV ...] ，可以導出路徑的控制點。在這種情況下，導出格式與前面描述的路徑導入格式相同。 \n 也可以通過選擇路徑，然後單擊 [ 菜單欄 -> 文件 -> 導出 -> 所選路徑的 Bezier 曲線為 CSV ...] 來導出路徑的 Bezier 點。在這種情況下，創建的文件（導出的文件）中的每一行都對應一個 Bezier 點，並包含以下值： \n \xa0 x ， y ， z ， alpha ， beta ， gamma ，相對速度，虛擬距離，輔助標記，輔助通道 1 ，輔助通道 2 ，assistantChannel3，auxiliaryChannel4 \n 路徑編輯模式 (Path edit mode) \n 初步說明：路徑編輯模式是一種方便且功能齊全的編輯路徑對象的方法。但是，可以在不進入用於最小化路徑修改的路徑編輯模式的情況下移動和擦除單個路徑點（選擇單個路徑點時，請確保沒有選擇除路徑之外的其他對象）。 \n 可以通過單擊相應的工具欄按鈕來訪問路徑編輯模式： \n \xa0 \n [ 路徑編輯模式工具欄按鈕 ] \n \xa0 上面的工具欄按鈕僅在選擇路徑後才有效。在路徑編輯模式下，窗口中通常顯示場景層次結構的部分用於將路徑控制點顯示為列表。可以使用鼠標選擇列表中的項目，就像在層次結構窗口中的對像一樣。 \n \n [ 路徑編輯模式 ] \n \xa0 現在可以像常規對像一樣選擇單個控制點。最後選擇的控制點以白色顯示，其他選擇的控制點以黃色顯示，未選擇的控制點以藍色顯示。以類似的方式，可以使用鼠標直接平移控制點，方法是使用工具欄的對象 / 項目平移工具欄按鈕在與視圖方向垂直的平面中平移所選的控制點： \n \xa0 \n [ 對象 / 項目翻譯工具欄按鈕 ] \n \xa0 在路徑編輯模式下，將顯示路徑編輯模式對話框： \n \xa0 \xa0 \n [ 控制點屬性對話框 ] \n \xa0 路徑已關閉：如果選中，則路徑的最後一個控制點將鏈接到其第一個控制點，以關閉路徑並使其循環運行。閉合路徑至少需要 3 個控制點。 \n 路徑是平坦的：如果選中，則所有控制點（以及隨後的所有 Bezier 點）都將約束到路徑對象的本地參考系的 z = 0 平面。 \n 自動定向：如果啟用，則將自動計算所有控制點和貝塞爾曲線點的定向，以使該點的 z 軸沿著路徑，其 y 軸指向其曲率向外（如果啟用了 x up ，則 y - 軸沒有特別限制）。如果禁用，則用戶確定控制點的方向，貝塞爾曲線點的方向將從路徑的控制點的方向內插。 \n 保持 x 向上：如果選中，則自動定向功能將使每個 Bezier 點的 z 軸沿路徑對齊，並使其 x 軸沿路徑對象的 z 軸指向。 \n 清除選擇：清除控制點的選擇。 \n 反轉選擇：反轉控制點的選擇狀態。 \n 製作虛擬對象：在選擇控制點的位置生成虛擬對象。 \n 貝塞爾曲線插值因子 1/2 ：有關詳細信息，請參見控制點和貝塞爾曲線部分。 \n 貝塞爾曲線點數：有關詳細信息，請參見控制點和貝塞爾曲線部分。 \n 虛擬距離：有關詳細信息，請參見關於沿路徑運動的部分。 \n 輔助標誌：可以用於各種目的的標誌，可以通過 sim.getDataOnPath 函數進行查詢。 \n 輔助通道 1-4 ：可以用於各種目的的值，可以通過 sim.getDataOnPath 函數進行查詢。 \n 為了精確定位控制點，請使用坐標和變換對話框。如果要編輯控制點的方向，請確保禁用路徑的“自動方向”選項（默認情況下啟用該選項）。 \n 常規鍵組合（即 ctrl-c ， ctrl-v ， delete 和 ctrl-x ）支持複製 / 粘貼 / 刪除 / 剪切操作。確保主視圖具有焦點，以便按鍵起作用。如果未選擇任何控制點，則黏貼操作會將復制的控制點黏貼到控制點列表的開頭，否則將黏貼到選定的控制點之後（確保不超過一個控制點）。在此階段選擇）。也可以通過彈出菜單或通過 [ 主菜單 -> 編輯 ] 訪問相同的複制 / 黏貼 / 刪除 / 剪切功能。其他操作包括： \n 在路徑的開頭插入新的路徑點 / 選擇後插入新的路徑點：如果未選擇任何控制點，則在路徑的開頭插入新的控制點；否則，在當前選擇之後插入新的控制點（請確保沒有其他內容）在這種情況下，選擇一個控制點）。 \n 從貝塞爾曲線創建新路徑：使用當前路徑的貝塞爾點生成一個新的路徑對象，即新路徑的控制點將為當前路徑的貝塞爾點。 \n 超頻樹 (OC trees) \n OC 樹是代表空間分區的對象。它由樹形數據結構組成，其中每個節點正好具有八個子代。佔用的葉節點表示為體素。  OC 樹可用於為形狀或點雲提供簡化的表示，或者可充當佔用網格 / 空間： \n \xa0 \n OC 樹是可碰撞，可測量和可檢測的對象。這意味著 OC 樹： \n 可用於與其他可碰撞對象的碰撞檢測。 \n 可與其他可測量對像一起用於最小距離計算。 \n 可以被接近傳感器檢測到。 \n OC 樹可以使用 [ 菜單欄 -> 添加 -> OC 樹 ] 添加到場景中，並通過 OC 樹屬性進行編輯。 \n CoppeliaSim 中可用的 OC 樹計算（即碰撞，距離和接近傳感器計算）也可以通過 Coppelia 幾何例程作為獨立例程使用。 \n \xa0 OC 樹屬性 (OC tree properties) \n OC 樹屬性是場景對象屬性對話框的一部分，該對話框位於 [ 菜單欄 -> 工具 -> 場景對象屬性 ] 。您還可以通過雙擊場景層次結構中的對像圖標或單擊其工具欄按鈕來打開對話框： \n \xa0 \n [ 場景對象屬性工具欄按鈕 ] \n \xa0 在場景對象屬性對話框中，單擊 OC 樹按鈕以顯示 OC 樹對話框（僅當最後選擇的是 OC 樹時才會顯示 OC 樹按鈕）。該對話框顯示最後選擇的 OC 樹的設置和參數： \n \xa0 \n [OC 樹對話框 ] \n \xa0 體素大小： OC 樹體素的大小。大小越小，用於 OC 樹數據結構的內存就越大。 \n 插入選定的可見對象：允許基於選定的可見對象插入體素。僅考慮虛擬對象，形狀，超頻樹和點雲。選擇要插入的所有對象，然後最後選擇目標 OC 樹對象。 \n 減去選定的可見對象：允許基於選定的可見對象刪除體素。僅考慮虛擬對象，形狀，超頻樹和點雲。選擇要插入的所有對象，然後最後選擇目標 OC 樹對象。 \n 清除 OC 樹：從 OC 樹中刪除所有體素。 \n 體素具有隨機顏色：每個體素將具有隨機顏色。 \n 顯示 OC 樹結構：顯示 OC 樹數據結構，主要用於調試目的。 \n 顏色是自發光的：體素將以自發光的顏色顯示。 \n 顯示點而不是體素：對於包含大量體素的 OC 樹，顯示可能會很慢。在這種情況下，您可以顯示像素體素，而不是立方體素。 \n 調整下一次插入的顏色：允許選擇新的顏色，該顏色將用於新的體素插入。     \n 點雲 (Point clouds) \n 點雲是充當基於 OC 樹的點容器的對象： \n \xa0 \n 點雲是可碰撞，可測量和可檢測的對象。這意味著點雲： \n 可用於與其他基於體積的可碰撞對象（例如 OC 樹）的碰撞檢測。 \n 可與其他可測量對像一起用於最小距離計算。 \n 可以被接近傳感器檢測到。 \n 可以使用 [ 菜單欄 -> 添加 -> 點雲 ] 將點雲添加到場景，並通過點雲屬性進行編輯。 \n CoppeliaSim 中可用的點雲計算（即碰撞，距離和接近傳感器計算）也可以通過 Coppelia 幾何例程作為獨立例程使用。 \n \xa0 點雲屬性 (Point cloud properties) \n 點雲屬性是場景對象屬性對話框的一部分，該對話框位於 [ 菜單欄 -> 工具 -> 場景對象屬性 ] 。您還可以通過雙擊場景層次結構中的對像圖標或單擊其工具欄按鈕來打開對話框： \n \xa0 \n [ 場景對象屬性工具欄按鈕 ] \n 在場景對象屬性對話框中，單擊“點雲”按鈕以顯示 OC 樹對話框（“點雲”按鈕僅在最後選擇的是點雲時出現）。該對話框顯示最後選擇的點雲的設置和參數： \n \n [ 點雲對話框 ] \n 不要使用 OC 樹計算。結構：默認情況下，點雲使用類似於 OC 樹的計算結構進行有效的點操作。此結構可能會減慢插入點和刪除點的速度。如果啟用此項目，則點插入將更加有效，但是點雲將不再可碰撞，不可測量或不可檢測，並且某些其他操作也可能會受到限制。您始終可以在以後的階段或通過 sim.setPointCloudOptions 切換此項目。 \n 最高體素大小：將包含點的 OC 樹體素的最大大小。大小越小，此點雲所基於的 OC 樹數據結構將使用的內存就越大。 \n 最高點數 / 體素：單個 OC 樹體素可以包含的最大點數。如果需要在此類體素中存儲更多點，它將被拆分為 8 個子體素，直到滿足約束條件為止。為了有效地進行碰撞檢測，距離計算和接近傳感器檢測，建議在單個體素中存儲大約 10-20 個點。 \n 插入選定的可見對象：允許基於選定的可見對象插入點。僅考慮虛擬對象，形狀，超頻樹和點雲。選擇要插入的所有對象，然後最後選擇目標點雲對象。形狀將事先轉換為具有指定構建分辨率的臨時 OC 樹。插入公差項允許通過指定用於確定是否插入點的最小距離公差來避免重複的點。插入公差 > 0.0 時，點插入將變慢。 \n 減去選定的可見對象：允許基於選定的可見對象減去點。僅考慮虛擬變量，超頻樹和點雲。選擇要減去的所有對象，然後最後選擇目標點雲對象。假人和點雲將使用減法公差值來標識要刪除的點。 \n 清除點雲：從點雲中刪除所有點。 \n 點具有隨機顏色：每個點將具有隨機顏色。 \n 顯示 OC 樹結構：顯示底層 OC 樹數據結構，主要用於調試目的。 \n 顏色是自發光的：點將以自發光的顏色顯示。 \n 點顯示比例：包含大量點的點雲可能會減慢渲染速度。通過將比率設置為小於 1 ，將為每個包含點的 OC 樹體素顯示更少的點數。這僅對顯示 / 渲染的圖像有影響。 \n 點大小：點的大小，以像素為單位。 \n 調整下一次插入的顏色：允許選擇一種新的顏色，該顏色將用於新的點插入。 \n 外部控制器教程 (External controller tutorial) \n 在 CoppeliaSim 中，有幾種方法可以控制機器人或仿真： \n 最方便的方法是編寫一個子腳本來處理給定機器人或模型的行為。這是最方便的方法，因為子腳本直接附加到場景對象，它們將與相關的場景對像一起復制，它們不需要使用外部工具進行任何編譯，它們可以在線程或非線程模式下運行，它們可以通過自定義 Lua 函數或 Lua 擴展庫進行擴展。使用子腳本的另一個主要優點是：與本節中提到的後 3 種方法（即使用常規 API ）一樣，沒有通信延遲，並且子腳本是應用程序主線程的一部分（固有的同步操作）。但是，編寫腳本有幾個缺點：您無法選擇編程語言，不能擁有最快的代碼，並且除了 Lua 擴展庫之外，無法直接訪問外部函數庫。 \n 可以控制機器人或模擬的另一種方法是編寫插件。插件機制允許使用回調機制，自定義 Lua 函數註冊，當然還可以訪問外部函數庫。插件通常與子腳本結合使用（例如，插件註冊自定義的 Lua 函數，當從子腳本中調用時，該 Lua 函數將回調特定的插件函數）。使用插件的主要優勢還在於，與本節中提到的後 3 種方法（即使用常規 API ）一樣，沒有通信延遲，並且插件是應用程序主線程的一部分（固有的同步操作）。插件的缺點是：它們的編程更加複雜，並且也需要使用外部編譯。另請參閱插件教程。 \n 控制機器人或模擬的第三種方法是編寫依賴於遠程 API 的外部客戶端應用程序。如果您需要從外部應用程序，機器人或另一台計算機運行控制代碼，這是一種非常便捷的方法。這也使您可以使用與運行真實機器人完全相同的代碼來控制仿真或模型（例如虛擬機器人）。遠程 API 有兩個版本：基於 B0 的遠程 API 和舊版遠程 API 。 \n \xa0 控制機器人或仿真的第五種方法是通過 ROS 節點。  ROS 與遠程 API 相似，是使多個分佈式進程相互通信的便捷方法。儘管遠程 API 非常輕巧且快速，但它僅允許與 CoppeliaSim 通信。另一方面， ROS 允許幾乎將任意數量的進程相互連接，並且提供了大量兼容的庫。但是，它比遠程 API 重並且更複雜。有關詳細信息，請參閱 ROS 接口。 \n 控制機器人或模擬的第六種方法是通過 BlueZero （ BØ ）節點。與 ROS 類似， BlueZero 是使多個分佈式進程相互通信的一種便捷方法，並且是一種輕量級的跨平台解決方案。有關詳細信息，請參考 BlueZero 界面。 \n 控制機器人或模擬的第七種方法是編寫一個外部應用程序，該應用程序通過各種方式（例如管道，套接字，串行端口等）與 CoppeliaSim 插件或 CoppeliaSim 腳本進行通信。選擇編程語言（可以是任何一種語言）和靈活性是兩個主要優點。同樣，控制代碼也可以在機器人或其他計算機上運行。但是，與使用遠程 API 的方法相比，這種控制仿真或模型的方法更加乏味。 \n 有 8 個與本教程相關的場景文件： \xa0 \n scenes / controlTypeExamples / 受控 ViaScript ：一個機器人是通過非線程子腳本控制的，另一個是通過線程子腳本控制的。 \n scenes / controlTypeExamples / 受控 ViaPlugin ：機器人是通過插件控制的。 \n scenes / controlTypeExamples / controlViaB0RemoteApi ：通過基於 B0 的遠程 API 來控制機器人。 \n scenes / controlTypeExamples / 受控 ViaLegacyRemoteApi ：通過舊版遠程 API 控制機器人。 \n scenes / controlTypeExamples / controlViaB0 ：通過 BlueZero 界面控制機器人。 \n scenes / controlTypeExamples / 受控 ViaRos ：通過 ROS 接口控制機器人。 \n scenes / controlTypeExamples / controlViaRos2 ：通過 ROS2 接口控制機器人。 \n scenes / controlTypeExamples / 受控 ViaTcp ：通過 LuaSocket 和 TCP 控制機器人。 \n \n 在所有 8 種情況下，都使用子腳本，主要是為了與外界建立鏈接（例如，啟動正確的客戶端應用程序，並將正確的對象句柄傳遞給它）。有兩種其他方法可以控制機器人，模擬或模擬器本身：使用自定義腳本或附加組件。但是，不建議將它們用於控制，而應使用在模擬未運行時處理功能。 \xa0 \n 例如，鏈接到場景控制的 ViaB0RemoteApi.ttt 中的機器人的子腳本具有以下主要任務： \n \xa0 使用某些對象句柄作為參數啟動控制器應用程序（ bubbleRobClient_b0RemoteApi ）。基於對象 B0 的遠程 API 的服務器功能由對象 b0RemoteApiServer 提供。 \n 作為另一個示例，鏈接到場景控制的 ViaRos.ttt 中的機器人的子腳本具有以下主要任務： \n 檢查是否已加載 CoppeliaSim 的 ROS 接口 \n 使用某些主題名稱或對象句柄作為參數啟動控制器應用程序（ rosBubbleRob ） \n 然而，作為另一個示例，鏈接到場景控制的 ViaTcp.ttt 中的機器人的子腳本具有以下主要任務： \n 搜索空閒的套接字連接端口 \n 使用所選的連接端口作為參數啟動控制器應用程序（ bubbleRobServer ） \n 本地連接到控制器應用程序 \n 在每次仿真過程中，將傳感器值發送到控制器，並從控制器讀取所需的電機值 \n 在每次模擬過程中，將所需的電機值應用於機器人的關節 \n 運行模擬，然後復制並粘貼機器人：您將看到重複的機器人將直接運行，因為附加的子腳本負責啟動各自外部應用程序的新實例，或調用適當的插件函數。 \n', 'tags': '', 'url': '了解四輪機器人.html'}, {'title': '心得', 'text': 'CoppeliaSim 裡面有許多功能可以供我們使用，例如裡面的假人可以被用來測量與機器人的距離，可以被偵測器偵測到的，同時具有可以放在路徑上做為輔助的對象……等，在這個電子書裡讓我訝異的是他的API 不是只有Python能用而已，可以用許多程式來寫API，讓我覺得自己所學的還不太足夠應該多加努力。', 'tags': '', 'url': '心得.html'}]};