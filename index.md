---
layout: page
title: About me
permalink: /
---

<section class="hero">
  <img class="hero__avatar" src="{{ site.avatar }}" alt="{{ site.name }}" />
  <p class="hero__eyebrow">Software Engineer · Distributed Systems</p>
  <h1 class="hero__title">Hi, I'm <span class="grad">An</span>.</h1>
  <p class="hero__sub">Notes on system design, coding patterns, and thinking clearly, to become an articulate engineer.</p>
  <div class="hero__cta">
    <a class="btn btn--primary" href="{{ site.baseurl }}/categories/system-design-notes">Read system design notes</a>
    <a class="btn" href="#about">About me ↓</a>
  </div>
</section>

<h2 class="section-title">Explore topics</h2>
{% for group in site.data.topics %}
<h3 class="group-title"><i class="{{ group.icon }}"></i> {{ group.name }}</h3>
<div class="hero-cards">
  {% for item in group.items %}
    {% if item.category %}
    <a class="hero-card" href="{{ site.baseurl }}/categories/{{ item.category }}/"><i class="{{ item.icon }}"></i><strong>{{ item.title }}</strong><small>{{ item.desc }}</small><span class="count">{{ site.posts | where: "categories", item.category | size }} {{ item.unit }}</span></a>
    {% else %}
    <a class="hero-card" href="{{ item.url }}" target="_blank" rel="noopener"><i class="{{ item.icon }}"></i><strong>{{ item.title }} <span class="ext-arrow">↗</span></strong><small>{{ item.desc }}</small></a>
    {% endif %}
  {% endfor %}
</div>
{% endfor %}

<h2 class="section-title">Latest posts</h2>
<div class="posts">
{% assign latest = site.posts | where_exp: "p", "p.categories != 'private'" | sort: "date" | reverse %}
{% for post in latest limit: 5 %}
  <a class="post-card" href="{{ site.baseurl }}{{ post.url }}">
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt | strip_html | strip_newlines | truncate: 160 }}</p>
    <div class="meta"><span class="chip">{{ post.categories | first }}</span><time>{{ post.date | date: "%b %-d, %Y" }}</time></div>
  </a>
{% endfor %}
</div>

<div id="about"></div>

Hello, reader. This blog shares some knowledge about my career and my dream as a Software Engineer.

# 1. About me

I am an experienced Software Engineer, driven by curiosity and analytical thinking to explore ideas, user use cases, and technologies in search of the truth behind problems.

My favorite topic is designing distributed systems that face availability and consistency challenges, and proposing decisions based on reasons, trade-offs, data-driven facts, and an intentional motivation to make things better.

Beyond technology, I want to become a leader who motivates young people and helps teams achieve meaningful work that we can be proud of and remember throughout our careers.

My long-term dream is to explore diverse cultures around the world, challenge myself to get into a global top-tier big tech company, and build products that create meaningful value and positively impact people at a global scale.

**Be Clear, Curious, Confident, Charming, and Humane**

# 2. Education & Work

**Education**: Honors Program in Computer Science at Bach Khoa University, HCMC.

**Product Domains**: Zalopay (Mini App Platform, Event Tracking/Social Ads Platform) and Axon (Record Management Platform)

# 3. MBTI, Enneagram

Based on the test [sakinorva.net](https://sakinorva.net/functions?lang=eng) and learning about cognitive functions for a year, I see myself as:

**My MBTI: ENTP-A, 8w7** / The Visionary, Analytical Explorer, Challenger, Ambivert

# 4. A glance at exploring myself

Young as I am, I am a dreamer, an analytical over-thinker, and an over-achiever who constantly strives for growth, whether mental, philosophical, or professional.

At my current stage of growth, through self-reflection, I am improving my clear thinking and structured actions to move from overthinker to deep thinker, retain facts and knowledge in long-term memory, and become an ultra-learner.

- **Strengths:**
  - I'm intellectual, philosophical, and enthusiastic, and I can bring you positive energy and inspiration.

  - With a broad, horizontal understanding of the world, my curiosity about new experiences helps me keep an open mindset, allowing me to share knowledge on various topics and engage in deep conversations.

  - I've gone through a lot of reflection and introspection to deal with negative feelings in life, which has given me the ability to understand myself and empathize with others.

- **Weaknesses:**
  - I struggle with procrastination, overthinking perfection and completeness, a lack of action-oriented motivation, occasional over-sensitivity, and sometimes over-abstraction without enough practicality.

  - I tend to overanalyze and control situations logically; I need to respect others' emotions and read the room better so I can give more helpful information to others.

  - I am confident in my potential to achieve anything, yet I often struggle to take the first step and to stick to plans that involve repetitive, boring tasks.

# 5. What is this blog about?

It's a space where my knowledge and opinions come together, offering perspectives shaped by curiosity, reflection, and the lessons life has taught me. Here, I explore topics including technology, philosophy, and psychology.

# 6. Contact

- **Facebook:** [https://www.facebook.com/anduckhmt146/](https://www.facebook.com/anduckhmt146/)

- **GitHub:** [https://github.com/anduckhmt146](https://github.com/anduckhmt146)

- **LinkedIn:** [https://linkedin.com/in/anduckhmt146](https://linkedin.com/in/anduckhmt146)

- **Email:** anduckhmt146.se.work@gmail.com
