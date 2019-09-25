(function (window,document,undefined) {
	'use strict'
	var jsonp=function (url,data,callback) {
		//挂载回调函数
		var cbFuncName='my_jsonp_'+Math.random().toString().replace('.','')
		window[cbFuncName]=callback

		//将data转换为url字符串形式
		var querystring=url.indexOf('?')==-1? '?':'&'
		for(var key in data){
			querystring+=key+'='+data[key]+'&'
		}

		//处理url地址中的回调参数
		querystring+='callback='+cbFuncName
		//创建一个script标签
		var scriptElement=document.createElement('script')
		scriptElement.src=url+querystring

		//将script标签放在页面上
		document.body.append(scriptElement)
	}
	window.$jsonp=jsonp
})(window,document)
