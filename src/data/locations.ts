export type CityKeyword = {
  name: string;
  keyword: string;
  desc: string;
};

export type LocationPage = {
  slug: string;
  name: string;
  region: string;
  countryCode: string;
  title: string;
  intro: string;
  keywords: string[];
  cities?: CityKeyword[];
};

export const coreServices: { title: string; desc: string }[] = [
  {
    title: "Custom Software Development Company",
    desc: "Bespoke software development services, custom enterprise software solutions, legacy software modernization and scalable software products engineered around your business processes.",
  },
  {
    title: "Web Development Services",
    desc: "Full stack web development, progressive web apps, enterprise web portals, ecommerce development and custom CMS builds with secure, responsive web application architecture.",
  },
  {
    title: "Mobile App Development Company",
    desc: "Cross-platform mobile app development for iOS and Android — native, hybrid, Flutter and React Native apps with backend, API development and maintenance support.",
  },
  {
    title: "AI Development Company",
    desc: "Artificial intelligence development services: generative AI integration, LLM and chatbot development, natural language processing, predictive analytics and AI workflow automation.",
  },
  {
    title: "Odoo Development & ERP Solutions",
    desc: "Odoo ERP implementation services, custom Odoo module development, Odoo integration and migration, plus custom CRM and ERP software development for growing teams.",
  },
  {
    title: "IT Outsourcing & Dedicated Development Team",
    desc: "IT outsourcing company services with dedicated development teams, offshore software development and IT staff augmentation you can scale on demand.",
  },
  {
    title: "Hire Dedicated Software Developers",
    desc: "Hire remote software engineers — Flutter, React, Node.js, Laravel, Python and full stack developers on flexible, project-based or dedicated contracts.",
  },
  {
    title: "Industry-Specific Software Solutions",
    desc: "Healthcare software, fintech apps, logistics and supply chain automation, ecommerce, travel booking engines, edtech platforms and real estate portals.",
  },
];

