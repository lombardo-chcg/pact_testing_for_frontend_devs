#!/bin/bash

red='\033[0;31m'
green='\033[0;32m'
blue='\033[0;34m'
resetColor='\033[0m'

# outputs a string in green
printGreen() {
  message="$@"
  echo -e ${green}$message${resetColor}
}

# outputs a string in blue
printBlue() {
  message="$@"
  echo -e ${blue}$message${resetColor}
}

# outputs a string in red
printRed() {
  message="$@"
  echo -e ${red}$message${resetColor}
}
