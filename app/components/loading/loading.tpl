<div class="rule-container">
    <div class="rule-box">
        <div class="rule-wrapper">
            <div class="title"></div>
            <div class="rule-text">
                {{each data.ruleInfos as item index}}
                <div>
                    <span class="order">{{index + 1}}、</span>
                    <span class="text">{{item}}</span></div>
                {{/each}}
            </div>
        </div>
        <div class="close-btn"></div>
    </div>
</div>