{% extends 'layout.swig' %}
{% set title = 'Update API' %}
{% block body %}

<form method="post" class="ui form segment">
  <h2>修改接口</h2>
  <div class="field">
     <input placeholder="Name" name="name" type="text" value="{{ name }}">
  </div>
  <div class="field">
    <input placeholder="Request path" name="request_path" type="text" value="{{request_path}}">
  </div>
  <div class="field">
    <input placeholder="Upstream url" name="upstream_url" type="text" value="{{upstream_url}}">
  </div>
  <div class="two fields">
    <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" name="strip_request_path" {% if strip_request_path %} checked {% endif %}>
          <label>Strip request path</label>
        </div>
    </div>
    <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" name="preserve_host" {% if preserve_host %} checked {% endif %}>
          <label>Preserve host</label>
        </div>
    </div>
  </div>
  <div class="ui blue button" onclick="save()">保存</div>
  <input type="hidden" value="{{ req.param('id') }}" name="id" />
</form>

{% endblock %}

{% block script %}
<script type="text/javascript" >
var rules = {
    inline : true,
    on     : 'blur',
    fields : {
       name: {
            identifier  : 'name',
            rules: [
              {
                type   : 'regExp[/^[a-z0-9_-]{3,50}$/]',
                prompt : '只能是字母和数字,长度3-50'
              }
            ]
          },
       upstream_url: {
            identifier  : 'upstream_url',
            rules: [
              {
                type   : 'empty',
                prompt : 'url不合法'
              }
            ]
          },
       request_path: {
            identifier  : 'request_path',
            rules: [
              {
                type   : 'regExp[/^\/.+/]',
                prompt : '必须是/开头的路径'
              }
            ]
          },
},  onSuccess : function(){
        success();
        return false;
    },
    'onFailure': function() {
        return false;
    }
};

function save() {
   $('.ui.form').form(rules).form('validate form');
}
function success() {
    var formData = $('.ui.form').form('get values');
    var id = $('.ui.form').form('get value', 'id');
    axios.put('/apis/' + id, formData)
    .then(function(response) {
        if (response.data.result) {
            ui.alert('success', 'success', response.data.data);
            } else {
           ui.alert('fail', 'Fail', response.data.msg);
         }
    })
    .catch(function(err) {
        ui.alert('fail', 'Fail', '修改失败');
    });

}
</script>
{% endblock %}
