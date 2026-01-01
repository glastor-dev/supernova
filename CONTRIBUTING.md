# Contributing to Supernova

Thank you for considering contributing to Supernova!

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Browser, OS)
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

- Clear description of the feature
- Use cases and benefits
- Potential implementation approach
- Mockups or examples (if applicable)

### Pull Requests

1. **Fork the repository**

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation as needed

4. **Run linter (optional)**
   This repo may not always ship with ESLint configured. If a `lint` script exists, run it:

   ```bash
   npm run lint --if-present
   ```

5. **Build the project**

   ```bash
   npm run build
   ```

6. **Commit your changes**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `perf:` - Performance improvements
   - `test:` - Test additions/changes
   - `chore:` - Build/config changes

7. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

8. **Create a Pull Request**

PR tips:

- Keep PRs small and focused (one feature per PR)
- Include a clear description of changes
- Reference related issues using #issue-number
- Update CHANGELOG.md with your changes
- Request review from maintainers

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/glastor-dev/supernova.git
   cd supernova
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Note: `npm run dev` runs the Vite dev server only. To test the serverless API routes under `api/` (Vercel Functions), use:

   ```bash
   vercel dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

## Code Style

- Follow ESLint rules configured in the project
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use React hooks best practices

## Testing

- Test manually all affected features
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive behavior on different screen sizes
- Verify accessibility with screen readers

## Documentation

- Update README.md for user-facing changes
- Update inline code comments for complex logic
- Update CHANGELOG.md with your changes
- Update JSDoc comments for public APIs

## Questions?

Feel free to reach out via:

- GitHub Issues
- GitHub Discussions
- Email: [glastor.info@gmail.com](mailto:glastor.info@gmail.com)
- Telegram: [@zerhocool](https://t.me/zerhocool)

---

## Code of Conduct

Please note that this project is released with a [Code of Conduct](.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

Thank you for contributing to Supernova!

© 2026 Andrés Antonio Cardoso
