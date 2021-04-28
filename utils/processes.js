const execa = require("execa");

const existing = new Map();

// We need this to persist `existing` between the server & API routes. Maybe I'm wrong, but `existing` kept getting reset
process.custom = existing;

const memoize = (name, factory) => (...args) => {
  if (!existing.has(name)) {
    existing.set(name, factory(...args));
  }

  return existing.get(name);
};

exports.processes = {
  project: memoize("project", () => execa("yarn", ["start"])),

  visor: memoize("visor", ({ port }) =>
    execa(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      [
        "--new-window",
        `--app=http://localhost:${port}/`,
        `--explicitly-allowed-ports=${port}`,
      ],
      {
        stdio: "inherit",
      }
    )
  ),

  async kill(name) {
    if (!existing.has(name)) {
      throw new Error(`Process "${name}" has not been started`);
    }

    const child = existing.get(name);

    // Note: I don't know that this works, or at least not with CRA!
    await child.cancel();
    existing.delete(name);

    return child;
  },
};
