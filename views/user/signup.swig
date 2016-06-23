{% extends '../layout.swig' %}
{% set title = 'Update API' %}
{% block body %}

<h2>Signup</h2>
        <form class="ui large form" method="post" action="/signup">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="username" placeholder="username">
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="mail icon"></i>
                        <input type="text" name="email" placeholder="E-mail address">
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password">
                    </div>
                </div>
                <button id="btnSignup" class="ui fluid large teal submit button">Sign up</button>
            </div>

        <div class="ui message">
            {{ msg }}
        </div>
        </form>
{% endblock %}
