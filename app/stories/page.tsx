
import Authenticator from "@/components/global/Authentication/Authenticator/Authenticator";
import BottomSheet from "@/components/global/BottomSheet/BottomSheet";

async function Stories() {

    return (

            <BottomSheet title="Sign in with email">
                <Authenticator />
            </BottomSheet>
    );
}

export default Stories;