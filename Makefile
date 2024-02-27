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

yaml:
	gendiff __fixtures__/plainYml1.yml __fixtures__/plainYml2.yml

start:
	node bin/gendiff.js __fixtures__/recurseJson1.json __fixtures__/recurseJson2.json

