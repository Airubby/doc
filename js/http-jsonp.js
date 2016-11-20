//手写一个跨域的组件
(function(window, document, undefined) {
  'use strict';
  var jsonp = function(url, data, callback) {
	//1.挂载回调函数；
	var randomNum=Math.random().toString().replace('.','');
	var callbackName='my_callback'+randomNum;
	window[callbackName] = callback;   //挂载到window全局对象上
	
	//2.将data转换为url字符串的形式{id:1,name:'zhangsan'}=>id=1&name=zhangsan
	var queryString= url.indexOf('?') == -1 ? '?' : '&';
	for(var key in data){
		queryString+=key+'='+data[key]+'&';
					//id  =  1          &
	}
	//循环完：queryString=？id=1&name=zhangsan&
	
	//3.处理url中的回调参数； url+=callback=suiJiHanShuMing  
	//这里的callback可以为任意名字,如果调用的API要这个名字就必须这个名字了（比如豆瓣的API）
	//因为要append到页面前要先挂载，所以先在上面挂载了
	queryString+='callback='+callbackName;
	//循环完：queryString=？id=1&name=zhangsan&callback=my_json_callback036   假设为036
	
	//4.创建一个script标签
	var scriptElement=document.createElement('script');
	scriptElement.src=url+queryString;
	//要挂载上了才可以append到页面上
	
  	//5.将script标签放到页面中
	document.body.appendChild(scriptElement);
	//append后页面自动对这个地址发送请求，请求完成以后自动执行
	
  };
  
  window.$jsonp=jsonp;  //放到全局上
  
})(window, document);

//使用这个手写跨域的组件
(function(){
	$jsonp('http://api.douban.com/v2/movie/in_theaters',{count:10,start:4},function(data){
		document.getElementById('result').innerHTML = JSON.stringify(data);
	});
})();
