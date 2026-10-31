/**
 * Copy slots that are waiting on their owner.
 *
 * `null` means "unknown" — the component renders nothing at all: no label, no
 * empty element, no whitespace. Fill the string in and the slot appears.
 *
 * The questions themselves live in OPEN_ITEMS.md, deliberately outside the
 * bundle, so an unresolved placeholder can never reach the page. The build
 * runs scripts/check-placeholders.mjs after Vite and fails if the marker
 * string appears in any built file.
 */

export const pending = {
  /** Net revenue retention, only if you want it shown next to GRR. */
  nrr: null as string | null,
  /** One-line target role, rendered under the hero tagline. */
  seeking: null as string | null,
  /** Sponsorship status and/or overlap hours, rendered beside the status chips. */
  workAuth: null as string | null,
  /** One-sentence framing of the Lab, rendered under the page title. */
  labIntro: null as string | null,
  /** Whiteboard destination. Both fields are required before the footer link appears. */
  whiteboard: null as { url: string; label: string } | null,
};

export type Attribution = {
  /** null until the person is named and has consented. */
  name: string | null;
  role: string;
  company: string;
  href?: string;
};
