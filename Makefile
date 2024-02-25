lint:
	npx eslint .

test:
	npx jest

install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

test-coverage:
	npx jest --coverage

publish:
	npm publish --dry-run

.PHONY: test