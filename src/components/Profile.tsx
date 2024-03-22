//react
import { useContext, useEffect, useState } from "react"

//react-icons
import { TbCloudUpload, TbPencil } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";

//firebase
import { ImageDB, db } from "./../firebase/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

//context
import userContext, { descriptionContext } from "../contexts/context"

//assets
import blankImg from "./../assets/blank.jpg";

//style
import "./../styles/Profile.css"

type UploadResult = {
    fileName: string;
    downloadURL: string;
};


const UploadImage = async (userUid: any, newImageFile: any, prevImageFileName: any): Promise<UploadResult> => {
    try {
        const newImageFileName = `${userUid}`;

        if(prevImageFileName) {
            const prevImageRef = ref(ImageDB, `ProfileImages/${userUid}/${prevImageFileName}`);
            await deleteObject(prevImageRef);
        }

        const newImageRef = ref(ImageDB, `ProfileImages/${userUid}/${newImageFileName}`);
        await uploadBytes(newImageRef, newImageFile);

        const downloadURL = await getDownloadURL(newImageRef);
        console.log(downloadURL);

        return { fileName: newImageFileName, downloadURL };
    } catch(error) {
        console.error("Error uploading the image: ", error);
        throw error;
    }
};

const Profile = () => {
    const { username } = useContext(userContext);
    
    const [ descriptionInfo, setDescriptionInfo ] = useState("");
    const [ isEditing, setIsEditing ] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const {description, setDescription} = useContext(descriptionContext);
    
    const [userUid, setUserUid] = useState("");
    const [newImageFile, setNewImageFile] = useState<any>(null);
    const [prevImageFileName, setPrevImageFileName] = useState<any>(null);
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

    const fetchImageInfo = async(userId:any) => {
        try{
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            if(docSnap.exists()) {
                const data = docSnap.data();
                if (data.imageUrl) {
                    setImageUrl(data.imageUrl);
                    console.log(data.imageUrl)
                }
            }
        } catch(error) {
            console.error("Error fetching image information: ", error);
        }
    }

    const handleImgSave = async () => {
        if(userUid) {
            try {
                const {fileName, downloadURL} = await UploadImage(userUid, newImageFile, prevImageFileName);

                await updateImageUrl(userUid, downloadURL);

                setPrevImageFileName(fileName);

                console.log("Image uploaded successfully!");
            } catch(error) {
                console.error("Error ocurred: ", error);
            }

        }
    }

    const updateImageUrl = async(userId:any, downloadURL: any) => {
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

    const uploadDescription = async(userId:any, description: any) => {
        try{
            const docRef = doc(db, "users", userId);
            if(docRef) {
                await setDoc(docRef, {
                    "userDescription": description
                }, {merge: true});
                setDescription(description);
                setDescriptionInfo(description);
            }
        } catch(error){
            console.error("Error uploading the description: ", error);
        }
    }

    const fetchDescription = async(userId: any) => {
        try{
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                const data = docSnap.data();
                if(data.userDescription) {
                    setDescription(data.userDescription);
                    setDescriptionInfo(data.userDescription);
                }
            }
        } catch(error){
            console.log("Error fetching description information: ", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionInfo(e.target.value);
        setDescription(descriptionInfo);
    }

    const handleSave= async() => {
        setIsEditing(isEditing ? false : true);
        setDescription(descriptionInfo);
        await uploadDescription(userUid, descriptionInfo);
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
                <img src={imageUrl || blankImg} alt="Profile image" />
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
                        value={descriptionInfo}
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