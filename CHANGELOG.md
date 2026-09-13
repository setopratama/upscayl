# Changelog

All notable changes to the **Upscayl** project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### 🚀 Added
- **"Keep Original Filename" Setting Toggle**:
  - Added a new toggle switch in the **Settings** tab under the metadata section.
  - Allows users to upscale images without appending default suffixes like `_upscayl_4x_<model>` or `_upscayl_2x_<model>`.
  - UI Component: `renderer/components/sidebar/settings-tab/keep-original-filename-toggle.tsx`.
- **File Collision & Overwrite Protection**:
  - Implemented automatic safety guard in `electron/commands/image-upscayl.ts` and `electron/commands/double-upscayl.ts`.
  - When saving to the exact same folder with the same file name and format as the source image, `_upscaled` is automatically appended to prevent the AI engine from damaging or overwriting the original file.
- **State Management & Persistence**:
  - Added `keepOriginalFilenameAtom` in `renderer/atoms/user-settings-atom.ts` using Jotai, persisted across sessions via `localStorage`.
- **Full Localization (i18n)**:
  - Added `SETTINGS.KEEP_ORIGINAL_FILENAME` translations across all 20 language files in `renderer/locales/`.
  - Fully validated against `scripts/validate-schema.js`.
- **AI Agent Guidelines**:
  - Created `AGENTS.md` documenting technical architecture, IPC communication patterns, memory constraints, and pre-flight verification checklists.

### 🐛 Fixed
- **EXIF Metadata Copying in Batch Upscaling**:
  - Fixed an issue in `electron/commands/batch-upscayl.ts` where `copyMetadata` was receiving the folder path (`inputDir`) instead of the individual file path (`originalFile`).
  - EXIF metadata is now accurately copied to each processed image during batch/folder upscaling.

---

## [2.15.0] - 2024
- Updated dependencies to Electron v33 and Next.js v15.
- Improved Vulkan NCNN inference stability.
- Support for custom models and path length fixes on Windows.
