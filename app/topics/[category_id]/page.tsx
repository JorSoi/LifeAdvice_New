import MenuBar from "@/components/global/MenuBar/MenuBar";
import LessonContainer from "@/components/pages/Home/LessonContainer/LessonContainer";
import PageContainer from "@/components/global/PageContainer/PageContainer";

function FilteredLessonPage({params} : {params : {category_id : string}}) {
    
    return (
        <PageContainer scrollEnabled={false}>

            <LessonContainer category_id={Number(params.category_id)}/>
            <MenuBar page={'default'} />

        </PageContainer>
    );
}

export default FilteredLessonPage;