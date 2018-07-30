var homepage={
	loadmore:function(){
		
		
		$(".loadmore").on("click", function() {
			innerNews.getList(homePage_current_page);
			video_list.getList(homePage_current_page);
			msgAndReport.getNews(homePage_current_page);
			homePage_current_page++;
		});
	}
}
