import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck, Headphones, Users } from "lucide-react";

const stats = [
  { label: "Happy Customers", value: "120K+" },
  { label: "Products Listed", value: "8,500+" },
  { label: "Countries Served", value: "24" },
  { label: "Years in Business", value: "7" },
];

const values = [
  {
    icon: Truck,
    title: "Fast, Reliable Shipping",
    description:
      "We partner with trusted carriers to get your order to your door quickly and safely, wherever you are.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description:
      "Every transaction is encrypted end-to-end, so you can shop with confidence every single time.",
  },
  {
    icon: Headphones,
    title: "Real Human Support",
    description:
      "Our support team is made up of real people who actually want to solve your problem, not just close the ticket.",
  },
  {
    icon: Users,
    title: "Built With Our Community",
    description:
      "Product decisions are shaped by feedback from thousands of customers who use SHOPNEST every day.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
        <p className="text-sm font-bold tracking-widest text-(--primary)">
          ABOUT SHOPNEST
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          We&apos;re building the easiest way to shop online
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600 sm:text-base">
          SHOPNEST started with a simple idea — online shopping should feel
          effortless, honest, and fast. Today we help thousands of customers
          find products they love, from trusted sellers, at fair prices.
        </p>
      </section>

      {/* Story + image */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
          <Image
            src="/assets/about/our-story.jpg"
            alt="Team working together at SHOPNEST"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            SHOPNEST was founded to close the gap between big-box marketplaces
            and independent sellers. We wanted a platform where quality products
            from smaller brands could stand next to the big names — without
            sacrificing trust, speed, or support.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            What started as a small catalog of electronics has grown into a full
            marketplace spanning laptops, cameras, gaming gear, and more — all
            backed by secure payments and a support team that actually answers.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-(--primary) px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-(--primary)">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 text-center lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-green-100 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            What We Stand For
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
            A few principles guide every decision we make, from the products we
            list to the way we treat our customers.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-xl border border-gray-100 p-6 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-(--primary)">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-gray-900 px-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Ready to start shopping?
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Join thousands of customers already shopping smarter with
              SHOPNEST.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-md bg-(--primary) px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      </section>
    </div>
  );
}
