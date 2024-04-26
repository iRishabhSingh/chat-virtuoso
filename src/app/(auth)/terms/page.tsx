"use client";

import { ButtonPreviousPage } from "@/components/ButtonPreviousPage";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="relative mx-auto py-6 sm:py-12 px-4 lg:px-[20%] flex flex-col gap-6">
      <div className="hidden sm:block absolute top-6 left-6">
        <ButtonPreviousPage />
      </div>
      <div className="grid gap-2">
        <h1 className="text-5xl font-bold">Chat Virtuoso</h1>
      </div>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold text-balance">
          Terms and Conditions
        </h1>
        <p className="opacity-80">
          Welcome to ChatVirtuoso, a learning project designed to explore the
          capabilities of Next.js and practice writing code. By accessing or
          using our website, you agree to comply with the following terms and
          conditions:
        </p>
      </div>
      {terms.map((term) => {
        return (
          <div key={term.title} className="grid gap-2">
            <h1 className="text-xl font-bold text-balance">{term.title}</h1>
            <p className="opacity-80">{term.description}</p>
          </div>
        );
      })}
      <div className="my-2 font-semibold">
        <span>Last updated: April 26, 2024</span>
      </div>
      <div className="flex justify-center">
        <ButtonPreviousPage />
      </div>
    </div>
  );
};

export default TermsAndConditions;

const terms = [
  {
    title: "Purpose",
    description:
      "ChatVirtuoso is a non-commercial website created for educational purposes. It provides a platform for learning and experimenting with Next.js, API integrations, and web development techniques.",
  },
  {
    title: "API Key Usage",
    description:
      "You are welcome to use ChatVirtuoso freely for learning and experimentation purposes. To access certain features, such as AI integration, you may need to provide your own API key from OpenAI or Gemini by Google. Please ensure that you use these API keys responsibly and in accordance with the terms of service of the respective providers.",
  },
  {
    title: "Prohibited Activities",
    description:
      "While using ChatVirtuoso, you must refrain from engaging in any activities that may disrupt the learning environment or violate the terms of service of third-party providers. This includes but is not limited to malicious hacking, spamming, or any other misuse of the platform.",
  },
  {
    title: "Content Ownership",
    description:
      "You retain ownership of any content you create or upload to ChatVirtuoso while using the platform for learning purposes. However, by using our services, you grant us permission to display, modify, and distribute your content solely for educational and demonstration purposes.",
  },
  {
    title: "Limitation of Liability",
    description:
      "ChatVirtuoso is provided on an “as-is” basis for educational purposes only. We do not guarantee the accuracy, reliability, or suitability of the content provided. Hrishabh Singh and the ChatVirtuoso team shall not be liable for any damages or losses arising from the use of the website.",
  },
  {
    title: "Changes to Terms",
    description:
      "We reserve the right to update or modify these terms and conditions at any time, without prior notice. Any changes will be effective immediately upon posting on the website. It is your responsibility to review these terms periodically to stay informed of any updates.",
  },
  {
    title: "Governing Law",
    description:
      "These terms and conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in India.",
  },
  {
    title: "Contact Information",
    description:
      "If you have any questions or concerns regarding these terms and conditions, please contact us at iRishabhSinghh@gmail.com.",
  },
];
