#!/bin/sh
# Build closures.json / cameras.json and force-push them as the single-commit `data` branch of terra-live.
set -e
HERE=$(cd "$(dirname "$0")" && pwd); OUT=${TMPDIR:-/tmp}/terra-roads
rm -rf "$OUT"; /usr/bin/python3 "$HERE/roads.py" "$OUT"
cd "$OUT" && git init -q -b data && git add -A && git -c user.name=terra-live-bot -c user.email=bot@users.noreply.github.com commit -qm "roads $(date -u +%FT%TZ)"
git push -qf https://github.com/evgeniystatuev-stack/terra-live data
