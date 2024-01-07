export default function getElapsedTime (timestamp : string) : string {
    const timeOfCreation : any = new Date(timestamp);
    const currentTime : any = new Date();
    const elapsedTime : number = (currentTime - timeOfCreation) / (1000 * 60) //output in minutes

    switch(true) {
        case (elapsedTime < 1):
            return 'Just now';
            break;
        case (elapsedTime < 60):
            return `${Math.floor(elapsedTime)}m ago`;
            break;
        case (elapsedTime < 60*24): 
            return `${Math.floor(elapsedTime/60)}h ago`;
            break;
        case (elapsedTime < 60*24*7): 
            return `${Math.floor(elapsedTime/(60*24))}d ago`;
            break;
        case (elapsedTime < 60*24*7*30): 
            return `${Math.floor(elapsedTime/(60*24*7))}w ago`;
            break;
        case (elapsedTime < 60*24*7*30*12): 
            return `${Math.floor(elapsedTime/(60*24*7*30))} month${elapsedTime > 60*24*7*30 ? 's' : ''} ago`;
            break;
        case (elapsedTime > 60*24*7*30*12): 
            return `${Math.floor(elapsedTime/(60*24*7*30*12))} year${elapsedTime > 60*24*7*30*12 ? 's' : ''} ago`;
            break;
        default:
            return 'Undefined';
    }
}