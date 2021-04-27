import { Fragment, useState } from "react";
import {
  Disclosure,
  Menu,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import { QuestionMarkCircleIcon, SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";

const user = {
  name: "Lisa Marie",
  email: "lisamarie@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: false },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: true },
  { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];
const plans = [
  {
    name: "Startup",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Up to 5 active job postings",
  },
  {
    name: "Business",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Up to 25 active job postings",
  },
  {
    name: "Enterprise",
    priceMonthly: 249,
    priceYearly: 2490,
    limit: "Unlimited active job postings",
  },
];
const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#",
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

  return (
    <>
      <section aria-labelledby="payment_details_heading">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-6 bg-white sm:p-6">
              <div>
                <h2
                  id="payment_details_heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your billing information. Please note that updating
                  your location could affect your tax rates.
                </p>
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

      {/* Plan */}
      <section aria-labelledby="plan_heading">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
              <div>
                <h2
                  id="plan_heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Plan
                </h2>
              </div>

              <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                <RadioGroup.Label className="sr-only">
                  Pricing plans
                </RadioGroup.Label>
                <div className="relative -space-y-px bg-white rounded-md">
                  {plans.map((plan, planIdx) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan}
                      className={({ checked }) =>
                        classNames(
                          planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                          planIdx === plans.length - 1
                            ? "rounded-bl-md rounded-br-md"
                            : "",
                          checked
                            ? "bg-orange-50 border-orange-200 z-10"
                            : "border-gray-200",
                          "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex items-center text-sm">
                            <span
                              className={classNames(
                                checked
                                  ? "bg-orange-500 border-transparent"
                                  : "bg-white border-gray-300",
                                active
                                  ? "ring-2 ring-offset-2 ring-gray-900"
                                  : "",
                                "h-4 w-4 rounded-full border flex items-center justify-center"
                              )}
                              aria-hidden="true"
                            >
                              <span className="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <RadioGroup.Label
                              as="span"
                              className="ml-3 font-medium text-gray-900"
                            >
                              {plan.name}
                            </RadioGroup.Label>
                          </div>
                          <RadioGroup.Description className="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center">
                            <span
                              className={classNames(
                                checked ? "text-orange-900" : "text-gray-900",
                                "font-medium"
                              )}
                            >
                              ${plan.priceMonthly} / mo
                            </span>{" "}
                            <span
                              className={
                                checked ? "text-orange-700" : "text-gray-500"
                              }
                            >
                              (${plan.priceYearly} / yr)
                            </span>
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            className={classNames(
                              checked ? "text-orange-700" : "text-gray-500",
                              "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                            )}
                          >
                            {plan.limit}
                          </RadioGroup.Description>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <Switch.Group as="div" className="flex items-center">
                <Switch
                  checked={annualBillingEnabled}
                  onChange={setAnnualBillingEnabled}
                  className={classNames(
                    annualBillingEnabled ? "bg-orange-500" : "bg-gray-200",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200"
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      annualBillingEnabled ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">
                    Annual billing{" "}
                  </span>
                  <span className="text-sm text-gray-500">(Save 10%)</span>
                </Switch.Label>
              </Switch.Group>
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

      {/* Billing history */}
      <section aria-labelledby="billing_history_heading">
        <div className="pt-6 bg-white shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 sm:px-6">
            <h2
              id="billing_history_heading"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Billing history
            </h2>
          </div>
          <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Amount
                        </th>
                        {/*
                                `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                              */}
                        <th
                          scope="col"
                          className="relative px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          <span className="sr-only">View receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            <time dateTime={payment.datetime}>
                              {payment.date}
                            </time>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {payment.description}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {payment.amount}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <a
                              href={payment.href}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              View receipt
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
