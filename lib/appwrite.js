import {Account, Avatars, Client , Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platfrom: "com.aura",
  projectId: "6711fabe0032ba0a745a",
  databaseId: "6711fc600016309daf99",
  userCollection: "6711fc9100337fcccfc3",
  videosCollection: "6711fce9002088856793",
  storageId: "6711ff6b0032761f4cf4",
};


const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platfrom);

export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email, password, username) => {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error('Something went wrong');

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);


        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollection,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email,
                username,
                avtar : avatarUrl

            }
        )

        return newUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
  
 
};

export async function signIn(email, password){
    try {
      const session = await account.createEmailPasswordSession(email, password);

      return session;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
}


export const getCurrentUser = async() => {
  try {
    const currnAccount =  await account.get()

    if(!currnAccount) throw Error('Something went wrong');


    const currrentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollection,
      [Query.equal("accountId", currnAccount.$id)]
    )

    if(!currrentUser) throw Error('Something went wrong');

    return currrentUser.documents[0];

    
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

