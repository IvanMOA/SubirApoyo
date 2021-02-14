import React from "react";
import { Navbar } from '../components/Navbar/Navbar'
import { contentPadding } from '../theme/theme'
import { PhotoDropzone } from '../components/Dropzone/Dropzone'
import { UploadPhotos } from "../components/UploadPhotos/UploadPhotos";

export const Home : React.FC = () => {
    return <div>
        <Navbar  />
        <div className={`${contentPadding} mt-6`}>
            <h1> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, molestiae. Dolor perferendis ipsum inventore, saepe facilis, tempore autem officia libero placeat quis, iste qui. Cum fugit consequuntur libero. Doloremque vitae iste sunt nobis sed ea non, repellat, maiores ipsum odit voluptates voluptatem tenetur maxime, dolor inventore quaerat laudantium et nam? </h1>
            <div className="my-8">
                <PhotoDropzone />
            </div>
            <div>
                <UploadPhotos />
            </div>
        </div>
    </div>
}