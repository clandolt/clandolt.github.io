---
layout: archive
title: "Publications"
permalink: /publications/
excerpt: "Peer-reviewed publications by Christoph R. Landolt on multi-agent reinforcement learning, adversarial AI, and security for foundation models."
author_profile: false
---

{% include base_path %}

{% if site.author.googlescholar %}
  <p class="pub__intro">Also on <a href="{{ site.author.googlescholar }}">Google Scholar</a>.</p>
{% endif %}

{% assign pubs = site.publications | sort: "date" | reverse %}
{% assign years = pubs | group_by_exp: "pub", "pub.date | date: '%Y'" %}

{% for year in years %}
  <section class="pub-year">
    <h2 class="pub-year__heading">{{ year.name }}</h2>
    {% for post in year.items %}
      {% include archive-single-publication.html %}
    {% endfor %}
  </section>
{% endfor %}
