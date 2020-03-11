import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/routing/AppliedRoute";
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute";
import NotFound from "./components/routing/NotFound";
import Home from "./components/homepage/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PasswordChange from "./containers/PasswordChange";
import Wallet from "./containers/Wallet";
import SellAssets from "./containers/SellAssets";
import EditProfile from "./containers/EditProfile";
import Asset from "./containers/Asset";
import Buy from "./containers/Buy";
import TransactionHistorial from "./containers/TransactionHistorial";
import Ranking from "./containers/Ranking";
import AssetHistory from "./containers/AssetHistory";
import Alarms from "./containers/Alarms";
import AlarmsList from "./containers/AlarmsList";
import PublicInvestments from "./containers/PublicInvestments";
import MyProfile from "./components/homepage/MyProfile";
import MyAlarms from "./components/homepage/MyAlarms";
import AssetStore from "./components/homepage/AssetStore";
import History from "./components/homepage/History";

// we use custom 'route' components (instead of Route)
// to pass auth logic to different routes
export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/passwordchange" exact component={PasswordChange} props={childProps} />
    <AppliedRoute path="/wallet" exact component={Wallet} props={childProps} />
    <AppliedRoute path="/sellassets" exact component={SellAssets} props={childProps} />
    <AppliedRoute path="/profile" exact component={EditProfile} props={childProps} />
    <AppliedRoute path="/asset" exact component={Asset} props={childProps} />
    <AppliedRoute path="/buy" exact component={Buy} props={childProps} />
    <AppliedRoute path="/transactionhistorial" exact component={TransactionHistorial} props={childProps} />
    <AppliedRoute path="/ranking" exact component={Ranking} props={childProps} />
    <AppliedRoute path="/assethistory" exact component={AssetHistory} props={childProps} />
    <AppliedRoute path="/alarms" exact component={Alarms} props={childProps} />
    <AppliedRoute path="/alarms/list" exact component={AlarmsList} props={childProps} />
    <AppliedRoute path="/publics" exact component={PublicInvestments} props={childProps} />
    <AppliedRoute path="/myprofile" exact component={MyProfile} props={childProps} />
    <AppliedRoute path="/myalarms" exact component={MyAlarms} props={childProps} />
    <AppliedRoute path="/assetstore" exact component={AssetStore} props={childProps} />
    <AppliedRoute path="/history" exact component={History} props={childProps} />
    <Route component={NotFound} />
</Switch>;
