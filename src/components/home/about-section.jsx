"use client";
import { useState, Fragment } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const partners = [
  {
    name: "SkillOnline",
    description: (
      <>
        <p>
          SkillOnline S.r.l. is an Italian organization established in 1998,
          based in Turin. It specializes in distance learning and digital
          education, offering certifications, professional development, and
          e-learning tools tailored to modern educational needs.
        </p>
        Key Areas of Focus:
        <ol>
          <li>
            Certifications: European standards like ECDL and EQDL for IT and
            digital literacy.
          </li>
          <li>
            Educational Innovation: Tools for interactive learning,
            gamification, and digital content creation.
          </li>
          <li>
            Professional Development: Training for educators and institutions,
            aligned with frameworks like DigCompEdu.
          </li>
          <li>
            Audience: Educators, administrators, and IT professionals seeking
            digital transformation in learning
          </li>
        </ol>
      </>
    ),
    logo: "/images/logos/skillonline.svg",
  },
  {
    name: "Intertek",
    description: (
      <>
        <p>
          Intertek is a global leader in quality assurance, testing, inspection,
          and certification services, founded in 1885. They help industries
          ensure that products, processes, and systems meet health, safety,
          environmental, and regulatory standards. Intertek operates in over
          1,000 locations across 100+ countries, with headquarters in London,
          United Kingdom.
        </p>
        Key Areas of Focus:
        <ol>
          <li>
            Testing and Certification: Ensuring compliance with global safety
            and performance standards across diverse industries.
          </li>
          <li>
            Inspection Services: Providing inspections for products in sectors
            like energy, chemicals, and consumer goods.
          </li>
          <li>
            Sustainability Solutions: Offering environmental testing and
            promoting sustainable practices.
          </li>
          <li>
            Supply Chain Assurance: Ensuring product quality and safety across
            the supply chain.
          </li>
        </ol>
        <p>
          Their global network of laboratories and services supports industries
          from manufacturing to healthcare, helping to minimize risks and
          optimize supply chains. The African representative is the renowned
          Prof. Edmund Ugwu-Agbo
        </p>
      </>
    ),
    logo: "/images/logos/intertek.svg",
  },
  {
    name: "CIRPS",
    description: (
      <>
        <p>
          CIRPS (Centro Interuniversitario di Ricerca per lo Sviluppo
          Sostenibile), affiliated with Sapienza University of Rome, is an
          interdisciplinary research center focusing on sustainable development
          and related technologies. It collaborates with numerous Italian
          universities and international organizations to promote sustainable
          practices and solutions.
        </p>
        Key Focus Areas
        <ol>
          <li>
            Research and Innovation: CIRPS conducts extensive research in
            renewable energy, circular economy, smart grids, green building, and
            sustainable mobility.
          </li>
          <li>
            Support for Start-ups: It encourages technological innovation by
            supporting start-ups and innovation hubs, aligning with UN Agenda
            2030 goals.
          </li>
          <li>
            Awareness and Education: Through events, courses, and public
            platforms like Rinnovabili.it, CIRPS educates on sustainability and
            disseminates scientific findings.
          </li>
          <li>
            Projects: It undertakes practical projects, such as designing
            energy-efficient buildings, solar-powered stations, and eco-friendly
            infrastructures.
          </li>
          <li>
            International Collaboration: CIRPS collaborates globally in legal,
            social, and economic research on technology and
            sustainability-related policies
          </li>
          <li>
            The African representative for CIRPS is the renowned Prof. Edmund
            Ugwu-Agbo
          </li>
        </ol>
      </>
    ),
    logo: "/images/logos/cirps.svg",
  },
  {
    name: "ACCREDIA",
    description: (
      <>
        <p>
          ACCREDIA is Italy's National Accreditation Body, responsible for
          accrediting organizations that carry out conformity assessments. These
          organizations include testing laboratories, inspection bodies,
          certification bodies, and verification bodies. Its accreditation
          services are designed to ensure that these organizations meet
          internationally recognized standards, providing confidence to
          consumers and businesses in the reliability of certifications, tests,
          and inspections.
        </p>
        <p>
          Founded in 2009 through the merging of SIT, SINAL, and SINCERT,
          ACCREDIA plays a vital role in enhancing the Italian quality system.
          Its activities are based on international norms such as ISO/IEC 17011,
          and it is a member of several global networks, including the European
          co-operation for Accreditation (EA), the International Accreditation
          Forum (IAF), and the International Laboratory Accreditation
          Cooperation (ILAC). ACCREDIA is also recognized for its high standards
          of procedural rigor and for supporting international trade by ensuring
          mutual recognition of accredited conformity assessments.
        </p>
        <p>
          Additionally, ACCREDIA provides various services such as proficiency
          testing, calibration, inspections, and certifications across different
          sectors, including agri-food, construction, and healthcare
        </p>
      </>
    ),
    logo: "/images/logos/accredia.svg",
  },
  {
    name: "IBI",
    description: (
      <>
        <p>
          The International Bio-Research Institute (IBI), based in Euorpe with a
          regional office in Enugu, is a tertiary-level research institution
          approved by the Nigerian Federal Ministry of Education. It emphasizes
          interdisciplinary research and education to address global challenges
          related to science, technology, and societal development. The
          institute focuses on bridging gaps between education, production,
          research, and innovation while promoting bioethical standards and a
          "culture of life."
        </p>
        Key Areas of Focus:
        <ol>
          <li>
            Research and Education: IBI integrates experimental and human
            sciences, offering programs in biotechnology, molecular biology,
            agrobiology, criminology, bioethics, and complementary medicine,
            among others.
          </li>
          <li>
            Innovation: The institute promotes innovation through initiatives
            like its Technology/Business Incubation Centre, which supports
            technological development, entrepreneurship, and business startups.
          </li>
          <li>
            Bioethics: Rooted in the principles of bioethics, IBI ensures its
            programs respect human life and promote eco-friendly advancements.
          </li>
          <li>
            Community Impact: IBI runs community-oriented initiatives like free
            medical testing for diabetes and hypertension and supports youth
            entrepreneurship and education.
          </li>
          <li>
            Collaborative Networks: It partners with global research and
            educational institutions to enhance its academic and technological
            offerings.
          </li>
        </ol>
        <p>
          Founded in response to global calls for sustainable development, IBI
          also delves into specialized fields like robotics, drone technology,
          and socio-economic reforms to tackle regional and international
          challenges. For more details, you can visit their official site
        </p>
      </>
    ),
    logo: "/images/logos/ibi.jpg",
  },
  {
    name: "ESTHUB",
    description: (
      <>
        <p>
          The Enugu State Tech Hub is a transformative initiative aimed at
          fostering digital innovation, empowering youth, and driving economic
          growth in Enugu, Nigeria. Launched in 2021, the hub serves as a
          collaborative space for training, mentoring, and supporting technology
          startups. It offers various programs focused on developing skills in
          areas like coding, web design, and solar power, while providing a
          co-working environment for tech enthusiasts and entrepreneurs.
        </p>
        <p>
          The hub is part of the state government&apos;s efforts to build a
          knowledge-driven economy, positioning Enugu as a growing tech hub in
          Nigeria. It is strategically located near institutions like the
          Institute of Management and Technology (IMT), providing a steady
          talent pool for startups. In just a few years, the hub is expected to
          create thousands of direct jobs and contribute significantly to the
          local economy.
        </p>
        ​
        <p>
          The Enugu Tech Hub has also gained recognition for its role in
          fostering innovation, including being awarded the Tech Innovation Hub
          of the Year at the Nigeria Tech Innovation and Telecom Award​This
          initiative continues to strengthen Enugu&apos;s position as a vibrant
          hub for tech startups in Nigeria.
        </p>
      </>
    ),
    logo: "/images/logos/esthub.svg",
  },
];

const AboutSection = () => {
  const [selectedPartner, setselectedPartner] = useState(partners[0].name);

  const partner = partners.find((partner) => partner.name === selectedPartner);

  return (
    <section className="about p-8">
      <div className="container">
        <div className="flex justify-between gap-8">
          <div className="info basis-1/2">
            <img
              src={partner.logo}
              alt={partner.name + " Logo"}
              className="mb-4 h-16"
            />
            <div className="[&_ol]:list-decimal [&_ol]:list-inside [&_li]:my-2 [&_p]:mb-3">
              {partner.description}
            </div>
          </div>
          <nav className="basis-1/3 mt-8">
            <h2 className="mb-6">About our Partners</h2>
            <ul className="flex flex-col gap-8">
              {partners.map((partner) => (
                <motion.li
                  key={partner.name}
                  onClick={() => setselectedPartner(partner.name)}
                  className={cn(
                    "font-bold text-primary text-base cursor-pointer border-l-4 border-current p-2 hover:border-dashed transition-all",
                    partner.name === selectedPartner &&
                      "text-secondary border-dashed"
                  )}
                  layout
                >
                  {partner.name}
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
