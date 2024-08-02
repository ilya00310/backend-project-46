lint:
	npx eslint .
 
tests:
	npm run test
report:
	./gradlew jacocoTestReport
	