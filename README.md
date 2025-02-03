🚀 Project Name

📌 Overview

This repository includes two submodules:

Auth: https://github.com/RushilCodes/Auth

Superior Backend: https://github.com/RushilCodes/Superior-Backend

📥 Cloning the Repository

Since this repo contains submodules, use the following command to clone it properly:

git clone --recursive <repo-url>

If you've already cloned the repository without submodules, initialize and update them:

git submodule update --init --recursive

🔄 Updating Submodules

To pull the latest changes from submodules:

git submodule update --remote --merge

➕ Adding a New Submodule

If you need to add another submodule in the future:

git submodule add <submodule-repo-url> <submodule-path>
git submodule update --init --recursive
git commit -m "Added new submodule"
git push origin main

❌ Removing a Submodule

To remove a submodule completely:

git submodule deinit -f <submodule-path>
git rm -r --cached <submodule-path>
rm -rf .git/modules/<submodule-path>
git commit -m "Removed submodule"
git push origin main

📜 License

This project is licensed under MIT License. Feel free to use and modify it as needed.

For full details, see the LICENSE file.

🤝 Contributing

Contributions are welcome! Fork this repo, create a new branch, and submit a pull request.

📧 Contact

For questions or suggestions, feel free to reach out!

✨ Happy Coding! 🚀

