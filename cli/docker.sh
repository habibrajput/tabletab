#!/bin/bash

# Change to project root directory (parent of cli/)
cd "$(dirname "$0")/.." || exit 1

# Compose files live under cli/{dev,production}; env files at the repo root.
# (Uses Compose v2 `docker compose`; swap to `docker-compose` if your host has v1.)
DEV="docker compose -f cli/dev/docker-compose.yml --env-file .env.development"
PROD="docker compose -f cli/production/docker-compose.yml --env-file .env.production"

show_help() {
    echo "Usage: ./cli/docker.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev-up         - Start development environment (hot reload)"
    echo "  dev-down       - Stop development environment"
    echo "  dev-logs       - View development logs"
    echo "  dev-restart    - Restart development environment"
    echo "  dev-build      - Rebuild development image"
    echo "  dev-connect    - Connect to development container shell"
    echo ""
    echo "  prod-up        - Start production environment"
    echo "  prod-down      - Stop production environment"
    echo "  prod-logs      - View production logs"
    echo "  prod-restart   - Restart production environment"
    echo "  prod-build     - Build production images (no cache)"
    echo "  prod-connect   - Connect to production container shell"
    echo ""
    echo "  stop-all       - Stop both environments"
    echo "  clean-all      - Stop and remove all containers, networks, volumes"
    echo "  status         - Show status of all containers"
    echo ""
}

case "$1" in
    dev-up)
        echo "Starting development environment..."
        $DEV up -d --build
        ;;
    dev-down)
        echo "Stopping development environment..."
        $DEV down
        ;;
    dev-logs)
        echo "Viewing development logs (press Ctrl+C to exit)..."
        docker logs tabletap-site-dev -f
        ;;
    dev-restart)
        echo "Restarting development environment..."
        $DEV restart
        ;;
    dev-build)
        echo "Rebuilding development image..."
        $DEV build --no-cache
        ;;
    dev-connect)
        echo "Connecting to development container..."
        docker exec -it tabletap-site-dev sh
        ;;
    prod-up)
        echo "Starting production environment..."
        $PROD up -d --build
        ;;
    prod-down)
        echo "Stopping production environment..."
        $PROD down
        ;;
    prod-logs)
        echo "Viewing production logs (press Ctrl+C to exit)..."
        docker logs tabletap-site -f
        ;;
    prod-restart)
        echo "Restarting production environment..."
        $PROD restart
        ;;
    prod-build)
        echo "Building production images..."
        $PROD build --no-cache
        ;;
    prod-connect)
        echo "Connecting to production container..."
        docker exec -it tabletap-site sh
        ;;
    stop-all)
        echo "Stopping all environments..."
        $DEV down
        $PROD down
        echo "All environments stopped."
        ;;
    clean-all)
        echo "⚠️  WARNING: This will remove all containers, networks, and volumes!"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo "Cleaning development environment..."
            $DEV down -v
            echo "Cleaning production environment..."
            $PROD down -v
            echo "All cleaned!"
        else
            echo "Cancelled."
        fi
        ;;
    status)
        echo "=== Development Containers ==="
        $DEV ps
        echo ""
        echo "=== Production Containers ==="
        $PROD ps
        ;;
    *)
        show_help
        ;;
esac
