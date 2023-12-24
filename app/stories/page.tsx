import RegistrationForm from "@/components/global/Authentication/RegistrationForm/RegistrationForm";
import SignInForm from "@/components/global/Authentication/SignInForm/SignInForm";
import BottomSheet from "@/components/global/BottomSheet/BottomSheet";

async function Stories() {

    return (

            <BottomSheet title="Sign in with email">
                <RegistrationForm />
            </BottomSheet>
    );
}

export default Stories;