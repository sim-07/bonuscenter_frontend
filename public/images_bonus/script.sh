#!/bin/bash

for file in ./*.avif; do
  echo "Ricodifico $file"
  magick convert "$file" "$file"
done

echo "Fine ricodifica AVIF"
