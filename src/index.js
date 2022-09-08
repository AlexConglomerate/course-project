import React from "react"
import reactDom from "react-dom"
import "bootstrap/dist/css/bootstrap.css"
import Table from "./Table";

const App = () => {
    return <Table/>
}

reactDom.render(<App/>, document.getElementById("root"))