export const locations: LocationPage[] = [
  {
    slug: "usa",
    name: "USA",
    region: "North America",
    countryCode: "US",
    title: "Software Development Company USA",
    intro:
      "The Dime Technology is an offshore software development company trusted by startups, SMBs and enterprises across the United States. From custom enterprise software and SaaS platform development to mobile app development, AI development and Odoo ERP implementation, our dedicated development team in Nepal delivers production-ready results for clients in New York, San Francisco, Austin, Texas, Florida, California and nationwide.",
    keywords: [
      "Software Development Company USA",
      "Custom Software Development USA",
      "IT Outsourcing Company USA",
      "Mobile App Development Company USA",
      "Web Development Company USA",
      "AI Development Company USA",
      "Odoo Development Company USA",
      "Dedicated Development Team USA",
      "Hire Software Developers USA",
      "Offshore Software Development USA",
      "SaaS Development Company USA",
      "Custom Enterprise Software USA",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    countryCode: "CA",
    title: "Software Development Company Canada",
    intro:
      "The Dime Technology provides custom software development, IT outsourcing and dedicated development team services to businesses across Canada. Whether you need a custom CRM, ERP development, cloud software development or a full stack web application, our offshore engineers deliver enterprise-grade solutions for clients in Toronto, Vancouver, Montreal, Calgary and beyond.",
    keywords: [
      "Software Development Company Canada",
      "Custom Software Development Canada",
      "IT Outsourcing Company Canada",
      "Mobile App Development Company Canada",
      "Web Development Company Canada",
      "AI Development Company Canada",
      "Odoo Development Company Canada",
      "Dedicated Development Team Canada",
      "Hire Software Developers Canada",
      "Offshore Development Team Canada",
      "Custom CRM Development Canada",
      "Custom ERP Development Canada",
      "Hire Full Stack Developers Canada",
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    region: "United Kingdom & Ireland",
    countryCode: "GB",
    title: "Software Development Company UK",
    intro:
      "The Dime Technology is a software development company helping UK businesses design, build and scale digital products. Our offshore development team delivers custom software development, SaaS platform development, enterprise app development and IT staff augmentation for clients in London, Manchester, Birmingham, Edinburgh and across England, Scotland and Wales.",
    keywords: [
      "Software Development Company UK",
      "Custom Software Development UK",
      "IT Outsourcing Company UK",
      "Mobile App Development Company UK",
      "Web Development Company UK",
      "AI Development Company UK",
      "Odoo Development Company UK",
      "Dedicated Development Team UK",
      "Hire Software Developers UK",
      "Software Outsourcing Services UK",
      "SaaS Platform Development UK",
      "IT Staff Augmentation UK",
      "Hire Dedicated Developers UK",
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    region: "United Kingdom & Ireland",
    countryCode: "IE",
    title: "Software Development Company Ireland",
    intro:
      "The Dime Technology supports Irish startups and enterprises with custom software development, web and mobile app development and dedicated developers for hire. As your offshore software development partner, we help companies in Dublin, Cork, Galway and Limerick ship enterprise software faster without the cost of a local team.",
    keywords: [
      "Software Development Company Ireland",
      "Custom Software Development Ireland",
      "IT Outsourcing Company Ireland",
      "Mobile App Development Company Ireland",
      "Web Development Company Ireland",
      "AI Development Company Ireland",
      "Odoo Development Company Ireland",
      "Dedicated Development Team Ireland",
      "Hire Software Developers Ireland",
      "Enterprise Software Company Ireland",
    ],
  },
  {
    slug: "uae",
    name: "UAE",
    region: "Middle East & GCC",
    countryCode: "AE",
    title: "Software Development Company UAE",
    intro:
      "The Dime Technology is a software development company serving businesses in the United Arab Emirates. From custom software development and mobile app development to Odoo ERP implementation and AI development services, our dedicated development team builds digital products for clients in Dubai, Abu Dhabi, Sharjah and across the GCC.",
    keywords: [
      "Software Development Company UAE",
      "Custom Software Development UAE",
      "IT Outsourcing Company UAE",
      "Mobile App Development Company UAE",
      "Web Development Company UAE",
      "AI Development Company UAE",
      "Odoo Development Company UAE",
      "Dedicated Development Team UAE",
      "Hire Software Developers UAE",
      "Software Development Company Dubai",
      "Software Development Company Abu Dhabi",
      "Odoo ERP Implementation Dubai",
      "Business Process Automation Dubai",
      "Custom ERP Development UAE",
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    region: "Middle East & GCC",
    countryCode: "SA",
    title: "Software Development Company Saudi Arabia",
    intro:
      "The Dime Technology delivers custom software development, Odoo ERP implementation and enterprise digital transformation services to organizations in Saudi Arabia. Our offshore team builds custom software, mobile apps and AI-powered solutions for businesses in Riyadh, Jeddah, Dammam and across the Kingdom, aligned with Vision 2030 goals.",
    keywords: [
      "Software Development Company Saudi Arabia",
      "Custom Software Development Saudi Arabia",
      "IT Outsourcing Company Saudi Arabia",
      "Mobile App Development Company Saudi Arabia",
      "Web Development Company Saudi Arabia",
      "AI Development Company Saudi Arabia",
      "Odoo Development Company Saudi Arabia",
      "Dedicated Development Team Saudi Arabia",
      "Software Development Company Riyadh",
      "Odoo Implementation Saudi Arabia",
      "Custom ERP Development Saudi Arabia",
      "Enterprise Digital Transformation Saudi Arabia",
    ],
  },
  {
    slug: "qatar",
    name: "Qatar",
    region: "Middle East & GCC",
    countryCode: "QA",
    title: "Software Development Company Qatar",
    intro:
      "The Dime Technology is a software development company providing custom software development, web development and mobile app development services in Qatar. We build Odoo ERP solutions, custom software and AI integrations for businesses in Doha, Al Rayyan and across Qatar, with a dedicated development team ready to scale with you.",
    keywords: [
      "Software Development Company Qatar",
      "Custom Software Development Qatar",
      "IT Outsourcing Company Qatar",
      "Mobile App Development Company Qatar",
      "Web Development Company Qatar",
      "AI Development Company Qatar",
      "Odoo Development Company Qatar",
      "Software Development Company Doha",
      "Mobile App Development Doha",
      "Custom ERP Solutions Qatar",
      "Odoo ERP Development Qatar",
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Asia-Pacific & Oceania",
    countryCode: "AU",
    title: "Software Development Company Australia",
    intro:
      "The Dime Technology is an offshore software development company working with Australian startups and enterprises. We deliver custom software development, web and mobile app development, AI development and dedicated development teams for clients in Sydney, Melbourne, Brisbane, Perth and across Australia — at a fraction of local agency costs.",
    keywords: [
      "Software Development Company Australia",
      "Custom Software Development Australia",
      "IT Outsourcing Company Australia",
      "Mobile App Development Company Australia",
      "Web Development Company Australia",
      "AI Development Company Australia",
      "Odoo Development Company Australia",
      "Dedicated Development Team Australia",
      "Hire Software Developers Australia",
      "Offshore Development Team Australia",
      "Software Development Company Sydney",
      "Software Development Company Melbourne",
      "Software Development Company Brisbane",
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Asia-Pacific & Oceania",
    countryCode: "NZ",
    title: "Software Development Company New Zealand",
    intro:
      "The Dime Technology partners with New Zealand businesses as their offshore software development company. From custom software development and IT outsourcing to mobile app development and Odoo ERP development, our dedicated development team helps Kiwi startups and enterprises in Auckland, Wellington and Christchurch ship faster.",
    keywords: [
      "Software Development Company New Zealand",
      "Custom Software Development New Zealand",
      "IT Outsourcing Company New Zealand",
      "Mobile App Development New Zealand",
      "Web Development Company New Zealand",
      "Odoo ERP Development New Zealand",
      "Hire Software Developers New Zealand",
      "Dedicated Development Team New Zealand",
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Asia-Pacific",
    countryCode: "SG",
    title: "Software Development Company Singapore",
    intro:
      "The Dime Technology is a software development company serving enterprises and startups in Singapore and across Southeast Asia. We provide custom software development, IT outsourcing, AI development and Odoo ERP implementation for clients in Singapore, Malaysia, Thailand, the Philippines and Indonesia, with English-speaking dedicated teams.",
    keywords: [
      "Software Development Company Singapore",
      "Custom Software Development Singapore",
      "IT Outsourcing Company Singapore",
      "Mobile App Development Singapore",
      "Web Development Company Singapore",
      "AI Development Company Singapore",
      "Odoo Development Company Singapore",
      "Dedicated Development Team Singapore",
      "Hire Software Developers Singapore",
      "Software Development Company Malaysia",
      "IT Outsourcing Company Malaysia",
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe (DACH)",
    countryCode: "DE",
    title: "Software Development Company Germany",
    intro:
      "The Dime Technology is an IT outsourcing company delivering custom software development, web and mobile app development and dedicated development teams to German businesses. Companies in Berlin, Munich, Hamburg and Frankfurt trust us for offshore software engineering, AI development and Odoo ERP services across the DACH region.",
    keywords: [
      "Software Development Company Germany",
      "Custom Software Development Germany",
      "IT Outsourcing Company Germany",
      "Mobile App Development Germany",
      "Web Development Company Germany",
      "AI Development Company Germany",
      "Odoo Development Company Germany",
      "Dedicated Development Team Germany",
      "Hire Software Developers Germany",
      "Offshore Development Partner Germany",
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe (Benelux)",
    countryCode: "NL",
    title: "Software Development Company Netherlands",
    intro:
      "The Dime Technology provides custom software development, IT outsourcing and dedicated development team services to companies in the Netherlands. Our offshore engineers build web applications, mobile apps and AI-powered platforms for businesses in Amsterdam, Rotterdam, Utrecht and across Benelux.",
    keywords: [
      "Software Development Company Netherlands",
      "Custom Software Development Netherlands",
      "IT Outsourcing Company Netherlands",
      "Mobile App Development Netherlands",
      "Web Development Company Netherlands",
      "AI Development Company Netherlands",
      "Odoo Development Company Netherlands",
      "Hire Software Developers Netherlands",
      "Software Development Company Belgium",
      "IT Outsourcing Company Belgium",
    ],
  },
  {
    slug: "india",
    name: "India",
    region: "Asia-Pacific",
    countryCode: "IN",
    title: "Software Development Company India",
    intro:
      "The Dime Technology is a software development company delivering custom software development, IT outsourcing and offshore development services from Nepal to clients across India. We build web and mobile apps, AI solutions, Odoo ERP systems and SaaS platforms for businesses in Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, Noida and Gurgaon.",
    keywords: [
      "software development company India",
      "custom software development India",
      "IT outsourcing company India",
      "web development company India",
      "mobile app development company India",
      "AI development company India",
      "Odoo development company India",
      "ERP development company India",
      "software development outsourcing India",
      "hire software developers India",
      "Flutter development company India",
      "React development company India",
      "Node.js development company India",
      "SaaS development company India",
    ],
    cities: [
      {
        name: "Bangalore",
        keyword: "software development company Bangalore",
        desc: "Hire dedicated developers in Bangalore — custom software, AI development and IT outsourcing for India's silicon valley startups and IT parks.",
      },
      {
        name: "Mumbai",
        keyword: "software development company Mumbai",
        desc: "Web and mobile app development for Mumbai's fintech, media and enterprise businesses, delivered by our offshore engineering team.",
      },
      {
        name: "Delhi",
        keyword: "software development company Delhi",
        desc: "Custom software development and IT outsourcing for Delhi NCR companies, from growing startups to established enterprises.",
      },
      {
        name: "Hyderabad",
        keyword: "software development company Hyderabad",
        desc: "Odoo ERP, cloud software development and AI solutions for Hyderabad's pharma, IT and startup ecosystem.",
      },
      {
        name: "Chennai",
        keyword: "software development company Chennai",
        desc: "Mobile app development and custom software services for Chennai manufacturers, automotive and IT businesses.",
      },
      {
        name: "Pune",
        keyword: "software development company Pune",
        desc: "Hire Flutter and React developers for Pune's automotive, education and software product companies.",
      },
      {
        name: "Ahmedabad",
        keyword: "software development company Ahmedabad",
        desc: "Web development company services and business automation for Gujarat's trading and manufacturing hubs.",
      },
      {
        name: "Kolkata",
        keyword: "software development company Kolkata",
        desc: "Affordable custom software development and IT outsourcing for Eastern India businesses.",
      },
      {
        name: "Noida",
        keyword: "software development company Noida",
        desc: "IT outsourcing company support for Noida's IT corridor — dedicated teams for web, mobile and enterprise projects.",
      },
      {
        name: "Gurgaon",
        keyword: "software development company Gurgaon",
        desc: "Custom software development Gurgaon — offshore engineering talent for Delhi NCR corporates and startups.",
      },
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "South Asia (Home Market)",
    countryCode: "NP",
    title: "Software Development Company Nepal",
    intro:
      "The Dime Technology is a homegrown software development company based in Lalitpur, Nepal — your local IT partner for custom software development, web development, mobile app development, AI development and Odoo ERP implementation. We are the IT company Kathmandu businesses trust for offshore-quality engineering at local rates, serving clients nationwide and abroad.",
    keywords: [
      "software development company Nepal",
      "custom software development Nepal",
      "IT company Nepal",
      "IT outsourcing company Nepal",
      "web development company Nepal",
      "mobile app development company Nepal",
      "AI development company Nepal",
      "Odoo development company Nepal",
      "software development outsourcing Nepal",
      "hire software developers Nepal",
      "Flutter development company Nepal",
      "React development company Nepal",
      "SaaS development company Nepal",
      "business automation company Nepal",
    ],
    cities: [
      {
        name: "Kathmandu",
        keyword: "software development company Kathmandu",
        desc: "The IT company Kathmandu startups and enterprises call for web, mobile and cloud projects — full lifecycle development from the valley.",
      },
      {
        name: "Lalitpur",
        keyword: "software development company Lalitpur",
        desc: "Headquartered in Imadol, Lalitpur — the software development company Lalitpur businesses rely on for custom software and ERP systems.",
      },
      {
        name: "Pokhara",
        keyword: "software development company Pokhara",
        desc: "Web development company services for Pokhara's tourism, hospitality and growing tech startups.",
      },
      {
        name: "Biratnagar",
        keyword: "software company Biratnagar",
        desc: "IT company Biratnagar industries can count on — business automation, ecommerce and custom software for the industrial east.",
      },
      {
        name: "Butwal",
        keyword: "software company Butwal",
        desc: "Web and mobile app development for Butwal's businesses, delivered remotely by our dedicated development team.",
      },
      {
        name: "Chitwan",
        keyword: "IT company Chitwan",
        desc: "IT company Chitwan trusts for digital transformation — custom software, portals and automation tools.",
      },
    ],
  },
];

export const otherMarkets: { region: string; countries: string[] }[] = [
  {
    region: "Europe (DACH & Western Europe)",
    countries: [
      "Switzerland",
      "Austria",
      "Belgium",
      "Luxembourg",
      "France",
      "Spain",
      "Italy",
      "Portugal",
    ],
  },
  {
    region: "Nordics & Eastern Europe",
    countries: ["Sweden", "Norway", "Denmark", "Finland", "Poland"],
  },
  {
    region: "Middle East",
    countries: ["Kuwait", "Bahrain", "Oman", "Jordan", "Israel"],
  },
  {
    region: "Asia-Pacific",
    countries: ["Malaysia", "Thailand", "Vietnam", "Philippines", "Indonesia", "Japan", "South Korea"],
  },
  {
    region: "Africa & Latin America",
    countries: ["Nigeria", "Kenya", "South Africa", "Brazil", "Mexico"],
  },
];
