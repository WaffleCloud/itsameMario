const { Client, Account, Databases, ID, Query} = Appwrite;
const projectId = '65034b5d5c5f7eb2aea8';
const databaseId = '6503976059d39d054a8f';
const collectionId = '6503979fd13f9c9828bc';

const client = new Client ()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const account = new Account(client); 
const database = new Databases(client);

function register(event) {
    account.create(
       ID.unique(),
       event.target.elements['register-email'].value,
       event.target.elements['register-password'].value,
       event.target.elements['register-username'].value 
    ).then(response => {
        console.log(response)
        database.createDocument(
            databaseId,
            collectionId,
            response.$id,
            {
                "userId": response.$id,
                "highscore": 0
            }
        )
        
        account.createEmailSession(
            event.target.elements['register-email'].value,
            event.target.elements['register-password'].value,
        )
    }).catch(error => console.error(error))
    event.preventDefault()
}