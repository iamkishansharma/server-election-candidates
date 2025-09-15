# Contributing to OSNEPAL Server

Thank you for your interest in contributing to the OSNEPAL Server project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/osnepal-server.git
   cd osnepal-server
   ```

### 2. Set Up Development Environment

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Create a branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. Start the development server:
   ```bash
   yarn start:dev
   ```

### 3. Make Your Changes

- Write clean, readable code
- Follow the existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### 4. Code Quality

Before submitting your changes, ensure:

```bash
# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Run tests
yarn test
```

### 5. Commit Your Changes

Use conventional commit messages:

```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve bug in component"
# or
git commit -m "docs: update README"
```

**Commit Types:**

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of your code has been performed
- [ ] Code has been commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation have been made
- [ ] Tests have been added that prove your fix is effective or that your feature works
- [ ] New and existing unit tests pass locally with your changes
- [ ] Any dependent changes have been merged and published

### Pull Request Template

When creating a pull request, please include:

1. **Description**: Clear description of what the PR does
2. **Type of Change**: Bug fix, new feature, breaking change, etc.
3. **Testing**: How you tested your changes
4. **Screenshots**: If applicable, include screenshots
5. **Checklist**: Complete the checklist above

## 🎨 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper interfaces for props and state
- Use type assertions sparingly
- Prefer `const` over `let` when possible

### Placing Resources

- Resource Models should be moved to `/models` are they are generated
- Keep controllers, services, small and focused
- Use proper DTOs and use the repository pattern.
- Add JSDoc comments for complex functions

### Resources Naming

- NestJS apparently expects resources to be plural. To change the name of the table use the `name` option in the entity.

### Import Order

Import orders should be in acendending order based on line charater length.
For example:

✅DO's

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { HasTimestamps } from 'src/database/interfaces/HasTimestamps';
import { IPoliticalParty } from '../interfaces/political-party.interface';
```

❌DON'T's

```typescript
import { HasTimestamps } from 'src/database/interfaces/HasTimestamps';
import { IPoliticalParty } from '../interfaces/political-party.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
```

## 🧪 Testing Guidelines

### Writing Tests

- Write tests for new controller methods
- Use descriptive test names
- Test both happy path and edge cases
- Mock external dependencies

### Test Structure

```typescript
// __tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    // Test user interactions
  });
});
```

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable, include screenshots
7. **Additional Context**: Any other relevant information

## 💡 Feature Requests

When suggesting new features:

1. Check if the feature has already been requested
2. Provide a clear description of the feature
3. Explain why this feature would be useful
4. Provide examples of how it would work
5. Consider the impact on existing functionality

## 📚 Development Resources

- [Nest.js Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🏷️ Release Process

1. Version bumping follows [Semantic Versioning](https://semver.org/)
2. Major releases are planned and announced
3. Minor releases include new features
4. Patch releases include bug fixes

## 📞 Getting Help

- **Discord**: [OSNEPAL Discord](https://discord.gg/GQGFKDAQ9b)
- **GitHub Issues**: [Create an issue](https://github.com/osnepal/frontend/issues)
- **Email**: contact@osnepal.org

## 🙏 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to OSNEPAL! 🚀
