import BookmarkButton from "@/components/Buttons/BookmarkButton/BookmarkButton";
import CommentButton from "@/components/Buttons/CommentButton/CommentButton";
import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";
import LessonContainer from "@/components/Home/LessonContainer/LessonContainer";
import LessonItem from "@/components/Home/LessonItem/LessonItem";



function test() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', height: '100vh'}}>
            <LessonContainer />
        </div>
    );
}

export default test;