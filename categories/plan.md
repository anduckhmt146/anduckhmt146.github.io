---
layout: default

---

<div class="posts">
  {% for post in site.categories.plan %}
    <article class="post" style="background-color: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <p style="font-size: 14px; margin-top: 10px; color: #333;">
        <a href="{{ site.baseurl }}/categories/{{ post.categories }}" 
          style="display: inline-block; padding: 5px 10px; background-color: #007bff; width: 80px; color: white; text-decoration: none; border-radius: 15px; font-size: 12px; text-align: center;"
          onmouseover="this.style.opacity=0.8" 
          onmouseout="this.style.opacity=1">
          {{ post.categories }}
        </a>
      </p>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
  
</div>