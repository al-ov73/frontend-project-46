lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

publish:
	npm publish --dry-run