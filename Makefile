deploy:
	git add .
	git commit -m "feat: add deploy"
	git push origin master


migrate:
	cd _posts/$(folder) && \
	DATE=$$(date +%F) && \
	HASH=$$(openssl rand -hex 4) && \
	FILENAME="$${DATE}-$${HASH}.md" && \
	touch "$$FILENAME" && \
	echo "---" >> "$$FILENAME" && \
	echo "layout: post" >> "$$FILENAME" && \
	echo "title: Framework Thinking - Neetcode 150 - " >> "$$FILENAME" && \
	echo "date: $${DATE}" >> "$$FILENAME" && \
	echo "categories: $(folder)" >> "$$FILENAME" && \
	echo "---" >> "$$FILENAME" && \
	echo "" >> "$$FILENAME" && \
	echo "✅ Created file: _posts/coding-practice/$${FILENAME}"

