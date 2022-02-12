const relations = {
  manager: "Manager",
  recruiter: "Recruiter",
  coworker: "Coworker",
  client: "Client"
};

module.exports = [
  {
    name: "Denise Blumberg",
    testimonial:
      "I have truly enjoyed working with Brian. He is a true professional with strong communication skills. He is an experienced .NET developer who is often looked to for both difficult and creative work. Brian organizes his work so he can deliver on time and keeps me updated on his progress. He is down to earth and can translate tech jargon into business terms so his clients can understand. I am very lucky to have him on my team.",
    dateReceived: new Date("2021-07-27"),
    title: "Delivery Manager",
    company: "Randstad",
    relation: relations.manager
  },
  {
    name: "Jeff Warnke",
    testimonial:
      "Brian was a valued member of our team. He has demonstrated the motivation to learn, and was always willing to help others on the team. Brian recognizes that a good understanding of requirements is critical to successful delivery, and has been developing the skills to ensure understanding.",
    dateReceived: new Date("2021-08-13"),
    title: "Solution Development Manager",
    company: "Meijer",
    relation: relations.manager
  },
  {
    name: "Tanner Wysocki",
    testimonial:
      "Brian has been a pleasure to work with professionally from day one. You will find that he carries himself with a friendly and approachable demeanor that makes him a breeze to work with. In addition, you will find that he is a knowledgeable developer, and he has the passion, curiosity, adaptability, and organizational skills to learn and fill in the gaps of knowledge he may have. I can say with confidence that Brian has the skills to succeed on your team.",
    dateReceived: new Date("2021-08-13"),
    title: "Software Engineer",
    company: "Meijer",
    relation: relations.coworker
  }
];
