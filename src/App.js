// we import component when we want write our component with class component
// import { Component } from "react";

//we use useState in functional components instead of using setState which we have used in class components
import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonster, setFilteredMonsters] = useState(monsters);

  console.log("render");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((Response) => Response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox
        className="search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monster"
      />
      <CardList monsters={filteredMonster} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((Response) => Response.json()) //in the course this mentioned as a promise but I didn't understand sufficently
//       .then((users) => {
//         this.setState(() => {
//           return { monsters: users }; // it could write like this which is simpler: setState(({monsters: users}))
//         });
//       });
//   }

//   //**so importent note**
//   //this is a method for onChange event we have below.
//   //we use this method because, this way it got place in outside of the render, the reason of this necessity is this method should render once at all the process, so we bring it here to reduce waste time and delay which rerendering caused.
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     //with this optimization we can write our code briefely and make them more compact
//     //additional explaining: as we see below this.state or just this alone got equal and refer to their base object so we don't need to rewrite them over and over.
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonster = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox
//           className="search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="search monster"
//         />
//         <CardList monsters={filteredMonster} />
//       </div>
//     );
//   }
// }

export default App;
