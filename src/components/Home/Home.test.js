import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";


import Home from "./Home";

test("Popular should render", () => {
  expect(<Popular />);
});
