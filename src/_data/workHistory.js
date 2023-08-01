module.exports = [
  {
    startDate: new Date("2013-05-25"),
    endDate: new Date("2013-08-15"),
    employer: "Brouwer Landscaping",
    title: "Landscaper",
    location: "Loveland, CO",
    url: null,
    summary: null
  },
  {
    startDate: new Date("2015-05-30"),
    endDate: new Date("2017-05-20"),
    employer: "Calvin College",
    title: "Turf Maintenance Assistant",
    location: "Grand Rapids, MI",
    url: "https://calvin.edu",
    summary: `- Mowed 7 athletic fields 3 times per week
- Replaced sprinkler heads
- Sharpened mower blades
- Performed maintenance on Toro 7-deck mower
- Painted lines and prepped for college games
- Cleaned bull pens and dragged out infield of baseball diamond`
  },
  {
    startDate: new Date("2015-04-15"),
    endDate: new Date("2017-05-20"),
    employer: "Calvin Campus",
    title: "Campus Mailman",
    location: "Grand Rapids, MI",
    url: "https://calvin.edu",
    summary: `- Delivered mail to department offices and dorms`
  },
  {
    startDate: new Date("2005-12-20"),
    endDate: new Date("2015-01-04"),
    employer: "Colorado Heirloom",
    title: "Associate Carpenter",
    location: "Loveland, CO",
    url: "https://www.coloradoheirloom.com",
    summary: null
  },
  {
    startDate: new Date("2008-05-20"),
    endDate: new Date("2014-08-20"),
    employer: "Richard DeVries's Farm",
    title: "Agricultural Manager",
    location: "Loveland, CO",
    url: "https://goo.gl/maps/H4xCFb8TFtcyBL2J9",
    summary: `- Put up 200 feet of new fence
	- Dug post holes (2.5-3 ft. deep)
	- Leveled post heights
	- Mixed and poured concrete around posts
- Welded guides to posts for wire fencing
- Irrigated 100+ acres of grass land with flood irrigation
	- Laid out pipe
	- Monitored water flow and moved water to optimal location for maximum efficiency
	- Repaired broken pipe, replaced gaskets
- Cut, baled, and stacked hay
	- Operated swathers, hay balers, and hay stackers
	- Repaired machinery in the field
- Operated all farm equipment: anything from tractors to power tools
- Removed pests from fields (prairie dogs)
- Cleared cow pen of manure
- Spread manure for fertilizer
- Managed crew of 3-4 team members
- Cared for cattle (feeding, watering, herding)`
  },
  {
    startDate: new Date("2017-05-30"),
    endDate: new Date("2018-04-15"),
    employer: "Gentex",
    title: "Production Support Engineer",
    location: "Zeeland, MI",
    url: "https://www.gentex.com",
    summary: `- Managed a production line of 10 individuals
- Troubleshoot technical issues with testers
- Investigated root cause of circuit board issues in production`
  },
  {
    startDate: new Date("2018-04-15"),
    endDate: new Date("2020-04-15"),
    employer: "Gentex",
    title: "Associate Test Engineer",
    location: "Zeeland, MI",
    url: "https://www.gentex.com",
    summary: `#### Product Testing

- Developed .NET Framework applications to test products in manufacturing
- Led project to implement new product tester design in production
	- Collaborated closely with Mechanical engineers on tester design
	- Adhered strictly to project timeline
	- Wrote software tests to cycle on product

#### Website Development

- Implemented PM record keeping system on internal MVC .NET website
	- Created new tables and schema in MySQL Database
	- Built new workflow with forms for user input
	- Added screens to view previous records and to add new records
	- Worked directly with end users to target pain points and meet requirements
	- Complied with automotive industry standards and regulations`
  },
  {
    startDate: new Date("2021-08-16"),
    endDate: new Date("2023-07-20"),
    employer: "Life Storage",
    title: "Applications Developer",
    location: "Remote to Buffalo, NY",
    url: "https://www.lifestorage.org",
    summary: `#### Internal Web Application Development

- Develop .NET Core API with Redis caching for web app data handling, serving over 1000 stores
- Port Windows Forms app to .NET Core backend with Vue Frontend
  - Create repositories for database access
  - Check permissions for db actions
  - Ensure business logic is properly transferred
- Work with UI/UX expert for frontend design

#### Team Environment

- Participate in standups multiple times per week
- Perform regular code reviews for pull requests
- Work under kanban-style workflow with regular release cadence`
  },
  {
    startDate: new Date("2020-04-15"),
    endDate: new Date("2021-08-13"),
    employer: "Randstad (Meijer)",
    title: ".NET Software Developer",
    location: "Remote to Walker, MI",
    url: "https://www.randstad.com",
    summary: `#### API Development

- Developed .NET Core REST APIs to expose core system functionality of internal system to allow 3rd parties to update data
- Composed robust data adapters to call database stored procedures and return relevant information for API endpoints
- Established proper logging with App Insights

#### Team Environment

- Participated in SAFe Agile events: daily standups, backlog grooming, PI planning sessions, etc.
- Performed regular code reviews for merge requests
- Worked under kanban-style workflow when dealing with many unknowns`
  },
  {
    startDate: new Date("2023-08-07"),
    endDate: null,
    employer: "Meijer",
    title: "Software Engineer",
    location: "Walker, MI",
    url: "https://www.meijer.com/",
    summary: `#### Responsibilities

- Design, code, test, and implement Azure-based and on-premise systems
- Perform unit tests, monitor results, and take required corrective actions as needed
- Work within the SAFe Agile framework and utilize CI/CD best practices
- Assist product owners in systems analysis and creation or updating of documentation for all business processes`
  }
  // {
  // 	startDate: new Date(""),
  // 	endDate: new Date(""),
  // 	employer: "",
  // 	title: "",
  // 	location: "",
  // 	url: "",
  // 	summary: ``
  // }
].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
