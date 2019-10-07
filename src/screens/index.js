import React from "react";

import Screen from "./Screen";

import PicsList from "./Pics/List"
import Upload from "./Upload"
import Profile from "./Profile"
import Login from "./Auth/Login"

// App navigation
export const PicsListScreen = () => (<Screen name="Home" ><PicsList/></Screen>);
export const UploadScreen = () => (<Screen name="Pics" ><Upload/></Screen>);
export const ProfileScreen = ({ navigation }) => (<Screen  name="Profile" ><Profile navigation={navigation}/></Screen>);

// Auth navigation
export const LoginScreen = ({ navigation }) => (<Login navigation={navigation}/>);
