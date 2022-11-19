import React from "react";
import NavBar from "./components/navBar";
import {Route, Switch} from "react-router-dom";
import Users from "./components/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import TestPage from "./layouts/testPage";
import User from "./components/user";

// import {Route} from "react-router-dom";

function App() {
    return (
        <>
            <NavBar/> {/* списки URL*/}
            <Switch>
                {/* exact - полное совпадение*/}
                <Route path="/" exact component={Main}/>
                {/* if (url == "/login") => вывести компонент Login */}
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId" component={User}/>
                <Route path="/users" component={Users}/>

                {/*если хотим передать ещё какие-то парраметры, кроме props*/}
                <Route path="/testPage" render={(props) => (<TestPage posts={[1, 2, 3]} {...props}/>)}/>
            </Switch>
            {/*<Users/>*/}
        </>
    );
}

export default App;
