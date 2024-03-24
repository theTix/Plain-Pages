//react
import { useContext, useEffect, useState } from "react"

//react-icons
import { TbCloudUpload, TbPencil } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";

//firebase
import { ImageDB, db } from "./../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

//context
import userContext, { descriptionContext } from "../contexts/context"

//style
import "./../styles/Profile.css"

const UploadImage = async (userUid: string, newImageFile: any) => {
    try {
        const newImageFileName = `${userUid}`;
        const newImageRef = ref(ImageDB, `ProfileImages/${userUid}/${newImageFileName}`);

        await uploadBytes(newImageRef, newImageFile);

        const downloadURL = await getDownloadURL(newImageRef);

        return { fileName: newImageFileName, downloadURL };
    } catch(error) {
        console.error("Error uploading the image: ", error);
        throw error;
    }
};

const Profile = () => {
    const { username } = useContext(userContext);
    const {description, setDescription} = useContext(descriptionContext);
    
    const [ isEditing, setIsEditing ] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const [userUid, setUserUid] = useState("");
    const [newImageFile, setNewImageFile] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<any>("");
    
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if(user) {
            setUserUid(user.uid);
            fetchImageInfo(user.uid);
            fetchDescription(user.uid);
        }
    }, []);

    const fetchImageInfo = async(userId: string) => {
        try{
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                const data = docSnap.data();
                if (data.imageUrl) {
                    setImageUrl(data.imageUrl);
                }
            }
        } catch(error) {
            console.error("Error fetching image information: ", error);
        }
    }

    const handleImgSave = async () => {
        if(userUid) {
            try {
                const {downloadURL} = await UploadImage(userUid, newImageFile);

                await updateImageUrl(userUid, downloadURL);

                console.log("Image uploaded successfully!");
            } catch(error) {
                console.error("Error ocurred: ", error);
            }

        }
    }

    const updateImageUrl = async(userId: string, downloadURL: string) => {
        try{
            const docRef = doc(db, "users", userId);
            await setDoc(docRef, {
                imageUrl: downloadURL
            }, {merge: true});
            setImageUrl(downloadURL);
        } catch(error) {
            console.error("Error updating image URL: ", error);
        }
    }

    const uploadDescription = async(userId: string, description: string) => {
        try{
            const docRef = doc(db, "users", userId);
            if(docRef) {
                await setDoc(docRef, {
                    "userDescription": description
                }, {merge: true});
                setDescription(description);
            }
        } catch(error){
            console.error("Error uploading the description: ", error);
        }
    }

    const fetchDescription = async(userId: string) => {
        try{
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                const data = docSnap.data();
                if(data.userDescription) {
                    setDescription(data.userDescription);
                }
            }
        } catch(error){
            console.log("Error fetching description information: ", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const handleSave= async() => {
        setIsEditing(isEditing ? false : true);
        await uploadDescription(userUid, description);
    }

    const handleEdit = () => {
        setIsEditing(isEditing ? false : true);
    }

    console.log(imageUrl);
    console.log(newImageFile);

  return (
    <div className="profile-container-background">
        <div className="profile-container">
            <div className="profile-img">
                <img src={imageUrl || "https://firebasestorage.googleapis.com/v0/b/plain-pages.appspot.com/o/OtherImages%2Fblank.jpg?alt=media&token=9c207aa3-a8e3-4247-b78b-407613b406e6"} alt="Profile image" />
            </div>
            
            <div className="imgConfig">
                <label className={`upload-label ${isUploading ? "edit-left" : ""}`} htmlFor="upload-input">
                    <input type="file" id="upload-input" name="upload-input" onChange={(e) => setNewImageFile(e.target.files ? e.target.files[0] : null)}></input>
                    <TbCloudUpload className="upload-icon" />
                    <button onClick={handleImgSave}>
                        <RiSave3Fill />
                    </button>
                </label>
                <button onClick={() => setIsUploading(isUploading ? false : true)} className={`edit-img-btn ${isUploading ? "edit-right" : ""}`}>
                    {isUploading ? <FaCheck /> : <TbPencil />}
                    {isUploading ? <span>Save</span> : <span>Edit</span>}
                </button>
            </div>
            
            <h3 className="profile-name">{username}</h3>

            {isEditing ? (
                <label className="label-for-input" htmlFor="description">
                    <textarea 
                        name="description" 
                        id="description"
                        className="user-description"
                        value={description}
                        onChange={handleChange}
                        cols={25} 
                        rows={5}
                    >
                    </textarea>
                    <button onClick={handleSave}>
                        <FaCheck />
                    </button>
                </label>
            ) : (
                <div className="label-for-input">
                    <p className="user-description">{description}</p>
                    <button onClick={handleEdit}>
                        <TbPencil />
                    </button>
                </div>
            )}
            
        </div>

    </div>
  )
}

export default Profile