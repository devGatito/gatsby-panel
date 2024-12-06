import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '@storage/store'
import { getUserIp } from "@services"
import { sha256 } from "@utils"

const useSession = () => {
	const { fingerprint, setFingerprint } = useStore();

	const getIpAddress = async () => {
		const ip = await getUserIp();
		const uuid = uuidv4();
		return sha256(`${uuid}${ip ? '::' + ip : ''}`)
	}

	useEffect(() => {
		const load = async () => {
			const composedUuid = await getIpAddress();
			setFingerprint(composedUuid)
		}
		!fingerprint && load()
	}, [])

	return { fingerprint }
}

export default useSession
