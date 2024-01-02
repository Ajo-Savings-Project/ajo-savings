# Ajó Savings

Experience the convenience of secure group savings and personalized savings plans with Ajó Savings.
Take control of your finances and unlock a brighter financial future.

## Project Installation

**Project Setup:**

```bash
yarn
yarn dev
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

**Server Setup**

1. clone project.
2. run yarn.
3. navigate to server directory.
4. create .env.production and .env.development files.
5. copy the env template in .env.example into the files created in step 4 above.
6. supply the values for your development and production env.
7. run yarn dev to start server in development mode.

# Starting the server in production mode.

1. navigate to server directory ("./apps/server")
2. run yarn prod
