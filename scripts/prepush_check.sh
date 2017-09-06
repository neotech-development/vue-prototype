#!/usr/bin/env bash
[ `git diff origin/$(git rev-parse --abbrev-ref HEAD)..HEAD --name-only | grep '^src' | wc -l` -ne 0 ]
