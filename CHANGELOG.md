# Changelog

Todos los cambios relevantes de **Supernova** se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) y versionado según
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-01-01

### Added

- Visualizador de audio en tiempo real (Web Audio API + Canvas).
- Modos de visualización: `orbital` y `horizon`.
- Sistema de partículas reactivas y efecto “glitch” en picos.
- UI/HUD: carga de audio, play/pause, control de volumen y barra de progreso.
- Temas por defecto y generación de temas por prompt usando Gemini.
- Proxy backend para Gemini en Vercel Functions: `/api/generate-theme`.
- Automatización y mantenimiento:

  - CI (GitHub Actions) en rama `master`.
  - CodeQL (seguridad) y Dependabot (dependencias).
- Documentación y gobierno del repo: templates de issues/PR, guías y política de seguridad.
- Licencia: GNU GPL v3.0.

### Changed

- Seguridad de secretos: se eliminó la inyección de `GEMINI_API_KEY` al bundle del frontend; las llamadas a Gemini pasan por el endpoint serverless.

### Security

- `GEMINI_API_KEY` permanece del lado servidor (recomendado para despliegues públicos).
