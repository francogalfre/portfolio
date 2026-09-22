import CrombieLogo from "@/assets/logos/crombie.webp";
import FiverrLogo from "@/assets/logos/fiverr.webp";
import ShipperslabLogo from "@/assets/logos/shipperslab.svg";

export const experiences = [
    {
        company: "ShippersLab",
        url: "https://www.shipperslab.tech/",
        logo: ShipperslabLogo,
        role: "Co-founder",
        periods: "Sep 2026 - Present · Santa Fe, Argentina",
        description:
            "Co-founded a digital studio, lab and community. We design and build digital products for companies and founders, run our own product experiments, and organize events for people who build across Argentina. I lead brand, product design and frontend, and work directly with clients from scoping to launch.",
    },
    {
        company: "Crombie",
        url: "https://crombie.dev/",
        logo: CrombieLogo,
        role: "Software & AI Engineer",
        periods: "Jan 2026 - Present · Santa Fe, Argentina",
        description:
            "Design and build production AI agent systems for a US-based lending platform under strict data-privacy and compliance requirements. Architect multi-agent workflows with LangGraph on AWS Lambda, build RAG pipelines over multi-source knowledge bases, own observability with self-hosted Langfuse, and ship the React and Next.js interfaces on top.",
    },
    {
        company: "Fiverr",
        url: "https://www.fiverr.com/",
        logo: FiverrLogo,
        role: "Freelancer UI/UX Designer",
        periods: "Jun 2023 - Jan 2026",
        description:
            "Ran an independent freelance practice, delivering 25+ projects end to end for clients across the US, Europe and Latin America, reaching Level 2 with a 4.8 rating. Owned each project solo: scoping with the client, design in Figma, and implementation in Next.js, TypeScript and Astro.",
    },
];
