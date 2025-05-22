import AddNewFriend from "./AddNewFriend";
import ChatView from "./chatView";
import DefaultPage from "./DefaultPage";

function ViewCompo({compoName, userId}) {
    const showCompo = compoName;

    switch (showCompo){
        case 'adduser':
            return <>
            < AddNewFriend />
            </>
            break;
        
        case 'chat':
            return <>
            < ChatView userId={userId} />
            </>
        
        default:
            return <>
            <DefaultPage />
            </>
    }
}

export default ViewCompo;