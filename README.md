# TO START
- `npm install`
- `npm run dev`
- Go to http://localhost:3010/ 

# STATUS
- This Next 14 site has a homepage, company page, and article page. The site uses Tailwind CSS styling with a skeleton folder stucture.
- All code uses typescript, but no linter/prettier.
- All dynamic data comes from ApolloClient using mocked GQL data. On the server-side this has been moved into data/services that simulate a first time load time. For client-side, the ApolloProvider allows for useQuery hooks. Data includes:
  - A list of companies that the user is "watching" via a custom hook with simulate load delay.
  - A list of Motley UFO services owned by the user.
  - A list of top 5 companies with highest alien influence.
  - A list of latest articles about such companies.
  - Company specific data for one company - all company pages can show same data.
  - A single article with full data (more than in list) - all article pages can show same article.

# TASKS
1. Homepage performance.
    - There is a significant delay before much is displayed on the homepage. Improve this to reduce the delay or provide acceptable UI feedback. We have included the `react-loading-skeleton` as a starting point.
        - Called mock endpoints in parallel instead of sequential order in app/page.tsx
    - There can be a content shift when the users watched companies load. Improve that. Note: watches are loaded in a client component to setup task 2.
        - Fix loading in useWatchedCompanies hook. Show skeleton if loading in watchList component. Update watch list table to take up full width.

2. Watched Companies state.
    - Feel free to move/change how the watches data is loaded in the Watchlist component. Although this app is small, please add any 3rd-party state-management libraries you would like (e.g. Redux).
        - Redux felt like overkill so I opted to use Context API instead
        - Created WatchListContext and WatchListProvider to manage watched instruments state
    - Wire up the "Watch" column buttons in the Ranked Companies table to add/remove that company from the "Watched" companies list. The Watched table should reflect changes, but this state does not need to persist to server. `instrumentId` is the PK for watching.
        - I added additional mock data for instrumentIds: 202674, 202679, 202700 (Ids for watched instruments). This is to allow users to unwatch these initial instruments.
        - Filter out watched instruments from the ranked companies table in rankingsTable.tsx
    - Going to the company or article page should also contain such a toggle that also reflects changes on the homepage and vise-versa. Note: only for the single company in the mocks.
        - Company page allows watch/unwatch toggle.
        - Note: The company page shows same mock data (PAYC) regardless of which company is clicked, so watch/unwatch only affects PAYC rather than original company selected

3. Add in realtime quotes.
    - Using the quotes-service `getRealtimeQuotes`, how would you update the watch table to show Price and Changes for the table of Watches? Values don't need to be correct or match via `instrumentId`.
        - Updated QuotesService to return realtime quotes data and app/page.tsx to display it in the watch list table
        - Note: Added mock realtime quotes data to support watch/unwatch functionality

4. Company page path.
    - Update the CompanyLink component to also take an "exchange" parameter.
        - Added exchange prop to CompanyLink component
    - Update all usages to pass in "exchange" and have the resulting company page paths be `/company/<exchange>/<symbol>`.
        - Moved [symbol] folder into [exchange] folder

5. Company page data.
    - Wire up the CompanyData to use dynamic data from Quote and QuoteFundamentals. 
        - Updated CompanyData component to replace hardcoded values withdynamic data passed in from CompanyPage
        - Update Quote type to include fiftyTwoWeekRange and dailyRange to maintain type safety

6. TopNav frontend issues.
    - The Flying Saucer home button in the TopNav is not centered correctly on mobile (ex. iPhone 12).
        - Updated app/page.tsx main container styling and ranking/watched table styling to fit mobile screens
    - Fix this. May require a single class addition or a rework of TopNav or site layout.
    - When on the homepage, change the Home link to be a non-link "Welcome".
        - Added conditional to render "Welcome" div on home route instead of "Home" Link in topNav.tsx

7.  Got to an article page (click any article on home - all show same.)
    - Fix the body to display correctly as html (assume safe).
        - Added html-react-parser to parse article body
        - Updateds styling to make container take up full width
    - Change any company reference, `(CRYPTO: BTC)`, to CompanyLink to that exchange/symbol.
        - Added replaceCompanyReferences function to replace company references with links
        - Note: When clicking company references in articles, watching breaks because the recommendedInstrumentId from mock data doesn't exist in quotes data