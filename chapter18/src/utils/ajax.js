/* can introduct parseJson2Querystring into ajax method. typeof data == object/string to determine the type of data*/

/**
 * parse json to querystring since both get/post needs querystring
 * @method parseJson2Querystring
 * @param  {[json]}             {'name':'guanghui','age':19}
 * @return {[string]}           'name=guanghui&age=18'
 * usage:
 * 			var p = {
           "name": "guanghui",
           "age": 19,
           "hobby": "swim"
       };
       console.log(parseJson2Querystring(p));   //name=guanghui&age=19&hobby=swim
 */
function parseJson2Querystring(json) {
  var str = "";
  for (var key in json) {
    str += (key + "=" + json[key] + "&");
  }
  return str.slice(0, str.length - 1); //remove 'name=guanghui&age=19$' last "$"
}


/**
 * send ajax request
 * @param  {[string]} method      [Get or post]
 * @param  {[string]} url         [url]
 * @param  {[string]} data        ['name=guanghui&age=18']
 * @param  {[function]} fnSuccess [callback if sucess]
 * @param  {[function]} fnFail    [callback if fail]
 */
export function ajax({ method = 'get', url, data, fnSuccess, fnFail }) {
  if (typeof data !== 'string') {
    data = parseJson2Querystring(data);
  }

  //1.创建Ajax对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP") || new ActiveXObject("Msxml2.XMLHTTP");
  }

  if (method == 'get' && data) {
    url += '?' + data;
  }
  //2.连接服务器
  xhr.open(method, url, true);
  //3.发送请求
  if (method == 'get') {
    xhr.send();
  } else {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('content-type', 'urlencode');
    xhr.send(data);
  }
  //4.接收服务器的返回
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) { //完成
      if (xhr.status == 200) { //成功
        fnSuccess && fnSuccess(JSON.parse(xhr.responseText));
      } else {
        fnFail && fnFail('error: ' + xhr.status);
      }
    }
  };
}


/**
 * promise是commonJS下的一个规范: JS中的异步操作方式 thenjs whenjs deferred(jq)
 * ecmaScript 6中已经加入原生JS实现了promise
 * 状态 pending(等待): resolve(成功) reject(拒绝)
 * then方法: 调用 resolve reject 状态所对应的回调函数
 * ajax request based on promise
 * @param  {[string]} url  [url]
 * @param  {[string]} data ['name=guanghui&age=18']
 * usage:
 *   getJSON("/data.json").then(function(json) {
         console.log('Contents: ' + json);
     }, function(error) {
         console.error('出错了', error);
     });
 */
var getJSON = function (url, data) {
  var promise = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    if (data) {
      url += '?' + data;
    }
    xhr.open("GET", url, true); // xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
  });

  return promise;
};


/**
 * ajax request based on promise
 * @param  {[string]} method [get or post]
 * @param  {[string]} url    [url]
 * @param  {[string]} data   ['name=guanghui&age=18']
 * @return {[promise]}          [promise]
 * usage:
 * 	   ajaxPromise('get', location.origin + '/data.json', 'name=guanghui').then(function(json) {
           console.log('Contents: ' + json);
       }, function(error) {
           console.error('Error: ', error);
       });
 */
var ajaxPromise = function (method, url, data) {
  var promise = new Promise(function (resolve, reject) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP") || new ActiveXObject("Msxml2.XMLHTTP");
    }

    if (method == 'get' && data) {
      url += '?' + data;
    }
    xhr.open(method, url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");

    if (method == 'get') {
      xhr.send();
    } else {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      // xhr.setRequestHeader('content-type', 'urlencode');
      xhr.send(data);
    }

    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};


/**
 * send ajax request to different domain
 * @param  {[string]} method      [Get or post]
 * @param  {[string]} url         [url]
 * @param  {[string]} data        ['name=guanghui&age=18']
 * @param  {[function]} fnSuccess [callback if sucess]
 * @param  {[function]} fnFail    [callback if fail]
 */
function ajaxCrossDomain(method, url, data, fnSuccess, fnFail) {
  //1.创建Ajax对象
  var xhr = null;
  if (window.XDomainRequest) { //IE
    xhr = new XDomainRequest();
  } else {
    xhr = new XMLHttpRequest();
  }

  if (method == 'get' && data) {
    url += '?' + data;
  }
  //2.连接服务器
  xhr.open(method, url, true);
  //3.发送请求
  if (method == 'get') {
    xhr.send();
  } else {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('content-type', 'urlencode');
    xhr.send(data);
  }
  //4.接收服务器的返回
  xhr.onload = function () { // not recommend onreadystatechange
    if (xhr.readyState == 4) { //完成
      if (xhr.status == 200) { //成功
        fnSuccess && fnSuccess(xhr.responseText);
      } else {
        fnFail && fnFail('error: ' + xhr.status);
      }
    }
  };
}


/**
 * upload file
 * @param  {[string]} method      [Get or post]
 * @param  {[string]} url         [url]
 * @param  {[string]} data        ['name=guanghui&age=18']
 * @param  {[function]} fnSuccess [callback if sucess]
 * @param  {[function]} fnFail    [callback if fail]
 * usage:
 *  		 // after clicking "upload" button:
         var fd = new FormData();
         fd.append('file', oFile.files[0]); // name=value, oFile is input type=file
         // fd is data
         ajaxUpload('server/upload', fd, function(ev) {
             var scale = ev.loaded / ev.total;
             oDiv2.style.width = 500 * scale + 'px';
             oDiv3.innerHTML = parseInt(scale * 100) + '%';
         }, function() {
             console.log('发送完成');
         }, function() {
             console.log('wrong');
         });
 */
function ajaxUpload(url, data, fnProcess, fnSuccess, fnFail) {
  // 1.创建Ajax对象
  var xhr = null;
  if (window.XDomainRequest) { //IE
    xhr = new XDomainRequest();
  } else {
    xhr = new XMLHttpRequest();
  }

  //2.连接服务器
  xhr.open('post', url, true);

  //3.发送请求，申明发送头信息，通过ajax提交二进制数据
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(data);

  // xhr.upload: ajax上传对象object XMLHttpRequestUpload
  // xhr.upload.onprogress : 发送中
  // ajax对象本身也有这些相关的事件
  // xhr.onload xhr.onprogress ...

  // 发送过程中
  if (fnProcess) {
    xhr.upload.onprogress = fnProcess;
  }

  // 发送完成
  if (fnSuccess) {
    xhr.upload.onload = fnSuccess;
  }

  // 4.接收服务器的返回
  xhr.onload = function () { // not recommend onreadystatechange
    if (xhr.readyState == 4) { //完成
      if (xhr.status == 200) { //成功
        fnSuccess && fnSuccess(xhr.responseText);
      } else {
        fnFail && fnFail('error: ' + xhr.status);
      }
    }
  };
}
