import { UserProfile } from "../common/useUser";

interface HomeProps {
    profile: UserProfile;
}

const useHome = (): HomeProps => {

    const profile: UserProfile = {
        name: 'a',
        nik: "12313",
        idTelegram: 'ad',
        partner: 'ada',
        sector: 'ada',
        witel: 'ada',
        regional: 'da',
    }
    return {
        profile
    }

}


export default useHome;