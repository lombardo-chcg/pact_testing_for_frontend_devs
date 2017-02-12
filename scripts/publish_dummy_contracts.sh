#!/bin/bash

dockerHost=$(docker-machine ip dev)

for contract in frontend/dummy_data/*; do
  consumer=$(jq ."consumer"."name" < $contract)
  provider=$(jq ."provider"."name" < $contract)

  curl \
    -X PUT \
    -d $contract \
    $dockerHost
done
