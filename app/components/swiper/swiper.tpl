
<div class="swiper-container">
    <div class="swiper-wrapper">
    	{{each data.imgList as item index}}
        <div class="swiper-slide">
        	<img src="{{item}}">
        </div>
        {{/each}}
    </div>
    <!-- 如果需要分页器 -->
    {{if data.isShowPagination}}
    <div class="swiper-pagination"></div>
    {{/if}}
    <!-- 如果需要导航按钮 -->
    {{if data.isShowBtn}}
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    {{/if}}

</div>