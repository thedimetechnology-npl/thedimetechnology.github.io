import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | The Dime Technology",
  description:
    "The Dime Technology privacy policy — what information we collect through our website, how we use it, and how we protect it.",
  keywords: "privacy policy, data protection, The Dime Technology",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | The Dime Technology",
    description:
      "What information we collect through our website, how we use it, and how we protect it.",
    type: "article",
    images: ["/assets/og.png"],
  },
};

const sections = [
  {
    num: "01",
    heading: "Information We Collect",
    blocks: [
      {
        p: "We collect information to provide better services to all our users. The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask for your personal information.",
      },
    ],
  },
  {
    num: "02",
    heading: "Direct Interactions",
    blocks: [
      {
        p: "When you contact us directly through our contact form, email, or phone, we may receive personal information such as:",
      },
      {
        ul: [
          "Full name",
          "Email address",
          "Phone number",
          "Company name",
          "Contents of your message",
          "Files or attachments you choose to send",
        ],
      },
      {
        p: "This information is used to respond to your inquiries, understand your requirements, and provide the requested services.",
      },
    ],
  },
  {
    num: "03",
    heading: "Log Files",
    blocks: [
      {
        p: "The Dime Technology follows standard website practices and may use log files to monitor website activity and improve website performance.",
      },
      {
        p: "The information collected through log files may include:",
      },
      {
        ul: [
          "Internet Protocol (IP) address",
          "Browser type",
          "Internet Service Provider (ISP)",
          "Date and time of visit",
          "Referring and exit pages",
          "Number of clicks and general website activity",
        ],
      },
      {
        p: "This information is generally used for analytics, security, troubleshooting, and website performance. Log file information is not intentionally linked to personally identifiable information.",
      },
    ],
  },
  {
    num: "04",
    heading: "How We Use Your Information",
    blocks: [
      {
        p: "The information we collect may be used for the following purposes:",
      },
      {
        ul: [
          "Responding to inquiries and service requests",
          "Providing and improving our services",
          "Communicating with users",
          "Improving website functionality",
          "Monitoring website security and performance",
          "Understanding how visitors use our website",
          "Preventing fraudulent or unauthorized activity",
        ],
      },
    ],
  },
  {
    num: "05",
    heading: "Data Protection",
    blocks: [
      {
        p: "We take reasonable measures to protect the information submitted through our website and other communication channels. However, no method of transmitting or storing information online can be guaranteed to be completely secure.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      badge="Privacy"
      lead="Privacy"
      gradient="Policy"
      effectiveDate="August 23, 2026"
      intro={
        <>
          <p>
            At <strong className="text-white">The Dime Technology</strong>, accessible
            from www.thedimetechnology.com.np, one of our main priorities is the privacy
            of our visitors. This Privacy Policy explains what information we collect, how
            we collect it, and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy
            Policy, please contact us at{" "}
            <a
              href="mailto:info@thedimetechnology.com.np"
              className="text-[#2b7de0] hover:text-white transition-colors"
            >
              info@thedimetechnology.com.np
            </a>
            .
          </p>
        </>
      }
      sections={sections}
      cta={{
        heading: "Have a question about your privacy?",
        text: "If you have questions about this Privacy Policy or how we handle your information, please contact our team.",
      }}
    />
  );
}
