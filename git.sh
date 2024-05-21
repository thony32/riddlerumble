#!/bin/sh

error_exit() {
    echo "Error: $1" >&2
    exit 1
}

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    error_exit "Current directory is not a Git repository."
fi

echo "Staging all changes..."
git add . || error_exit "Failed to stage changes."

echo "Enter the commit message:"
read commit_message

echo "Committing changes..."
git commit -m "$commit_message" || error_exit "Failed to commit changes."

echo "Pulling latest changes..."
git pull || error_exit "Failed to pull changes."

echo "Pushing changes..."
git push || error_exit "Failed to push changes."

echo "Success !"