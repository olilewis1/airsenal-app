#!/bin/bash

# Check if all required arguments are provided
if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <FPL_PASSWORD> <FPL_LOGIN> <FPL_TEAM_ID>"
  exit 1
fi

FPL_PASSWORD="$1"
FPL_LOGIN="$2"
FPL_TEAM_ID="$3"

# Run Docker containers to execute individual airsenal commands
docker run --rm -v airsenal_data:/tmp -e "FPL_TEAM_ID=$FPL_TEAM_ID" -e "AIRSENAL_HOME=/tmp" airsenal poetry run airsenal_env set -k FPL_PASSWORD -v "$FPL_PASSWORD"

docker run  --rm -v airsenal_data:/tmp -e "FPL_TEAM_ID=$FPL_TEAM_ID" -e "AIRSENAL_HOME=/tmp" airsenal poetry run airsenal_env set -k FPL_LOGIN -v "$FPL_LOGIN"

docker run  --rm -v airsenal_data:/tmp -e "FPL_TEAM_ID=$FPL_TEAM_ID" -e "AIRSENAL_HOME=/tmp" airsenal poetry run airsenal_env set -k FPL_TEAM_ID -v "$FPL_TEAM_ID"

# docker run  --rm -v airsenal_data:/tmp -e "FPL_TEAM_ID=$FPL_TEAM_ID" -e "AIRSENAL_HOME=/tmp" airsenal poetry run airsenal_run_optimization --weeks_ahead 3 > output_optimization.log 2>&1
