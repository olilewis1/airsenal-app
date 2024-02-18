#!/bin/bash

# Check if all required arguments are provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <FPL_TEAM_ID>"
  exit 1
fi

FPL_TEAM_ID="$1"

# Run Docker container and save output to 'output_predictions.log'
docker run --rm -v airsenal_data:/tmp -e "FPL_TEAM_ID=$FPL_TEAM_ID" -e "AIRSENAL_HOME=/tmp" airsenal poetry run airsenal_run_prediction --weeks_ahead 3 > output_predictions.log 2>&1
