---
layout: default
permalink: /pages
---

<script>
  const urlParams = new URLSearchParams(window.location.search);
  const pageId = parseInt(urlParams.get('id')) || 1;
  const postsPerPage = 5;
  const offset = (pageId - 1) * postsPerPage;

  document.addEventListener('DOMContentLoaded', function () {
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
      if (index >= offset && index < offset + postsPerPage) {
        post.style.display = 'block';  
      } else {
        post.style.display = 'none';  
      }
    });
  });
</script>

<div class="posts">
  {% for post in site.posts %}
    <article class="post">
      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <p style="font-size: 14px; margin-top: 10px; color: #333;">
        <a href="{{ site.baseurl }}/categories/{{ post.categories[0] | slugify }}" 
          style="display: inline-block; padding: 5px 10px; background-color: #007bff; width: 80px; color: white; text-decoration: none; border-radius: 15px; font-size: 12px; text-align: center;">
          {{ post.categories }}
        </a>
      </p>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>