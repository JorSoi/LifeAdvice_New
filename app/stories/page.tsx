import BottomSheet from "@/components/global/BottomSheet/BottomSheet";
import CommentItem from "@/components/global/CommentItem/CommentItem";
import CommentList from "@/components/global/CommentList/CommentList";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import Overlay from "@/components/global/Overlay/Overlay";

function Stories() {
    return (
        <div>
            <MenuBar page={'stories'} />
            <Overlay>
                <BottomSheet title="Comments">
                    <CommentList />
                </BottomSheet>
            </Overlay>
        </div>
    );
}

export default Stories;