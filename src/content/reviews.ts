// Curated customer reviews for the NUR-style Trusted By Your Neighbors section.
//
// Source policy:
// - All review text is verbatim from publicly posted reviews (via Google and
//   Yelp) for TechPro Heating & Cooling. We do not edit, paraphrase, or
//   embellish review content.
// - Only initials of the last name are kept (matches how Google/Yelp display
//   them) to match the way the authors published them.
// - To add/remove reviews: edit the `reviews` array below. The homepage
//   Reviews section picks them up automatically.

export type ReviewSource = "google" | "yelp";

export type Review = {
  id: string;
  name: string;
  source: ReviewSource;
  date: string;        // human-readable, e.g. "Oct 2026"
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  url?: string;        // direct link to the review on the platform
  city?: string;       // reviewer's city when visible in the original post
  response?: string;   // owner response from the review platform, verbatim
};

// Aggregate platform stats displayed as summary cards above the carousel.
// Update these when new totals are available.
// Last verified: 2026-11-14 from the live Google Knowledge Panel + Yelp page.
export const platformStats = [
  {
    source: "google" as const,
    rating: 4.9,
    reviewCount: 113,
    label: "San Carlos, CA",
    url: "https://maps.app.goo.gl/SuPQZ6RdxRUCr3Yx5",
  },
  {
    source: "yelp" as const,
    rating: 5.0,
    reviewCount: 336,
    label: "San Carlos, CA",
    url: "https://www.yelp.com/biz/techpro-heating-and-cooling-san-carlos-2",
  },
];

