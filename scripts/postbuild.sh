#!/bin/bash

# Try to run react-snap for pre-rendering
# This script gracefully handles failures in environments where Chromium dependencies are missing (e.g., dev containers)

echo "Attempting to run react-snap pre-rendering..."

if npx react-snap; then
  echo "✓ react-snap pre-rendering completed successfully"
  exit 0
else
  EXIT_CODE=$?
  echo "⚠ react-snap pre-rendering failed with exit code $EXIT_CODE"
  echo "This is normal in containerized development environments without X11 libraries."
  echo "Your Vite build succeeded. The app will work with client-side rendering."
  echo ""
  echo "To enable pre-rendering in production:"
  echo "1. Install Chromium dependencies in your production environment"
  echo "2. Or use a CI/CD pipeline with proper system dependencies"
  exit 0
fi
