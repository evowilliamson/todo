#!/bin/bash

# This script generates the complete Todo App structure
# Run with: bash generate-project.sh

echo "Generating complete Todo App project structure..."

# Create all directories
mkdir -p backend/src/{models,controllers,routes,middleware,services,utils,validators,database,config}
mkdir -p frontend/src/{components/{auth,todos,categories,tags,dashboard,layout,common},pages,hooks,store,services,utils,styles,assets}
mkdir -p frontend/public

echo "✓ Directory structure created"

# The files will be created in the next steps
echo "✓ Project structure ready"
echo "Please run npm install in both backend and frontend directories"
