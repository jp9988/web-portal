// js动态控制轮播图
$(function(){
	$(window).on("resize",function(){
		// 1.1 获取窗口的宽度
		let clientW = $(window).width();
		// 1.2设置临界值
		let isShowBigImage = clientW >= 800;
		// 1.3获取所有的item
		let $allItem = $("#lk_carousel .item");
		// 1.4遍历
		$allItem.each(function(index,item){
			// 1.4.1取出图片的路径
			let src = isShowBigImage ? $(item).data("lg-img") : $(item).data("sm-img");
			let imgUrl = 'url("' + src + '")';
			// 1.4.2设置背景
			$(item).css({
				backgroundImage:imgUrl
			});
			// 1.4.3设置img标签
			if(!isShowBigImage){
				// 当屏幕宽度小于800px时 则显示640x340像素图片
				let $img = "<img src='" + src + "'>";
				$(item).empty().append($img);
			}else{
				// 当屏幕宽度大于800px时，则显示2000x410像素图片，移除640x340像素图片
				$(item).empty()
			}
		});
	});
	$(window).trigger("resize");
	
	// 工具提示
	$('[data-toggle="tooltip"]').tooltip();
	
	// 动态实现选项卡宽度
	$(window).on("resize",function(){
		let $ul = $("#lk_product .nav");
		let $allList = $("[role='presentation']",$ul);
		// 遍历
		let totalW = 0;
		$allList.each(function(index,item){
			totalW += $(item).width();
		});
		
		//获取父标签宽度
		let parentW = $ul.parent().width();
		
		// 设置宽度
		if(totalW > parentW){
			$ul.css({
				width:totalW + "px"
			})
		}else{
			$ul.removeAttr('style');
		}
	});
	
	// 导航切换 导航处理
	let allLis = $("#lk_nav li");
	let list = ['#lk_about','#lk_product','#lk_hot','#lk_hot','#lk_link','#lk_footer']

	allLis.mouseenter(function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		let idx = $(this).index();
		$(allLis[idx]).on("click",function(){
			$("html,body").animate({scrollTop:$(list[idx]).offset().top},1000)
		});
	});
	
	//个人中心鼠标移入移出
	$('#person li').mouseleave(function(){
		$(this).removeClass('active');
	});
	
	// 启动滚动监听插件
	$('body').scrollspy({ target: '#navbar-example' })
	// 每当一个新条目被激活后都将由滚动监听插件触发此事件。
	$('#body').on('activate.bs.scrollspy', function () {
		console.log('正在触发事件...');
	})
})