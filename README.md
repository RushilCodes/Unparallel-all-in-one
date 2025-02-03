# 🚀 PROJECT NAME

## 📌 OVERVIEW
This repository includes two submodules:
- **Auth**: [https://github.com/RushilCodes/Auth](https://github.com/RushilCodes/Auth)
- **Superior Backend**: [https://github.com/RushilCodes/Superior-Backend](https://github.com/RushilCodes/Superior-Backend)

## 📥 CLONING THE REPOSITORY
Since this repo contains submodules, use the following command to clone it properly:

```bash
git clone --recursive https://github.com/RushilCodes/Unparallel-all-in-one
```

If you've already cloned the repository without submodules, initialize and update them:

```bash
git submodule update --init --recursive
```

## 🔄 UPDATING SUBMODULES
To pull the latest changes from submodules:

```bash
git submodule update --remote --merge
```

## ➕ ADDING A NEW SUBMODULE
If you need to add another submodule in the future:

```bash
git submodule add <submodule-repo-url> <submodule-path>
git submodule update --init --recursive
git commit -m "Added new submodule"
git push origin main
```

## ❌ REMOVING A SUBMODULE
To remove a submodule completely:

```bash
git submodule deinit -f <submodule-path>
git rm -r --cached <submodule-path>
rm -rf .git/modules/<submodule-path>
git commit -m "Removed submodule"
git push origin main
```

## 📜 LICENSE
This project is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0) License**. This means:
- You are free to share and adapt the project for any purpose, including commercial use.
- You **must provide appropriate credit** by mentioning the original author (RushilCodes) and linking to this repository.
- Any modifications or derivative works must also provide attribution.

For full details, see the **[LICENSE](LICENSE)** file.

## 🤝 CONTRIBUTING
Contributions are welcome! Fork this repo, create a new branch, and submit a pull request.

## 📧 CONTACT
For questions or suggestions, feel free to reach out!

---
✨ HAPPY CODING! 🚀

