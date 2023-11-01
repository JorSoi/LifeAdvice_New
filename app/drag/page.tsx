import CardItem from '@/components/CardItem/CardItem';
import styles from './Drag.module.scss'
 
const cardArray : Array<number> = [1,2,3,4,5,6,7,8,9,10]
const bgColor : string[] = ["red", "blue", "green", "purple", "yellow", "black", "orange", "brown", "grey", "pink"]

function drag() {

    
    return (
        <div className={styles.drag}>
            <div className={styles.cardContainer}>
                {
                    cardArray.map((card : number, i : number) => {
                        
                        return <CardItem key={card} value={card} zLayer={(cardArray.length-i)} index={i} bgColor={bgColor[i]}/>
                    })
                }
            </div>
        </div>
    );
}

export default drag;