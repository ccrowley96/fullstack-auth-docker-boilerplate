import React from "react";
import { ProvideAuth } from './services/auth';
import Routes from './components/Routes/Routes';
import './App.scss';

export default function App() {
  return (
    <ProvideAuth>
      <Routes/>
    </ProvideAuth>
  );
}