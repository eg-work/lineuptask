This is a simple CRA. There are no modifications to it in that regard. Running should be the usual.

# Running the app

In the project directory, you can run:

## `yarn install`

Intalls the necessary packages.

## `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



# Overall approach
The app uses `axios` for some request management and `zustand` for some state management.

The app is built purposely for dicussion and to meet the objectives of the tech task.


## Improvements if more time
Some of the naming conventions are a bit lack-luster or somewhat inconsistent. It might require a little imagination to see what they should be called.

There are no tests. Setting up the test environment to play nicely with zustand wasn't possible during the time.

## General method
In any case, the main ethos is a core API call to get the ticket options / pricing information. This is then computed into a frontend-only type to be processed into components. I've made a distinction between the business-logic types, which are returned from the API and frontend-only types which are what plays nicely with our components.

This method of transforming the server response into a state which is closest to the end user, or end components greatly simplifies the frontend imho. It offloads most heavy testing to the transformation function itself. It also reduces the in-component complexities and makes for a purpose-built tidy repo.

There are trade offs, hopefully which we can discuss. Given a better understanding of where this work sits in the wider scope at line-up would of most likely meant different decisions to be made.


## Folder structure

The folder structure for the 'TicketOptions' component is as follows:
- `comps`
  - holds auxillary components for the 'TicketOptions' component, in this case the actual rows.
- `funcs`
  - any functions which are used. I like to do one function per file. These are usually specific or bespoke to the component itself.
- `service`
  - holds the api calls
- `state`
  - holds the zustand store and the state management functionality of the component
- `styles`
  - holds css stylings for the component, or auxillary components
- `tests`
  - holds the tests for the component, or auxillary components
- `types`
  - holds the types, split into 'business logic' types and 'react' types
- single file named the same as the component represents the entry point for the component





