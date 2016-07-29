#!/bin/bash

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
    # set to 1 initially
    local return_=1
    # set to 0 if not found
    type $1 >/dev/null 2>&1 || { local return_=0; }
    # return value
    echo "$return_"
}

# will verify all commands need it (listed in COMMANDS_NEED array)
# if it's installed, will show also de command/package version
# at the end, it will compile what we need for the application to run
function execute {
    local no_valid_=0

    for com in "${COMMANDS_NEED[@]}"
    do
    if [ $(program_is_installed $com) == 1 ]; then
        # display a message in green with a tick by it
        printf "\033[38;5;2m$com ✔\n"
        # reset colours back to normal
        printf "\033[38;5;15m"
        printf "  " && $com --version && printf "\n"
    else
        (( no_valid_ += 1 ))
        # display a message in red with a cross by it
        printf "\033[38;5;160m$com ✘\n"
        # reset colours back to normal
        printf "\033[38;5;15m\n"
    fi
    done

    if (($no_valid_ > 0)); then
        printf "\033[38;5;160m---------------------------------------------------------------------\n"
        printf "| ERROR!! Your environment does not meet the necessary requirements |\n"
        printf "\033[38;5;160m---------------------------------------------------------------------\n"
        # reset colours back to normal
        printf "\033[38;5;15m"
    else
        printf "\033[38;5;2m---------------------------------------------\n"
        printf "| Good!! All necesary requirements verified |\n"
        printf "\033[38;5;2m---------------------------------------------\n"
        # reset colours back to normal
        printf "\033[38;5;15m" && printf "\n"
    if
        printf "Installing library dependencies...\n\n" &&
        bower cache clean &&
        bower install &&
        printf "\n\033[38;5;2mLibrary dependencies were installed succesfully\n\n" &&
        printf "\033[38;5;15m" &&

        # printf "Importing necessary data into DB...\n\n" &&
        # node server/schemas/import/importUserRoles.js
        # node server/schemas/import/importClient.js
        # node server/schemas/import/importCategories.js
        node server/schemas/import/importPersons.js
        # printf "\n\033[38;5;2mSuccess! Data Imported\n\n" &&
        # printf "\033[38;5;15m" &&

        printf "Compiling Client SCSS files...\n\n" &&
        gulp clientSCSS
        printf "\n\033[38;5;2mCompleted!\n\n" &&
        printf "\033[38;5;15m" &&

        printf "Compiling Dashboard SCSS files...\n\n" &&
        gulp dashSCSS
        printf "\n\033[38;5;2mCompleted!\n\n" &&
        printf "\033[38;5;15m" &&

        printf "Compiling Client JS files...\n\n" &&
        gulp clientJS
        printf "\n\033[38;5;2mCompleted!\n\n" &&
        printf "\033[38;5;15m" &&

        printf "Compiling Dashboard JS files...\n\n" &&
        gulp dashJS
        printf "\n\033[38;5;2mCompleted!\n\n" &&
        printf "\033[38;5;15m"
    then
        printf "\033[38;5;2mYou are good to start! Please execute 'gulp start' :)\n\n" &&
        printf "\033[38;5;15m"
    else
        printf "\033[38;5;160m---------------\n"
        printf "| EPIC FAIL!! |\n"
        printf "\033[38;5;160m---------------\n"
        # reset colours back to normal
        printf "\033[38;5;15m"
    fi
  fi

}

# Start ===================================================

# Commands list to verfiy (separated by a space)
COMMANDS_NEED=( gulp bower sass )
execute

exit 0
