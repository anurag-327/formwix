# Contributing to Formwiz

Thank you for your interest in contributing to Formwiz! We welcome contributions from everyone, regardless of experience level. This document provides guidelines for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Adding New Field Types](#adding-new-field-types)
- [Documentation](#documentation)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)


## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/anurag-327/formwiz.git`
3. Install dependencies: `npm install` or `yarn install`
4. Create a new branch for your changes: `git checkout -b feature/your-feature-name`

## Development Workflow

1. Make your changes in the appropriate files
2. Run the development server: `npm run dev` or `yarn dev`
3. Test your changes locally
4. Commit your changes following the [Conventional Commits](https://www.conventionalcommits.org/) specification
5. Push your branch to your fork
6. Open a pull request

## Pull Request Process

1. Ensure your PR description clearly describes the changes you've made
2. Link any related issues in the PR description using keywords like "Fixes #123" or "Resolves #456"
4. Wait for a project maintainer to review your PR
5. Address any feedback or requested changes
6. Once approved, a maintainer will merge your PR


## Adding New Field Types

When adding a new field type to Formwiz:

1. Create a new file in `src/components/fields/` following the existing pattern
2. Add the field type to `src/components/fields/index.ts`
3. Update the TypeFieldConfig type in `src/types.ts`
4. Add tests for the new field type
5. Update documentation with examples of using the new field type

## Documentation

- Update documentation when adding new features or changing existing ones
- Document props, types, and usage examples
- Keep the README updated with any significant changes


## Reporting Bugs

When reporting bugs:

1. Use the GitHub Issues page
2. Include detailed steps to reproduce the bug
3. Describe the expected behavior and what actually happened
4. Include browser/environment information if relevant
5. If possible, include a minimal code example that demonstrates the issue

## Feature Requests

For feature requests:

1. Check existing issues and PRs to avoid duplicates
2. Clearly describe the feature and its use case
3. Provide examples of how the API might look
4. Indicate if you're willing to work on implementing it yourself

Thank you for contributing to Formwiz!
