deploy:
	git add .
	git commit -m "feat: add deploy"
	git push origin master

migrate:
	@cd _posts/$(folder) && \
	DATE=$$(date +%F) && \
	HASH=$$(openssl rand -hex 4) && \
	TITLE="$(title)" && \
	FILENAME="$${DATE}-$${HASH}.md" && \
	touch "$$FILENAME" && \
	{ \
	  echo "---"; \
	  echo "layout: post"; \
	  echo "title: Framework Thinking - Neetcode 150 - $$TITLE"; \
	  echo "date: $${DATE}"; \
	  echo "categories: $(folder)"; \
	  echo "---"; \
	  echo ""; \
	  echo "Here is solutions for $$TITLE."; \
	  echo ""; \
	  echo "# 1. Understand the problem"; \
	  echo ""; \
	  echo "# 2. Clarify constraints, asks 4 - 5 questions including edge cases."; \
	  echo ""; \
	  echo "# 3. Explore examples."; \
	  echo ""; \
	  echo "# 4. Brainstorm 2 - 3 solutions, naive solution first and optimize later. Explain the key idea of each solution."; \
	  echo ""; \
	  echo "# 5. Implement solutions."; \
	  echo ""; \
	  echo "# 6. Dry run testcases."; \
	  echo ""; \
	} >> "$$FILENAME" && \
	echo "✔ Created file: _posts/$(folder)/$$FILENAME"


