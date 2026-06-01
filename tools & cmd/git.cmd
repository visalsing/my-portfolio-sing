
> cd my-portfolio-vuejs
> git init
> git add .
> git commit -m "Initial commit"

> git config --global user.email "your-email@example.com"
(Use the same email you use for your GitHub account.)
> git config --global user.name "Your Name"

> git config --global user.email "sovisalsing288@gmail.com"
> git config --global user.name "visalsing"

git remote add origin https://github.com/visalsing/my-portfolio-sing.git
git branch -M main
git push -u origin main



…or create a new repository on the command line
echo "# my-portfolio-sing" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/visalsing/my-portfolio-sing.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/visalsing/my-portfolio-sing.git
git branch -M main
git push -u origin main





npx plugins add vercel/vercel-plugin













2. How to update your site (The "Git Flow")
You don't need to use the Vercel website anymore to make changes. From now on, whenever you want to update your portfolio (e.g., adding a new project or changing text):

Make the changes in VS Code.

Save your files.

In your terminal, run these three commands:

Bash
git add .
git commit -m "added a new project"
git push