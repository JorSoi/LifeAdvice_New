import MenuBar from "@/components/global/MenuBar/MenuBar";
import styles from './Topics.module.scss'
import TopicList from "@/components/pages/Topics/TopicList/TopicList";
import PageContainer from "@/components/global/PageContainer/PageContainer";

function Topics() {
    return (
        <PageContainer scrollEnabled={true}>

            <TopicList />
            <MenuBar page={'topics'} />
            
        </PageContainer>
    );
}

export default Topics;