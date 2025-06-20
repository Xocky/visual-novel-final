#!/bin/bash
# Очистка кэша npm
npm cache clean --force

# Очистка кэша сборки
rm -rf node_modules
rm -rf build 