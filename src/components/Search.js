import React, { useState } from "react";
import "../index.css";
import {
  Button,
  Input,
  Form
} from "reactstrap";
import { FiSearch } from "react-icons/fi";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <Form>
        <Input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          placeholder="name"
        />
        <Button className="btn-search" color="link" onClick={callSearchFunction} type="submit" value="SEARCH">search me <FiSearch /></Button>
      </Form>
    );
}

export default Search;