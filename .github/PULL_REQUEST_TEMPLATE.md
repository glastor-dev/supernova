# 🚀 Pull Request

<!--
Thank you for contributing to Supernova!
Please fill out this template to help us review your changes efficiently.
-->

## 📋 Summary

<!--
Provide a clear and concise description of your changes.
Answer: What does this PR do? Why is it needed?
-->

### Problem Statement
<!-- What issue or need does this PR address? -->



### Solution Overview
<!-- Brief explanation of your approach and implementation -->



---

## 🏷️ Type of Change

<!-- Check all that apply -->

- [ ] 🐛 **Bug Fix** - Fixes an issue without breaking existing functionality
- [ ] ✨ **New Feature** - Adds new functionality or capability
- [ ] 💥 **Breaking Change** - Changes that break backward compatibility
- [ ] 🔨 **Refactoring** - Code restructuring without behavior changes
- [ ] 📝 **Documentation** - Updates to docs, README, or comments
- [ ] 🎨 **Style** - Code formatting, whitespace, or style improvements
- [ ] ⚡ **Performance** - Performance improvements or optimizations
- [ ] ✅ **Tests** - Adding or updating tests
- [ ] 🔧 **Configuration** - Changes to configuration files or build tools
- [ ] 🔒 **Security** - Security improvements or vulnerability fixes
- [ ] ♿ **Accessibility** - Accessibility improvements
- [ ] 🌐 **Internationalization** - Translations or i18n updates
- [ ] 🚀 **CI/CD** - Changes to CI/CD pipelines or automation
- [ ] 📦 **Dependencies** - Dependency updates or changes
- [ ] 🗑️ **Deprecation** - Deprecating features or APIs

---

## 🔍 Detailed Changes

<!--
Provide a detailed breakdown of what changed and why.
List key files, functions, or components modified.
-->

### Modified Components
<!-- List the main components, modules, or files affected -->

-
-
-

### Technical Details
<!-- Explain the technical implementation, architecture decisions, or algorithms used -->



### Design Decisions
<!-- Justify why you chose this approach over alternatives -->



---

## 🧪 Testing

### Test Coverage

- [ ] ✅ **Unit tests** added/updated
- [ ] ✅ **Integration tests** added/updated
- [ ] ✅ **E2E tests** added/updated
- [ ] ✅ **Manual testing** completed
- [ ] ⚠️ **No tests required** (documentation only, etc.)

### Testing Instructions

<!--
Provide step-by-step instructions for reviewers to test your changes.
Include prerequisites, commands, and expected outcomes.
-->

#### Prerequisites
<!-- List any setup requirements -->
```bash
# Example: Install dependencies, set environment variables, etc.
```

#### Steps to Test

1.
2.
3.

#### Expected Results
<!-- What should happen when testing is successful? -->

-
-

#### Test Data/Scenarios
<!-- Include sample data, edge cases, or specific scenarios to test -->
```
# Example test data or commands
```

---

## 📸 Screenshots / Recordings

<!--
For UI changes, include before/after screenshots or screen recordings.
Use tables for side-by-side comparison if helpful.
-->

### Before

<!-- Screenshot or description of previous behavior -->

### After

<!-- Screenshot or description of new behavior -->

<!--
You can use comparison format:
| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |
-->

---

## ✅ Pre-Submission Checklist

<!--
Review this checklist before submitting your PR.
Check all boxes that apply - reviewers will verify these items.
-->

### Code Quality

