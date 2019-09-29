git add --all && git commit -m \"Release at $(date)\"
git subtree push --prefix dist origin gh-pages
git push 
git push -f origin gh-pages:gh-pages