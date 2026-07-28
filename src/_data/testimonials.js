const relations = {
  manager: "Manager",
  recruiter: "Recruiter",
  coworker: "Coworker",
  client: "Client"
};

const companies = {
  meijer: {
    name: "Meijer",
    url: "https://www.meijer.com/"
  },
  gentex: {
    name: "Gentex",
    url: "https://www.gentex.com/"
  },
  randstad: {
    name: "Randstad",
    url: "https://www.randstad.com/"
  }
};

module.exports = [
  {
    name: "Denise Blumberg",
    testimonial:
      "I truly enjoy working with Brian. He is a true professional with strong communication skills. He is an experienced .NET developer who is often looked to for both difficult and creative work. Brian organizes his work so he can deliver on time and keeps me updated on his progress. He is down to earth and can translate tech jargon into business terms so his clients can understand. I am very lucky to have him on my team.",
    dateReceived: new Date("2021-07-27"),
    title: "Delivery Manager",
    company: companies.randstad,
    relation: relations.manager
  },
  {
    name: "Jeff Warnke",
    testimonial:
      "Brian is a valued member of our team. He demonstrates the motivation to learn, and is always willing to help others on the team. Brian recognizes that a good understanding of requirements is critical to successful delivery, and he continues to develop the skills to ensure understanding.",
    dateReceived: new Date("2021-08-13"),
    title: "Solution Development Manager",
    company: companies.meijer,
    relation: relations.manager
  },
  {
    name: "Tanner Wysocki",
    testimonial:
      "Brian is a pleasure to work with professionally. He carries himself with a friendly and approachable demeanor that makes him a breeze to work with. In addition, he is a knowledgeable developer. He has the passion, curiosity, adaptability, and organizational skills to learn and fill in any gaps of knowledge. I can say with confidence that Brian has the skills to succeed.",
    dateReceived: new Date("2021-08-13"),
    title: "Software Engineer",
    company: companies.meijer,
    relation: relations.coworker
  },
  {
    name: "Rick Harris",
    testimonial: `Brian is the kind of team member I appreciate every day. Recently, he took the time to properly refactor one of our monstrous monoliths to make it much more supportable, adding better logging and breaking apart 25,000+ lines of code into individual modules. Future Meijer IT children should start thanking him now.

Brian stays sharp, keeps his skills current, and regularly surprises me with knowledge he’s picked up outside the usual day‑to‑day work. Some of his abilities are genuinely guru‑level, and the whole team benefits from what he shares. He’s never afraid to ask a question, never shy about digging deeper, and he’s one of the few people who reminds us that humor is still allowed in IT.`,
    dateReceived: new Date("2026-07-13"),
    title: "Senior Software Engineer",
    company: companies.meijer,
    relation: relations.coworker
  }//,
  // {
  //   name: "Rick Harris",
  //   testimonial: "I appreciate that Brian is always ready to collaborate with his teammates to tackle our solutions development challenges. His insights are consistently valuable, bringing a unique and thoughtful perspective to problem-solving. Notably, Brian played a key role in helping the team overcome significant version control issues.",
  //   dateReceived: new Date("2025-11-18"),
  //   title: "Senior Software Engineer",
  //   company: companies.meijer,
  //   relation: relations.coworker
  // }
];
