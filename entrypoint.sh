#!/bin/bash

# Run base migrations
yarn migrate

# Populate database
yarn seed

# Run aplication
yarn dev
