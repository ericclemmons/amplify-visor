import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function Authentication() {
  return (
    <section aria-labelledby="payment_details_heading">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-6 bg-white sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Data
              </h2>
              <p className="mt-1 text-sm text-gray-500">TODO</p>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="cc-given-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="cc-family-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email_address"
                  id="email_address"
                  autoComplete="email"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-1">
                <label
                  htmlFor="expiration_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expration date
                </label>
                <input
                  type="text"
                  name="expiration_date"
                  id="expiration_date"
                  autoComplete="cc-exp"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  placeholder="MM / YY"
                />
              </div>

              <div className="col-span-4 sm:col-span-1">
                <label
                  htmlFor="security_code"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <span>Security code</span>
                  <QuestionMarkCircleIcon
                    className="flex-shrink-0 w-5 h-5 ml-1 text-gray-300"
                    aria-hidden="true"
                  />
                </label>
                <input
                  type="text"
                  name="security_code"
                  id="security_code"
                  autoComplete="cc-csc"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country / Region
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="postal_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal
                </label>
                <input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  autoComplete="postal-code"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
