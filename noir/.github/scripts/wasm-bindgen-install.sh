#!/bin/bash
set -eu

curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash
cargo-binstall wasm-bindgen-cli --version 0.2.86 -y
