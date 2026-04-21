# nazuraki.github.io — personal portfolio and project index
# Requires: just, node, npm

default:
    @just --list

# Install dependencies
install:
    npm install

# Run in dev mode
dev:
    npm run dev

# Production build → dist/
build:
    npm run build

# Serve the production build locally
preview: build
    npm run preview

# Type-check with Astro
typecheck:
    npx astro check

lint: typecheck

# Run all checks
check: typecheck

test:
    echo "Not implemented."

# Remove build artifacts
clean:
    rm -rf dist node_modules

# Reinstall from scratch
fresh: clean install
