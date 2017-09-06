#!/usr/bin/env bash
[ `(git diff HEAD --name-only; git ls-files -o --exclude-standard --modified) | grep '^src' | wc -l` -ne 0 ]
