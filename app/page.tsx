import LessonContainer from "@/components/pages/Home/LessonContainer/LessonContainer";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import PageContainer from "@/components/global/PageContainer/PageContainer";



function Explore() {
    
    return (
        <PageContainer scrollEnabled={false}>

            <LessonContainer />
            <MenuBar page={'explore'}/>

        </PageContainer>
    );
}

export default Explore;