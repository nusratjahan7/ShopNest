"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  label: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    id: "orders",
    label: "Orders & Shipping",
    items: [
      {
        id: "order-1",
        question: "How long does shipping take?",
        answer:
          "Most orders ship within 1-2 business days and arrive within 3-7 business days depending on your location. You'll get a tracking link by email as soon as your order ships.",
      },
      {
        id: "order-2",
        question: "Can I change or cancel my order after placing it?",
        answer:
          "You can change or cancel an order within 1 hour of placing it from your Orders page. After that, the order may already be processing and can't be modified — but you can still return it once delivered.",
      },
      {
        id: "order-3",
        question: "Do you ship internationally?",
        answer:
          "Yes, we currently ship to 24 countries. Shipping cost and delivery time are calculated at checkout based on your address.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns & Refunds",
    items: [
      {
        id: "return-1",
        question: "What is your return policy?",
        answer:
          "Most items can be returned within 30 days of delivery for a full refund, as long as they're unused and in their original packaging. Some categories, like personal care items, aren't eligible for return.",
      },
      {
        id: "return-2",
        question: "How long do refunds take to process?",
        answer:
          "Once we receive your returned item, refunds are processed within 3-5 business days. It may take a few extra days for the refund to appear on your statement, depending on your bank.",
      },
    ],
  },
  {
    id: "account",
    label: "Account & Payments",
    items: [
      {
        id: "account-1",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards, along with popular digital wallets. All payments are processed securely and we never store your full card details.",
      },
      {
        id: "account-2",
        question: "How do I reset my password?",
        answer:
          'Go to the login page and click "Forget Password?". Enter your email and we\'ll send you a link to set a new one.',
      },
      {
        id: "account-3",
        question: "Can I have multiple shipping addresses on my account?",
        answer:
          "Yes, you can save as many addresses as you like from your account settings and choose which one to use at checkout.",
      },
    ],
  },
  {
    id: "selling",
    label: "Selling on SHOPNEST",
    items: [
      {
        id: "sell-1",
        question: "How do I become a seller?",
        answer:
          "Register for an account and apply for a seller profile from your dashboard. Most applications are reviewed within 2 business days.",
      },
      {
        id: "sell-2",
        question: "What fees does SHOPNEST charge sellers?",
        answer:
          "We charge a small commission per sale, with no listing fees or monthly subscription. Full details are available in your seller dashboard once approved.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900">
          {item.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
            open ? "rotate-180 text-(--primary)" : ""
          }`}
        />
      </button>

      {open && (
        <p className="pb-4 text-sm leading-relaxed text-gray-600">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);

  const current =
    faqCategories.find((cat) => cat.id === activeCategory) ?? faqCategories[0];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center lg:px-8">
        <p className="text-sm font-bold tracking-widest text-(--primary)">
          SUPPORT
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-sm text-gray-600 sm:text-base">
          Can&apos;t find what you&apos;re looking for? Reach out to our support
          team and we&apos;ll get back to you within 24 hours.
        </p>
      </section>

      {/* Category tabs */}
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 border-b border-gray-100 pb-6">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                activeCategory === cat.id
                  ? "bg-(--primary) text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <section className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <div className="rounded-xl border border-gray-100 px-6">
          {current.items.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-16 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-gray-900 px-6 py-8 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-bold text-white">
              Still have questions?
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Our support team is happy to help with anything else.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-md bg-(--primary) px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  );
}
