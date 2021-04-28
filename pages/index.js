import { Switch } from "@headlessui/react";
import { readFile } from "fs/promises";
import { kebabCase } from "lodash";
import { useState, useRef, useEffect } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

import Modal from "../components/Modal";

const defaultValues = {
  project_name: "amplify-visor-test",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Project({ awsExports, cwd = "/tmp", pkg }) {
  const outputRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [changed, setChanged] = useState(defaultValues);
  const [enabled, setEnabled] = useState(pkg ? true : undefined);

  useEffect(() => {
    // Only fire if it's been explicitly set
    if (enabled === undefined) return;

    fetch(enabled ? "/api/start-project" : "/api/stop-project", {
      method: "POST",
    }).then(() => {
      if (!enabled) window.close();
    });
  }, [enabled]);

  function handleChange(event) {
    let { checked, name, type, value } = event.target;

    switch (type) {
      case "checkbox":
        if (!checked) value = undefined;
        break;
      default:
    }

    setChanged((changed) => ({
      ...changed,
      [name]: value,
    }));
  }

  function openInIDE() {
    fetch("/api/launch-editor", { method: "POST" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setOutput("");
    setIsModalOpen(true);

    const createProjectSteps = [
      {
        enabled: !pkg,
        title: "Create React App",
        url: "/api/create-react-app",
      },
      {
        enabled: !awsExports,
        title: "Initialize Amplify",
        url: "/api/amplify-init",
      },
      {
        enabled: true,
        title: "Install Amplify Dependencies",
        url: "/api/install-amplify-deps",
      },
    ].filter((step) => step.enabled);

    const formData = new FormData(event.target);
    const body = JSON.stringify(Object.fromEntries(formData));

    const method = "POST";

    async function submitSteps(step = 0) {
      const res = await fetch(createProjectSteps[step].url, { body, method });
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      reader.read().then(async function processText({ done, value }) {
        console.log({ done, step });
        if (done) {
          console.log({ step });
          if (createProjectSteps[step + 1]) {
            console.log("next step");
            await submitSteps(step + 1);
          }

          // This way we can pull in the latest `pkg` data from getServerSideProps
          window.location.reload();

          return;
        }

        setOutput((prev) => prev + `${decoder.decode(value)}\n`);

        outputRef.current.scroll({
          behavior: "smooth",
          top: outputRef.current.scrollHeight,
        });

        return reader.read().then(await processText);
      });
    }

    submitSteps();
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <section aria-labelledby="payment_details_heading">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        buttons={
          <>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={closeModal}
            >
              Close
            </button>
          </>
        }
      >
        <pre
          ref={outputRef}
          className="p-6 overflow-y-auto font-mono text-sm subpixel-antialiased text-white bg-gray-800 rounded-md shadow-inner h-96"
        >
          {output}
        </pre>
      </Modal>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 bg-white sm:p-6">
            <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {pkg ? (
                  <button
                    className="flex text-indigo-700 underline"
                    onClick={openInIDE}
                    type="button"
                  >
                    {pkg.name}
                    <ExternalLinkIcon className="w-6 h-6" />
                  </button>
                ) : (
                  "New Project"
                )}
              </h3>

              <div className="mt-3 sm:mt-0 sm:ml-4">
                {pkg && (
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={classNames(
                      enabled ? "bg-indigo-600" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        enabled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="col-span-4 sm:col-span-4" hidden={pkg}>
                <label
                  htmlFor="project_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project name
                </label>
                <input
                  type="text"
                  name="project_name"
                  id="project_name"
                  defaultValue={defaultValues.project_name}
                  placeholder="my-amplify-app"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
                <p
                  className="mt-2 font-mono text-xs text-gray-500"
                  id="email-description"
                >
                  {cwd}/{kebabCase(changed.project_name)}
                </p>
              </div>

              <div className="col-span-4 sm:col-span-2" hidden>
                <label
                  htmlFor="project_location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project location
                </label>
                <input
                  type="hidden"
                  name="project_location"
                  id="project_location"
                  value={cwd}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="environment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Environment
                </label>
                <input
                  type="text"
                  name="environment"
                  id="environment"
                  defaultValue="dev"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="default_editor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Default editor
                </label>
                <select
                  type="text"
                  name="default_editor"
                  id="default_editor"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                >
                  <option value="vscode">Visual Studio Code</option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2" hidden={pkg}>
                <label
                  htmlFor="app_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  App type
                </label>
                <select
                  name="app_type"
                  id="app_type"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  defaultValue="javascript"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="ios" disabled>
                    iOS
                  </option>
                  <option value="android" disabled>
                    Android
                  </option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2" hidden={pkg}>
                <label
                  htmlFor="framework"
                  className="block text-sm font-medium text-gray-700"
                >
                  Framework
                </label>
                <select
                  id="framework"
                  name="framework"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  defaultValue="react"
                >
                  <option value="n/a" disabled>
                    N/A
                  </option>
                  <option value="react">React</option>
                  <option value="angular" disabled>
                    Angular
                  </option>
                  <option value="vue" disabled>
                    Vue
                  </option>
                  <option value="nextjs" disabled>
                    Next.js
                  </option>
                  <option value="react-native" disabled>
                    React Native
                  </option>
                  <option value="ionic" disabled>
                    Ionic
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              {awsExports ? "Update" : "Create"} Amplify App
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export async function getServerSideProps(context) {
  let awsExports = null;
  let pkg = null;

  try {
    awsExports = await readFile("src/aws-exports.js");
  } catch (error) {}

  try {
    pkg = JSON.parse(await readFile("package.json", "utf8"));
  } catch (error) {}

  return {
    props: {
      awsExports,
      cwd: process.cwd(),
      pkg,
    },
  };
}