- [ ] Code follows the project's style guidelines and conventions
- [ ] Self-review of code completed (checked for errors, edge cases, readability)
- [ ] Code is DRY (Don't Repeat Yourself) and follows SOLID principles
- [ ] No unnecessary complexity or over-engineering
- [ ] Proper error handling and input validation implemented
- [ ] No hardcoded values - uses configuration/environment variables appropriately
- [ ] Removed console.logs, debug statements, and commented-out code

### Testing & Validation

- [ ] All new and existing tests pass locally
- [ ] Test coverage meets project requirements (specify if known: ___%)
- [ ] Manual testing completed across different scenarios
- [ ] Edge cases and error conditions tested
- [ ] Cross-browser/cross-platform testing completed (if applicable)
- [ ] Performance impact assessed (no significant degradation)

### Documentation

- [ ] Code comments added for complex logic or non-obvious decisions
- [ ] JSDoc/docstrings updated for public APIs or functions
- [ ] README.md updated (if user-facing changes)
- [ ] CHANGELOG.md updated (if applicable)
- [ ] Migration guide provided (for breaking changes)
- [ ] API documentation updated (if API changes)
- [ ] Wiki/documentation site updated (if applicable)

### Dependencies & Configuration

- [ ] No new dependencies added, OR new dependencies are justified and approved
- [ ] Dependencies are from trusted sources and up-to-date
- [ ] License compatibility verified for new dependencies
- [ ] Configuration changes documented
- [ ] Environment variables added to `.env.example` (if applicable)

### Security & Privacy

- [ ] No sensitive data (API keys, passwords, tokens) in code
- [ ] Input sanitization implemented where user input is processed
- [ ] Security best practices followed (OWASP guidelines)
- [ ] No SQL injection, XSS, or CSRF vulnerabilities introduced
- [ ] Privacy implications considered and addressed

### Git & Process

- [ ] Branch is up-to-date with target branch (rebased/merged latest changes)
- [ ] Commit messages are clear and follow conventional commit format
- [ ] PR title is descriptive and follows project conventions
- [ ] PR is focused and addresses a single concern (not mixing multiple unrelated changes)
- [ ] Related issue(s) linked (using "Fixes #123" or "Closes #123")
- [ ] PR is tagged with appropriate labels
- [ ] Requested reviews from appropriate team members/code owners

### CI/CD

- [ ] All CI checks passing (build, tests, linting, security scans)
- [ ] No build warnings introduced
- [ ] Deployment considerations documented (if applicable)

---

## 🔗 Related Issues & References

<!--
Link to related issues, discussions, or external resources.
Use GitHub keywords to auto-close issues when PR is merged.
-->

### Resolves

<!-- Use "Fixes", "Closes", or "Resolves" to auto-close issues -->

- Fixes #
- Closes #
- Resolves #

### Related Issues

<!-- Issues that are related but not directly resolved by this PR -->

- Related to #
- See also #

### External References

<!-- Links to external resources, documentation, RFCs, design docs, etc. -->

- [Design Document](url)
- [RFC/Proposal](url)
- [Stack Overflow Discussion](url)
- [API Documentation](url)

---

## 💥 Breaking Changes

<!--
⚠️ IMPORTANT: If this PR introduces breaking changes, fill out this section.
Otherwise, you can remove it.
-->

### Description of Breaking Changes

<!-- Clearly describe what breaks and why -->



### Migration Path

<!-- Provide step-by-step migration instructions for users/developers -->

1.
2.
3.

### Deprecation Warnings

<!-- If deprecating features, specify version timeline and replacement -->

- **Deprecated Feature**:
- **Removal Timeline**: Version X.X.X (Date)
- **Replacement**:

---

## 📊 Performance Impact

<!--
If this PR affects performance, provide metrics or benchmarks.
Remove this section if not applicable.
-->

### Benchmarks

<!-- Include before/after performance measurements -->

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Load Time | | | |
| Memory Usage | | | |
| API Response Time | | | |
| Bundle Size | | | |

### Performance Notes

<!-- Explain any performance implications -->



---

## 🔮 Future Considerations

<!--
Optional: Note any follow-up work, technical debt, or future improvements.
This helps track what's intentionally deferred vs. forgotten.
-->

### Follow-up Tasks

- [ ]
- [ ]

### Known Limitations

<!-- Document any known limitations or edge cases -->

-
-

### Technical Debt

<!-- Note any technical debt introduced that should be addressed later -->

-
-

---

## 🎯 Reviewer Focus Areas

<!--
Help reviewers by highlighting specific areas that need extra attention.
This makes reviews more efficient and effective.
-->

### Please pay special attention to:

- [ ] **Security**: Authentication/authorization logic in `file.js`
- [ ] **Performance**: Database query optimization in `service.js`
- [ ] **Architecture**: New abstraction layer in `module/`
- [ ] **UX**: User flow for feature X
- [ ] **API Design**: New endpoint structure and response format
- [ ] **Error Handling**: Edge cases in `handler.js`
- [ ] **Other**: [Specify]

---

## 📝 Additional Notes

<!--
Any other context, considerations, or information reviewers should know.
Use this space for anything that doesn't fit in the above sections.
-->



---

## 🙋 Questions for Reviewers

<!--
Optional: Ask specific questions you'd like reviewer input on.
This encourages constructive feedback on areas of uncertainty.
-->

1.
2.
3.

---

<!--
═══════════════════════════════════════════════════════════════════════════
REVIEW GUIDELINES FOR MAINTAINERS
═══════════════════════════════════════════════════════════════════════════

When reviewing this PR, please check:

✅ Code Quality
   - Readable, maintainable, and follows project conventions
   - Proper error handling and edge case coverage
   - No code smells or anti-patterns

✅ Functionality
   - Changes work as described
   - No regressions in existing features
   - Handles edge cases appropriately

✅ Testing
   - Adequate test coverage (unit, integration, E2E)
   - Tests are meaningful and test the right things
   - All tests passing

✅ Documentation
   - Code is self-documenting or has clear comments
   - User-facing docs updated if needed
   - API changes documented

✅ Security
   - No security vulnerabilities introduced
   - Sensitive data handled appropriately
   - Input validation and sanitization

✅ Performance
   - No significant performance degradation
   - Efficient algorithms and data structures
   - Resource usage is reasonable

✅ Breaking Changes
   - Breaking changes are clearly documented
   - Migration path provided
   - Deprecation warnings added

═══════════════════════════════════════════════════════════════════════════
MERGE CHECKLIST FOR MAINTAINERS
═══════════════════════════════════════════════════════════════════════════

Before merging:

- [ ] All required approvals received
- [ ] All CI checks passing
- [ ] No unresolved conversations
- [ ] Branch is up-to-date with base branch
- [ ] Squash commits if needed (or use meaningful commit messages)
- [ ] Update CHANGELOG.md if not automated
- [ ] Tag release if applicable
- [ ] Notify stakeholders of breaking changes

═══════════════════════════════════════════════════════════════════════════
-->

---

<p align="center">
  <strong>Thank you for contributing to QR Pro! 🎉</strong><br>
  Your effort helps make this project better for everyone.
</p>

<p align="center">
  <a href="../CONTRIBUTING.md">📖 Contributing Guidelines</a> •
  <a href="../CODE_OF_CONDUCT.md">🤝 Code of Conduct</a> •
  <a href="https://github.com/glastor-dev/qr-pro/discussions">💬 Discussions</a>
</p>
