import React from "react";
import './src/utils/ssr';

// import store api
import { StorageProvider } from "./src/storage";

//import styles
import "./src/scss/fonts.scss";
import "./src/scss/base.scss";

export const wrapRootElement = ({ element }) => (
	<StorageProvider>{element}</StorageProvider>
);
