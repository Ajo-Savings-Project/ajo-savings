# Ajó Savings

Experience the convenience of secure group savings and personalized savings plans with Ajó Savings.
Take control of your finances and unlock a brighter financial future.

## Project Installation

**Setup Client:**

```bash
cd client
yarn
yarn dev
```

**Setup Server:**

```bash
cd server
yarn
```

**Project Guides**

1. Follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
2. [Atomic Design pattern]() is used to structure this project
3. Branch names should follow this format **CU-<task-id>/<task-name>**

--- 
**Git flow**

```
git checkout main
git pull origin main
git checkout <your-branch>
git pull --rebase origin main  
git push origin HEAD
```

**Git flow** _from current branch_ (example with existing commit)

```
git add .
git commit --amend --no-edit
git pull --rebase origin main  
git push origin HEAD -f
```
