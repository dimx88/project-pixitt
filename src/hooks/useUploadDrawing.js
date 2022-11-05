
import { useFirestore } from "./useFirestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../firebase/config";

import { useEffect, useState } from "react";

import { createThumbnailCanvas } from "../utils/downloadCanvas";


//  Upload the drawing metadata to collection (inc. pixel data), and then a thumbnail image of the canvas to storage.

export const useUploadDrawing = (collectionPath) => {
    const { addDocument, updateDocument, response } = useFirestore(collectionPath);
    const [isPending, setIsPending] = useState(false);



    // Upload drawing meta to collection 
    const uploadDrawing = async (drawingData, canvasRef, thumbnailRatio) => {
        setIsPending(true);

        try {

            // Upload the document
            const addedDocument = await addDocument(drawingData);
            console.log('added drawing id = ' + addedDocument.id);

            // Prepare thumbnail canvas
            const thumbCanvas = createThumbnailCanvas(canvasRef, thumbnailRatio);

            // Blobify thumbnail canvas and call upload method
            thumbCanvas.toBlob((blob) => {

                uploadThumbnail(blob, drawingData.uid, addedDocument.id);

                thumbCanvas.remove()
            });

        } catch (err) {
            setIsPending(false);
            console.log(err.message);
        }

    }


    const uploadThumbnail = async (blob, uid, docID) => {

        const uploadPath = `thumbnails/${uid}/thumb_${docID}.png`;
        const storageRef = ref(storage, uploadPath);
        const uploaded = await uploadBytes(storageRef, blob);
        console.log('uploaded thumbnail');

        const imgURL = await getDownloadURL(storageRef);
        console.log(imgURL);


        // Update the image link in the doc
        await updateDocument(docID, { thumbnailURL: imgURL })
        console.log('updated image url');

        setIsPending(false);
    }






    // Cleanup function
    useEffect(() => { }, []);

    return { uploadDrawing, isPending };
}