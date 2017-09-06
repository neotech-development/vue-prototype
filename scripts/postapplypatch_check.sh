#!/usr/bin/env bash
[ `git log -1 --pretty='format:' --name-only | grep '^src' | wc -l` -ne 0 ]
