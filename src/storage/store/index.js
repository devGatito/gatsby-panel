import React, { useContext, useEffect, useState } from "react";
import defaultState, { defaultData } from "./defaultState";
import { CONTEXT } from "@constants";

const Storage = React.createContext(defaultState);

const StorageProvider = ({ children }) => {
	const [route, setRoute] = useState(defaultState.route);
	const [isLoading, setIsLoading] = useState(defaultState.isLoading);
	const [auth, setAuth] = useState(defaultState.auth);
	const [error, setError] = useState(defaultState.error);
	const [fingerprint, setFingerprint] = useState(defaultState.fingerprint);

	useEffect(() => {
		const store = {
			route,
			auth,
			error,
			fingerprint,
			isLoading
		};

		sessionStorage.setItem(CONTEXT, JSON.stringify(store));
	}, [route, auth, error, fingerprint, isLoading]);


	const clearStore = () => {
		setAuth(defaultData.auth);
		setError(defaultData.error);
		setFingerprint(defaultData.fingerprint);
		setIsLoading(defaultData.isLoading);
	};

	return (
		<Storage.Provider
			value={{
				route,
				setRoute,
				auth,
				setAuth,
				error,
				setError,
				clearStore,
				fingerprint,
				setFingerprint,
				isLoading,
				setIsLoading
			}}
		>
			{children}
		</Storage.Provider>
	);
};

const useStore = () => useContext(Storage);

export default StorageProvider;
export { Storage, useStore };
