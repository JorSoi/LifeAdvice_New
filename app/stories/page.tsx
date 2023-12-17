import BottomSheet from "@/components/global/BottomSheet/BottomSheet";
import CommentLogicWrapper from "@/components/global/Comments/CommentLogicWrapper/CommentLogicWrapper";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import Overlay from "@/components/global/Overlay/Overlay";
import TextArea from "@/components/global/TextArea/TextArea";

function Stories() {
    return (
        <div>
            <MenuBar page={'stories'} />
            {/* <Overlay>
                <BottomSheet title="Comments">
                    <CommentLogicWrapper lessonId={1} />
                </BottomSheet>
            </Overlay> */}
        </div>
    );
}

export default Stories;