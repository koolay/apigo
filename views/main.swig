{% extends 'layout.swig' %}
{% set title = 'Homepage' %}

{% block body %}
<h2>Welcome {{req.user.username}}! You have signed up successfully!</h2>
<a href="/profile">View Profile</a>
<a href="/">Back to home page</a>
<a href="/logout">Log out</a>
{% endblock %}
