#!/bin/bash

dockerHost=$(docker-machine ip dev)

for contract in frontend/dummy_data/*; do
  consumer=$(jq ."consumer"."name" < $contract | tr -d '"')
  provider=$(jq ."provider"."name" < $contract | tr -d '"')

  curl \
    -s \
    -X PUT \
    -H "Content-Type: application/json" \
    -d @$contract \
    http://$dockerHost:80/pacts/provider/$provider/consumer/$consumer/version/1 \
    1>/dev/null

  [[ $? -gt 0 ]] && { echo "error while publishing $consumer $provider contract"; exit 1; }

  echo -e "\nSuccessfully published contract between $consumer and $provider"
done
