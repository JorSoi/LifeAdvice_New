import MenuBar from "@/components/global/MenuBar/MenuBar";
import PageContainer from "@/components/global/PageContainer/PageContainer";
import StoryBanner from "@/components/pages/Stories/StoryBanner/StoryBanner";


async function Stories() {

    return (
        <PageContainer scrollEnabled={false}>

            <StoryBanner />

            <MenuBar page={'stories'}/>
            
        </PageContainer>
    );
}

export default Stories;