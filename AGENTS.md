# UI verification

Use Node 24.x and the existing package lockfile.

For taken-lecture UI changes, read [the harness guide](tools/agent-harness/README.md)
and select the relevant checks. The harness runs a real Next server and Cypress
against a stateful synthetic API. Report this as a UI contract check.

For layout or mock-startup changes, also run the type/lint checks and production
build. Keep unit, synthetic UI, production-build and real backend E2E evidence
distinct. Report actual failures, skips, input limitations and cleanup results.

Use synthetic fixtures. Do not copy personal environment files or student records
into the harness or its artifacts. Preserve unrelated work and use this repository's
existing branch and commit conventions.
