import MenuBar from "@/components/global/MenuBar/MenuBar";
import PageContainer from "@/components/global/PageContainer/PageContainer";
import styles from './Stories.module.scss'

async function Stories() {



    return (
        <PageContainer scrollEnabled={false}>

            <MenuBar page={'stories'}/>
            
        </PageContainer>
      
   
    );
}

export default Stories;