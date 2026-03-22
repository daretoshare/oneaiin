Step 1: Create the dev branch
bash
cd one-ai-site
git checkout -b dev

This creates a new branch called dev and switches you to it. Everything from main is copied over. You're now working on dev.

Step 2: Verify which branch you're on
bashgit branch
```

You'll see something like:
```
  main
* dev

The * shows your current branch.
Step 3: Make changes, commit, push

Work on whatever you want — edit files, add articles, change styles. Then:
bash

git add .
git commit -m "Describe what you changed"
git push origin dev

The first time you push dev, Git creates the branch on GitHub. After that, git push is enough.


Step 4: Preview on Vercel (automatic)
Vercel automatically creates a Preview Deployment for every non-main branch push. After you push dev, go to your Vercel dashboard → Deployments tab. You'll see a new deployment with a preview URL like one-ai-in-abc123.vercel.app. Use this to test your changes without affecting the live site.


Step 5: When you're happy, merge into main
You have two ways to do this:

Option A: Merge via command line (simpler)
bash# Switch back to main
git checkout main

# Pull latest just in case
git pull origin main

# Merge dev into main
git merge dev

# Push — this triggers the live deployment
git push origin main
Option B: Merge via GitHub Pull Request (better for review)
Go to github.com/daretoshare/one-ai-in. GitHub will often show a banner saying "dev had recent pushes — Compare & pull request." Click it. Or go to Pull Requests → New Pull Request, set base as main and compare as dev, then click Create Pull Request. Review the changes, then click Merge Pull Request. This triggers the Vercel deployment to your live site.
Step 6: After merging, go back to dev for more work
bashgit checkout dev
git merge main    # Sync dev with latest main
Then continue making changes on dev.


Daily workflow summary:
bashgit checkout dev              # Make sure you're on dev
# ... make your changes ...
git add .
git commit -m "What I changed"
git push origin dev           # Preview deploys on Vercel
# ... test on preview URL ...
# ... happy? merge to main:
git checkout main
git merge dev
git push origin main          # Live site deploys
git checkout dev              # Back to experimenting
Useful commands to remember:
bashgit branch                    # See all branches, * = current
git checkout main             # Switch to main
git checkout dev              # Switch to dev
git status                    # See what files changed
git log --oneline -5          # See last 5 commits
git diff                      # See uncommitted changes
One important rule: always commit or stash your changes before switching branches. If you have uncommitted edits and run git checkout main, Git will either carry them over (confusing) or block you. When in doubt, commit first.