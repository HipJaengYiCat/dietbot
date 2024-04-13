echo -e "commit -m "
read
git init
git add .
git commit -m "$REPLY"
git push origin master
