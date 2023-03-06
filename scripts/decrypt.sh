#!/bin/sh

scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${scriptDir}/.." || exit 1;
export SOPS_AGE_KEY_FILE=$(pwd)/age-key.txt
sops -d -i docker.env