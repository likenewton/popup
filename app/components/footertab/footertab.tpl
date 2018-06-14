
<div class="footertab-content">
    {{each data.list as item index}}
    <div class="tab-item tab_{{item.route}} {{if item.active}}active{{/if}}">   
        <a class="js-link" href="javascript:;" data-route="{{item.route}}" data-cache="true">
        	<span class="iconfont {{item.icon}}"></span>
        	<span class="title">{{item.title}}</span>
        </a>
    </div>
    {{/each}}
</div>