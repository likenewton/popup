<div class="js-routePage js-{{pageData.route}} animated {{pageData.animation}}">
    <div class="css-refresh">
        <h3>PHP实现简单的留言版</h3>
        <div class="article">
            
            <ul class="message-list">
                <!-- template inject -->
            </ul>

            <p>写一些留言给我吧！</p>
            <form action="" onSubmit="return false" class="php_form">
                <div class="php_form_item">
                    <label>姓名：</label>
                    <input type="text" id="uname" placeholder="请输入你的姓名">
                </div>
                <div class="php_form_item">
                    <label>留言：</label>
                    <textarea id="umsg" cols="30" rows="3"></textarea>
                </div>
                <button id="btn-submit">提交</button>
            </form>
        </div>
    </div>
</div>