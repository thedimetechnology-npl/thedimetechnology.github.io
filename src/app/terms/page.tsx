import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | The Dime Technology",
  description:
    "Terms of Service for The Dime Technology — the terms that govern your access to and use of our website and services.",
  keywords: "terms of service, terms and conditions, The Dime Technology",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | The Dime Technology",
    description:
      "The terms that govern your access to and use of our website and services.",
    type: "article",
    images: ["/assets/og.png"],
  },
};

const sections = [
  {
    num: "01",
    heading: "Services Provided",
    blocks: [
      {
        p: "The Dime Technology provides software development, code review, IT consulting, digital transformation, mobile app development, and technical support services. Detailed descriptions of our service offerings are available on the Site. We reserve the right to modify, suspend, or discontinue any service or feature at any time without prior notice.",
      },
    ],
  },
  {
    num: "02",
    heading: "Intellectual Property Rights",
    blocks: [
      {
        p: "Unless otherwise stated, The Dime Technology and/or its licensors own the intellectual property rights for all material on this Site, including text, graphics, logos, images, code, and design assets. All intellectual property rights are reserved. You are granted a limited license only for purposes of viewing the material contained on this Site. You must not:",
      },
      {
        ul: [
          "Republish material from our Site without prior written consent.",
          "Sell, rent, or sub-license material from our Site.",
          "Reproduce, duplicate, or copy material from our Site for commercial purposes.",
          "Redistribute content from The Dime Technology unless content is specifically made for redistribution.",
        ],
      },
    ],
  },
  {
    num: "03",
    heading: "User Conduct & Acceptable Use",
    blocks: [
      {
        p: "You agree to use the Site only for lawful purposes. When interacting with our Site or submitting inquiries through our contact forms, you agree not to:",
      },
      {
        ul: [
          "Transmit any malicious software, viruses, or harmful code.",
          "Engage in data extraction, web scraping, or unauthorized automated access.",
          "Submit false, misleading, or fraudulent information.",
          "Use the Site in any way that causes, or may cause, damage to the Site or impairment of the availability or accessibility of the Site.",
        ],
      },
    ],
  },
  {
    num: "04",
    heading: "Client Agreements & Project Scope",
    blocks: [
      {
        p: "Inquiries made through our Site do not constitute a binding contract for service delivery. Professional tech services, deliverables, timelines, and payment terms will be governed by a separate formal agreement, contract, or Statement of Work (SOW) executed between The Dime Technology and the client.",
      },
    ],
  },
  {
    num: "05",
    heading: "Third-Party Links & Content",
    blocks: [
      {
        p: "Our Site may contain links to third-party websites, services, or advertisements (including third-party ad networks like Google AdSense) that are not owned or controlled by The Dime Technology. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that The Dime Technology shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any such content, goods, or services.",
      },
    ],
  },
  {
    num: "06",
    heading: "Limitation of Liability",
    blocks: [
      {
        p: "To the maximum extent permitted by applicable law, in no event shall The Dime Technology, its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:",
      },
      {
        ul: [
          "Your access to or use of (or inability to access or use) the Site.",
          "Any conduct or content of any third party on the Site.",
          "Any unauthorized access, use, or alteration of your transmissions or content.",
        ],
      },
    ],
  },
  {
    num: "07",
    heading: "Disclaimer of Warranties",
    blocks: [
      {
        p: 'The Site and its contents are provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, whether express or implied. The Dime Technology makes no warranties regarding the accuracy, completeness, or timeliness of the information provided on the Site, or that the Site will operate uninterrupted or error-free.',
      },
    ],
  },
  {
    num: "08",
    heading: "Governing Law",
    blocks: [
      {
        p: "These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Nepal.",
      },
    ],
  },
  {
    num: "09",
    heading: "Changes to These Terms",
    blocks: [
      {
        p: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Updates will be posted on this page with a revised "Effective Date." By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.',
      },
    ],
  },
  {
    num: "10",
    heading: "Contact Us",
    blocks: [
      {
        p: "If you have any questions about these Terms of Service, please contact us at info@thedimetechnology.com.np or call +977 9801024024, +977 9851212025.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      badge="Terms"
      lead="Terms of"
      gradient="Service"
      effectiveDate="August 23, 2026"
      intro={
        <>
          <p>
            A complete Terms of Service document tailored for{" "}
            <strong className="text-white">The Dime Technology</strong> that complies with
            standard legal practices and Google AdSense publisher requirements. Located at
            www.thedimetechnology.com.np.
          </p>
          <p>
            By accessing or using our Site and services, you agree to be bound by these
            Terms. If you disagree with any part of these terms, you may not access the
            Site or use our services.
          </p>
        </>
      }
      sections={sections}
      cta={{
        heading: "Have a question about these Terms?",
        text: "If you have questions about these Terms of Service or how we work, please contact our team.",
      }}
    />
  );
}
