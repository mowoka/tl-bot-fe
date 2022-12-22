import { useProfile } from "../common/useProfile";
import { UserProfile } from "../common/useUser";

interface HomeProps {
    profile: UserProfile | {};
}

const useHome = (): HomeProps => {
    const { getProfile } = useProfile();

    const profile = getProfile();

    return {
        profile
    }

}


export default useHome;