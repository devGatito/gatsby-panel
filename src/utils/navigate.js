import { navigate } from 'gatsby'
import { hasWindow } from './window'

export default url => {
	if (hasWindow()) {
		navigate(url);
	}
}

export const reload = () => {
	if (hasWindow()) {
		window.location.reload();
	}
}

export const openUrl = (url) => {
	if (hasWindow()) {
		window.open(url, "_blank");
	}
};