export const reviews: Review[] = [
  {
    id: "google-jimmy-n-2026-11-03",
    name: "Jimmy N.",
    source: "google",
    date: "Nov 2026",
    rating: 5,
    text:
      "Danielle, Armen, David, Alex, and the entire Techpro team have been incredibly helpful, knowledgeable, and patient throughout the entire process of installing our new HVAC system. They were able to install a brand new heat pump and indoor system within a day, and the entire process was smooth and well coordinated. They even installed my Google Nest for me and configured everything! Most importantly, they made sure everything was done properly from A to Z — permits, documentation, rebates and credits.",
  },
  {
    id: "google-yelena-v-2026-08-06",
    name: "Yelena V.",
    source: "google",
    date: "Aug 2026",
    rating: 5,
    text:
      "I cannot recommend TechPro Builders highly enough! I first worked with them about 16 years ago, shortly after purchasing my home. They installed the complete heating and air conditioning system, and I am happy to say that it has been working flawlessly ever since. Now, many years later, while building my ADU, I chose TechPro Builders again — professional, reliable, efficient, and very clean.",
  },
  {
    id: "google-arman-o-2026-08-07",
    name: "Arman O.",
    source: "google",
    date: "Aug 2026",
    rating: 5,
    text:
      "I had an outstanding experience with Techpro Builders. They responded quickly, arrived on time, and diagnosed the issue with my HVAC system professionally and honestly. What impressed me most was their transparency, attention to detail, and commitment to doing the job right rather than trying to upsell unnecessary services. Their pricing was very fair, especially considering the quality of the workmanship and customer service.",
  },
  {
    id: "google-travis-c-2026-11-04",
    name: "Travis C.",
    source: "google",
    date: "Nov 2026",
    rating: 5,
    text:
      "I can't say enough great things about TechPro! They've helped me personally, as well as many of my real estate clients, with everything from installing brand-new systems to routine maintenance, tune-ups, and repairs. Their team is knowledgeable, professional, dependable, and takes pride in the work they do. In real estate, having reliable service professionals you can trust makes all the difference.",
  },
  {
    id: "google-chris-2026-11-03",
    name: "Chris",
    source: "google",
    date: "Nov 2026",
    rating: 5,
    text:
      "I had a great experience with Techpro. Armen gave me a clear quote and a timeline that met my rebate deadline. His crew did the same on install day. They put in my new Rheem heat pump water heater cleanly and on time in my garage, and they kept me updated at every step. They also made the rebate process easy. Everything went smoothly, and the water heater works great.",
  },
  {
    id: "google-jamal-s-2026-11-03",
    name: "jamal S.",
    source: "google",
    date: "Nov 2026",
    rating: 5,
    text:
      "Had TechPro out to handle a full gas furnace replacement and a thorough duct cleaning. The quality of work was completely professional, and the value is great. They got the job done right, answered all my questions, and cleaned up completely before leaving. Everything is running quiet and smooth — highly recommend.",
  },
  {
    id: "google-patrick-s-2026-11-03",
    name: "Patrick S.",
    source: "google",
    date: "Nov 2026",
    rating: 5,
    text:
      "Park gave us the estimate and also performed the install with Rigo. This is helpful in that nothing gets lost in translation with a different craftsman. We were rerouting ducting in our basement to accommodate a recently installed steel beam. Park seemed to grasp the complexity of the job very quickly and the result is quite satisfying. Skillful work, competitive price.",
  },
  {
    id: "google-janice-k-2026-10-31",
    name: "Janice K.",
    source: "google",
    date: "Oct 2026",
    rating: 5,
    text:
      "Second time working with Armen and his team and the experience was just as great as the first time. Very professional, responsive, and timely! They came in, provided a timeline and fully committed to it. Super reliable crew, highly recommend!",
  },
  {
    id: "google-john-y-2026-10-31",
    name: "John Y.",
    source: "google",
    date: "Oct 2026",
    rating: 5,
    text:
      "I've used Armen and his team twice now for 2 heat pump installs. The first install went so well for our upstairs there was no question who we would use for our downstairs. They showed up on time, cleaned up each day, and finished before the estimated date. I have since signed up for their maintenance program. Armen going above and beyond when a contractor issue came up — would highly recommend using Techpro!",
  },
  {
    id: "google-dmitry-k-2026-10-31",
    name: "Dmitry K.",
    source: "google",
    date: "Oct 2026",
    rating: 5,
    text:
      "We have used TechPro for the last 5 years to service the wall heaters in our multi apartment building and heating in our house. Their customer service is fantastic. Onsite team is incredibly professional and always on time. Five stars for outstanding and reliable service every single time!",
  },
  {
    id: "google-susy-l-2026-08-06",
    name: "Susy L.",
    source: "google",
    date: "Aug 2026",
    rating: 5,
    text:
      "We had a Mitsubishi ductless system put in. They did a fantastic job. Removing the ducts from the walls and crawl space was a dirty job. David and his team were thorough, cleaned up after themselves, came on time, and very professional. Their price was competitive and they helped us with the rebate and interest-free loan from PG&E. We were very glad we used them for this project.",
  },
  {
    id: "google-mario-m-2026-10-31",
    name: "Mario M.",
    source: "google",
    date: "Oct 2026",
    rating: 5,
    text:
      "We had Techpro install a new heating cooling heat pump system for our home with new thermostats & zoning system. Extremely happy with the service & the responsive communication. Pricing was competitive & very reasonable after the heat pump rebates & westlight loan program. Highly recommend Techpro.",
  },
  {
    id: "google-christine-p-2026-04-27",
    name: "Christine P.",
    source: "google",
    date: "Apr 2026",
    rating: 5,
    text:
      "While looking for heat pump water heater installers, I found Techpro through customer recommendations on Peninsula Clean Energy. From the day I signed the contract, Techpro staff kept me informed on timelines & scheduling updates. Danielle made sure they reserved enough funding to cover all their clients with pending installations and submitted the rebate requests for both state & PCE which saved me a lot of valuable time.",
  },
  {
    id: "google-guy-k-2026-02-19",
    name: "Guy K.",
    source: "google",
    date: "Feb 2026",
    rating: 5,
    city: "San Carlos",
    text:
      "We hired Techpro Heating & Cooling for a full heat pump replacement and new ductwork in our two-story home in San Carlos, and they did an excellent job. The team was professional, efficient, and very knowledgeable. Everything was installed cleanly and on schedule, and the airflow between floors is noticeably better.",
  },
  {
    id: "google-soody-p-2026-01-15",
    name: "Soody P.",
    source: "google",
    date: "Jan 2026",
    rating: 5,
    text:
      "We had a wonderful experience with this company. We recently had a heating/cooling air pump system installed and our old gas furnace removed, and we couldn't be happier with the service. Armen, the owner, was extremely knowledgeable and took the time to answer all of our questions in detail. Park, the technician, was punctual, professional, and very precise in his work.",
  },
  // Yelp reviews — text is verbatim from the reviewer's Yelp post, including
  // original wording and any typos. To add more, copy the same shape below.
  {
    id: "yelp-dmitry-k-2026-10-30",
    name: "Dmitry K.",
    source: "yelp",
    date: "Oct 2026",
    rating: 5,
    city: "West Point",
    text:
      "TechPro has been handling the appliance maintenance for both our multi-apartment building and our personal home for the last five years, and they are truly exceptional. They consistently provide outstanding service, especially when it comes to keeping our wall heaters running perfectly.\nTheir customer service team is always responsive, friendly, and helpful. On top of that, every single technician who comes out to the site is professional, knowledgeable, and arrives exactly on time, every single occasion. Finding a company this reliable is rare. I highly recommend TechPro for any property manager or homeowner looking for top-tier service!",
  },
  {
    id: "yelp-eric-y-2026-06-04",
    name: "Eric Y.",
    source: "yelp",
    date: "Jun 2026",
    rating: 5,
    city: "San Francisco",
    text:
      "Great experience with Techpro for a Mitsubishi mini-split install. Our installer, Park, took real time to walk me through every part of the job - placement, linset routing, electrical, and condenser - and made sure the wiring and ductwork were clean and to my standard before signing off. No shortcuts.\n\nBeyond Park, the whole team (Armen, Danielle, and the crew) was responsive, transparent, and professional from quote to commissioning",
  },
  {
    id: "yelp-gary-b-2026-11-05",
    name: "Gary B.",
    source: "yelp",
    date: "Nov 2026",
    rating: 5,
    city: "Montara",
    text:
      "I am doing a major remodel on my 47-year-old home in Montara, CA. This includes converting the original garage to a one-bedroom ADU. I am extremely happy that I chose TechPro for the electric heat pump HVAC and water heater portions of the project. TechPro's prices are fair, and, most importantly, they proved to me many times during the process that customer satisfaction and professional work they can take pride in are their highest priorities!\n\nTechPro installed new ductwork for the main home's HVAC. The ADU HVAC used mini-splits. Both HVAC systems used Bryant Heat Pump units; State water heaters were used for both units.\n\nTech Pro's customer service team, especially Danielle, was phenomenal. Always responsive, friendly, helpful, and understanding...that not all customers are knowledgeable about what these installations entail. Danielle closely guided me through the somewhat complex rebate process offered by various agencies for converting the main home to electric and kept track of deadlines. She and Armen were always able to answer my questions and provide guidance. All of the technicians (Armen, Angel, and Fadi) were professional, knowledgeable, punctual, and did excellent, professional work.\n\nFinding a company as reliable and easy to work with is rare. I highly recommend TechPro for any homeowner or property manager looking for top-tier HVAC or water heating service!",
  },
  {
    id: "yelp-amadee-v-2026-10-28",
    name: "Amadee V.",
    source: "yelp",
    date: "Oct 2026",
    rating: 5,
    city: "Belmont",
    text:
      "We had them services our furnace twice now. Their technician, Park, is very knowledgeable, honest and easy to work with. He pointed out small issues in our system and helped prioritize important issues vs small issues we don't need to spend money to fix. In short, we feel very comfortable doing business with them and would recommend them to anyone.",
  },
  {
    id: "yelp-chris-2026-11-02",
    name: "Chris",
    source: "yelp",
    date: "Nov 2026",
    rating: 5,
    city: "La Mirada",
    text:
      "I had a great experience with Techpro. Armen gave me a clear quote and a timeline that met my rebate deadline. I had many questions about both the water heater options and the way it would need to be installed (it was a conversion from a gas water heater), and he answered each one quickly and clearly. His crew did the same on install day. They put in my new Rheem heat pump water heater cleanly and on time in my garage, and they kept me updated at every step. They also made the rebate process easy. Everything went smoothly, and the water heater works great. I am very happy and I would gladly recommend them!",
  },
  {
    id: "yelp-sumant-s-2026-10-29",
    name: "Sumant S.",
    source: "yelp",
    date: "Oct 2026",
    rating: 5,
    city: "Atlanta, GA",
    text:
      "Armen and team are not only knowledgeable about what they do but they are extremely efficient and patient. Highly recommend their HVAC installation and r replacement service.",
  },
  {
    id: "yelp-sasha-s-2026-08-06",
    name: "Sasha S.",
    source: "yelp",
    date: "Aug 2026",
    rating: 5,
    city: "San Mateo",
    text:
      "Techpro Heating & Cooling is an incredible company with professional and kind technicians. They installed our Heating & AC system, which we now can't live without. Whenever we had questions or issues they always answered them and even came out to service and optimize the system to ensure everything was working at the highest quality, which it always was. They also communicate with the planning and inspectors well, making sure everything is done properly and that we, the home owners, never worried about anything.\nI have recommended Techpro many times to family, friends, neighbors, colleagues, and clients; everyone agrees, Techpro provides outstanding service.",
  },
  {
    id: "yelp-al-h-2026-11-06",
    name: "Al H.",
    source: "yelp",
    date: "Nov 2026",
    rating: 5,
    city: "San Bruno",
    text:
      "No installations done at my home- however on mutiple occasions Armen has come to give estimates and assess trying to install hvac/heatpumps into our home's very bizzare (i.e. terrible) layout situation. He always gave me an upfront honest and realistic opinion and never tried to force the sale- we actually ended up not installing due to real safety hazards for the house -while other contractors were promising its fine (hint -it was not)",
  },
  {
    id: "yelp-peter-w-2026-01-20",
    name: "Peter W.",
    source: "yelp",
    date: "Jan 2026",
    rating: 5,
    city: "San Francisco",
    text:
      "Techpro replaced my gas furnace water heater with a heat pump water heater. I was *very* happy with the service. Everyone that I interacted with were friendly and professional. Most of my questions were answered within an hour.\n\nThe installation was delayed a few times due to issues in acquiring the water heater. Even though Techpro was not responsible for the delays, they went above and beyond to try to finish the project by the end of 2025 so I can qualify for the tax rebate.\n\nI would not hesistate the hire Techpro again for future projects.",
  },
  {
    id: "yelp-gary-r-2026-07-30",
    name: "Gary R.",
    source: "yelp",
    date: "Jul 2026",
    rating: 5,
    city: "Los Angeles",
    text:
      "I hired the Techpro team to replace my existing gas furnace and ductwork system with a new Mitsubishi heat pump fan coil and condenser. My existing ductwork was completely replaced and my energy bill now is half of what it was before. The peninsula clean energy and techclean rebates were processed smoothly although the rebate programs can take 1-2 months to receive payment we were very happy with techpro heating and cooling!",
  },
];
