

import axios from 'axios';

const API_KEY = 'AIzaSyB5PAVU4FFUcZ5aicFNHTKpt57S_kCrTOw';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export const analyzeImage = (image) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1]; // Extract base64 data
                const requestBody = {
                    requests: [
                        {
                            image: {
                                content: base64data // Send the base64-encoded image content
                            },
                            features: [
                                { type: 'LABEL_DETECTION', maxResults: 5 }
                            ]
                        }
                    ]
                };

                const response = await axios.post(API_URL, requestBody, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Extract descriptions from the response data
                const descriptions = response.data.responses[0].labelAnnotations.map(annotation => annotation.description);

                resolve(descriptions); // Resolve the promise with descriptions
            };
        } catch (error) {
            console.error("Error calling the Vision API", error);
            reject(error); // Reject the promise if there's an error
        }
    });
};