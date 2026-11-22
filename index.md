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
<div class="hero-cards">
  <a class="hero-card" href="{{ site.baseurl }}/categories/system-design-notes"><i class="fa-solid fa-diagram-project"></i><strong>System Design</strong><small>{{ site.posts | where: "categories", "system-design-notes" | size }} notes</small></a>
  <a class="hero-card" href="{{ site.baseurl }}/categories/coding-practice"><i class="fa-solid fa-code"></i><strong>Coding Practice</strong><small>{{ site.posts | where: "categories", "coding-practice" | size }} problems</small></a>
  <a class="hero-card" href="{{ site.baseurl }}/categories/opinion"><i class="fa-solid fa-lightbulb"></i><strong>Opinion</strong><small>{{ site.posts | where: "categories", "opinion" | size }} posts</small></a>
  <a class="hero-card" href="{{ site.baseurl }}/categories/archives"><i class="fa-solid fa-archive"></i><strong>Archives</strong><small>{{ site.posts | where: "categories", "archives" | size }} posts</small></a>
</div>

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

Hello, reader. Here is the blog to share some knowledge about my career and my dream as a Software Engineer.

# 1. Persona me

I have experience as a Software Engineer, driven by curiosity and analytical thinking to explore ideas, user usecases, technologies to seek truth problems.

My favourage topic is designing distributed systems with availability and consistency challenges, proposing decisions based on reasons, trade-offs, data-driven facts and intentionally motivation to make things better.

Beyond technology, I want to become a style of leader focusing on motivating new youngsters and helping teams achieve meaningful work that we can proud of and remember in our careers.

My long-term dream is to explore diverse cultures around the world, challenge myself to pass a global top-tier big tech company, and build products that create meaningful value and positively impact people at a global scale.

**Be Clarity, Curious, Confident, Charming and Humanity**

# 2. Education & Working

**Education**: Honors Program in Computer Science at Bach Khoa University, HCMC.

**Product Domain**: Zalopay (Mini App Platform, Event Tracking/Social Ads Platform), Axon (Record Management Platform)

# 3. MBTI, Enneagram

Based on the test [sakinorva.net](https://sakinorva.net/functions?lang=eng) and learning about cognitive functions for year, I see myself as:

**My MBTI: ENTP-A, 8w7** / The Visionary, Analytical Explorer, Challenger, Ambivert

# 4. A glance of exploring myself

With young me, I am a dreamer, an analytical over-thinker, and an over-achiever, who is constantly striving for growth, whether it's mental, philosophical, or career development.

In the current grow stage, with self-reflection, I improve my clarity thinking + structured order actions to move from overthinker to deep thinker, retain long-term memory with facts and knowledge, try to be an ultra-learner.

- **Strengths:**
  - I'm intellectual, philosophical, and enthusiastic who can brings you rich positive energy and inspirations.

  - About knowledge, with a broad, horizontal understanding of everything in the world, my curiosity about new experiences helps me keep an open mindset, allowing me to share knowledge in various topics and engage in deep conversations.

  - I've been through a lot refections & instropections to deal with my negative feelings in life, which has given me the ability to understand myself and empathize with others.

- **Weaknesses:**
  - I struggle with procrastination, overthinking too much about perfection and completeness, lack of action-oriented motivations, occasional over-sensitivity, and sometimes over-abstractions but lack of practicality.

  - Tend to overanalyze and control situations logically, need to respect others' emotions and read the room better to provide more helpful information for others.

  - Confidently, I believe in my potential to achieve anything, yet I often struggle to take the first step and have difficulty sticking to plans that involve repeatable, boring tasks.

# 5. What is this blog about?

It's a space where my knowledge and opinions come together, offering perspectives shaped by curiosity, reflection, and the lessons life has taught me. Here, I explore topics including Technology, Philosophy and Psychology.

# 6. Contact

- **Facebook:** [https://www.facebook.com/anduckhmt146/](https://www.facebook.com/anduckhmt146/)

- **Github:** [https://github.com/anduckhmt146](https://github.com/anduckhmt146)

- **Linkedin:** [https://linkedin.com/in/anduckhmt146](https://linkedin.com/in/anduckhmt146)

- **Email:** anduckhmt146.se.work@gmail.com
