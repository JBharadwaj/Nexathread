import React, { Component } from 'react';
import {analyzeImage} from '../api';
import Images from '../imageUrl';

import './index.css'
 
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            descriptors:[]
        };
        this.onImageChange = this.onImageChange.bind(this); // Binding the method to the component instance
    }

    async onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });

            try {
                // Call the analyzeImage function to analyze the image
                const analysisResult = await analyzeImage(img);
                this.setState({descriptors:analysisResult});
            } catch (error) {
                console.error("Error analyzing image:", error);
            }
        }
    }

    render() {

        return (
            <div class="container">
                <div class="sub-container1">
                    <h1>Upload your image here</h1>
                    <input type="file" accept="image/*" onChange={this.onImageChange} class="input"/>
                </div>
                
                <div>
                    <h1>Uploaded image is</h1>
                    <img src={this.state.image} alt="Uploaded" />
                </div>
                <h2>Matched Products</h2>
                <Images class="images" descriptors={this.state.descriptors}/>
            </div>
        );
    }
}

export default Home;
