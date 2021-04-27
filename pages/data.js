import { useMachine } from "@xstate/react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { Machine, assign } from "xstate";

import { Notification } from "../components/Notification";

const schemaMachine = Machine(
  {
    id: "schema",
    initial: "init",
    context: {
      appId: null,
      url: null,
    },
    states: {
      init: {
        invoke: {
          src: "initializeSchema",
          onDone: {
            actions: "assignFromClonedSchema",
            target: "editing",
          },
          onError: {
            actions: "assignError",
          },
        },
      },

      editing: {
        initial: "idle",

        states: {
          idle: {
            on: {
              SAVE: "saving",
            },
          },

          saving: {
            invoke: {
              src: "saveSchema",
              onDone: "idle",
              onError: {
                actions: "assignError",
                target: "idle",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      assignFromClonedSchema: assign({
        appId(context, event) {
          return event.data.clonedAppId;
        },
        url(context, event) {
          return event.data.url;
        },
      }),

      assignError: assign({
        error(context, event) {
          return event.data.message;
        },
      }),
    },

    services: {
      async initializeSchema(context, event) {
        // https://sandbox.amplifyapp.com/schema-design/d96b33a6-a2e8-41b8-8f01-322317f1f1d8/clone
        const appId = "d96b33a6-a2e8-41b8-8f01-322317f1f1d8";

        const res = await fetch("/api/clone-schema", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appId }),
        });

        if (res.ok) {
          return await res.json();
        }

        throw new Error(await res.text());
      },

      async saveSchema(context, event) {
        const { appId } = context;

        const res = await fetch("/api/save-schema", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appId }),
        });

        if (res.ok) {
          return await res.json();
        }

        throw new Error(await res.text());
      },
    },
  }
);

export default function Data() {
  const [state, send] = useMachine(schemaMachine);
  const { error, url } = state.context;

  const handleSubmit = (event) => {
    event.preventDefault();

    send("SAVE");
  };

  return (
    <section aria-labelledby="payment_details_heading">
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 bg-white sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Data
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and edit your app's data models, add fields, and
                relationships.
              </p>
            </div>

            {error && (
              <Notification
                Icon={ExclamationCircleIcon}
                title={"Error"}
                description={error}
              />
            )}

            <div className="mt-6 border border-gray-300 shadow-md">
              {state.matches("init") ? (
                <h3 className="p-12 text-3xl text-center animate-pulse">
                  Initializing schema...
                </h3>
              ) : (
                <div style={{ height: "100vh" }}>
                  <iframe
                    src={url}
                    className="relative w-full"
                    style={{
                      top: -165,
                      height: "calc(100vh + 190px + 165px)",
                      clipPath:
                        "polygon(0% 165px, 100% 165px, 100% calc(100% - 190px), 0% calc(100% - 190px))",
                    }}
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          {state.matches("editing") && (
            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              {state.matches("editing.saving") ? (
                <button
                  disabled
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm opacity-75 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 animate-pulse"
                >
                  Saving&hellip;
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Save Schema
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
