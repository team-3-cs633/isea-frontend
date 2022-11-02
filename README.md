![isea tests](https://github.com/team-3-cs633/isea-frontend/actions/workflows/testing.yml/badge.svg)


# isea-frontend
The frontend for isea

## Setup

1. `git clone git@github.com:team-3-cs633/isea-frontend.git`
2. `cd isea-frontend`


## Running  

Run `npm start`

## Testing  

Run `npm test`

## Formatting 

TDB   

## UI Component Diagram
![UI Component Diagram](ui_component_diagram.png)

## Search Functionality Implementation
The search within the UI is setup as key:value pairs
- The key to search for is the event information type, and the value is the data associated with that information
- The **keys** are the fields of the event data.
    - description
    - cost
    - category
    - location
    - etc.
- The **values** are anything the user wants to search for. (Note: this is not case sensitive and returns partial matches) 

#### Examples:
![Category Search Example](search_category.png)    
![Cost Search Example](search_cost.png)
