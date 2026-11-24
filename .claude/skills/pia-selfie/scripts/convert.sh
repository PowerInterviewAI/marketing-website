#!/usr/bin/env bash
# Usage: convert.sh <src_png_dir> <dest_dir> [id ...]
# Turns approved ComfyUI PNGs into the 700x900 JPEGs the site serves, with light
# grain so they read like phone photos. With ids, converts only those (skip rejects).
set -e
src="$1"; dest="$2"; shift 2
mkdir -p "$dest"
if [ "$#" -gt 0 ]; then ids="$*"; else ids=$(cd "$src" && ls *.png | sed 's/\.png$//'); fi
for id in $ids; do
  ffmpeg -loglevel error -y -i "$src/$id.png" \
    -vf "scale=700:900:flags=lanczos,noise=alls=5:allf=u" -q:v 5 "$dest/$id.jpg"
  echo "converted $id"
done
