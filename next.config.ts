import type { NextConfig } from "next";

/**
 * The site is published as a static export on GitHub Pages, which serves plain
 * files and runs no Node process.
 *
 * `output: 'export'` writes the whole site to `out/` during `next build`.
 * Images are left unoptimized because the optimizer is a server feature; the
 * screenshots in `public/projects` are already sized for their slots, so they
 * are served as-is.
 *
 * No `basePath` is needed: the repository is named `<user>.github.io`, so the
 * site lives at the root of the domain.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
