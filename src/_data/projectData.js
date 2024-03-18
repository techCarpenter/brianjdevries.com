module.exports = [
	{
		startDate: new Date("2020-05-15"),
		endDate: new Date("2021-08-01"),
		title: "Topple",
		url: "https://topple.netlify.com",
		repo: "https://github.com/techcarpenter/topple",
		summary: `I have student debt and wanted to create a way to plan and track my progress paying it off. Most other solutions only create a projection, but I'm working to make an app that keeps up with you.

#### Tech

- Implemented Frontend with [Vue][vue] (including Vuex and Vue-router)
  - Code base written primarily with [Typescript][typescript]
  - [Plotly.js][plotlyjs] package for charts
  - [Tailwind CSS][tailwind] used for styles
- Data is persisted in [Firestore database][firestore]
- Implemented user authentication with [Firebase Auth][firebase-auth]
- Deployed on [Netlify][netlify]

<!-- Links -->

[plotlyjs]: https://plotly.com/javascript "Plotly.js website"
[tailwind]: https://tailwindcss.com "Tailwind CSS website"
[vue]: https://vuejs.org "Vue JS website"
[typescript]: https://typescriptlang.org "Typescript website"
[firestore]: https://firebase.google.com/products/firestore "Firebase firestore website"
[firebase-auth]: https://firebase.google.com/products/auth "Firebase auth website"
[netlify]: https://netlify.com "Netlify website"`
	},
	{
		startDate: new Date("2020-08-23"),
		endDate: null,
		title: "brianjdevries.com",
		url: "https://brianjdevries.com",
		repo: "https://github.com/techcarpenter/brianjdevries.com",
		summary: `This is my personal website. It's a constant work in progress, but I enjoy trying new things with it!

I also write occasionally on [my blog](/blog/).

#### Tech

- Built using [Eleventy][eleventy], a simpler static site generator
- Deployed on [Netlify][netlify]

<!-- Links -->

[eleventy]: https://www.11ty.dev "Eleventy website"
[netlify]: https://netlify.com "Netlify website"`
	}
].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
