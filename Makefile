deploy:
	git add .
	git commit -m "feat: add deploy"
	git push origin master


migrate:
	cd _posts/coding-interview && \
	DATE=$$(date +%F) && \
	HASH=$$(openssl rand -hex 4) && \
	FILENAME="$${DATE}-$${HASH}.md" && \
	touch "$$FILENAME" && \
	echo "✅ Created file: plan/$$FILENAME"
