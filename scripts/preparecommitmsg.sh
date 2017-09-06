#!/usr/bin/env bash

MESSAGE=$(cat $1)

if [[ MESSAGE == \#* ]];
then
    # Skip modification of message with declared issue number.
    exit 0
else
    # Extract issue number from branch name.
    current_branch=`git rev-parse --abbrev-ref HEAD | grep -Eo 'feature-[0-9]+' | grep -Eo '[0-9]+'`;
    if [[ ${#current_branch} -ne 0 ]];
    then
        # Modify commit message, add issue number.
        echo "#$current_branch $MESSAGE" > $1
    else
        # Return message as is.
        exit 0;
    fi
fi
