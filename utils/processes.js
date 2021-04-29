const execa = require("execa");

// We need this to persist `global.childProcesses` between the server & API routes. Maybe I'm wrong, but `global.childProcesses` kept getting reset
global.childProcesses = new Map();

const memoize = (name, factory) => (...args) => {
  if (!global.childProcesses.has(name)) {
    global.childProcesses.set(name, factory(...args));
  }

  return global.childProcesses.get(name);
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
    if (!global.childProcesses.has(name)) {
      throw new Error(`Process "${name}" has not been started`);
    }

    const child = global.childProcesses.get(name);

    // Note: I don't know that this works, or at least not with CRA!
    await child.cancel();

    console.log("Canceled", child);
    // global.childProcesses.delete(name);

    return child;
  },
};
