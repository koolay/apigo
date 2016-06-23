<!DOCTYPE html>
<html>
<head>
<title>{{ title|default('kong admin') }}</title>
<!-- Viewport mobile tag for sensible mobile support -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--STYLES-->
<link rel="stylesheet" href="/styles/importer.css">
<!--STYLES END-->
<link rel="stylesheet" href="/semantic/semantic.min.css">
{% block style %}{% endblock %}
</head>

<body>
<div class="ui grid" style="margin-top: 50px;">
    <div class="one wide column"></div>
    <div class="three wide column">
        <div class="ui label">
            Welcome {{req.user.username }}!
            <a href="/logout"><i class="power icon"></i>logout</a>
        </div>
        <div class="ui vertical menu">
            <div class="item">
                <div class="header">接  口</div>
                <div class="menu">
                    <a class="item" href="/apis">接口列表</a>
                    <a class="item" href="/admin/api">添加接口</a>
                </div>
            </div>
            <div class="item">
                <div class="header">接口用户</div>
                <div class="menu">
                    <a class="item" href="/consumers">用户列表</a>
                    <a class="item" href="/admin/consumer">添加用户</a>
                </div>
            </div>
            <div class="item">
                <div class="header">插件</div>
                <div class="menu">
                    <a class="item" href="/plugins">插件列表</a>
                    <a class="item" href="/admin/plugin">添加插件</a>
                </div>
            </div>
        </div>
    </div>
    <div class="ten wide stretched column">
        <!-- Site content !-->
        {% block body %}{% endblock %}

        <!-- alert success -->
        <div class="ui success message hidden">
            <i class="close icon"></i>
            <div class="header alert-title">
            </div>
            <p class="alert-content"></p>
        </div>
        <div class="ui negative message hidden">
            <i class="close icon"></i>
            <div class="header alert-title">
            </div>
            <p class="alert-content"></p>
        </div>
        <div class="ui modal confirm">
            <i class="close icon"></i>
            <div class="header alert-title">
            </div>
            <div class="content alert-content">
            </div>
            <div class="actions">
                <div class="ui black deny button">
                    No
                </div>
                <div class="ui positive right labeled icon button">
                    Yes
                    <i class="checkmark icon"></i>
                </div>
            </div>
        </div>

    </div>
    <div class="one wide column"></div>
</div>
<!--TEMPLATES-->

<!--TEMPLATES END-->

<!--SCRIPTS-->
<script src="/js/dependencies/sails.io.js"></script>
<script src="/js/dependencies/axios.min.js"></script>
<script src="/js/dependencies/jquery.min.js"></script>
<!--SCRIPTS END-->
<script src="/semantic/semantic.min.js"></script>
<script src="/js/dependencies/common.js"></script>
<script type="text/javascript">
$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .hide()
    ;
  })
;
</script>
{% block script %}{% endblock %}
</body>
</html>
